import { Button, Container, Image, Form } from "react-bootstrap";
import style from "./Product.module.scss"
import { FC, useEffect, useState } from "react";
import { IComment } from "../../types/types";
import { useAppSelector } from "../../store/store";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";





const Comment: FC<{productId: string}> = ({productId}) => {

  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const {t} = useTranslation()

  const isAuth = useAppSelector((state) => state.user.auth || null)

  
 
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/ws/comments`);

    ws.onopen = () => {
      console.log("WebSocket connection is successful");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "INIT_COMMENTS":
          setComments(message.data);
          break;

        case "NEW_COMMENT":
          setComments((prevComments) => [...prevComments, message.data]);
          break;

        case "DELETED_COMMENT":
          setComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== message.data.commentId)
          );
          break;

        default:
          console.log("Unknown message type:", message.type);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [productId]);


  if(!isAuth){
    return <div>Unauthorized</div>
  }

  const addComment = () => {
    const ws = new WebSocket(`ws://localhost:3000/ws/comments`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "ADD_COMMENT",
          payload: {
            productId,
            firstName: isAuth.firstName,
            avatar: isAuth.avatar,
            userId: isAuth._id,
            text: newComment,
            isAdmin: isAuth.role === "user" ? true : false,
          },
        })
      );
      setNewComment("");
    };
  };


  const deleteComment = (commentId: string) => {
    const ws = new WebSocket(`ws://localhost:3000/ws/comments`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "DELETE_COMMENT",
          payload: {
            commentId,
          },
        })
      );
    };
  };

  return (<>{comments.map((comment) => (
    <Container className={comment.isAdmin ? style.commentAdmin : style.commentUser}>
          <Image className={style.avatar} src={comment.avatar} roundedCircle />
          <div className={comment.isAdmin ? style.admin : style.user }>{comment.isAdmin ? "Admin" : comment.firstName}</div>
          <div className={style.starsContainer}>
            {comment.isAdmin ? null : Array.from({ length: comment.countStar || 0}, (_, index) => (
              <span
                key={index}
                className={style.star}
              >
                ★
              </span>
            ))}
          </div>
          <div className={comment.isAdmin ? style.adminText : style.userText }>{comment.text}</div>
          <button onClick={() => deleteComment(comment._id as string)}>
            <MdDelete />
          </button>
        </Container>
  ))}
          <div style={{textAlign: "center", fontWeight: "bold"}}>{t("Leave a comment")}
          <Form.Control style={{border: "0.5px solid", marginBottom: 10}} value={newComment} onChange={(event) => setNewComment(event?.target.value)} />
          <Button className={style.commentBtn} onClick={addComment}>{t("Send feedback")}</Button>
          </div>
</>
  )

}

export default Comment;
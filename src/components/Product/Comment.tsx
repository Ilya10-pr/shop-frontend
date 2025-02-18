import { Container, Image } from "react-bootstrap";
import style from "./Product.module.scss"
import { FC, memo, useEffect, useState } from "react";
import { IComment } from "../../types/types";
import { useAppSelector } from "../../store/store";

export interface ICommentWS {
  _id: string;
  productId: string;
  avatar: string;
  firstName:string;
  countStar?: number;
  comment: string;
  isAdmin: boolean;
  createdAt: Date,
  updatedAt: Date,
}



const Comment: FC<{productId: string}> = ({productId}) => {

  const [comments, setComments] = useState<ICommentWS[]>([]);
  const [newComment, setNewComment] = useState("");

  const isAuth = useAppSelector((state) => state.user.auth || null)

  
 
  useEffect(() => {
    // Создаем WebSocket-соединение
    const ws = new WebSocket(`ws://localhost:3000/ws/comments`);

    // Обработка открытия соединения
    ws.onopen = () => {
      console.log("WebSocket соединение установлено");
    };

    // Обработка сообщений от сервера
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "INIT_COMMENTS":
          setComments(message.data);
          break;

        case "NEW_COMMENT":
          setComments((prevComments) => [...prevComments, message.data]);
          break;

        case "UPDATED_COMMENT":
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === message.data._id ? message.data : comment
            )
          ); 
          break;

        case "DELETED_COMMENT":
          setComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== message.data.commentId)
          );
          break;

        default:
          console.log("Неизвестный тип сообщения:", message.type);
      }
    };

    // Обработка закрытия соединения
    ws.onclose = () => {
      console.log("WebSocket соединение закрыто");
    };

    // Обработка ошибок
    ws.onerror = (error) => {
      console.error("WebSocket ошибка:", error);
    };

    // Закрытие соединения при размонтировании компонента
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
            userId: isAuth._id, // Замените на реальный ID пользователя
            comment: newComment,
            isAdmin: isAuth.role === "user" ? true : false,
          },
        })
      );
      setNewComment("");
    };
  };

  const editComment = (commentId: string, newText: string) => {
    const ws = new WebSocket(`ws://localhost:3000/ws/comments`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "EDIT_COMMENT",
          payload: {
            commentId,
            text: newText,
          },
        })
      );
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
    <Container className={style.commentUser}>
          <Image className={style.avatar} src={comment.avatar} roundedCircle />
          <div style={{display: "block", position: "relative", bottom: 57, left: 65, fontWeight: "bold"}}>{comment.isAdmin ? "Admin" : comment.firstName}</div>
          <Container style={{display: "inline", 
                            position: "relative",
                            bottom: 88,
                            left: 126}}>
            {comment.isAdmin ? null : Array.from({ length: comment.countStar || 0}, (_, index) => (
              <span
                key={index}
                style={{
                  fontSize: "1.5rem",
                  color: "gold"
                }}
              >
                ★
              </span>
            ))}
          </Container>
          <div style={{display: "block",position: "relative",
    left: 65,
    bottom: 95}}>{comment.comment}</div>

        </Container>
  ))}
        
        <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Enter the comment"
      />
      <button onClick={addComment}>Send</button></>
  )

}

export default Comment;
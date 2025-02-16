import { Container, Image } from "react-bootstrap";
import style from "./Product.module.scss"
import { IComment } from "../../types/types";
import { FC } from "react";




const Comment: FC<{comment: IComment}> = ({comment}) => {


  return (
        <Container className={style.comment}>
          <Image className={style.avatar} src={comment.avatar} roundedCircle />
          <div style={{display: "block", position: "relative", bottom: 57, left: 65, fontWeight: "bold"}}>{comment.firstName}</div>
          <Container style={{display: "inline", 
                            position: "relative",
                            bottom: 88,
                            left: 126}}>
            {Array.from({ length: comment.countStar }, (_, index) => (
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
    bottom: 95}}>{comment.description}</div>

        </Container>
  )

}

export default Comment;
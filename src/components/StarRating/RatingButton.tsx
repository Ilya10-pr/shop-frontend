import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import style from "./RatingButton.module.scss"
import { useAppDispatch } from "../../store/store";
import { updateRatingProductThunk } from "../../store/product/productsThunk";
import RatingStar from "./RatingStar";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IComment, IUser } from "../../types/types";
import { createComment } from "../../services/CommentServices";



const RatingButton: FC<{ productId: string, user: IUser }> = ({ productId, user }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isModal, setIsModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()


  const mutation = useMutation<IComment[], Error, IComment>({mutationFn: createComment,
    onSuccess: () => {
      toast.success("Thanks for the comment.")
      setComment('');
    },
    onError: () => {
      toast.success("Сouldn't send a comment, please try again later")
    },
  });


  const sendRatingProduct = (rating: number) => {
    const payload = {
      productId: productId, 
      data: {value: rating}
    }
    const data: IComment = {
      userId: user._id as string,
      productId: productId,
      countStar: rating,
      text: comment,
      avatar: user.avatar as string,
      firstName: user.firstName,
      isAdmin: user.role === "user" ? false : true
    }
    dispatch(updateRatingProductThunk(payload))
    mutation.mutateAsync(data)
    setIsModal(false)
  };

  return (<>
    <Button onClick={() => setIsModal(true)}>Leave a review</Button>
    {isModal ?
      <div className={style.modal}>
        <div className={style.modal_content}>
          <RatingStar rating={rating} setRating={setRating} />
          <Form.Label>Leave a comment</Form.Label>
          <Form.Control value={comment} onChange={(event) => setComment(event?.target.value)} as="textarea" />
          <Button style={{marginTop: 10}} onClick={() => sendRatingProduct(rating)}>Send feedback</Button>
        </div>
      </div> : null}
  </>


  );
};

export default RatingButton;
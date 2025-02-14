import { FC, useState } from "react";
import { updateProduct } from "../../services/ProductServices";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import style from "./RatingButton.module.scss"
import { useAppDispatch } from "../../store/store";
import { updateProductThunk } from "../../store/product/productsThunk";

const RatingButton: FC<{ productId: string }> = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [isModal, setIsModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()


  const handleRatingChange = (value: number) => {
    const payload = {
      productId: productId, 
      data: {value: value}
    }
    dispatch(updateProductThunk(payload))
    setRating(value);
  };

  const openModal = () => {
    setIsModal(true)
  }

  const closeModal = () => {
    setIsModal(false)
  }

  return (<>
    <Button onClick={() => openModal()}>Leave a review</Button>
    {isModal ?
      <div className={style.modal}>
        <div className={style.modal_content}>
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="checkbox"
                  checked={rating >= value}
                  onChange={() => handleRatingChange(value)}
                  style={{ display: "none" }}
                />
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "3rem",
                    color: rating >= value ? "gold" : "gray",
                  }}
                >
                  ★
                </span>
              </label>
            ))}
          </div>
          <Form.Label>Leave a comment</Form.Label>
          <Form.Control as="textarea" />
          <Button style={{marginTop: 10}} onClick={() => closeModal()}>Send feedback</Button>
        </div>
      </div> : null}
  </>


  );
};

export default RatingButton;
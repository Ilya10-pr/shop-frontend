import { FC } from "react";
import { CartButtonProps } from "../../types/types";
import { useAppDispatch } from "../../store/store";
import { addProductToCartThunk } from "../../store/cart/cartThunk";
import { Button } from "react-bootstrap";
import style from "./CartButton.module.scss"


const CartButton: FC<CartButtonProps > = ({ itemId }) => {

  const dispatch = useAppDispatch()


  const toggleCart = async (id: string) => {
      dispatch(addProductToCartThunk({productId: id}))
    
  };


  return (
    <Button className={style.btn} onClick={() => toggleCart(itemId)}>
      Add to cart
    </Button>
    
  );
};

export default CartButton;
import { FC, useState } from "react";
import { BsCart } from "react-icons/bs";
import { CartButtonProps, IProduct } from "../../types/types";
import { useAppDispatch } from "../../store/store";
import { updateCountCart } from "../../store/auth/authSlice";
import { addProductToCartThunk, deleteProductFromCartThunk } from "../../store/cart/cartThunk";
import { Button } from "react-bootstrap";
import style from "./CartButton.module.scss"


const CartButton: FC<CartButtonProps > = ({ itemId }) => {
  const [cart, setCart] = useState<string[]>([]);
  const dispatch = useAppDispatch()


  const toggleCart = async (id: string) => {
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id));
      dispatch(deleteProductFromCartThunk(id))
    } else {
      setCart([...cart, id]);
      dispatch(addProductToCartThunk({productId: id}))
    }
  };

  const isInCart = cart.includes(itemId);

  return (
    <Button className={style.btn}>
      Add to cart
    <label>
      <input
        type="checkbox"
        checked={isInCart}
        onChange={() => toggleCart(itemId)}
        style={{ display: "none" }}
      />
      <span
        style={{
          cursor: "pointer",
          fontSize: "3rem",
          color: isInCart ? "gold" : "gray", 
        }}
      >
      </span>
    </label>
    </Button>
    
  );
};

export default CartButton;
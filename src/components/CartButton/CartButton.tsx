import { FC, useState } from "react";
import { BsCart } from "react-icons/bs";
import { CartButtonProps, IProduct } from "../../types/types";
import { addProductToCart, deleteProductFromCart } from "../../services/ProductServices";
import { useAppDispatch } from "../../store/store";
import { updateCountCart } from "../../store/auth/authSlice";


const CartButton: FC<CartButtonProps > = ({ itemId, product }) => {
  const [cart, setCart] = useState<string[]>([]);
  const dispatch = useAppDispatch()


  const toggleCart = async (id: string, product: IProduct) => {
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id));
      const response = await deleteProductFromCart(id)
      dispatch(updateCountCart(response.length))
    } else {
      setCart([...cart, id]);
      const response = await addProductToCart(product)
      dispatch(updateCountCart(response.length))
      
    }
  };

  const isInCart = cart.includes(itemId);

  return (
    <label>
      <input
        type="checkbox"
        checked={isInCart}
        onChange={() => toggleCart(itemId, product)}
        style={{ display: "none" }}
      />
      <span
        style={{
          cursor: "pointer",
          fontSize: "3rem",
          color: isInCart ? "gold" : "gray", 
        }}
      >
        <BsCart />
      </span>
    </label>
  );
};

export default CartButton;
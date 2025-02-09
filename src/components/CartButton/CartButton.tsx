import { FC, useState } from "react";
import { BsCart } from "react-icons/bs";
import { CartButtonProps } from "../../types/types";
import { addProductToCart, deleteProductFromCart } from "../../services/ProductServices";


const CartButton: FC<CartButtonProps> = ({ itemId }) => {
  const [cart, setCart] = useState<string[]>([]);

  const toggleCart = (id: string) => {
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id));
      deleteProductFromCart(id)
    } else {
      setCart([...cart, id]);
      const data = {productId: id}
      addProductToCart(data)
    }
  };

  const isInCart = cart.includes(itemId);

  return (
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
        <BsCart />
      </span>
    </label>
  );
};

export default CartButton;
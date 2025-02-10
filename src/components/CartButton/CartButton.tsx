import { FC, useState } from "react";
import { BsCart } from "react-icons/bs";
import { CartButtonProps, IProduct } from "../../types/types";
import { addProductToCart, deleteProductFromCart } from "../../services/ProductServices";


const CartButton: FC<CartButtonProps > = ({ itemId, product }) => {
  const [cart, setCart] = useState<string[]>([]);


  const toggleCart = (id: string, product: IProduct) => {
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id));
      deleteProductFromCart(id)
    } else {
      setCart([...cart, id]);
      addProductToCart(product)
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
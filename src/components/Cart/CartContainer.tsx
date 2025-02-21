import { useAppDispatch, useAppSelector } from "../../store/store";
import { createContext, memo, useContext, useEffect } from "react";
import { deleteProductFromCartThunk, getCartUserThunk } from "../../store/cart/cartThunk";
import Cart from "./Cart";
import toast from 'react-hot-toast';
import { updateAmountUserThunk } from "../../store/auth/authThunk";
import { IUser } from "../../types/types";
import { updateCountBuyProduct } from "../../services/ProductServices";
import { useTranslation } from "react-i18next";




const CartContainer = memo(() => {
  const {t, i18n} = useTranslation()
  const dispatch = useAppDispatch()
  const cartUser = useAppSelector((state) => state.cart.cartUser)
  const user = useAppSelector((state) => state.user.auth || null)
  useEffect(() => {
    dispatch(getCartUserThunk())
  }, [])



  if(cartUser?.length === 0 || !user) {
    return <div>Product not found</div>
  }

  
  const deleteProduct = async (productId: string) => {
    
    try {
      dispatch(deleteProductFromCartThunk(productId))
    } catch (error) {
      console.log('Error deleting product:', error)
    }
  }


  const buyProduct = async (productId: string, productPrice: number) => {
    const error = i18n.language === "ru" ? "Недостаточно средств" : "Insufficient funds";
    const success = i18n.language === "ru" ? "Успешно" : "Successful";
    if(user && user.amount < productPrice){
      return toast.error(error, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        }
      })
    }
    try {
        await dispatch(updateAmountUserThunk({amount: -productPrice})).unwrap()
        await dispatch(deleteProductFromCartThunk(productId)).unwrap()
        await updateCountBuyProduct(productId)
        toast.success(success, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          }
        })
        
    } catch (error) {
      console.log('Error buy product:', error)
    }
  }



  return (cartUser?.map((product) => (
      <Cart user={user} product={product} buyProduct={buyProduct} deleteProduct={deleteProduct} />
  ))
  )
})

export default CartContainer;
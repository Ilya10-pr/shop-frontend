import { Button, Card, Container } from "react-bootstrap";
import RatingButton from "../StarRating/RatingButton";
import style from "./Cart.module.scss"
import { GrClose } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { memo, useEffect } from "react";
import { deleteProductFromCartThunk, getCartUserThunk } from "../../store/cart/cartThunk";




const Cart = memo(() => {
  const dispatch = useAppDispatch()
  const cartUser = useAppSelector((state) => {
    if(state.cart.cartUser){
      return state.cart.cartUser
    } else {
      return null
    }
  })

  useEffect(() => {
    dispatch(getCartUserThunk())
  }, [])


  if(cartUser?.length === 0) {
    return <div>Product not found</div>
  }

  
  const deleteProduct = async (productId: string) => {

    try {
      dispatch(deleteProductFromCartThunk(productId))
      // dispatch(updateCountCart(response.length))
    } catch (error) {
      console.log('Error deleting product:', error)
    }
  }



  return (cartUser?.map((product) => (
    <Container key={product._id} className={style.wrapper}>
      <Card className={style.product}>
        <Card.Body>
          <Card.Img variant="top" src={product.image} />
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(product.price)}</Card.Text>
        </Card.Body>
      </Card>
      <Container style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
        <Card.Title>{product.description}</Card.Title>
      </Container>
      <Container className={style.option}>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <Container>
            <RatingButton productId={product._id}/>
            <Card.Title>{product.rating > 0 ? `Rating: ${product.rating}` : "No rating"}</Card.Title>
          </Container>
          <Button
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              width: 30,
              height: 30,
              marginTop: 15
            }}
            onClick={() => deleteProduct(product._id)}
          >
            <GrClose style={{ width: 30, height: 30, color: "6E473B" }} />
          </Button>
        </Container>
        <Button onClick={() => deleteProduct(product._id)}>Buy</Button>
      </Container>
    </Container>
  ))


  )
})

export default Cart;
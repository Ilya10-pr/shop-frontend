import { Button, Card, Container } from "react-bootstrap";
import StarRating from "../StarRating/StarRating";
import style from "./Cart.module.scss"
import { useQuery } from "@tanstack/react-query";
import { getProductFromCart } from "../../services/ProductServices";
import { GrClose } from "react-icons/gr";




const Cart = () => {

  const { data: cartUser } = useQuery({ queryKey: ['cartUser',], queryFn: () => getProductFromCart() });

  if (!cartUser) {
    return (
      <div>Product not found</div>
    )
  }

  return (cartUser.map((product) => (
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
          <StarRating />
          <Button
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              width: 30,
              height: 30,
              marginTop: 15
            }}
          >
            <GrClose style={{ width: 30, height: 30, color: 'red' }} />
          </Button>
        </Container>
        <Button>Buy</Button>
      </Container>
    </Container>
  ))


  )
}

export default Cart;
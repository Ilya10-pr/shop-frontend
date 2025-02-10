import { useParams } from "react-router-dom";
import { getProductById } from "../../services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Container } from "react-bootstrap";
import StarRating from "../StarRating/StarRating";
import CartButton from "../CartButton/CartButton";
import style from "./Product.module.scss"
import { IoMdCheckmark } from "react-icons/io";


const Product = () => {

  const stock = true
  const params = useParams();
  

  const {data: product} = useQuery({queryKey: ['product', params.id], queryFn: () => getProductById(params.id || "")});

  if(!product){
    return (
      <div>Product not found</div>
    )
  }

  return (
    <Container className={style.wrapper}>
      <Card className={style.product}>
        <Card.Body>
          <Card.Img variant="top" src={product.image} />
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(product.price)}</Card.Text>
          <Container >
            {stock ? 
              <>
                <Card.Title>In stock</Card.Title>
                <IoMdCheckmark style={{width: 25, height: 25, color: "green"}} />
              </> : 
              <>
                <Card.Title>Out of stock</Card.Title>
                <Button className={style.btnOrder}>To order</Button>
              </>}
          </Container>
        </Card.Body>
      </Card>
      <Container style={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
        <Card.Title>{product.description}</Card.Title>
        <Container>
        <Container className={style.color}>
          <Card.Title>Color:</Card.Title>
          <Button style={{ backgroundColor: 'red', borderColor: 'red' }}></Button>
          <Button style={{ backgroundColor: 'black', borderColor: 'black' }}></Button>
          <Button style={{ backgroundColor: 'green', borderColor: 'green' }}></Button>
        </Container>
        <Container className={style.ram}>
          <Card.Title>RAM:</Card.Title>
          <Button>68</Button>
          <Button>126</Button>
          <Button>256</Button>
        </Container>
        </Container>
      </Container>
      <Container className={style.option}>
        <StarRating />
        {stock ? <CartButton itemId={product._id} product={product} /> : null}
        <Card.Title>Number of sales: 101</Card.Title> // count of sales
      </Container>
      
    </Container>
    
  )
  
}

export default Product;
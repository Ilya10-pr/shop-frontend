import { FC } from "react";
import { IProduct } from "../../../types/types";
import { Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";



const ProductCard: FC<{ product: IProduct }> = ({ product }) => {

  return (
    <Card>
      <Card.Body>
        <Nav.Link as={Link} to={`/products/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
          <Card.Title>{product.name} {product.ram} GB</Card.Title>
        </Nav.Link>
        <Card.Text>{new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  )


};

export default ProductCard;
import { FC } from "react";
import { getProducts } from "../../services/ProductServices.ts";
import ProductCard from "./ProductCard/ProductCard.tsx";
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from "@tanstack/react-query";


const ProductItem: FC = () => {

  const { data: products, isLoading } = useQuery({ queryKey: ['products'], queryFn: () => getProducts()});


  return (
    <Container style={{ 
      maxWidth: '720px',
      }}>
      <Row>
        {isLoading ? <div>Loading...</div> :products?.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={4}  className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
)



};

export default ProductItem;
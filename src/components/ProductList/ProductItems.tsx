import { FC, memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard.tsx";
import { Container, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { getProductsThunk } from "../../store/product/productsThunk.ts";


const ProductItem: FC = memo(() => {

  const products = useAppSelector((state) => {
    if(state.products.allProducts){
      return state.products.allProducts
    }
    return null
  })

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])


  return (
    <Container style={{ 
      maxWidth: '720px',
      }}>
      <Row>
        {!products ? <div>Loading...</div> :products?.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={4}  className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
)
});

export default ProductItem;
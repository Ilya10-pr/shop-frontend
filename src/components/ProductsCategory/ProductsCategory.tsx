// import { useLocation } from "react-router-dom";
// import { getProductsByCategory } from "../../services/ProductServices";
// import { useQuery } from "@tanstack/react-query";
// import ProductCard from "../ProductList/ProductCard/ProductCard";
// import { Col, Container, Row } from "react-bootstrap";

// const ProductsCategory  = () => {
  
//   const {data: category, isLoading, refetch} = useQuery({
//     queryKey: ['category'],
//     queryFn: () => getProductsByCategory(useLocation().pathname)
//     });
//   refetch()

//   return (
//   <Container style={{ 
//     maxWidth: '720px',
//     }}>
//     <Row>
//       {isLoading ? <div>Loading...</div> : category?.map((product) => (
//         <Col key={product._id} xs={12} sm={6} md={4} lg={4}  className="mb-4">
//           <ProductCard product={product} />
//         </Col>
//       ))}
//     </Row>
//   </Container>
//   )
// };
// export default ProductsCategory;

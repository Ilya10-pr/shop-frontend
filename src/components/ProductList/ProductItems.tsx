import { FC, memo, useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard.tsx";
import { Container, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { getProductsThunk } from "../../store/product/productsThunk.ts";
import style from "./ProductItem.module.scss";
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


const ProductItem: FC = memo(() => {
  const [currentPage, setCurrentPage] = useState(0); // Текущая страница
  const productsPerPage = 6; // Количество продуктов на странице
  
  const {allProducts, isLoading} = useAppSelector((state) => state.products || null)
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch])
  
  if(isLoading){
    return <div>Loading...</div>
  } 
  if(allProducts?.length === 0){
    return <div>Not found</div>
  }
  
  const offset = currentPage * productsPerPage;
  const currentProducts = allProducts?.slice(offset, offset + productsPerPage);

  const handlePageClick: ReactPaginateProps['onPageChange'] = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div style={{textAlign: "center"}}>

      <Container style={{ 
        maxWidth: '720px',
        }}>
        <Row>
          {currentProducts?.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={4}  className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <div style={{maxWidth: 720, margin: "0 auto"}}>
        <ReactPaginate
        previousLabel={<GrPrevious />}
        nextLabel={<GrNext />}
        breakLabel={'...'}
        pageCount={Math.ceil((allProducts?.length || 0) / productsPerPage)} // Общее количество страниц
        marginPagesDisplayed={2} // Количество отображаемых страниц по краям
        pageRangeDisplayed={5} // Количество отображаемых страниц вокруг текущей
        onPageChange={handlePageClick} // Обработчик изменения страницы
        className={style.pagination}
        activeClassName={'active'}
      />
      </div>
    </div>
)
});

export default ProductItem;
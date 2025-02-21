import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Image } from "react-bootstrap";
import CartButton from "../CartButton/CartButton";
import style from "./Product.module.scss"
import { IoMdCheckmark } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { JSXElementConstructor, useEffect } from "react";
import { getProductByIdThunk, getProductsByOptionThunk } from "../../store/product/productsThunk";
import { IOptionProduct } from "../../types/types";
import Comment from "./Comment";
import { useQuery } from "@tanstack/react-query";
import { getCommentsOfUsers } from "../../services/CommentServices";
import { useTranslation } from "react-i18next";



const ProductContainer = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {t} = useTranslation()
  const params = useParams();
  
  const product = useAppSelector((state) => state.products.selectedProduct || null)


  useEffect(() => {
    if (params.id) {
      dispatch(getProductByIdThunk(params.id))
    }
  }, [dispatch, params.id])

  if (!product) {
    return <div>Not found</div>
  }


  const selectColor = async (payload: IOptionProduct) => {
    const response = await dispatch(getProductsByOptionThunk(payload)).unwrap() // ээтооо сука пиздец нахуй ебаный 
    navigate(`/products/${response._id}`)
  }


  const selectRam = async (payload: IOptionProduct) => {
    const response = await dispatch(getProductsByOptionThunk(payload)).unwrap()
    navigate(`/products/${response._id}`)
  }


  return (
    <Container className={style.cart}>
      <Container className={style.wrapper}>
        <Card className={style.product}>
          <Card.Body>
            <div style={{
    backgroundColor: 'transparent', 
    borderRadius: '10px', 
    overflow: 'hidden', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    border: '1px solid #e0e0e0', 
    padding: '8px',  
    width: '100%', 
    marginBottom: 10
  }}>
            <Card.Img variant="top" src={product.image} />
            </div>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(product.price)}</Card.Text>
            <Container >
              {product.isStock ?
                <>
                  <Card.Title>{t("Availability")}</Card.Title>
                  <IoMdCheckmark style={{ width: 25, height: 25, color: "green" }} />
                </> :
                <>
                  <Card.Title>{t("Unavailability")}</Card.Title>
                  <Button className={style.btnOrder}>{t("Order")}</Button>
                </>}
            </Container>
          </Card.Body>
        </Card>
        <Container style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", padding: 16 }}>
          <Card.Title>{product.description}</Card.Title>
          <Container style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Container className={style.color}>
              <Card.Title>{t("Color")}</Card.Title>
              <Button onClick={() => selectColor({ name: product.name, ram: product.ram, color: "red" })} style={{ backgroundColor: 'red', borderColor: 'red' }}></Button>
              <Button onClick={() => selectColor({ name: product.name, ram: product.ram, color: "black" })} style={{ backgroundColor: 'black', borderColor: 'black' }}></Button>
              <Button onClick={() => selectColor({ name: product.name, ram: product.ram, color: "green" })} style={{ backgroundColor: 'green', borderColor: 'green' }}></Button>
            </Container>
            <Container className={style.ram}>
              <Card.Title>{t("RAM")}</Card.Title>
              <Button onClick={() => selectRam({ name: product.name, ram: 64, color: product.color })}>64</Button>
              <Button onClick={() => selectRam({ name: product.name, ram: 128, color: product.color })}>128</Button>
              <Button onClick={() => selectRam({ name: product.name, ram: 256, color: product.color })}>256</Button>
            </Container>
          </Container>
        </Container>
        <Container className={style.option}>
          <Card.Title >{product.rating > 0 ? `${t("Rating")}: ${product.rating}` : `${t("No rating")}`}</Card.Title>
          <Card.Title>{t("Number of sales")} {product.countBuy}</Card.Title>
          {product.isStock ? <CartButton itemId={product._id} product={product} /> : null}
        </Container>
      </Container>
      <Container>
      <Comment productId={product._id}/>
      </Container>
    </Container>


  )

}

export default ProductContainer;
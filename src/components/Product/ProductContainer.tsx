import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import CartButton from "../CartButton/CartButton";
import style from "./Product.module.scss"
import { IoMdCheckmark } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getProductByIdThunk, getProductsByOptionThunk } from "../../store/product/productsThunk";
import { IOptionProduct } from "../../types/types";



const ProductContainer = () => {

  const params = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const product = useAppSelector((state) => {
    if(state.products.selectedProduct){
      return state.products.selectedProduct
    }
    return null
  })

  useEffect(() => {
    if(params.id){
      console.log(location)
      dispatch(getProductByIdThunk(params.id))
    }
  }, [dispatch, params.id])

  if(!product) {
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
            {product.isStock ? 
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
        <Container style={{display: "flex", flexDirection: "column", gap: 1}}>
          <Container className={style.color}>
            <Card.Title>Color:</Card.Title>
            <Button onClick={() => selectColor({name: product.name, ram: product.ram, color: "red"})} style={{ backgroundColor: 'red', borderColor: 'red'}}></Button>
            <Button onClick={() => selectColor({name: product.name, ram: product.ram, color: "black"})} style={{ backgroundColor: 'black', borderColor: 'black' }}></Button>
            <Button onClick={() => selectColor({name: product.name, ram: product.ram, color: "green"})} style={{ backgroundColor: 'green', borderColor: 'green' }}></Button>
          </Container>
          <Container className={style.ram}>
            <Card.Title>RAM:</Card.Title>
            <Button onClick={() => selectRam({name: product.name, ram: 64, color: product.color})}>64</Button>
            <Button onClick={() => selectRam({name: product.name, ram: 128, color: product.color})}>128</Button>
            <Button onClick={() => selectRam({name: product.name, ram: 256, color: product.color})}>256</Button>
          </Container>
        </Container>
      </Container>
      <Container className={style.option}>
        <Card.Title>{product.rating > 0 ? `Rating: ${product.rating}` : "No rating"}</Card.Title>
        {product.isStock ? <CartButton itemId={product._id} product={product} /> : null}
        <Card.Title>Number of sales: 101</Card.Title> // count of sales
      </Container>
      
    </Container>
    
  )
  
}

export default ProductContainer;
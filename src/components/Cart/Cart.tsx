import { Button, Card, Container } from "react-bootstrap";
import RatingButton from "../StarRating/RatingButton";
import style from "./Cart.module.scss"
import { GrClose } from "react-icons/gr";
import { FC, memo} from "react";
import { IProduct, IUser } from "../../types/types";
import { useTranslation } from "react-i18next";




const Cart: FC<{user: IUser, product: IProduct, deleteProduct: (productId: string) => void, buyProduct: (productId: string, productPrice: number) => void}> = memo(({user, product, deleteProduct, buyProduct}) => {
  const {t} = useTranslation()



  return (<Container key={product._id} className={style.wrapper}>
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
            <RatingButton user={user} productId={product._id}/>
            <Card.Title>{product.rating > 0 ? `${t("Rating")} ${product.rating}` : `${t("No rating")}`}</Card.Title>
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
        <Button onClick={() => buyProduct(product._id, product.price)}>{t("Buy")}</Button>
      </Container>
    </Container>
  )
})

export default Cart;
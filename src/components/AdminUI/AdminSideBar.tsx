import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import style from "./AdminSideBar.module.scss"

const AdminSideBar = () => {
  return (
    <Container className={style.admin}>
      <Button className={style.btn}>Add product</Button>
      <Button className={style.btn}>Edit Product</Button>
      <Button className={style.btn}>Delete product</Button>
    </Container>
    

  );
}

export default AdminSideBar;

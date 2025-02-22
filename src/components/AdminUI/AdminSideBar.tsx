import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import style from "./AdminSideBar.module.scss"
import { useState } from 'react';
import AddProductModal from './AddProduct/AddProductModal';
import EditProductModal from './EditProduct/EditProductModal';
import { IProduct } from '../../types/types';
import { useTranslation } from 'react-i18next';




const AdminSideBar = () => {
    const {t} = useTranslation()
  

  const [isModal, setModal] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);


  return (isModal === "add" ? 
                <AddProductModal setModal={setModal} product={product} setProduct={setProduct}/> :
                 isModal === "edit" ? <EditProductModal setProduct={setProduct} setModal={setModal} /> :
    <Container className={style.admin}>
      <Button className={style.btn} onClick={() => setModal("add")}>{t("Add")}</Button>
      <Button className={style.btn} onClick={() => setModal("edit")}>{t("Edit")}</Button>
      <Button className={style.btn} onClick={() => setModal("edit")}>{t("Delete")}</Button>
    </Container>
  );
}

export default AdminSideBar;

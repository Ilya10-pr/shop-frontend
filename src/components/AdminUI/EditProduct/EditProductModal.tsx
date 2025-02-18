import React, { FC, useState } from "react"
import { Button, Card, Container, Form } from "react-bootstrap";
import style from "./EditProductModal.module.scss"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { IProduct } from "../../../types/types";
import { setProductsForEdit } from "../../../store/product/productsSlice";
import { IoClose } from "react-icons/io5";
import { deleteProductThunk } from "../../../store/product/productsThunk";
import toast from "react-hot-toast";

const EditProductModal: FC<{setModal: (option: string) => void, setProduct: (product: IProduct | null) => void}> = ({setModal, setProduct}) => {
  const [name, setName] = useState("")
  const dispatch = useAppDispatch()

  const products = useAppSelector((state) => state.products.productsForEdit || null)


  const foundProduct = (value: string) => {
    dispatch(setProductsForEdit(value))
    setName(value)
  }

  const editProduct = (product: IProduct) => {
    setProduct(product)
    setModal("add")
  }

  const deleteProduct = async (productId: string) => {
    const response = await dispatch(deleteProductThunk(productId)).unwrap()
    if(response){
      setModal("")
      toast.success("Product was successfully deleted")
      return
    }
    toast.error("Error! Product wasn`t deleted, try again later.")
  }   
                                                                                                  
  const closeModal = () => {        
    setModal("")        
    setProduct(null)
  }

  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <button className={style.close} onClick={() => closeModal()}>
          <IoClose />
        </button>
        <div className={style.search}>
          <div className={style.title}>Enter the product name</div>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => foundProduct(event?.target.value)}
          />
        </div>
        <div className={style.list}>
        {products?.map((product) => (
          <Container className={style.product}>
          <div className={style.image}>
            <Card.Img variant="top" src={product.image} />
          </div>
          <div style={{margin: "auto", textAlign:"center"}}>
            <Card.Title>{product.name}</Card.Title>
            <Card.Title>{product.ram}GB</Card.Title>
          </div>
          <div className={style.option}>
            <Button onClick={() => editProduct(product)}>
              <MdEdit />
            </Button>
            <Button onClick={() => deleteProduct(product._id)}>
              <MdDelete />
            </Button>
          </div>
        </Container>
        ))}
          
        </div>


      </div>
    </div>
  )
};

export default EditProductModal;

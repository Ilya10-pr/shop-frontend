import React, { FC, useState } from "react"
import { Button, Form } from "react-bootstrap";
import style from "./AddProductModal.module.scss"
import { IProduct } from "../../../types/types";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";

export interface IFormEditProduct{
    name: string;
    description: string;
    image: string;
    price: string;
    brand: string;
    color: string;
    ram: string;
    isStock: boolean
}

const AddProductModal: FC<{setModal: (option: string) => void, setProduct: (product: IProduct | null) => void, product: IProduct | null}> = ({setModal, setProduct, product}) => {
  
  const {register,  handleSubmit} = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      image: product?.image || "",
      price: product ? product.price + "" : "",
      brand: product?.brand || "",
      color: product?.color || "",
      ram: product ? product.ram + "" : "",
      isStock: product?.isStock || false
    }
  })


  const closeModal = () => {
    setModal("")
    setProduct(null)
  }

  const sendProduct = (data: IFormEditProduct) => {
    console.log(data)
  }
  
  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <button className={style.close} onClick={() => closeModal()}>
          <IoClose />
        </button>
        <div className={style.title}>Describe the product</div>
        <Form onSubmit={handleSubmit(sendProduct)}>
          <Form.Group className={style.item}>
            <Form.Label>Name: </Form.Label>
            <Form.Control  type="text" {...register("name")}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Description: </Form.Label>
            <Form.Control type="text"  {...register("description")}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Image: </Form.Label>
            <Form.Control type="text" {...register("image")}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Price: </Form.Label>
            <Form.Control type="text" {...register("price")}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Brand: </Form.Label>
            <Form.Control type="text" {...register("brand")}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Color: </Form.Label>
            <Form.Control type="text" {...register("color")}/>
          </Form.Group>
          <Form.Group className={style.item} controlId="exampleForm.ControlInput1">
            <Form.Label>RAM: </Form.Label>
            <Form.Control type="text" {...register("ram")}/>
          </Form.Group>
          <Form.Group >
            <Form.Check
              className={style.checkbox}
              type="checkbox"
              label="Availability"
              {...register("isStock")}
              onChange={(e) => console.log(e.target.checked)}
              />
          </Form.Group>
          <Button type="submit" className={style.btn}>Add product</Button>
        </Form>
      </div>
    </div>
  )
};

export default AddProductModal;

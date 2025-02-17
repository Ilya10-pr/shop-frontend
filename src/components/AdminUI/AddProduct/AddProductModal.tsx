import React, { FC, useState } from "react"
import { Button, Form } from "react-bootstrap";
import style from "./AddProductModal.module.scss"
import { IProduct } from "../../../types/types";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/store";
import { createProductThunk, updateProductThunk } from "../../../store/product/productsThunk";
import toast from "react-hot-toast";

export interface IFormEditProduct{
    name: string;
    description: string;
    image: string;
    price: number;
    brand: string;
    color: string;
    ram: number;
    isStock: boolean
}

const AddProductModal: FC<{setModal: (option: string) => void, setProduct: (product: IProduct | null) => void, product: IProduct | null}> = ({setModal, setProduct, product}) => {

  const dispatch = useAppDispatch()
  
  const {register,  handleSubmit} = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      image: product?.image || "",
      price: product?.price || 0,
      brand: product?.brand || "",
      color: product?.color || "",
      ram: product?.ram || 0,
      isStock: product?.isStock || false
    }
  })


  const closeModal = () => {
    setModal("")
    setProduct(null)
  }

  const sendProduct = async (data: IFormEditProduct) => {
    const productData ={
      ...data,
      price: Number(data.price),
      ram: Number(data.ram)
    }
    if(product){ 
      console.log(product)
      const productId = product._id
      const response = await dispatch(updateProductThunk({productData, productId})).unwrap()
      if(response){
        setModal("")
        toast.success("Product was successfully update");
        return
      }
      toast.error("Error! Product wasn`t update, try again later.");
      return
    }
    const response = await dispatch(createProductThunk(productData)).unwrap()
    if(response){
      setModal("")
      toast.success("Product was successfully add");
      return
    }
    toast.error("Error! Product wasn`t add, try again later.");
    return
    
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
            <Form.Control  type="text" {...register("name", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Description: </Form.Label>
            <Form.Control type="text"  {...register("description", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Image: </Form.Label>
            <Form.Control type="text" {...register("image", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Price: </Form.Label>
            <Form.Control type="number" {...register("price", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Brand: </Form.Label>
            <Form.Control type="text" {...register("brand", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>Color: </Form.Label>
            <Form.Control type="text" {...register("color", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item} controlId="exampleForm.ControlInput1">
            <Form.Label>RAM: </Form.Label>
            <Form.Control type="number" {...register("ram", { required: true })}/>
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

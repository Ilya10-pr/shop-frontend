import React, { FC, useState } from "react"
import { Button, Form } from "react-bootstrap";
import style from "./AddProductModal.module.scss"
import { IProduct } from "../../../types/types";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/store";
import { createProductThunk, updateProductThunk } from "../../../store/product/productsThunk";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

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
  const {t, i18n} = useTranslation()
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
    const response = await dispatch(createProductThunk(productData)).unwrap()
    const error = i18n.language === "ru" ? "Ошибка! Попробуйте позже." : "Error! Try again later."
    if(product){ 
      console.log(product)
      const productId = product._id
      const response = await dispatch(updateProductThunk({productData, productId})).unwrap()
      if(response){
        setModal("")
        toast.success("Successfully.");
        return
      }
      toast.error("Error! Try again later.");
      return
    }

    if(response){
      setModal("")
      const success = i18n.language === "ru" ? "Успешно" : "Successfully"
      toast.success(success);
      return
    }
    toast.error(error);
    return
    
  }
  
  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <button className={style.close} onClick={() => closeModal()}>
          <IoClose />
        </button>
        <div className={style.title}>{t("Describe")}</div>
        <Form onSubmit={handleSubmit(sendProduct)}>
          <Form.Group className={style.item}>
            <Form.Label>{t("NameProduct")}</Form.Label>
            <Form.Control  type="text" {...register("name", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>{t("Description")}</Form.Label>
            <Form.Control type="text"  {...register("description", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>{t("Image")}</Form.Label>
            <Form.Control type="text" {...register("image", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>{t("Price")}</Form.Label>
            <Form.Control type="number" {...register("price", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>{t("Brand")}</Form.Label>
            <Form.Control type="text" {...register("brand", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item}>
            <Form.Label>{t("Color")}</Form.Label>
            <Form.Control type="text" {...register("color", { required: true })}/>
          </Form.Group>
          <Form.Group className={style.item} controlId="exampleForm.ControlInput1">
            <Form.Label>{t("RAM")}</Form.Label>
            <Form.Control type="number" {...register("ram", { required: true })}/>
          </Form.Group>
          <Form.Group >
            <Form.Check
              className={style.checkbox}
              type="checkbox"
              label={t("Availability")}
              {...register("isStock")}
              onChange={(e) => console.log(e.target.checked)}
              />
          </Form.Group>
          <Button type="submit" className={style.btn}>{t("Add")}</Button>
        </Form>
      </div>
    </div>
  )
};

export default AddProductModal;

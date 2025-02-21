import {FC} from "react"
import { IFormRegister } from "../../types/types";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Stack from 'react-bootstrap/Stack';
import style from "./Register.module.scss"
import { useAppDispatch } from "../../store/store";
import { registerUserThunk } from "../../store/auth/authThunk";
import { useTranslation } from "react-i18next";


const Register: FC = () => {
  const {t} = useTranslation()
  const {
    register,
    handleSubmit,
  } = useForm<IFormRegister>()
  const dispatch = useAppDispatch()

  
  const onSubmit = (dataUser: IFormRegister) => {
    dispatch(registerUserThunk(dataUser))
  };

  return (

    <Stack className={style.register}>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>{t("Name")}</Form.Label>
          <Form.Control type="text" placeholder={t("Name")} {...register("firstName", { required: true })}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupSurname">
          <Form.Label>{t("Surname")}</Form.Label>
          <Form.Control type="text" placeholder={t("Surname")} {...register("lastName", { required: true })}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>{t("Email")}</Form.Label>
          <Form.Control type="email" placeholder={t("Email")} {...register("email", { required: true })}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control type="password" placeholder={t("Password")}{...register("password", { required: true })}/>
        </Form.Group>
        <Button variant="primary" type="submit" className={style.btn}>
          {t("Registration")}
        </Button>
      </Form>
    </Stack>
  )
}
export default Register;



import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useForm } from 'react-hook-form';
import style from "./AmountUser.module.scss"
import { useAppDispatch } from '../../store/store';
import { updateAmountUserThunk } from '../../store/auth/authThunk';
import { Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


export interface IAmount{
  amount: number
}

const AmountUser = () => {
  const {t} = useTranslation()

  const {
    register,
    handleSubmit,
  } = useForm<IAmount>()

  const dispatch = useAppDispatch()


  const deposit = async (data: IAmount) => {
    const response = await dispatch(updateAmountUserThunk(data))
    if(response.payload) {
      return toast.success("Balance replenished")
    }
    return toast.error("Couldn't top up")

  };
  return (
    <Stack className={style.cartAmount}>
      <Form onSubmit={handleSubmit(deposit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>{t("EnterDeposit")}</Form.Label>
          <Form.Control type="text" placeholder={t("EnterDeposit")} {...register("amount", { required: true })}/>
        </Form.Group>
        <Button variant="primary" type="submit" className={style.btn}>
          {t("Deposit")}
        </Button>
      </Form>
    </Stack>
    
  );
}

export default AmountUser;

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useForm } from 'react-hook-form';
import style from "./AmountUser.module.scss"
import { useAppDispatch } from '../../store/store';
import { updateUserThunk } from '../../store/auth/authThunk';
import { Stack } from 'react-bootstrap';


export interface IAmount{
  amount: number
}

const AmountUser = () => {

  const {
    register,
    handleSubmit,
  } = useForm<IAmount>()

  const dispatch = useAppDispatch()


  const deposit = (data: IAmount) => {
    dispatch(updateUserThunk(data))

  };
  return (
    <Stack className={style.cartAmount}>
      <Form onSubmit={handleSubmit(deposit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Enter amount</Form.Label>
          <Form.Control type="text" placeholder="amount" {...register("amount", { required: true })}/>
        </Form.Group>
        <Button variant="primary" type="submit" className={style.btn}>
          Deposit
        </Button>
      </Form>
    </Stack>
    
  );
}

export default AmountUser;

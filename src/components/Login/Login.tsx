import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useForm } from 'react-hook-form';
import { IFormLogin } from '../../types/types';
import Stack from 'react-bootstrap/Stack';
import style from "./Login.module.scss"
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { loginUserThunk } from '../../store/authThunk';


const Login = () => {

  const {
    register,
    handleSubmit,
  } = useForm<IFormLogin>()

  const dispatch = useAppDispatch()


  const logIn = (data: IFormLogin) => {
    dispatch(loginUserThunk(data))

  };
  return (
    <Stack className={style.login}>
      <Form onSubmit={handleSubmit(logIn)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password", { required: true })}/>
        </Form.Group>
        <Button variant="primary" type="submit" className={style.btn}>
          Log In
        </Button>
        <Nav.Link as={Link} to="/register">
          <Button variant="primary" className={style.btn}>
            Registration
          </Button>
        </Nav.Link>
      </Form>
    </Stack>
    
  );
}

export default Login;

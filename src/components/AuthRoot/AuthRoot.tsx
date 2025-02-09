import {FC} from "react"
import { useLocation } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";

const AuthRoot: FC = () => {
  const location = useLocation();
  
  return <div>
      {location.pathname === "/login" ? <Login /> : location.pathname === "/register" ? <Register /> : null}
    </div>
  
};

export default AuthRoot;

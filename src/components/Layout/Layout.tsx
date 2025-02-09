import NavBar from "../NavBar/NavBar";
import { ILayout } from "../../types/types";
import { useLocation } from "react-router-dom";
import AdminSideBar from "../AdminUI/AdminSideBar";

const Layout = ({children}: ILayout) => {

  const location = useLocation();
  
  return (
      location.pathname === "/login" || location.pathname === "/register" ? 
        <>
          <NavBar />
          {children} 
        </> 
       :
        <>
          <NavBar />
          <AdminSideBar />
          {children}
        </>
       
      )
};

export default Layout;

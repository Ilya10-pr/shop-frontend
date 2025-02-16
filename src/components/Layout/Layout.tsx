import NavBar from "../NavBar/NavBar";
import { ILayout } from "../../types/types";
import { useLocation } from "react-router-dom";
import AdminSideBar from "../AdminUI/AdminSideBar";
import { Toaster } from "react-hot-toast";

const Layout = ({children}: ILayout) => {

  const location = useLocation();
  
  return (
      location.pathname === "/login" || location.pathname === "/register" ? 
        <>
          <NavBar />
          <Toaster />
          {children} 
        </> 
       :
        <>
          <NavBar />
          <AdminSideBar />
          <Toaster />
          {children}
        </>
       
      )
};

export default Layout;

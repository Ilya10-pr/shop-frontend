import {FC} from "react";
import { NavLink } from "react-router-dom";


const Sidebar: FC = () => {


  return (
    <div>
      <div>
        <NavLink to="/smartphones">Smartphones</NavLink>
        <NavLink to="/laptops">Laptops</NavLink>
        <NavLink to="/tablets">Tablets</NavLink>
        <NavLink to="/mens-watches">Mens-watches</NavLink>
        <NavLink to="/mobile-accessories">Accessories</NavLink>
      </div>
    </div>
  )
};

export default Sidebar;

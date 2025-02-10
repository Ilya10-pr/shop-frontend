import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import ProductItem from "./components/ProductList/ProductItems";
import About from "./components/About/About";
import AuthRoot from "./components/AuthRoot/AuthRoot";
import Layout from "./components/Layout/Layout";
import ProductsCategory from "./components/ProductsCategory/ProductsCategory";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import { useAppDispatch } from "./store/store";
import { authMeThunk } from "./store/auth/authThunk";
import Product from "./components/Product/Product";




const App: FC = () => {

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(authMeThunk())
  })

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tablets" element={<ProductsCategory />} />
        <Route path="/mens-watches" element={<ProductsCategory />} />
        <Route path="/accessories" element={<ProductsCategory />} />
        <Route path="/laptops" element={<ProductsCategory />} />
        <Route path="/smartphones" element={<ProductsCategory />} />
        <Route path="/products" element={<ProductItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<AuthRoot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </Layout>
  )
}

export default App

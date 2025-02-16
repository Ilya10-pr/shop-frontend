import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CartContainer from "./components/Cart/CartContainer";
import ProductItem from "./components/ProductList/ProductItems";
import About from "./components/About/About";
import AuthRoot from "./components/AuthRoot/AuthRoot";
import Layout from "./components/Layout/Layout";
import ProductsCategory from "./components/ProductsCategory/ProductsCategory";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import {useAppDispatch } from "./store/store";
import { authMeThunk } from "./store/auth/authThunk";
import ProductContainer from "./components/Product/ProductContainer";
import AmountUser from "./components/AmountUser/AmountUser";




const App = () => {

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(authMeThunk())
  })

  return (
    <Layout>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apple" element={<ProductsCategory />} />
        <Route path="/xiaomi" element={<ProductsCategory />} />
        <Route path="/samsung" element={<ProductsCategory />} />
        <Route path="/honor" element={<ProductsCategory />} />
        <Route path="/huawei" element={<ProductsCategory />} />
        <Route path="/products" element={<ProductItem />} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<AuthRoot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductContainer />} />
        <Route path="/amount" element={<AmountUser />} />
      </Routes>
    </Layout>
  )
}

export default App

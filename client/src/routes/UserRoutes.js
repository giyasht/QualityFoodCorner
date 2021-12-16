import React from 'react'
import { Route } from 'react-router-dom';

import Home from '../layouts/HomePage/Home';
import SignUp from '../layouts/SignUpPage/SignUp';
import Signin from '../layouts/SignInPage/Signin';
import Developers from '../layouts/Developers/Developers';
import Menu from '../layouts/MenuPage/Menu';
import SearchPage from '../layouts/SearchPage/SearchPage';
import MyCart from '../layouts/MyCartPage/MyCart';
import Error404 from '../components/Error404/Error404';
import DisplayProductOnSearch from '../layouts/SearchPage/DisplayProductOnSearch';

const UserRoutes = [

    // Home
    <Route exact path='/' element={<Home />} key="home" />,

    // SignUp
    <Route exact path='/signup' element={<SignUp />} key="signup" />,

    // SignIn
    <Route exact path='/signin' element={<Signin />} key="signin" />,

    // Developers
    <Route exact path='/developers' element={<Developers />} key="developers" />,

    // Menu
    <Route exact path="/menu/:category" element={<Menu />} key="menu" />,

    // Search Product
    <Route exact path="/menu/search" element={<SearchPage />} key="search" />,
    <Route exact path="/product/:productName" element={<DisplayProductOnSearch />} key="search" />,

    // MyCart
    <Route exact path='/mycart' element={<MyCart />} key="mycart" />,

    // Error 404
    <Route exact path='*' element={<Error404 />} key="error404" />,


];

export default UserRoutes;
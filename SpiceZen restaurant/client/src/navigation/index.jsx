import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Header} from "../components/MyApp/Header.jsx";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Menu} from "../pages/Menu";
import {Order} from "../pages/Order";
import {Register} from "../pages/Register";
import {DishControl} from "../pages/DishControl";
import {OrderControl} from "../pages/OrderControl";
import {Success} from "../pages/Success";
import {useSelector} from "react-redux";
import {cartDishes} from "../stores/cart/cartSlice";
import {ProtectedRoute} from "../components/ProtectedRoutes/ProtectedRoute";
import {ProtectedRouteAdmin} from "../components/ProtectedRoutes/ProtectedRouteAdmin";
import {ProtectedRouteAuthorized} from "../components/ProtectedRoutes/ProtectedRouteAuthorized";
import {ProtectedRouteNotForAdmin} from "../components/ProtectedRoutes/ProtectedRouteNotForAdmin";
import {UserAuthContextProvider} from "../context/UserAuthContext";

const Navigation = () => {
    const dishesInCart = useSelector(cartDishes);

    return (
        <BrowserRouter>
            <UserAuthContextProvider>
                <Header cartCount={dishesInCart ? dishesInCart.length : 0}/>
                <Routes>
                    {/* ALL USERS*/}
                    <Route path='/home' element={<Home/>}/>

                    {/* CHECK*/}
                    <Route path='/login' element={
                        <ProtectedRouteAuthorized>
                            <Login/>
                        </ProtectedRouteAuthorized>
                    }/>
                    <Route path='/register' element={
                        <ProtectedRouteAuthorized>
                            <Register/>
                        </ProtectedRouteAuthorized>
                    }/>

                    {/*NOT FOR ADMIN*/}
                    <Route path='/menu' element={
                        <ProtectedRouteNotForAdmin>
                            <Menu/>
                        </ProtectedRouteNotForAdmin>
                    }/>

                    {/*AUTHORIZED USERS*/}
                    <Route path='/pre-order' element={
                        <ProtectedRoute>
                            <Order/>
                        </ProtectedRoute>
                    }/>

                    <Route path='/booking-success' element={
                        <ProtectedRoute>
                            <Success/>
                        </ProtectedRoute>
                    }/>

                    {/*ADMIN*/}
                    <Route path='/dish-control' element={
                        <ProtectedRouteAdmin>
                            <DishControl/>
                        </ProtectedRouteAdmin>
                    }/>
                    <Route path='/order-control' element={
                        <ProtectedRouteAdmin>
                            <OrderControl/>
                        </ProtectedRouteAdmin>
                    }/>

                    <Route path="*" element={<Navigate to="/home" replace/>}/>
                </Routes>
            </UserAuthContextProvider>
        </BrowserRouter>
    )
}

export default Navigation;

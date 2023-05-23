import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../assets/styles/menuPreview.css";

import {MenuPreviewCard} from "./MenuPreviewCard";
import {addToCart} from "../../stores/cart/cartSlice";

export const MenuPreview = () => {
    const [dishes, setMenu] = useState([]);
    const dispatch = useDispatch();

    const responsive = {
        superLargeDesktop: {breakpoint: {max: 4000, min: 3000}, items: 5},
        desktop: {breakpoint: {max: 3000, min: 1024}, items: 3},
        tablet: {breakpoint: {max: 1024, min: 464}, items: 2},
        mobile: {breakpoint: {max: 464, min: 0}, items: 1}
    };

    useEffect(() => {
        fetch('https://localhost:5000/api/dishes')
            .then(response => response.json())
            .then(data => setMenu(data?.data))
            .catch(e => console.log(e))
    }, [])

    const onAddDish = (dish) => {
        dispatch(addToCart(dish))
    }

    return (
        <div className="menuPreview">
            <Carousel className="carousel" responsive={responsive}>
                {
                    dishes.length > 0 && dishes.map((dish, index) => {
                        return (
                            <MenuPreviewCard key={index} dish={dish} onAddDish={onAddDish}/>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}
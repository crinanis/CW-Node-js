import React from 'react';
import Button from '../elements/Button';
import {useNavigate} from "react-router";

export const Body = () => {
    const navigate = useNavigate();
    const handleBook = () => {
        try {
            navigate("/menu");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="banner">
            <div className="banner-description col-md-5">
                <p className="best">
                    The Best </p>
                <p className="deli">
                    Delicious Food </p>
                <p className="needs">
                    that meets your needs </p>
                <div className="btn-container">
                    <Button className="button-56" onClick={handleBook}>Order Now!</Button>

                </div>
            </div>
            <div className="banner-image">
                <img src={require("../../assets/images/rame-removebg.png")} alt="banner" className="img-fluid"/>
            </div>
        </div>
    )
}

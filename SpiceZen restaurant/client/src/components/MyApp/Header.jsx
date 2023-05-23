import React from "react";
import {Link} from "react-router-dom";
import logoIcon from "../../assets/images/ramen.png";
import "../../assets/styles/navbar.css";
import {useUserAuth} from "../../context/UserAuthContext";
import Button from "../elements/Button";
import {useNavigate} from "react-router";

export const Header = ({cartCount}) => {
    const {logOut, user} = useUserAuth();
    const navigate = useNavigate();
    let mail="";
    if(user){
        mail=user.email
    }
    console.log(mail);
    console.log(typeof(mail));

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg custom shadow p-3 mb-5 rounded">
            <Link to="/home" className="navbar-brand" href="#">
                <div style={{display: "flex", alignItems: "center"}}>
                    <img
                        src={logoIcon}
                        height="50"
                        alt="MDB Logo"
                        loading="lazy"
                        align="center"
                    />
                    <p className="title" style={{margin: "0 0 0 30px"}}>
                        SPICE ZEN
                    </p>
                </div>
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-lg-auto">
                    {user && user.email!== "kusssyd@gmail.com" &&  (
                        <>
                            <li className="nav-item">
                                <Link to="/menu" className="nav-link">
                                    Menu
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div className="carts">
                                    <Link to="/pre-order" className="nav-link">
                                        Pre-Order
                                    </Link>
                                    {cartCount > 0 ? <span className="cart-count">{cartCount}</span> : <span/>}
                                </div>
                            </li>
                            <li className="other-nav-item">
                                <Button className="btn-1" onClick={handleLogout}>
                                    Log out
                                </Button>
                            </li>
                        </>
                    )}

                    {!user && (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}

                    {user && user.email === "kusssyd@gmail.com" && (
                        <>
                            <li className="nav-item">
                                <Link to="/dish-control" className="nav-link">
                                    Dish Control
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/order-control" className="nav-link">
                                    Order Control
                                </Link>
                            </li>
                            <li className="other-nav-item">
                                <Button className="btn-1" onClick={handleLogout}>
                                    Log out
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

import {useSelector, useDispatch} from "react-redux";
import {clearInfo, getInfo} from "../../stores/order-info/infoSlice";
import {cartDishes, clearCart} from "../../stores/cart/cartSlice";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import Button from "../elements/Button"
import {useUserAuth} from "../../context/UserAuthContext";

import "../../assets/styles/confirmation.css"

export const Confirmation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cart = useSelector(cartDishes);
    const info = useSelector(getInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useUserAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const keys = Object.keys(info);
        const length = keys.length;

        if (!cart?.length && length !== 4) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('https://localhost:5000/api/create-booking', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    chosenDishes: cart,
                    userId: user.email.split("@")[0],
                    info: info
                })
            });

            const data = await response.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            navigate('/booking-success');
            dispatch(clearInfo());
            dispatch(clearCart());
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container2">
                <h2>Confirm booking?</h2>
                <div>
                    <Button className="button-56" type="submit" disabled={loading}>
                        {
                            loading ?
                                'Loading...' :
                                'Book Now'
                        }
                    </Button>
                </div>
            </div>
        </form>
    )
}


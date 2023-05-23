import { useSelector } from "react-redux";
import { cartDishes } from "../../stores/cart/cartSlice";
import { DishesSummaryCard } from "./DishesSummaryCard";

export const DishesSummary = () => {
    const cart = useSelector(cartDishes);

    return (
        <div className="dishes-summary">
            {cart.map((dish, index) => (
                <DishesSummaryCard dish={dish} key={index} />
            ))}
        </div>
    );
};

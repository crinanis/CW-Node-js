import {useDispatch} from "react-redux";
import {incrementDishAmount, decrementDishAmount} from "../../stores/cart/cartSlice";

export const DishesSummaryCard = ({dish}) => {
    const dispatch = useDispatch();

    return (
        <div className="dishes-summary-card">
            <div className="product-image">
                <img src={dish.dishImage} alt={dish.dishName}/>
            </div>
            <div className="product-info">
                <h3>{dish.dishName}</h3>
                <p className="dishText">{dish.dishDescription}</p>
            </div>
            <div>
                <div className="product-price">{`${(dish.dishPrice * dish.amount).toFixed(1)}руб`}</div>
                <div className="product-price">{`${(dish.dishWeight * dish.amount).toFixed(1)}гр`}</div>
                <div className="quantity">
                    <button
                        disabled={dish.amount <= 0}
                        onClick={() => dispatch(decrementDishAmount({
                            ...dish, amount: dish.amount - 1
                        }))}
                    >
                        -
                    </button>
                    <span>{dish.amount}</span>
                    <button onClick={() => dispatch(incrementDishAmount({
                        ...dish, amount: dish.amount + 1
                    }))}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

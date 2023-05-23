import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice.js";
import dishReducer from "./menu/dishesSlice.js";
import infoReducer from "./order-info/infoSlice";

const rootReducer = combineReducers(
    {
        cart: cartReducer,
        dishes: dishReducer,
        info:  infoReducer
    }
);

export default rootReducer;
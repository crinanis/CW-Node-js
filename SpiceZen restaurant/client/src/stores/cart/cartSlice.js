import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dishes: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingDishIndex = state.dishes.findIndex((dish) => dish._id === action.payload._id);
            if (existingDishIndex !== -1) {
                const existingDish = state.dishes[existingDishIndex];
                const updatedDish = {
                    ...existingDish,
                    amount: existingDish.amount + 1,
                };
                state.dishes[existingDishIndex] = updatedDish;
            } else {
                state.dishes.push({ ...action.payload, amount: 1 });
            }
        },
        clearCart: (state) => {
            state.dishes = [];
        },
        incrementDishAmount: (state, action) => {
            const existingDishIndex = state.dishes.findIndex((dish) => dish._id === action.payload._id);
            if (existingDishIndex !== -1) {
                const existingDish = state.dishes[existingDishIndex];
                const updatedDish = {
                    ...existingDish,
                    amount: existingDish.amount + 1,
                };
                state.dishes[existingDishIndex] = updatedDish;
            }
        },
        decrementDishAmount: (state, action) => {
            const existingDishIndex = state.dishes.findIndex((dish) => dish._id === action.payload._id);
            if (existingDishIndex !== -1) {
                const existingDish = state.dishes[existingDishIndex];
                if (existingDish.amount > 0) {
                    const updatedDish = {
                        ...existingDish,
                        amount: existingDish.amount - 1,
                    };
                    state.dishes[existingDishIndex] = updatedDish;
                }
                if (existingDish.amount === 0) {
                    state.dishes.splice(existingDishIndex, 1); // Удаляем товар из массива, если его количество становится 0
                }
            }
        },
    },
});
export const cartDishes = (state) => state.cart.dishes;
console.log(cartDishes)
export const {
    addToCart,
    clearCart,
    incrementDishAmount,
    decrementDishAmount,
} = cartSlice.actions;
export default cartSlice.reducer;

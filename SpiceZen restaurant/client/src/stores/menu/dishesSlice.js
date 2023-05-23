import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    dishes: [],
    error: null,
    status: 'idle',
}

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDishes.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.dishes = [...action.payload.data]
        });
        builder.addCase(fetchDishes.pending, (state, action) => {
            state.status = 'pending'
        })
    }
})

export const { getProducts: getDishes } = dishesSlice.actions

export default dishesSlice.reducer

export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async () => {
    const response = await fetch('https://localhost:5000/api/dishes-by-category')
    const data = await response.json()
    return data
})

export const selectAllDishes = state => state.dishes
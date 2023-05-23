import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: {}
}

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo: (state, action) => {
            return  {info: action.payload }
        },
        clearInfo: (state) => {
            return { info: {}}
        }
    }
})

export const getInfo = state => state.info.info

export const { setInfo, clearInfo } = infoSlice.actions

export default infoSlice.reducer
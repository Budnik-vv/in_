import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INews} from "../../models/INews";

interface News {
    news: INews[]
}

const initialState: News = {
    news: []
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        set(state, action: PayloadAction<INews[]>) {
            return {
                ...state,
                news: action.payload
            }
        }
    }
})

export default newsSlice.reducer;

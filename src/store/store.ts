import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {newsAPI} from "../services/NewsService";
import {useDispatch} from "react-redux";
import commentReducer from "./reducers/CommentSlice";
import newsReducer from "./reducers/NewsSlice";


const rootReducer = combineReducers({
    [newsAPI.reducerPath]: newsAPI.reducer,
    commentReducer,
    newsReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(newsAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useTypedDispatch = () => useDispatch<AppDispatch>();

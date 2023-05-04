import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "entities/movie/model";
import { userReducer } from "entities/user/model";
import { movieFavoriteReducer } from "entities/movei-favorite/model"
import { categoryReducer } from "entities/category/model";

const rootReducers = combineReducers({
    movieReducer,
    userReducer,
    movieFavoriteReducer,
    categoryReducer

})

export const store = configureStore({
    reducer: rootReducers,
       
})



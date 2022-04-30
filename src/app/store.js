import {configureStore} from '@reduxjs/toolkit'

import recipiesSlice from './recipeSlice';
import searchSlice from "./searchSlice"

const store = configureStore({
  reducer: {

    meals: recipiesSlice.reducer,
    search: searchSlice.reducer
  }
})
export default store;
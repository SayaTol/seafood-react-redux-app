import {configureStore} from '@reduxjs/toolkit'

import recipiesSlice from '../components/recipeSlice';

const store = configureStore({
  reducer: {

    meals: recipiesSlice.reducer
  }
})
export default store;
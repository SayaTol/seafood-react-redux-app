import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"




export const callAPI = createAsyncThunk(
  'recipes/callAPI',
  async () => {
    try {

      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
      const data = await response.json()
      console.log(data, "this is filter")
      return data.meals

    }

    catch (err) {

      console.log(err, "api is not correct ")
    }

  }
)





const recipiesSlice = createSlice({
  name: 'meals',
  initialState: {
    recipes: [],

    status: null,
    error: null,
  },

  reducers: {},
  extraReducers: {
    [callAPI.pending]: (state) => {
      state.status = "loading";
      state.error = null
    },
    [callAPI.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.recipes = action.payload;


    },
    [callAPI.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload
    },

  },

})


export const actions = recipiesSlice.actions
export default recipiesSlice
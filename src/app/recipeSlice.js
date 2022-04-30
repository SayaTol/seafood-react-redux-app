import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"


export const callAPI = createAsyncThunk(
  'api/recipies',
  async (obj, {state, error}) => {
    try {
      const req = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
      const res = await req.json()
      return res.meals
      //
    } catch (err) {
      console.log(err)
      return []
    }
  }
)

const recipiesSlice = createSlice({
  name: 'meals',
  initialState: [],
  reducers: {},
  extraReducers: {
    [callAPI.pending]: (state, action) => {
      return []
    },
    [callAPI.fulfilled]: (state, action) => {
      return action.payload;
    },
    [callAPI.rejected]: (state, action) => {
      return []
    },
  },
})


export const actions = recipiesSlice.actions
export default recipiesSlice
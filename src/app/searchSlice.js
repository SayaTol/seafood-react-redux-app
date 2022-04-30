import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"




export const callAPI2 = createAsyncThunk(
  'search/callAPI2',
  async (recipeSearch) => {
    try {
      if (recipeSearch === "") {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        const data = await response.json()
        console.log(data, "eto filter")
        return data.meals

      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ recipeSearch }`)

        const data = await response.json()
        console.log(data, "this is search")
        return data.meals
      }

      
    } catch (err) {

      console.log(err, "api is not correct ")
    }
  }
)





const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchData: [],

    status: null,
    error: null,
  },

  reducers: {},
  extraReducers: {
    [callAPI2.pending]: (state) => {
      state.status = "loading";
      state.error = null
    },
    [callAPI2.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.searchData = action.payload;
    },
    [callAPI2.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload
    },

  },

})


export const actions = searchSlice.actions
export default searchSlice
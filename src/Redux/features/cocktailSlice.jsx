import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchCocktails",
  async () => {
    try {
      const { data } = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s"
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCocktailByName = createAsyncThunk(
  "cocktails/fetchCocktailByName",
  async ({ keyword }) => {
    try {
      const { data } = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCocktailById = createAsyncThunk(
  "cocktail/fetchCocktailById", // Corrected action type string
  async ({ id }) => {
    try {
      const { data } = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState: {
    loading: false,
    cocktails: [],
    error: null,
    cocktail: [],
  },
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCocktails.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
    },
    [fetchCocktails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchCocktailById.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCocktailById.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktail = action.payload.drinks;
    },
    [fetchCocktailById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchCocktailByName.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCocktailByName.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
    },
    [fetchCocktailByName.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default cocktailSlice.reducer;

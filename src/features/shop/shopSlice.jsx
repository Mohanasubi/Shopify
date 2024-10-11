import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalProducts: 0,
  showingProducts: 0,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    setShowingProducts: (state, action) => {
      state.showingProducts = action.payload;
    },
  },
});

export const { setTotalProducts, setShowingProducts } = shopSlice.actions;

export default shopSlice.reducer;

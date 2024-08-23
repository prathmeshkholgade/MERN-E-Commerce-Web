import { createSlice } from "@reduxjs/toolkit";

const checkOutSlice = createSlice({
  name: "checkout",
  initialState: {
    Products: [],
  },
  reducers: {
    setCheckOutProducts: (state, action) => {
      console.log(action);
      state.Products = action.payload;
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      console.log(productId);
      console.log(quantity);
      const product = state.Products.find((p) => p.product._id === productId);

      if (product) {
        product.quantity = quantity;
        console.log("Updated Product:", product);
      }
    },
  },
});
export const { setCheckOutProducts, updateProductQuantity } =
  checkOutSlice.actions;
export default checkOutSlice.reducer;

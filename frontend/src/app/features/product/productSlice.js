import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserData } from "../user/userSlice";
const productUrl = import.meta.env.VITE_Product;
const reviewUrl = import.meta.env.VITE_REVIEW;
const cartURL = import.meta.env.VITE_CART;

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchsingleproduct",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${productUrl}/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data.product;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const addReview = createAsyncThunk(
  "product/addReview",
  async ({ id, data }, thunkAPI) => {
    try {
      console.log(data);
      const res = await axios.post(`${reviewUrl}/${id}`, data, {
        withCredentials: true,
      });
      thunkAPI.dispatch(fetchSingleProduct(id));
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async ({ productId, reviewId }, thunkAPI) => {
    try {
      console.log(reviewId);
      const res = await axios.delete(`${reviewUrl}/${productId}/${reviewId}`, {
        withCredentials: true,
      });
      thunkAPI.dispatch(fetchSingleProduct(productId));
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const allProducts = createAsyncThunk(
  "product/allProduct",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(`${productUrl}`, data, {
        withCredentials: true,
      });
      return res.data.products;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/create",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${productUrl}/add`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const addToCart = createAsyncThunk(
  "product/addtocart",
  async ({ id, quantity }, thunkAPI) => {
    try {
      console.log(quantity);
      const res = await axios.post(
        `${cartURL}/${id}`,
        { quantity: quantity },
        {
          withCredentials: true,
        }
      );
      thunkAPI.dispatch(getUserData());
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const updateCartQuantity = createAsyncThunk(
  "product/updateCartQuantity",
  async ({ id, quantity }, thunkAPI) => {
    try {
      console.log(quantity);
      const res = await axios.put(
        `${cartURL}/${id}`,
        { quantity: quantity },
        {
          withCredentials: true,
        }
      );
      thunkAPI.dispatch(getUserData());
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "product/deleteFromCart",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${cartURL}/${id}`, {
        withCredentials: true,
      });
      thunkAPI.dispatch(getUserData());
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const similarProduct = createAsyncThunk(
  "product/similarProduct",
  async ({ id, category }, thunkAPI) => {
    try {
      const res = await axios.get(`${productUrl}/similar/${id}/${category}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const searchProducts = createAsyncThunk(
  "product/searchProduct",
  async (search, thunkAPI) => {
    try {
      const res = await axios.get(`${productUrl}/search?q=${search}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const searchResults = createAsyncThunk(
  "product/searchResults",
  async (search, thunkAPI) => {
    try {
      const res = await axios.get(`${productUrl}/search?q=${search}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "Product",
  initialState: {
    Products: [],
    searchProducts: [],
    searchResults: [],
    Product: null,
    similarProduct: [],
    status: null,
    error: null,
  },
  reducers: {
    clearSearchResults: (state, action) => {
      state.searchProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        return action.payload;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.Products = action.payload;
        state.status = "success";
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      .addCase(allProducts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.Product = action.payload;
        state.status = "success";
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.error = action.error;
        state.status = "success";
      })
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(deleteFromCart.fulfilled, (state, actiom) => {
        state.status = "success";
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(similarProduct.fulfilled, (state, action) => {
        state.similarProduct = action.payload;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
      })
      .addCase(searchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});
export const { clearSearchResults } = productSlice.actions;
export default productSlice.reducer;

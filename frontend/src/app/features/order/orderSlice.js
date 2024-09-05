import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASEURL;
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ orderData }, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/payment/checkout`, orderData, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
export const handlePaymentVerification = createAsyncThunk(
  "order/handleVerification",
  async (paymentData, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/payment/verify`, paymentData, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const orderDetails = createAsyncThunk(
  "orders/details",
  async (userId, thunkAPI) => {
    try {
      console.log(userId);
      const res = await axios.get(`${baseUrl}/orders/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const totalOrder = createAsyncThunk(
  "orders/totalOrder",
  async (userId, thunkAPI) => {
    try {
      console.log(userId);
      const res = await axios.get(`${baseUrl}/orders`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "Order",
  initialState: {
    order: null,
    totalOrder: null,
    loading: false,
    error: null,
    paymentVerified: false,
    OrderInfo: null,
  },
  reducers: {
    addOrder: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      if (state.totalOrder) {
        const order = state.totalOrder?.orders.find(
          (order) => order._id === id
        );
        console.log(order);
        state.OrderInfo = order;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        // state.order = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(totalOrder.fulfilled, (state, action) => {
        state.totalOrder = action.payload;
      })
      .addCase(handlePaymentVerification.fulfilled, (state, action) => {
        state.paymentVerified = true;
        state.error = null;
      })
      .addCase(handlePaymentVerification.rejected, (state, action) => {
        state.paymentVerified = false;
        state.error = action.payload;
      });
  },
});
export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;

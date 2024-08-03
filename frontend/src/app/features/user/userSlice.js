import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const authUrl = import.meta.env.VITE_AUTH;

export const logInUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${authUrl}/login`, data, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const signUpUser = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${authUrl}/register`, data, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post(
      `${authUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
export const getUserData = createAsyncThunk(
  "user/getuser",
  async (thunkAPI) => {
    try {
      const res = await axios.get(`${authUrl}`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data.user;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
const userSlice = createSlice({
  name: "User",
  initialState: {
    User: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.fulfilled, (state, action) => {
        state.User = action.payload;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.User = null;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.User = action.payload;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.User = action.payload;
      });
  },
});

export default userSlice.reducer;

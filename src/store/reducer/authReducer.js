import { LOCAL_STORAGE } from "@/contants/localStorage";
import { authenService } from "@/service/authenService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { getCart } from "./cartReducer";
const initialState = {
  profile: null,
  listOrder: null,
};
export const { reducer: authReducer, actions: authActions } = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE.token);
      localStorage.removeItem(LOCAL_STORAGE.refreshToken);
      state.profile = null;
      message.success("Bạn đã đăng xuất thành công");
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setOrder: (state, action) => {
      state.listOrder = action.payload;
    },
  },
});

export const signin = createAsyncThunk(
  "auth/signin",
  async (payload, thunkAPI) => {
    try {
      const resSignin = await authenService.signin(payload);
      const { token, refreshToken } = resSignin?.data?.data || {};
      localStorage.setItem(LOCAL_STORAGE.token, token);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);
      const resProfile = await authenService.getProfile(token);
      thunkAPI.dispatch(setProfile(resProfile?.data?.data));
      thunkAPI.dispatch(getCart());

      return resProfile?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getProfile = createAsyncThunk(
  "auth/profile/get",
  async (token, thunkAPI) => {
    try {
      const dataProfile = await authenService.getProfile();
      thunkAPI.dispatch(setProfile(dataProfile?.data?.data));
      return dataProfile?.data?.data;
    } catch (error) {
      console.log("error", error);
      localStorage.removeItem(LOCAL_STORAGE.token);
      localStorage.removeItem(LOCAL_STORAGE.refreshToken);
      throw error;
    }
  }
);
export const { logout, setProfile } = authActions;

import { THUNK_STATUS } from "@/contants/general";
import checkoutService from "@/service/checkoutService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderInfo: {},
  checkoutStatus: THUNK_STATUS.fulfilled,
};
export const { reducer: orderReducer, actions: orderActions } = createSlice({
  initialState,
  name: "order",
  reducers: {},
  extraReducers: (builder) => {
    // Get order
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.orderInfo = action.payload;
    });
    // Checkout
    builder.addCase(checkout.pending, (state) => {
      state.checkoutStatus = THUNK_STATUS.pending;
    });
    builder.addCase(checkout.fulfilled, (state, action) => {
      state.checkoutStatus = THUNK_STATUS.fulfilled;
      state.orderInfo = action.payload;
    });
    builder.addCase(checkout.rejected, (state) => {
      state.checkoutStatus = THUNK_STATUS.rejected;
    });
  },
});

export const getOrder = createAsyncThunk(
  "order/get",
  async (payload, thunkAPI) => {
    try {
      const res = await checkoutService.getOrder();
      const orderInfo = { ...res?.data?.datas };
      thunkAPI.fulfillWithValue(orderInfo);
      return orderInfo;
    } catch (error) {
      console.log("error", error);
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  }
);
export const checkout = createAsyncThunk(
  "order/checkout",
  async (payload, thunkAPI) => {
    try {
      const res = await checkoutService.checkout(payload);
      const resCheckout = res?.data?.data;

      thunkAPI.fulfillWithValue(resCheckout);
      thunkAPI.dispatch(getOrder());
      return resCheckout;
    } catch (error) {}
    console.log("error", error);
    thunkAPI.rejectWithValue(error);
    throw error;
  }
);

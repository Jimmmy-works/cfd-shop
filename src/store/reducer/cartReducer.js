import { THUNK_STATUS } from "@/contants/general";
import { cartService } from "@/service/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartInfo: {},
  updateStatus: THUNK_STATUS.fulfilled,
  getStatus: THUNK_STATUS.fulfilled,
};
export const { reducer: cartReducer, actions: cartActions } = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
  // nhận vào builder => addCase xử lí các trường hợp dành cho asynThunk
  extraReducers: (builder) => {
    //getCart
    builder.addCase(getCart.pending, (state) => {
      state.getStatus = THUNK_STATUS.pending;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.getStatus = THUNK_STATUS.fulfilled;
      state.cartInfo = action.payload;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.getStatus = THUNK_STATUS.rejected;
      state.cartInfo = {};
    });
    // updateCart
    builder.addCase(updateCart.pending, (state) => {
      state.updateStatus = THUNK_STATUS.pending;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.updateStatus = THUNK_STATUS.fulfilled;
      state.cartInfo = action.payload;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.updateStatus = THUNK_STATUS.rejected;
    });
  },
});
// create async Thunk  with getCard

export const getCart = createAsyncThunk("cart/get", async (_, thunkAPI) => {
  try {
    const resCart = await cartService.getCart();
    const cartInfo = { ...resCart?.data?.data };
    // Logic tính toán subtotal,total
    const totalProduct = cartInfo?.quantity?.reduce(
      (accumulator, currentValue) => {
        return accumulator + Number(currentValue);
      },
      0
    );
    const subTotal = cartInfo?.quantity?.reduce(
      (accumulator, currentValue, currentIndex) => {
        return (
          accumulator +
          Number(currentValue) *
            Number(cartInfo?.product?.[currentIndex]?.price || 0)
        );
      },
      0
    );
    const total =
      subTotal +
      (cartInfo?.shipping?.price || 0) -
      (subTotal * (cartInfo?.discount || 0)) / 100;
    const modifierCartInfo = {
      ...cartInfo,
      totalProduct: [totalProduct.toString()],
      subTotal,
      total,
    };

    // trả value cho case fulfilled
    thunkAPI.fulfillWithValue(modifierCartInfo);
    return modifierCartInfo;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
    throw error;
  }
});

export const updateCart = createAsyncThunk(
  "cart/update",
  async (payload, thunkAPI) => {
    try {
      const resCart = await cartService.updateCart({
        ...payload,
        subTotal: 0,
        total: 0,
        totalProduct: ["string"],
        discount: 0,
        paymentMethod: "string",
      });
      const cartInfo = {
        ...resCart?.data?.data,
        totalProduct: resCart?.data?.data?.quantity?.reduce(
          (accumulator, currentValue) => {
            return accumulator + Number(currentValue);
          },
          0
        ),
      };
      thunkAPI.dispatch(getCart());
      thunkAPI.fulfillWithValue(cartInfo);
      return cartInfo;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  }
);

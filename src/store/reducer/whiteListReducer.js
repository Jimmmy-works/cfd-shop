import { THUNK_STATUS } from "@/contants/general";
import whiteListService from "@/service/whiteListService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  whiteListInfo: {},
  updateListInfo: {},
  addStatus: THUNK_STATUS.fulfilled,
};

export const { reducer: whiteListReducer, actions: whiteListActions } =
  createSlice({
    name: "whitelist",
    initialState,
    reducers: {
      setWhiteList: (state, action) => {
        state.whiteListInfo = action.payload;
      },
    },
    extraReducers: (builder) => {
      //addWhiteList
      builder.addCase(addWhiteList.pending, (state) => {
        state.addStatus = THUNK_STATUS.pending;
      });
      builder.addCase(addWhiteList.fulfilled, (state, action) => {
        state.addStatus = THUNK_STATUS.fulfilled;
        state.updateListInfo = action.payload;
      });
      builder.addCase(addWhiteList.rejected, (state) => {
        state.addStatus = THUNK_STATUS.rejected;
      });
    },
  });

export const addWhiteList = createAsyncThunk(
  "whitelist/post",
  async (payload, thunkAPI) => {
    try {
      const res = await whiteListService.addWhiteList(payload);
      thunkAPI.fulfillWithValue(res?.data);
      return res;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

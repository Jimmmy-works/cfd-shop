import blogService from "@/service/blogService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogTagInfo: {},
  blogInfo: {},
};
export const { reducer: blogReducer, actions: actionBlogs } = createSlice({
  name: "blog",
  reducers: {
    updateBlogTag: (state, action) => {
      state.blogTagInfo = action.payload;
    },
    clearBlogTag: (state) => {
      state.blogTagInfo = {};
    },
  },
  initialState,
});

export const getBlogTag = createAsyncThunk(
  "blog/tag/get",
  async (payload, thunkAPI) => {
    try {
      const res = await blogService.getBlogTagsBySlug(payload);
      thunkAPI.dispatch(actionBlogs.updateBlogTag(res?.data?.data));
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

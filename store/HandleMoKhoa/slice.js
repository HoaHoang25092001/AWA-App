import { createSlice } from "@reduxjs/toolkit";
import { fetchMoKhoa } from "./action";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
  successMessage: null, // Add success message state
};

const moKhoaSlice = createSlice({
  name: "moKhoa",
  initialState,
  reducers: {
    clearSuccessMessageMoKhoa: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoKhoa.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMoKhoa.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        state.successMessage = "Mở khóa thành công!";
      })
      .addCase(fetchMoKhoa.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
        state.successMessage = "Mở khóa thất bại!";
      });
  },
});

export const { clearSuccessMessageMoKhoa } = moKhoaSlice.actions;

export default moKhoaSlice.reducer;

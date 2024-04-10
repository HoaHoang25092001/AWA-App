import { createSlice } from "@reduxjs/toolkit";
import { fetchHuyChotSo } from "./action";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
  successMessage: null, // Add success message state
};

const huyChotSoSlice = createSlice({
  name: "huyChotSo",
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHuyChotSo.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchHuyChotSo.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        state.successMessage = "Thay đổi thành công!";
      })
      .addCase(fetchHuyChotSo.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
        state.successMessage = "Thay đổi thất bại!";
      });
  },
});

export const { clearSuccessMessage } = huyChotSoSlice.actions;

export default huyChotSoSlice.reducer;

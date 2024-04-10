import { createSlice } from "@reduxjs/toolkit";
import { fetchKhoaSo } from "./action";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
  successMessage: null, // Add success message state
};

const khoaSoSlice = createSlice({
  name: "khoaSo",
  initialState,
  reducers: {
    clearSuccessMessageKhoaSo: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKhoaSo.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchKhoaSo.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        state.successMessage = "Khóa sổ thành công!";
      })
      .addCase(fetchKhoaSo.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
        state.successMessage = "Khóa sổ thất bại!";
      });
  },
});

export const { clearSuccessMessageKhoaSo } = khoaSoSlice.actions;

export default khoaSoSlice.reducer;

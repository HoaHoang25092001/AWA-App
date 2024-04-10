import { createSlice } from "@reduxjs/toolkit";
import { fetchAddChipDongHo, fetchHuyChotSo, updateTheDienLuc } from "./action";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
  successMessage: null, // Add success message state
};

const updateTheDienLucSlice = createSlice({
  name: "updateIdDienLuc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTheDienLuc.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateTheDienLuc.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(updateTheDienLuc.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default updateTheDienLucSlice.reducer;

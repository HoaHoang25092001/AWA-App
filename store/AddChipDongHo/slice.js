import { createSlice } from "@reduxjs/toolkit";
import { fetchAddChipDongHo, fetchHuyChotSo } from "./action";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
  successMessage: null, // Add success message state
};

const addChipDongHoSlice = createSlice({
  name: "addChipDongHo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddChipDongHo.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAddChipDongHo.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchAddChipDongHo.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default addChipDongHoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchChiSoDongHoByChip } from "./action";

const chiSoDongHoByChipSlice = createSlice({
  name: "chiSoDongHoByChip",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChiSoDongHoByChip.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchChiSoDongHoByChip.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchChiSoDongHoByChip.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default chiSoDongHoByChipSlice.reducer;

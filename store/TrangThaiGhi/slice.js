import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchSoDocChiSoByNhaMayId, fetchTrangThaiGhi } from "./action";

const trangThaiGhiSlice = createSlice({
  name: "trangThaiGhi",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrangThaiGhi.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchTrangThaiGhi.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchTrangThaiGhi.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk as well as the reducer
export default trangThaiGhiSlice.reducer;

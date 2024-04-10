import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchHoaDonByIdDienLuc } from "./action";

const hoaDonByIdDienLucSlice = createSlice({
  name: "hoaDonByIdDienLuc",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHoaDonByIdDienLuc.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchHoaDonByIdDienLuc.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchHoaDonByIdDienLuc.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk as well as the reducer
export default hoaDonByIdDienLucSlice.reducer;

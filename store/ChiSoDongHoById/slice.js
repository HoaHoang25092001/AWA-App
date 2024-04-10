import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchChiSoDongHoById, fetchChiSoDongHoByIdSoDoc } from "./action";

const chiSoDongHoByIdSlice = createSlice({
  name: "chiSoDongHoById",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChiSoDongHoById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchChiSoDongHoById.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchChiSoDongHoById.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default chiSoDongHoByIdSlice.reducer;

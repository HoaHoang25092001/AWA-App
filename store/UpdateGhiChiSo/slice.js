import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fecthUpdateGhiChiSo,
  fetchSoDocChiSoByNhaMayId,
  fetchTrangThaiGhi,
} from "./action";

const updateGhiChiSoSlice = createSlice({
  name: "updateGhiChiSo",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthUpdateGhiChiSo.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fecthUpdateGhiChiSo.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fecthUpdateGhiChiSo.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk as well as the reducer
export default updateGhiChiSoSlice.reducer;

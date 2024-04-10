import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchSoDocChiSoByNhaMayId } from "./action";

const soDocChiSoSlice = createSlice({
  name: "soDocChiSo",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSoDocChiSoByNhaMayId.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSoDocChiSoByNhaMayId.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchSoDocChiSoByNhaMayId.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk as well as the reducer
export default soDocChiSoSlice.reducer;

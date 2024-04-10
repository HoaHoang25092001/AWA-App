import { createSlice } from "@reduxjs/toolkit";
import { fetchSoDocChiSoFilter } from "./action";

const soDocChiSoFilterSlice = createSlice({
  name: "soDocChiSoFilter",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSoDocChiSoFilter.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSoDocChiSoFilter.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchSoDocChiSoFilter.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk as well as the reducer
export default soDocChiSoFilterSlice.reducer;

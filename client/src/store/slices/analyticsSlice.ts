import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsData } from '../../types/analytics.types';

interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    fetchAnalyticsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAnalyticsSuccess(state, action: PayloadAction<AnalyticsData>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAnalyticsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAnalyticsStart,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
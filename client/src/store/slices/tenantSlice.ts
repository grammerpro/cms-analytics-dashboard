import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tenant } from '../../types/tenant.types';

interface TenantState {
  tenants: Tenant[];
  selectedTenantId: string | null;
}

const initialState: TenantState = {
  tenants: [],
  selectedTenantId: null,
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenants(state, action: PayloadAction<Tenant[]>) {
      state.tenants = action.payload;
    },
    selectTenant(state, action: PayloadAction<string>) {
      state.selectedTenantId = action.payload;
    },
    clearSelectedTenant(state) {
      state.selectedTenantId = null;
    },
  },
});

export const { setTenants, selectTenant, clearSelectedTenant } = tenantSlice.actions;

export default tenantSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import { prismApi } from "../../helpers/api";
import { ICustomer, ISortFilterPaging } from "../../interfaces";
import { applyQueryFilters } from "@raultom/common-helpers/lib/helpers/navigation";

interface ISliceState {
  loading: boolean;
  error: string | null;
  customers: ICustomer[];
  creatingCustomer: boolean;
  editingCustomer: boolean;
  deletingCustomer: boolean;
  customer: ICustomer | null;
}

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    loading: false,
    error: null,
    customers: [],
    creatingCustomer: false,
    editingCustomer: false,
    deletingCustomer: false,
    customer: null,
  } as ISliceState,
  reducers: {
    getCustomersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCustomersSuccess(state, action: PayloadAction<ICustomer[]>) {
      state.customers = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCustomersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createCustomerStart(state) {
      state.creatingCustomer = true;
      state.error = null;
    },
    createCustomerSuccess(state) {
      state.creatingCustomer = false;
      state.error = null;
    },
    createCustomerFailure(state, action: PayloadAction<string>) {
      state.creatingCustomer = false;
      state.error = action.payload;
    },
    deleteCustomerStart(state) {
      state.deletingCustomer = true;
      state.error = null;
    },
    deleteCustomerSuccess(state) {
      state.deletingCustomer = false;
      state.error = null;
    },
    deleteCustomerFailure(state, action: PayloadAction<string>) {
      state.deletingCustomer = false;
      state.error = action.payload;
    },
    getCustomerStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCustomerSuccess(state, action: PayloadAction<ICustomer>) {
      state.loading = false;
      state.customer = action.payload;
      state.error = null;
    },
    getCustomerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editCustomerStart(state) {
      state.editingCustomer = true;
      state.error = null;
    },
    editCustomerSuccess(state) {
      state.editingCustomer = false;
      state.error = null;
    },
    editCustomerFailure(state, action: PayloadAction<string>) {
      state.editingCustomer = false;
      state.error = action.payload;
    },
  },
});

export const reducer = customersSlice.reducer;

export const getCustomers = (
  sortFilterPaging: ISortFilterPaging<{ fullSearch: string }> = {}
): AppThunk<Promise<ICustomer[]>> => async (dispatch): Promise<ICustomer[]> => {
  try {
    dispatch(customersSlice.actions.getCustomersStart());
    const result = await prismApi.get(
      applyQueryFilters(
        "/companies/me/customers",
        sortFilterPaging.filter,
        sortFilterPaging.sort,
        sortFilterPaging.paging
      )
    );
    const customers = await result.json();
    dispatch(customersSlice.actions.getCustomersSuccess(customers));
    return customers;
  } catch (err) {
    dispatch(customersSlice.actions.getCustomersFailure(err));
    return [];
  }
};

export const createCustomer = (customer: ICustomer | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!customer) {
      throw new Error("Cannot create a null customer type");
    }

    dispatch(customersSlice.actions.createCustomerStart());
    await prismApi.post("/companies/me/customers", customer);
    dispatch(customersSlice.actions.createCustomerSuccess());
  } catch (err) {
    dispatch(customersSlice.actions.createCustomerFailure(err));
  }
};

export const getCustomer = (customerId: string | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!customerId) {
      throw new Error("Cannot get a null customer type");
    }

    dispatch(customersSlice.actions.getCustomerStart());
    const response = await prismApi.get(
      `/companies/me/customers/${customerId}`
    );
    dispatch(customersSlice.actions.getCustomerSuccess(await response.json()));
  } catch (err) {
    dispatch(customersSlice.actions.getCustomerFailure(err));
  }
};

export const editCustomer = (customer: ICustomer | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!customer) {
      throw new Error("Cannot edit a null customer type");
    }

    dispatch(customersSlice.actions.editCustomerStart());
    await prismApi.patch(`/companies/me/customers/${customer.id}`, customer);
    dispatch(customersSlice.actions.editCustomerSuccess());
  } catch (err) {
    dispatch(customersSlice.actions.editCustomerFailure(err));
  }
};

export const deleteCustomer = (customer: ICustomer | null): AppThunk => async (
  dispatch
) => {
  try {
    if (!customer) {
      throw new Error("Cannot delete a null customer type");
    }

    dispatch(customersSlice.actions.deleteCustomerStart());
    await prismApi.delete(`/companies/me/customers/${customer.id}`);
    dispatch(customersSlice.actions.deleteCustomerSuccess());
  } catch (err) {
    dispatch(customersSlice.actions.deleteCustomerFailure(err));
  }
};

export const selectors = {
  selectLoading: (state: RootState) => state.admin.customers.loading,
  selectError: (state: RootState) => state.admin.customers.error,
  selectCreatingCustomer: (state: RootState) =>
    state.admin.customers.creatingCustomer,
  selectEditingCustomer: (state: RootState) =>
    state.admin.customers.editingCustomer,
  selectDeletingCustomer: (state: RootState) =>
    state.admin.customers.deletingCustomer,
  selectCustomers: (state: RootState) => state.admin.customers.customers,
  selectCustomer: (state: RootState) => state.admin.customers.customer,
};

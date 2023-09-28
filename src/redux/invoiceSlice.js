import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
    selectedInvoiceById: null,
    showInvoiceForm: false,
  },
  reducers: {
    toggleShowInvoiceForm: (state, action) => {
      state.showInvoiceForm = !state.showInvoiceForm;
    },

    setSelectedInvoiceById: (state, action) => {
      console.log(action.payload);
      state.selectedInvoiceById = action.payload;
    },

    addInvoice: (state, action) => {
      state.showInvoiceForm = !state.showInvoiceForm;
      state.invoices = [...state.invoices, action.payload];
      state.selectedInvoiceById = null;
    },

    editInvoice: (state, action) => {
      const updatedInvoice = state.invoices.map((invoice) =>
        invoice.id === action.payload.id
          ? { ...invoice, ...action.payload }
          : invoice
      );
      state.invoices = updatedInvoice;
      state.selectedInvoiceById = null;
      console.log(action.payload.id);
    },

    deleteInvoice: (state, action) => {
      const filteredInvoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
      state.invoices = filteredInvoices;
    },
  },
});

export const {
  toggleShowInvoiceForm,
  setSelectedInvoiceById,
  addInvoice,
  editInvoice,
  deleteInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

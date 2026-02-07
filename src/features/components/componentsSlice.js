import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNavbar: false,
  collapsNavbar: false,
};

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setShowNavbar: (state, { payload }) => {
      state.showNavbar = payload;
    },
    setCollapsNavbar: (state, { payload }) => {
      state.collapsNavbar = payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setShowNavbar, setCollapsNavbar } = componentsSlice.actions;

export const selectShowNavbar = (state) => state.components.showNavbar;
export const selectCollapsNavbar = (state) => state.components.collapsNavbar;

export default componentsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";

type PageSlice = {
  title: string;
};

const initialState: PageSlice = {
  title: "",
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageTitle(state, action: PayloadAction<PageSlice["title"]>) {
      if (action.payload === undefined) return;

      state.title = action.payload;
    },
  },
});

export const { setPageTitle } = pageSlice.actions;

export const selectPageTitle = (state: RootState) => state.page.title;

export default pageSlice.reducer;

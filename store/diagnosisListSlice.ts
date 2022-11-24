import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";

type DiagnosisListStoreState = {
  user: "doctor" | "station";
  filter:
    | "all"
    | "waiting"
    | "ongoing"
    | "terminated"
    | "canceled"
    | "cs_cancel";
};

const initialState: DiagnosisListStoreState = {
  user: "doctor",
  filter: "all",
};

export const diagnosisListSlice = createSlice({
  name: "diagnosisList",
  initialState,
  reducers: {
    setDiagnosisListUser(
      state,
      action: PayloadAction<DiagnosisListStoreState["user"]>
    ) {
      state.user = action.payload;
    },
  },
});

export const { setDiagnosisListUser } = diagnosisListSlice.actions;

export const selectDiagnosisListUser = (state: RootState) =>
  state.diagnosisList.user;
export const selectDiagnosisListFilter = (state: RootState) =>
  state.diagnosisList.filter;

export default diagnosisListSlice.reducer;

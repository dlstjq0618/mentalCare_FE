import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DiagnosisListState {}

const initialState: DiagnosisListState = {};

export const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState,
  reducers: {},
});

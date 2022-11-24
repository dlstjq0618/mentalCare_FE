import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";

interface RegisterFormState {
  email: string;
  name: string;
  phone: string;
  profilePic: string;
  doctorLicense: string;
  special: string;
  specialLicense: string;
  hospitalName: string;
  hospitalTel: string;
  hospitalAddress1: string;
  hospitalAddress2?: string;
}
const initialState: RegisterFormState = {
  email: "",
  name: "",
  phone: "",
  profilePic: "",
  doctorLicense: "",
  special: "",
  specialLicense: "",
  hospitalName: "",
  hospitalTel: "",
  hospitalAddress1: "",
  hospitalAddress2: "",
};

export const registerFormSlice = createSlice({
  name: "diagnosisList",
  initialState,
  reducers: {
    setRegisterForm(state, action: PayloadAction<RegisterFormState>) {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setRegisterForm } = registerFormSlice.actions;

export const selectRegisterForm = (state: RootState) => state.registerForm;

export default registerFormSlice.reducer;

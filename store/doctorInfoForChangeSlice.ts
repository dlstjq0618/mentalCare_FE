import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hospitaluser } from "~/interfaces";
import { RootState } from "~/store";

export type DoctorInfoForFormState = Partial<Hospitaluser> & {
  password: string;
};

const initialState: DoctorInfoForFormState = {
  id: 0,
  email: "",
  password: "",
  username: "",
  mobile: "",
  birthdate: "",
  age: 0,
  gender: "",
  specialist: "",
  description: "",
  image: "",
  estimatedPayment: 0,
  approvalStatus: "standby",
  isActive: false,
  isSatisfied: false,
};

export const doctorInfoForChangeSlice = createSlice({
  name: "doctorInfoForChange",
  initialState,
  reducers: {
    setCounselorName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setCounselorId(state, action: PayloadAction<any>) {
      state.id = action.payload;
    },
    setDoctorImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setDoctorMobile(state, action: PayloadAction<string>) {
      state.mobile = action.payload;
    },
    setDoctorPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const {
  setCounselorId,
  setCounselorName,
  setDoctorImage,
  setDoctorMobile,
  setDoctorPassword,
} = doctorInfoForChangeSlice.actions;

export const selectCounselorName = (state: RootState) => state.doctor.username;
export const selectCounselorId = (state: RootState) => state.doctor.id;
export const selectDoctorImage = (state: RootState) => state.doctor.image;
export const selectDoctorMobile = (state: RootState) => state.doctor.mobile;
export const selectDoctorPassword = (state: RootState) => state.doctor.password;

export default doctorInfoForChangeSlice.reducer;

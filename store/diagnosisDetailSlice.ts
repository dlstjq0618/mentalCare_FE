import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";
import { DIAGNOSIS_STATUS } from "~/utils/constants";
import { getDiagnosisStatus } from "~/utils/diagnosis.utils";

type DiagnosisStatus = typeof DIAGNOSIS_STATUS;
type DiagnosisDetailStoreState = {
  diagnosisCallStatus?: "idle" | "calling" | "finish";
  diagnosisDetailStatus?: DiagnosisStatus[keyof typeof DIAGNOSIS_STATUS];
  currentStep: number;
  diagnosisRequestId: number;
  diagnosisResultId?: number;
  prescriptionState: boolean;
  notification: string;
  notificationNumber: number | undefined;
  prescription: {
    file?: string;
    fileName?: string;
    previewUrl?: string;
    url?: string;
    price?: string | undefined;
    fileKey?: string;
    fileUrl?: string;
  };
  userList: {}[];
};

const initialState: DiagnosisDetailStoreState = {
  diagnosisCallStatus: "idle",
  diagnosisDetailStatus: "waiting",
  currentStep: 0,
  diagnosisRequestId: 0,
  diagnosisResultId: 0,
  prescriptionState: false,
  notification: "",
  notificationNumber: 0,
  prescription: {
    fileName: "",
    fileKey: "",
    previewUrl: "",
    url: "",
    price: "",
  },
  userList: [],
};

export const diagnosisDetailSlice = createSlice({
  name: "diagnosisList",
  initialState,
  reducers: {
    setDiagnosisCallStatus(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["diagnosisCallStatus"]>
    ) {
      state.diagnosisCallStatus = action.payload;
    },
    setDiagnosisDetailStatus(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["diagnosisDetailStatus"]>
    ) {
      state.diagnosisDetailStatus = action.payload;
      let status = getDiagnosisStatus(action.payload);
      switch (status) {
        case DIAGNOSIS_STATUS.CANCELED:
          state.currentStep = 4;
          break;
        case DIAGNOSIS_STATUS.FINISHED:
          state.currentStep = 3;
          break;
        case DIAGNOSIS_STATUS.PAY_READY:
          state.currentStep = 2;
          break;
        case DIAGNOSIS_STATUS.IN_PROGRESS:
          state.currentStep = 1;
          break;
        default:
          state.currentStep = 0;
          break;
      }
    },
    setDiagnosisDetailCurrentStep(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["currentStep"]>
    ) {
      state.currentStep = action.payload;
    },
    setDiagnosisDetailRequestId(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["diagnosisRequestId"]>
    ) {
      state.diagnosisRequestId = action.payload;
    },
    setDiagnosisDetailResultId(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["diagnosisResultId"]>
    ) {
      state.diagnosisResultId = action.payload;
    },
    setDiagnosisDetailPrescription(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["prescription"]>
    ) {
      state.prescription = { ...state.prescription, ...action.payload };
    },
    setDiagnosisDetailPrescriptionState(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["prescriptionState"]>
    ) {
      state.prescriptionState = action.payload;
    },
    setDiagnosisNotificationNumber(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["notificationNumber"]>
    ) {
      state.notificationNumber = action.payload;
    },
    setDiagnosisNotificationState(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["notification"]>
    ) {
      state.notification = action.payload;
    },
    setCalendarUserList(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["userList"]>
    ) {
      state.userList = action.payload;
    },
  },
});

export const {
  setDiagnosisCallStatus,
  setDiagnosisDetailStatus,
  setDiagnosisDetailCurrentStep,
  setDiagnosisDetailRequestId,
  setDiagnosisDetailResultId,
  setDiagnosisDetailPrescription,
  setDiagnosisDetailPrescriptionState,
  setDiagnosisNotificationNumber,
  setDiagnosisNotificationState,
  setCalendarUserList,
} = diagnosisDetailSlice.actions;

export const selectDiagnosisCallStatus = (state: RootState) =>
  state.diagnosisDetail.diagnosisCallStatus;
export const selectDiagnosisDetailStatus = (state: RootState) =>
  state.diagnosisDetail.diagnosisDetailStatus;
export const selectDiagnosisDetailCurrentStep = (state: RootState) =>
  state.diagnosisDetail.currentStep;
export const selectDiagnosisDetailRequestId = (state: RootState) =>
  state.diagnosisDetail.diagnosisRequestId;
export const selectDiagnosisDetailResultId = (state: RootState) =>
  state.diagnosisDetail.diagnosisResultId;
export const selectDiagnosisDetailPrescription = (state: RootState) =>
  state.diagnosisDetail.prescription;
export const selectDiagnosisDetailPrescriptionState = (state: RootState) =>
  state.diagnosisDetail.prescriptionState;
export const selectDiagnosisNotificationNumber = (state: RootState) =>
  state.diagnosisDetail.notificationNumber;
export const selectDiagnosisNotificationState = (state: RootState) =>
  state.diagnosisDetail.notification;
export const selectCalendarUserList = (state: RootState) =>
  state.diagnosisDetail.userList;

export default diagnosisDetailSlice.reducer;

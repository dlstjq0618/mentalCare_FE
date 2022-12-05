import type { RootState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Hospital } from "~/interfaces";

const initialState: {
  global: "edit" | "idle";
  doctor: "idle" | "edit";
  diagnosis: "idle" | "edit";
  hospital: "idle" | "edit" | "update";
  openingHours: "idle" | "edit";
  workState: "weekDay" | "weekEnd" | "";
  workDay: number[];
  hospitalData: Partial<Hospital>;
  hospitalDataForUpdate: Partial<Hospital>;
  workTime: string;
  breakTime: any;
  scheduleTime: "on" | "off";
  tabIndex: number;
  tabIndex2: number;
  openState: boolean;
  priceValue: number;
  arrayData: "null" | "notnull";
  workTimeState: boolean;
  workTimeState2: boolean;
  cancelReason: boolean;
  toggleState: boolean | undefined;
  noticeCount: boolean | undefined;
  noticeDescription: any;
  waitingData: boolean;
  openingTimes: any;
  openingTime: any;
  imageUrl: any;
} = {
  global: "idle",
  doctor: "idle",
  diagnosis: "idle",
  hospital: "idle",
  openingHours: "idle",
  hospitalData: {},
  hospitalDataForUpdate: {},
  openingTime: {},
  workState: "",
  workDay: [],
  workTime: "",
  breakTime: {},
  scheduleTime: "on",
  tabIndex: 0,
  tabIndex2: 0,
  openState: false,
  priceValue: 0,
  arrayData: "null",
  workTimeState: false,
  workTimeState2: false,
  cancelReason: false,
  toggleState: false,
  noticeCount: true,
  noticeDescription: [],
  waitingData: false,
  openingTimes: [],
  imageUrl: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setGlobalEditState(
      state,
      action: PayloadAction<typeof initialState["global"]>
    ) {
      state.global = action.payload;
    },
    setDoctorEditState(
      state,
      action: PayloadAction<typeof initialState["doctor"]>
    ) {
      state.doctor = action.payload;
    },
    setHospitalEditState(
      state,
      action: PayloadAction<typeof initialState["hospital"]>
    ) {
      state.hospital = action.payload;
    },
    setSettingsHospitalData(
      state,
      action: PayloadAction<typeof initialState["hospitalData"]>
    ) {
      state.hospitalData = action.payload;
    },
    setHospitalDataForUpdate(
      state,
      action: PayloadAction<typeof initialState["hospitalDataForUpdate"]>
    ) {
      state.hospitalDataForUpdate = {
        ...state.hospitalDataForUpdate,
        ...action.payload,
      };
    },
    addHospitalImagesForUpdate(state, action: PayloadAction<string[]>) {
      action.payload.forEach((url) => {
        state.hospitalDataForUpdate.image?.push(url);
      });
    },
    removeHospitalImageForUpdate(state, action: PayloadAction<number>) {
      state.hospitalDataForUpdate.image =
        state.hospitalDataForUpdate.image?.filter(
          (url, index) => index !== action.payload
        );
    },
    setDiagnosisEditState(
      state,
      action: PayloadAction<typeof initialState["diagnosis"]>
    ) {
      state.diagnosis = action.payload;
    },
    setOpeningHoursEditState(
      state,
      action: PayloadAction<typeof initialState["openingHours"]>
    ) {
      state.openingHours = action.payload;
    },
    setTutorialWorkWeekState(
      state,
      action: PayloadAction<typeof initialState["workState"]>
    ) {
      state.workState = action.payload;
    },
    setTutorialHospitalOpeningArray(
      state,
      action: PayloadAction<typeof initialState["openingTime"]>
    ) {
      state.openingTime = action.payload;
    },
    setTutorialWorkWeekDay(
      state,
      action: PayloadAction<typeof initialState["workDay"]>
    ) {
      state.workDay = action.payload;
    },
    setTutorialHospitalWorkTimeData(
      state,
      action: PayloadAction<typeof initialState["workTime"]>
    ) {
      state.workTime = action.payload;
    },
    setTutorialHospitalBreakArray(
      state,
      action: PayloadAction<typeof initialState["breakTime"]>
    ) {
      state.breakTime = action.payload;
    },
    setScheduleTimeState(
      state,
      action: PayloadAction<typeof initialState["scheduleTime"]>
    ) {
      state.scheduleTime = action.payload;
    },
    setSettingTabIndex(
      state,
      action: PayloadAction<typeof initialState["tabIndex"]>
    ) {
      state.tabIndex = action.payload;
    },
    setSettingTabIndex2(
      state,
      action: PayloadAction<typeof initialState["tabIndex2"]>
    ) {
      state.tabIndex2 = action.payload;
    },
    setTutorialOpeningState(
      state,
      action: PayloadAction<typeof initialState["openState"]>
    ) {
      state.openState = action.payload;
    },
    setTutorialPriceDataUpdate(
      state,
      action: PayloadAction<typeof initialState["priceValue"]>
    ) {
      state.priceValue = action.payload;
    },
    setTutorialArrayState(
      state,
      action: PayloadAction<typeof initialState["arrayData"]>
    ) {
      state.arrayData = action.payload;
    },
    setTutorialTimeState(
      state,
      action: PayloadAction<typeof initialState["workTimeState"]>
    ) {
      state.workTimeState = action.payload;
    },
    setTutorialTimeState2(
      state,
      action: PayloadAction<typeof initialState["workTimeState2"]>
    ) {
      state.workTimeState2 = action.payload;
    },
    setCancelReason(
      state,
      action: PayloadAction<typeof initialState["cancelReason"]>
    ) {
      state.cancelReason = action.payload;
    },
    setToggleState(
      state,
      action: PayloadAction<typeof initialState["toggleState"]>
    ) {
      state.toggleState = action.payload;
    },
    setNoticeCount(
      state,
      action: PayloadAction<typeof initialState["noticeCount"]>
    ) {
      state.noticeCount = action.payload;
    },
    setNoticeDescription(
      state,
      action: PayloadAction<typeof initialState["noticeDescription"]>
    ) {
      state.noticeDescription = action.payload;
    },
    setWaitingData(
      state,
      action: PayloadAction<typeof initialState["waitingData"]>
    ) {
      state.waitingData = action.payload;
    },
    setCounselorOpeningTimes(
      state,
      action: PayloadAction<typeof initialState["openingTimes"]>
    ) {
      state.openingTimes = action.payload;
    },
    setCounselorProfileIamge(
      state,
      action: PayloadAction<typeof initialState["imageUrl"]>
    ) {
      state.imageUrl = action.payload;
    },
  },
});

export const {
  setGlobalEditState,
  setDoctorEditState,
  setHospitalEditState,
  setSettingsHospitalData,
  setHospitalDataForUpdate,
  addHospitalImagesForUpdate,
  removeHospitalImageForUpdate,
  setDiagnosisEditState,
  setOpeningHoursEditState,
  setTutorialWorkWeekState,
  setTutorialWorkWeekDay,
  setTutorialHospitalOpeningArray,
  setTutorialHospitalWorkTimeData,
  setTutorialHospitalBreakArray,
  setScheduleTimeState,
  setSettingTabIndex,
  setSettingTabIndex2,
  setTutorialOpeningState,
  setTutorialPriceDataUpdate,
  setTutorialArrayState,
  setTutorialTimeState,
  setTutorialTimeState2,
  setCancelReason,
  setToggleState,
  setNoticeCount,
  setNoticeDescription,
  setWaitingData,
  setCounselorOpeningTimes,
  setCounselorProfileIamge,
} = settingsSlice.actions;

export const selectGlobalEditState = (state: RootState) =>
  state.settings.global;
export const selectDoctorEditState = (state: RootState) =>
  state.settings.doctor;
export const selectDiagnosisEditState = (state: RootState) =>
  state.settings.diagnosis;
export const selectHospitalEditState = (state: RootState) =>
  state.settings.hospital;
export const selectHospitalData = (state: RootState) =>
  state.settings.hospitalData;
export const selectHospitalDataForUpdate = (state: RootState) =>
  state.settings.hospitalDataForUpdate;
export const selectOpeningHoursEditState = (state: RootState) =>
  state.settings.openingHours;
export const selectTutorialWorkWeekState = (state: RootState) =>
  state.settings.workState;
export const selectTutorialWorkWeekDay = (state: RootState) =>
  state.settings.workDay;
export const selectTutorialHospitalWorkTimeData = (state: RootState) =>
  state.settings.workTime;
export const selectTutorialHospitalBreakArray = (state: RootState) =>
  state.settings.breakTime;
export const selectScheduleTimeState = (state: RootState) =>
  state.settings.scheduleTime;
export const selectSettingTabIndex = (state: RootState) =>
  state.settings.tabIndex;
export const selectSettingTabIndex2 = (state: RootState) =>
  state.settings.tabIndex2;
export const selectTutorialOpeningState = (state: RootState) =>
  state.settings.openState;
export const selectTutorialPriceDataUpdate = (state: RootState) =>
  state.settings.priceValue;
export const selectTutorialArrayState = (state: RootState) =>
  state.settings.arrayData;
export const selectTutorialTimeState = (state: RootState) =>
  state.settings.workTimeState;
export const selectTutorialTimeState2 = (state: RootState) =>
  state.settings.workTimeState2;
export const selectCancelReason = (state: RootState) =>
  state.settings.cancelReason;
export const selectToggleState = (state: RootState) =>
  state.settings.toggleState;
export const selectNoticeCount = (state: RootState) =>
  state.settings.noticeCount;
export const selectNoticeDescription = (state: RootState) =>
  state.settings.noticeDescription;
export const selectWaitingData = (state: RootState) =>
  state.settings.waitingData;
export const selectCounselorOpeningTimes = (state: RootState) =>
  state.settings.openingTimes;
export const selectTutorialHospitalOpeningArray = (state: RootState) =>
  state.settings.openingTime;
export const selectCounselorProfileImage = (state: RootState) =>
  state.settings.imageUrl;
export default settingsSlice.reducer;

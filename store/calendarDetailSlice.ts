import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";
import { DIAGNOSIS_STATUS } from "~/utils/constants";
import { getDiagnosisStatus } from "~/utils/diagnosis.utils";
import { FileUploadResponse } from "~/interfaces";

type DiagnosisStatus = typeof DIAGNOSIS_STATUS;
type DiagnosisDetailStoreState = {
  diagnosisCallStatus?: "idle" | "calling" | "finish";
  diagnosisDetailStatus?: DiagnosisStatus[keyof typeof DIAGNOSIS_STATUS];
  currentStep: number;
  userList: {}[];
  modal: boolean;
  month: string;
  session: number;
  counseling: string;
  date: any;
  info: any;
  imageUrl: any;
  password: boolean;
  socket: string | null;
  chat: any;
  connect: any;
  socketInfo: any;
  time: string;
  confirm: string;
  final: any;
  timestemp: string;
  count: any;
  start: string;
  list: any;
  chatstatus: string;
};

const initialState: DiagnosisDetailStoreState = {
  diagnosisCallStatus: "idle",
  diagnosisDetailStatus: "waiting",
  currentStep: 0,
  userList: [],
  modal: false,
  month: "",
  session: 0,
  counseling: "",
  date: "",
  info: {},
  imageUrl: "",
  password: false,
  socket: "",
  chat: "",
  connect: "",
  socketInfo: {},
  time: "",
  confirm: "",
  final: "",
  timestemp: "",
  count: 0,
  start: "",
  list: [],
  chatstatus: "",
};

export const calendarDetailSilce = createSlice({
  name: "calendarList",
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

    setCalendarUserList(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["userList"]>
    ) {
      state.userList = action.payload;
    },
    setCalendarModalState(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["modal"]>
    ) {
      state.modal = action.payload;
    },
    setCalendarMonthState(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["month"]>
    ) {
      state.month = action.payload;
    },
    setSessionId(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["session"]>
    ) {
      state.session = action.payload;
    },
    setCounselingState(
      // 상담완료 및 상태 체크 ex)start, pause, finish
      state,
      action: PayloadAction<DiagnosisDetailStoreState["counseling"]>
    ) {
      state.counseling = action.payload;
    },
    setCounselingDate(
      // 날짜 선택 정보
      state,
      action: PayloadAction<DiagnosisDetailStoreState["date"]>
    ) {
      state.date = action.payload;
    },
    setCounselingInfoData(
      // 상담사 기본정보
      state,
      action: PayloadAction<DiagnosisDetailStoreState["info"]>
    ) {
      state.info = action.payload;
    },
    setCounselingProfileImage(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["imageUrl"]>
    ) {
      state.imageUrl = action.payload;
    },
    setSettingSaveControlls(
      // 비밀번호 확인
      state,
      action: PayloadAction<DiagnosisDetailStoreState["password"]>
    ) {
      state.password = action.payload;
    },
    setSocketControlls(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["socket"]>
    ) {
      state.socket = action.payload;
    },
    setSocketChattingData(
      // 채팅데이터  사용X
      state,
      action: PayloadAction<DiagnosisDetailStoreState["chat"]>
    ) {
      state.chat = action.payload;
    },
    setSocketConnected(
      //소캣 연결 확인 사용X
      state,
      action: PayloadAction<DiagnosisDetailStoreState["connect"]>
    ) {
      state.connect = action.payload;
    },
    setSocketData(
      // 소캣리스트 데이터
      state,
      action: PayloadAction<DiagnosisDetailStoreState["socketInfo"]>
    ) {
      state.socketInfo = action.payload;
    },
    setCounselingTimes(
      // 스케줄 등록 시간 선택
      state,
      action: PayloadAction<DiagnosisDetailStoreState["time"]>
    ) {
      state.time = action.payload;
    },
    setCounselingTimeStemp(
      // 스케줄 등록 시간 선택
      state,
      action: PayloadAction<DiagnosisDetailStoreState["timestemp"]>
    ) {
      state.timestemp = action.payload;
    },
    setCounselingFinalStep(
      // 상담사 최종 예약확인
      state,
      action: PayloadAction<DiagnosisDetailStoreState["confirm"]>
    ) {
      state.confirm = action.payload;
    },
    setCounselingFinalStepData(
      // 최종 설정한 날짜 및 시간 예약 데이터
      state,
      action: PayloadAction<DiagnosisDetailStoreState["final"]>
    ) {
      state.final = action.payload;
    },
    setCounselingStart(
      // 최종 설정한 날짜 및 시간 예약 데이터
      state,
      action: PayloadAction<DiagnosisDetailStoreState["start"]>
    ) {
      state.start = action.payload;
    },
    setTotalCount(
      // 임시로 토탈 카운트 +1 하기위함
      state,
      action: PayloadAction<DiagnosisDetailStoreState["count"]>
    ) {
      state.count = action.payload;
    },
    setLoggedUser(
      state,
      action: PayloadAction<DiagnosisDetailStoreState["list"]>
    ) {
      state.list = [...state.list, action.payload]; //상태의 불변을 지키기 위해 spread 연산자로 객체를 복사하고 isLogged의 상태만 바꿔준다.
    },
  },
});

export const {
  setDiagnosisCallStatus,
  setDiagnosisDetailStatus,
  setCalendarUserList,
  setCalendarModalState,
  setCalendarMonthState,
  setSessionId,
  setCounselingState,
  setCounselingDate,
  setCounselingInfoData,
  setCounselingProfileImage,
  setSettingSaveControlls,
  setSocketControlls,
  setSocketChattingData,
  setSocketConnected,
  setSocketData,
  setCounselingTimes,
  setCounselingFinalStep,
  setCounselingFinalStepData,
  setCounselingTimeStemp,
  setCounselingStart,
  setTotalCount,
  setLoggedUser,
} = calendarDetailSilce.actions;

export const selectDiagnosisCallStatus = (state: RootState) =>
  state.calendarDetail.diagnosisCallStatus;
export const selectDiagnosisDetailStatus = (state: RootState) =>
  state.calendarDetail.diagnosisDetailStatus;
export const selectDiagnosisDetailCurrentStep = (state: RootState) =>
  state.calendarDetail.currentStep;
export const selectCalendarUserList = (state: RootState) =>
  state.calendarDetail.userList;
export const selectCalendarModalState = (state: RootState) =>
  state.calendarDetail.modal;
export const selectCalendarMonthState = (state: RootState) =>
  state.calendarDetail.month;
export const selectSessionId = (state: RootState) =>
  state.calendarDetail.session;
export const selectCounselingState = (state: RootState) =>
  state.calendarDetail.counseling;
export const selectCounselingDate = (state: RootState) =>
  state.calendarDetail.date;
export const selectCounselingInfoData = (state: RootState) =>
  state.calendarDetail.info;
export const selectCounselingProfileImage = (state: RootState) =>
  state.calendarDetail.imageUrl;
export const selectSettingSaveControlls = (state: RootState) =>
  state.calendarDetail.password;
export const selectSocketControlls = (state: RootState) =>
  state.calendarDetail.socket;
export const selectSocketChattingData = (state: RootState) =>
  state.calendarDetail.chat;
export const selectSocketConnected = (state: RootState) =>
  state.calendarDetail.connect;
export const selectSocketData = (state: RootState) =>
  state.calendarDetail.socketInfo;
export const selectCounselingTimes = (state: RootState) =>
  state.calendarDetail.time;
export const selectCounselingFinalStep = (state: RootState) =>
  state.calendarDetail.confirm;
export const selectCounselingFinalStepData = (state: RootState) =>
  state.calendarDetail.final;
export const selectCounselingTimeStemp = (state: RootState) =>
  state.calendarDetail.timestemp;
export const selectCounselingStart = (state: RootState) =>
  state.calendarDetail.start;
export const selectTotalCount = (state: RootState) =>
  state.calendarDetail.count;
export const selectLoggedUser = (state: RootState) => state.calendarDetail.list;
export default calendarDetailSilce.reducer;

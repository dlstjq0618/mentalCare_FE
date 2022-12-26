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
  list2: any;
  chatstatus: any;
  reservationList: any;
  waitlist: any;
  consultingList: any;
  completeList: any;
  cancelList: any;
  select: any;
  room: any;
  finish_chat: any;
  open: "시작" | "진행" | "완료" | "닫기" | "null" | "협의" | "시작전" | "전화";
  select_timenum: number;
  select_controll: "상담중" | "일시정지" | "완료" | "닫기" | "null";
  before_wating: any;
  schedule_select: boolean;
  returned: [];
};

const initialState: DiagnosisDetailStoreState = {
  returned: [],
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
  list2: [],
  chatstatus: "",
  reservationList: {},
  waitlist: {},
  consultingList: {},
  completeList: {},
  cancelList: {},
  select: {},
  room: "",
  finish_chat: {},
  open: "null",
  select_timenum: 0,
  select_controll: "null",
  before_wating: [],
  schedule_select: false,
};

export const calendarDetailSilce = createSlice({
  name: "calendarList",
  initialState,
  reducers: {
    removeList: (
      state,
      action: PayloadAction<DiagnosisDetailStoreState["list"]>
    ) => {
      const id = action.payload;
      state.list = state.list?.filter((item: any) => item.id !== id);
    },
    clear: (state) => {
      state.list = initialState.list;
    },
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
    setReset(state) {
      Object.assign(state.list, initialState);
    },
    setLoggedUser(
      // 채팅창
      state,
      action: PayloadAction<DiagnosisDetailStoreState["list"]>
    ) {
      state.list = [...state.list, action.payload]; //상태의 불변을 지키기 위해 spread 연산자로 객체를 복사하고 isLogged의 상태만 바꿔준다.
    },
    setHistoryChat(
      // 진행중인 컨설팅
      state,
      action: PayloadAction<DiagnosisDetailStoreState["list2"]>
    ) {
      state.list2 = [...state.list2, action.payload]; //상태의 불변을 지키기 위해 spread 연산자로 객체를 복사하고 isLogged의 상태만 바꿔준다.
    },
    setDashBoardReservationList(
      // 대시보드 예약리스트
      state,
      action: PayloadAction<DiagnosisDetailStoreState["reservationList"]>
    ) {
      state.reservationList = action.payload;
    },
    setDashBoardWatingList(
      // 대시보드 대기리스트
      state,
      action: PayloadAction<DiagnosisDetailStoreState["waitlist"]>
    ) {
      state.waitlist = action.payload;
    },
    setDashBoardConsultingList(
      // 대시보드 상담중리스트
      state,
      action: PayloadAction<DiagnosisDetailStoreState["consultingList"]>
    ) {
      state.consultingList = action.payload;
    },
    setDashBoardCompleteList(
      //대시보드 완료된 리스트
      state,
      action: PayloadAction<DiagnosisDetailStoreState["completeList"]>
    ) {
      state.completeList = action.payload;
    },
    setDashBoardCancelList(
      // 대시보드 취소된 리스트
      state,
      action: PayloadAction<DiagnosisDetailStoreState["cancelList"]>
    ) {
      state.cancelList = action.payload;
    },
    setDashBoardSelectUser(
      // 대시보드에서 선택한 User의 대에터  ex 상담시간 방번호 등등
      state,
      action: PayloadAction<DiagnosisDetailStoreState["select"]>
    ) {
      state.select = action.payload;
    },
    setDashBoardRoomJoin(
      // 대시보드에서 선택한 User의 대에터  ex 상담시간 방번호 등등
      state,
      action: PayloadAction<DiagnosisDetailStoreState["room"]>
    ) {
      state.room = action.payload;
    },
    setFinishChatList(
      // 지난 진료 리스트
      state,
      action: PayloadAction<DiagnosisDetailStoreState["finish_chat"]>
    ) {
      state.finish_chat = action.payload;
    },
    setChatBoxOpenState(
      // 채팅박스 열려있는지 체크
      state,
      action: PayloadAction<DiagnosisDetailStoreState["open"]>
    ) {
      state.open = action.payload;
    },
    setCounselingTimeStempNumber(
      // 채팅박스 열려있는지 체크
      state,
      action: PayloadAction<DiagnosisDetailStoreState["select_timenum"]>
    ) {
      state.select_timenum = action.payload;
    },
    setSelectBoxControlls(
      //선택박스 체크
      state,
      action: PayloadAction<DiagnosisDetailStoreState["select_controll"]>
    ) {
      state.select_controll = action.payload;
    },
    setWatingListBefore(
      // 상담전 협의 채팅
      state,
      action: PayloadAction<DiagnosisDetailStoreState["before_wating"]>
    ) {
      state.before_wating = action.payload;
    },
    setScheduleSelectModla(
      // 상담전 협의 채팅
      state,
      action: PayloadAction<DiagnosisDetailStoreState["schedule_select"]>
    ) {
      state.schedule_select = action.payload;
    },
  },
});

export const {
  setDiagnosisCallStatus,
  setDiagnosisDetailStatus,
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
  setDashBoardReservationList,
  setDashBoardWatingList,
  setDashBoardConsultingList,
  setDashBoardCompleteList,
  setDashBoardCancelList,
  setDashBoardSelectUser,
  setDashBoardRoomJoin,
  setFinishChatList,
  setHistoryChat,
  setChatBoxOpenState,
  setCounselingTimeStempNumber,
  setSelectBoxControlls,
  setWatingListBefore,
  setScheduleSelectModla,
  removeList,
  clear,
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
export const selectCounselingTimeStempNumber = (state: RootState) =>
  state.calendarDetail.select_timenum;

export const selectCounselingStart = (state: RootState) =>
  state.calendarDetail.start;
export const selectTotalCount = (state: RootState) =>
  state.calendarDetail.count;
export const selectLoggedUser = (state: RootState) => state.calendarDetail.list;
export const selectHistoryList = (state: RootState) =>
  state.calendarDetail.list2;
export const selectReservationList = (state: RootState) =>
  state.calendarDetail.reservationList;
export const selectWaitlist = (state: RootState) =>
  state.calendarDetail.waitlist;
export const selectConsultingList = (state: RootState) =>
  state.calendarDetail.consultingList;
export const selectCompleteList = (state: RootState) =>
  state.calendarDetail.completeList;
export const selectCancelList = (state: RootState) =>
  state.calendarDetail.cancelList;
export const selectDashBoardSelectUser = (state: RootState) =>
  state.calendarDetail.select;
export const selectDashBoardRoomJoin = (state: RootState) =>
  state.calendarDetail.room;
export const selectFinishChatList = (state: RootState) =>
  state.calendarDetail.finish_chat;
export const selectChatBoxOpenState = (state: RootState) =>
  state.calendarDetail.open;
export const selectSelectBoxControlls = (state: RootState) =>
  state.calendarDetail.select_controll;
export const selectWatingListBefore = (state: RootState) =>
  state.calendarDetail.before_wating;
export const selectScheduleSelectModla = (state: RootState) =>
  state.calendarDetail.schedule_select;

export default calendarDetailSilce.reducer;

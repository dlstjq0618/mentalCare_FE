export const TREATMENT_SUBJECT_LIST = [
  {
    id: 1,
    name: "만성질환",
    isReimbursement: false,
  },
  {
    id: 2,
    name: "감기",
    isReimbursement: true,
  },
  {
    id: 4,
    name: "탈모",
    isReimbursement: true,
  },
  {
    id: 24,
    name: "사후피임",
    isReimbursement: false,
  },
  {
    id: 25,
    name: "여드름",
    isReimbursement: false,
  },
  {
    id: 26,
    name: "다이어트",
    isReimbursement: false,
  },
  {
    id: 27,
    name: "소아질환",
    isReimbursement: false,
  },
  {
    id: 28,
    name: "복통",
    isReimbursement: true,
  },
  {
    id: 34,
    name: "통증",
    isReimbursement: true,
  },
  {
    id: 35,
    name: "성기능",
    isReimbursement: false,
  },
  {
    id: 36,
    name: "두통",
    isReimbursement: true,
  },
  {
    id: 37,
    name: "기타",
    isReimbursement: false,
  },
];

export const SPECIAL_OPTIONS = [
  {
    value: "1",
    label: "내과",
  },
  {
    value: "2",
    label: "피부과",
  },
  {
    value: "3",
    label: "산부인과",
  },
  {
    value: "4",
    label: "가정의학과",
  },
  {
    value: "5",
    label: "이비인후과",
  },
  {
    value: "6",
    label: "비뇨의학과",
  },
  {
    value: "7",
    label: "소아청소년과",
  },
  {
    value: "8",
    label: "신경과",
  },
  {
    value: "9",
    label: "정형외과",
  },
  {
    value: "10",
    label: "치과",
  },
  {
    value: "11",
    label: "성형외과",
  },
  {
    value: "12",
    label: "응급의학과",
  },
  {
    value: "13",
    label: "한방의학과",
  },
  {
    value: "14",
    label: "안과",
  },
  {
    value: "15",
    label: "외과",
  },
  {
    value: "16",
    label: "정신의학과",
  },
  {
    value: "17",
    label: "재활의학과",
  },
  {
    value: "18",
    label: "신경외과",
  },
  {
    value: "19",
    label: "마취통증의학과",
  },
  {
    value: "20",
    label: "영상의학과",
  },
  {
    value: "21",
    label: "진단검사의학과",
  },
];
export const BANKS = {
  "35": "경남은행",
  "29": "광주은행",
  "7": "국민은행",
  "5": "기업은행",
  "15": "농협중앙회",
  "17": "농협회원조합",
  "25": "대구은행",
  "47": "도이치은행",
  "27": "부산은행",
  "3": "산업은행",
  "41": "상호저축은행",
  "37": "새마을금고",
  "11": "수협중앙회",
  "36": "신한금융투자",
  "60": "신한은행",
  "39": "신협중앙회",
  "9": "외환은행",
  "19": "우리은행",
  "56": "우체국",
  "33": "전북은행",
  "31": "제주은행",
  "68": "카카오뱅크",
  "67": "케이뱅크",
  "59": "하나은행",
  "23": "한국씨티은행",
  "45": "HSBC은행",
  "99": "토스뱅크",
  "21": "SC제일은행",
};

export const DAY_OPTIONS = [
  { label: "월요일", value: "0" },
  { label: "화요일", value: "1" },
  { label: "수요일", value: "2" },
  { label: "목요일", value: "3" },
  { label: "금요일", value: "4" },
  { label: "토요일", value: "5" },
  { label: "일요일", value: "6" },
];

export const ALL_TIME_OPTIONS = [
  { label: "08:00", value: "08:00:00" },
  { label: "08:30", value: "08:30:00" },
  { label: "09:00", value: "09:00:00" },
  { label: "09:30", value: "09:30:00" },
  { label: "10:00", value: "10:00:00" },
  { label: "10:30", value: "10:30:00" },
  { label: "11:00", value: "11:00:00" },
  { label: "11:30", value: "11:30:00" },
  { label: "12:00", value: "12:00:00" },
  { label: "12:30", value: "12:30:00" },
  { label: "13:00", value: "13:00:00" },
  { label: "13:30", value: "13:30:00" },
  { label: "14:00", value: "14:00:00" },
  { label: "14:30", value: "14:30:00" },
  { label: "15:00", value: "15:00:00" },
  { label: "15:30", value: "15:30:00" },
  { label: "16:00", value: "16:00:00" },
  { label: "16:30", value: "16:30:00" },
  { label: "17:00", value: "17:00:00" },
  { label: "17:30", value: "17:30:00" },
  { label: "18:00", value: "18:00:00" },
  { label: "18:30", value: "18:30:00" },
  { label: "19:00", value: "19:00:00" },
  { label: "19:30", value: "19:30:00" },
  { label: "20:00", value: "20:00:00" },
  { label: "20:30", value: "20:30:00" },
  { label: "21:00", value: "21:00:00" },
  { label: "21:30", value: "21:30:00" },
  { label: "22:00", value: "22:00:00" },
];

export const TIME_OPTIONS = [
  //오전
  { label: "7:00", value: "07:00" },
  { label: "7:30", value: "07:30" },
  { label: "8:00", value: "08:00" },
  { label: "8:30", value: "08:30" },
  { label: "9:00", value: "09:00" },
  { label: "9:30", value: "09:30" },
  { label: "10:00", value: "10:00" },
  { label: "10:30", value: "10:30" },
  { label: "11:00", value: "11:00" },
  { label: "11:30", value: "11:30" },
  { label: "12:00", value: "12:00" },
  { label: "12:30", value: "12:30" },
  { label: "13:00", value: "13:00" },
  { label: "13:30", value: "13:30" },
  { label: "14:00", value: "14:00" },
];
export const TIME_OPTIONS1 = [
  // 오후
  { label: "11:00", value: "11:00" },
  { label: "11:30", value: "11:30" },
  { label: "12:00", value: "12:00" },
  { label: "12:30", value: "12:30" },
  { label: "13:00", value: "13:00" },
  { label: "13:30", value: "13:30" },
  { label: "14:00", value: "14:00" },
  { label: "14:30", value: "14:30" },
  { label: "15:00", value: "15:00" },
  { label: "15:30", value: "15:30" },
  { label: "16:00", value: "16:00" },
  { label: "16:30", value: "16:30" },
  { label: "17:00", value: "17:00" },
  { label: "17:30", value: "17:30" },
  { label: "18:00", value: "18:00" },
  { label: "18:30", value: "18:30" },
  { label: "19:00", value: "19:00" },
  { label: "19:30", value: "19:30" },
  { label: "20:00", value: "20:00" },
  { label: "20:30", value: "20:30" },
  { label: "21:00", value: "21:00" },
  { label: "21:30", value: "21:30" },
  { label: "22:00", value: "22:00" },
  { label: "22:30", value: "22:30" },
  { label: "23:00", value: "23:00" },
  { label: "23:30", value: "23:30" },
];

export const CANCEL_REASON_DROPDOWN_DATA = [
  { label: "환자가 응답하지 않습니다.", value: "환자가 응답하지 않습니다." },
  {
    label: "진료 시간이 종료되었습니다.",
    value: "진료 시간이 종료되었습니다.",
  },
  {
    label: "우리 병원의 진료 항목에 해당하지 않습니다.",
    value: "우리 병원의 진료 항목에 해당하지 않습니다.",
  },
  {
    label: "직접 입력",
    value: "other",
  },
];

export const DIAGNOSIS_STATUS = {
  WAITING: "waiting",
  WAITING_KR: "대기",
  IN_PROGRESS: "ongoing",
  IN_PROGRESS_KR: "진행 중",
  FINISHED: "terminated",
  FINISHED_KR: "종료",
  PAY_READY: "pay_ready",
  PAY_READY_KR: "수납 대기",
  CANCELED: "canceled",
  CANCELED_KR: "취소",
  REUPLOAD: "reupload",
  REUPLOAD_KR: "처방전 재등록",
  CS_CANCEL: "cs_cancel",
  CS_CANCEL_KR: "CS 취소",
} as const;

export const DIAGNOSIS_STEPS = ["접수", "상담 승인", "상담중", "상담 완료"];

export const UPDATE_OPEN_TIMES_ALL = [
  // {
  //   label: "오전 06:00",
  //   value: "06:00:00",
  // },
  // {
  //   label: "오전 06:10",
  //   value: "06:10:00",
  // },
  // {
  //   label: "오전 06:20",
  //   value: "06:20:00",
  // },
  // {
  //   label: "오전 06:30",
  //   value: "06:30:00",
  // },
  // {
  //   label: "오전 06:40",
  //   value: "06:40:00",
  // },
  // {
  //   label: "오전 06:50",
  //   value: "06:50:00",
  // },
  // {
  //   label: "오전 07:00",
  //   value: "07:00:00",
  // },
  // {
  //   label: "오전 07:10",
  //   value: "07:10:00",
  // },
  // {
  //   label: "오전 07:20",
  //   value: "07:20:00",
  // },
  // {
  //   label: "오전 07:30",
  //   value: "07:30:00",
  // },
  // {
  //   label: "오전 07:40",
  //   value: "07:40:00",
  // },
  // {
  //   label: "오전 07:50",
  //   value: "07:50:00",
  // },
  // {
  //   label: "오전 08:00",
  //   value: "08:00:00",
  // },
  // {
  //   label: "오전 08:10",
  //   value: "08:10:00",
  // },
  // {
  //   label: "오전 08:20",
  //   value: "08:20:00",
  // },
  // {
  //   label: "오전 08:30",
  //   value: "08:30:00",
  // },
  // {
  //   label: "오전 08:40",
  //   value: "08:40:00",
  // },
  // {
  //   label: "오전 08:50",
  //   value: "08:50:00",
  // },
  {
    label: "오전 09:00",
    value: "09:00:00",
  },
  {
    label: "오전 09:10",
    value: "09:10:00",
  },
  {
    label: "오전 09:20",
    value: "09:20:00",
  },
  {
    label: "오전 09:30",
    value: "09:30:00",
  },
  {
    label: "오전 09:40",
    value: "09:40:00",
  },
  {
    label: "오전 09:50",
    value: "09:50:00",
  },
  {
    label: "오전 10:00",
    value: "10:00:00",
  },
  {
    label: "오전 10:10",
    value: "10:10:00",
  },
  {
    label: "오전 10:20",
    value: "10:20:00",
  },
  {
    label: "오전 10:30",
    value: "10:30:00",
  },
  {
    label: "오전 10:40",
    value: "10:40:00",
  },
  {
    label: "오전 10:50",
    value: "10:50:00",
  },
  {
    label: "오전 11:00",
    value: "11:00:00",
  },
  {
    label: "오전 11:10",
    value: "11:10:00",
  },
  {
    label: "오전 11:20",
    value: "11:20:00",
  },
  {
    label: "오전 11:30",
    value: "11:30:00",
  },
  {
    label: "오전 11:40",
    value: "11:40:00",
  },
  {
    label: "오전 11:50",
    value: "11:50:00",
  },
  {
    label: "오후 12:00",
    value: "12:00:00",
  },
  {
    label: "오후 12:10",
    value: "12:10:00",
  },
  {
    label: "오후 12:20",
    value: "12:20:00",
  },
  {
    label: "오후 12:30",
    value: "12:30:00",
  },
  {
    label: "오후 12:40",
    value: "12:40:00",
  },
  {
    label: "오후 12:50",
    value: "12:50:00",
  },
  {
    label: "오후 01:00",
    value: "13:00:00",
  },
  {
    label: "오후 01:10",
    value: "13:10:00",
  },
  {
    label: "오후 01:20",
    value: "13:20:00",
  },
  {
    label: "오후 01:30",
    value: "13:30:00",
  },
  {
    label: "오후 01:40",
    value: "13:40:00",
  },
  {
    label: "오후 01:50",
    value: "13:50:00",
  },
  {
    label: "오후 02:00",
    value: "14:00:00",
  },
  {
    label: "오후 02:10",
    value: "14:10:00",
  },
  {
    label: "오후 02:20",
    value: "14:20:00",
  },
  {
    label: "오후 02:30",
    value: "14:30:00",
  },
  {
    label: "오후 02:40",
    value: "14:40:00",
  },
  {
    label: "오후 02:50",
    value: "14:50:00",
  },
  {
    label: "오후 03:00",
    value: "15:00:00",
  },
  {
    label: "오후 03:10",
    value: "15:10:00",
  },
  {
    label: "오후 03:20",
    value: "15:20:00",
  },
  {
    label: "오후 03:30",
    value: "15:30:00",
  },
  {
    label: "오후 03:40",
    value: "15:40:00",
  },
  {
    label: "오후 03:50",
    value: "15:50:00",
  },
  {
    label: "오후 04:00",
    value: "16:00:00",
  },
  {
    label: "오후 04:10",
    value: "16:10:00",
  },
  {
    label: "오후 04:20",
    value: "16:20:00",
  },
  {
    label: "오후 04:30",
    value: "16:30:00",
  },
  {
    label: "오후 04:40",
    value: "16:40:00",
  },
  {
    label: "오후 04:50",
    value: "16:50:00",
  },
  {
    label: "오후 05:00",
    value: "17:00:00",
  },
  {
    label: "오후 05:10",
    value: "17:10:00",
  },
  {
    label: "오후 05:20",
    value: "17:20:00",
  },
  {
    label: "오후 05:30",
    value: "17:30:00",
  },
  {
    label: "오후 05:40",
    value: "17:40:00",
  },
  {
    label: "오후 05:50",
    value: "17:50:00",
  },
  {
    label: "오후 06:00",
    value: "18:00:00",
  },
  {
    label: "오후 06:10",
    value: "18:10:00",
  },
  {
    label: "오후 06:20",
    value: "18:20:00",
  },
  {
    label: "오후 06:30",
    value: "18:30:00",
  },
  {
    label: "오후 06:40",
    value: "18:40:00",
  },
  {
    label: "오후 06:50",
    value: "18:50:00",
  },
  {
    label: "오후 07:00",
    value: "19:00:00",
  },
  {
    label: "오후 07:10",
    value: "19:10:00",
  },
  {
    label: "오후 07:20",
    value: "19:20:00",
  },
  {
    label: "오후 07:30",
    value: "19:30:00",
  },
  {
    label: "오후 07:40",
    value: "19:40:00",
  },
  {
    label: "오후 07:50",
    value: "19:50:00",
  },
  {
    label: "오후 08:00",
    value: "20:00:00",
  },
  {
    label: "오후 08:10",
    value: "20:10:00",
  },
  {
    label: "오후 08:20",
    value: "20:20:00",
  },
  {
    label: "오후 08:30",
    value: "20:30:00",
  },
  {
    label: "오후 08:40",
    value: "20:40:00",
  },
  {
    label: "오후 08:50",
    value: "20:50:00",
  },
  {
    label: "오후 09:00",
    value: "21:00:00",
  },
  {
    label: "오후 09:10",
    value: "21:10:00",
  },
  {
    label: "오후 09:20",
    value: "21:20:00",
  },
  {
    label: "오후 09:30",
    value: "21:30:00",
  },
  {
    label: "오후 09:40",
    value: "21:40:00",
  },
  {
    label: "오후 09:50",
    value: "21:50:00",
  },
  {
    label: "오후 10:00",
    value: "22:00:00",
  },
  // {
  //   label: "오후 10:10",
  //   value: "22:10:00",
  // },
  // {
  //   label: "오후 10:20",
  //   value: "22:20:00",
  // },
  // {
  //   label: "오후 10:30",
  //   value: "22:30:00",
  // },
  // {
  //   label: "오후 10:40",
  //   value: "22:40:00",
  // },
  // {
  //   label: "오후 10:50",
  //   value: "22:50:00",
  // },
  // {
  //   label: "오후 11:00",
  //   value: "23:00:00",
  // },
  // {
  //   label: "오후 11:10",
  //   value: "23:10:00",
  // },
  // {
  //   label: "오후 11:20",
  //   value: "23:20:00",
  // },
  // {
  //   label: "오후 11:30",
  //   value: "23:30:00",
  // },
  // {
  //   label: "오후 11:40",
  //   value: "23:40:00",
  // },
  // {
  //   label: "오후 11:50",
  //   value: "23:50:00",
  // },
];

export const UPDATE_OPEN_TIMES_AM = [
  {
    label: "오전 06:00",
    value: "06:00",
  },
  {
    label: "오전 06:30",
    value: "06:30",
  },
  {
    label: "오전 07:00",
    value: "07:00",
  },
  {
    label: "오전 07:30",
    value: "07:30",
  },
  {
    label: "오전 08:30",
    value: "08:30",
  },
  {
    label: "오전 09:00",
    value: "09:00",
  },
  {
    label: "오전 09:30",
    value: "09:30",
  },
  {
    label: "오전 10:00",
    value: "10:00",
  },
  {
    label: "오전 10:30",
    value: "10:30",
  },
  {
    label: "오전 11:00",
    value: "11:00",
  },
  {
    label: "오전 11:30",
    value: "11:30",
  },
];

export const UPDATE_OPEN_TIMES_PM = [
  {
    label: "오후 12:00",
    value: "12:00",
  },
  {
    label: "오후 12:30",
    value: "12:30",
  },
  {
    label: "오후 01:00",
    value: "13:00",
  },
  {
    label: "오후 01:30",
    value: "13:30",
  },
  {
    label: "오후 02:00",
    value: "14:00",
  },
  {
    label: "오후 02:30",
    value: "14:30",
  },
  {
    label: "오후 03:00",
    value: "15:00",
  },
  {
    label: "오후 03:30",
    value: "15:30",
  },
  {
    label: "오후 04:00",
    value: "16:00",
  },
  {
    label: "오후 04:30",
    value: "16:30",
  },
  {
    label: "오후 05:00",
    value: "17:00",
  },
  {
    label: "오후 05:30",
    value: "17:30",
  },
  {
    label: "오후 06:00",
    value: "18:00",
  },
  {
    label: "오후 06:30",
    value: "18:30",
  },
  {
    label: "오후 07:00",
    value: "19:00",
  },
  {
    label: "오후 7:30",
    value: "19:30",
  },
  {
    label: "오후 08:00",
    value: "20:00",
  },
  {
    label: "오후 08:30",
    value: "20:30",
  },
  {
    label: "오후 09:00",
    value: "21:00",
  },
  {
    label: "오후 09:30",
    value: "21:30",
  },
  {
    label: "오후 10:00",
    value: "22:00",
  },
  {
    label: "오후 10:30",
    value: "22:30",
  },
  {
    label: "오후 11:00",
    value: "23:00",
  },
  {
    label: "오후 11:30",
    value: "23:30",
  },
];

export const DIAGNOSIS_STEPS_CANCELED = ["상담대기", "상담 실패"];

export const NOTICE_FILTER = [
  { label: "전체", value: "전체" },
  { label: "공지", value: "1" },
  { label: "일반", value: "2" },
  { label: "질문", value: "3" },
];

export const NOTICE_CONTENT_TYPE_ADMIN = [
  // 관리자
  { label: "공지", value: "1" },
  { label: "일반", value: "2" },
  { label: "질문", value: "3" },
];

export const NOTICE_CONTENT_TYPE = [
  // 사용자
  { label: "일반", value: "2" },
  { label: "질문", value: "3" },
];

import { VariantProps } from "@stitches/react";
import { StepBadgeWrapper } from "~/components";
import { DIAGNOSIS_STATUS } from "~/utils/constants";

export type BadgeStatus =
  | "waiting"
  | "ongoing"
  | "terminated"
  | "pay_ready"
  | "canceled"
  | "cs_cancel"

export type BadgeStatusKr = "대기" | "진행 중" | "종료" | "수납 대기" | "취소";

export type WaitingCardProps<Status extends BadgeStatus> = Status extends
  | "waiting"
  | "terminated"
  ? {
    id: number;
    status: Status;
    time: number;
    username: string;
    gender: string;
    age: string;
    mobile: string;
    created: string;
    private: boolean;
  }
  : {
    id: number;
    status: Status;
    time?: never;
    username: string;
    gender: string;
    age: string;
    mobile: string;
    created: string;
    private: boolean;
  };

export interface DiagnosisListResponse {
  count: number;
  totalWaiting: number;
  next: null | string;
  previous: null | string;
  results: WaitingCardProps<BadgeStatus>[];
  isAnnouncement: boolean;
}

export interface ISteps {
  label: string;
  content: React.ReactNode;
}
export type StepBadgeState = Exclude<
  VariantProps<typeof StepBadgeWrapper>["step"],
  object | undefined
>;
export type StepBadgeComponentProps<Step extends StepBadgeState> = Step extends
  | "waiting"
  | "ended"
  ? { step: Step; time: number }
  : { step: Step; time?: never };

export interface IPatient {
  age?: string;
  cancelList?: string[];
  content?: string;
  created?: string;
  fileName?: string;
  gender?: string;
  id?: number;
  mobile?: string;
  name?: string;
  price?: number;
  private?: boolean;
  privateReservation?: null;
  receptionProxy?: string;
  relation?: string;
  resRgstNum?: string;
  status?: string;
  treatmentItem?: string;
}
export interface ICompletionData {
  file: string;
  fileUrl?: string;
  fileKey?: string;
  price?: string;
}
export interface FormInputs {
  file: File;
  price: string;
}
export interface IPrescriptionStep {
  file: File;
  price: number;
  diagnosisResultId: number;
}
export interface IDeletePrescription {
  fileName: string;
  price: number;
}
export interface IFinalStep {
  diagnosisResultId: number;
  fileKey: string;
  price: number;
}

export type TermsResponse = string;

export interface BooleanResponse {
  isSuccess?: boolean;
}

export interface FileUploadResponse extends BooleanResponse {
  url?: string | undefined;
}

export interface GenerateTokenRequestPayload {
  uid: string;
  password: string;
}

export interface GenerateTokenResponse {
  isWorking?: boolean;
  token?: string;
  counselorUserId?: number;
  userSessionId?: number;
  hospitalUserId?: number;
}

export interface VerifyTokenRequestPayload {
  token: string;
}

export interface VerifyTokenResponse {
  token?: string;
  detail?: string;
}

export interface RefreshTokenRequestPayload {
  token: string;
}

export interface RefreshTokenResponse {
  token?: string;
  nonFieldErrors?: string[];
}

export interface DoctorSignUpRequestPayload {
  email: string;
  username: string;
  // gender: string;
  password: string;
  // birthdate: string;
  mobile: string;
  imageUrl: string;
  doctorLicenseUrl: string;
  specialistLicenseUrl: string;
  estimatedPayment?: number;
  specialist: number;
  treatmentSubjectIds?: number[];
  description?: string;
  bankName?: string;
  accountHolder?: string;
  accountHolderBirthdate?: string;
  accountNumber?: string;
  hospitalId?: number;
  hospitalName?: string;
  hospitalPhone?: string;
  hospitalImageUrls?: string[];
  state?: string;
  city?: string;
  postcode?: string;
  address1?: string;
  address2?: string;
  lat?: string;
  lng?: string;
}

export interface Counselor {
  email: string;
  password: string;
  mobile: string;
  username: string;
  certificate_image: string;
  bank_name: string;
  account_holder: string;
  account_holder_birthdate: string;
  account_number: string;
}

export interface CounselorPayload {
  password?: string;
  mobile: string;
  image: string;
  certificate_image: string;
  introduction: string;
  career: string;
  qualification_level: string;
  education: string;
  other_history: string;

  call_consultation_fifty_fee_day: number; //전화상담 주간 50분
  call_consultation_fifty_fee_night: number; //전화상담 야간 50분
  call_thirty_consultation_fee_day: number; //전화상담 야간 30분
  call_thirty_consultation_fee_night: number; //전화상담 주간 30분

  consultation_thirty_fee_day: number; //채팅상담 주간 30분
  consultation_thirty_fee_night: number; //채팅상담 야간 30분
  consultation_fifty_fee_day: number; // 채팅상담 주간50분
  consultation_fifty_fee_night: number; // 채팅상담 야간50분

  opening_times?: any;
  account_info?: {
    bank_name: string;
    account_holder: string;
    account_holder_birthdate: string;
    account_number: string;
  };
  counseling_subject: any;
}
export interface TogglePayload {
  is_working: boolean;
}
export interface Toggle2Payload {
  is_immediately: boolean;
}

export interface DoctorSignUpRequestPayload2 {
  email: string;
  username: string;
  password: string;
  mobile: string;
}

export type DoctorSignUpResponse = BooleanResponse;
export interface DoctorInfoResponse {
  [x: string]: any;
  hospitalUser: Hospitaluser;
  estimatedItem: Estimateditem[];
  treatmentSubject: Treatmentsubject[];
  reimbursementItem: Reimbursementitem[];
  nonReimbursementItem: Reimbursementitem[];
  hospital: Hospital;
  openingTimes: Openingtime[];
}


export interface Openingtime {
  id?: number;
  weekday: number;
  startTime: string;
  endTime: string;
  breakStTime: string;
  breakEdTime: string;
  group?: any;
};

export interface TutorialOpeningTimes {
  openingTimes: Openingtime[];
};

export interface Hospital {
  id: number;
  name: string;
  state: string;
  city: string;
  postcode: string;
  address1: string;
  address2: string;
  lat: string;
  lng: string;
  phone: string;
  isActive: boolean;
  medicalInstitutionNumber?: any;
  businessLicenseNumber?: any;
  image: string[];
}

export interface Reimbursementitem {
  id: number;
  name: string;
  isReimbursement: boolean;
  isActive: boolean;
  subject?: any;
}

export interface Treatmentsubject {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Estimateditem {
  id: number;
  name: string;
  price?: number;
  isVariable: boolean;
}

export interface Hospitaluser {
  id: number;
  email: string;
  username: string;
  mobile: string;
  birthdate: string;
  age: number;
  gender: string;
  position: string;
  specialist: string;
  description: string;
  image: string;
  estimatedPayment: number;
  approvalStatus: "standby" | "approve" | "deny" | "승인";
  isActive: boolean;
  isSatisfied: boolean;
  isPublic: boolean;
}

export interface DoctorInfoUpdatePayload {
  password: string;
  mobile: string;
  imageUrl: string;
  description: string;
  approvalStatus: string;
  estimatedPayment: number;
  estimatedItems: {
    name: string;
    price?: number;
    isVariable: boolean;
  }[];
  specialist: number;
  specialistLicenseUrl: string;
  treatmentSubjectIds: number[];
  reimbursementItemIds: number[];
  nonReimbursementItemIds: number[];
  hospitalId: number;
  hospitalImageUrls: string[];
  hospitalName: string;
  hospitalPhone: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  lat: string;
  lng: string;
}

export interface DoctorTutorialInfo {
  isTreatmentActive: boolean;
}

export interface DoctorActivate {
  isActive: boolean | undefined | any;
}
export interface DoctorOperate {
  doctorId: number | undefined
}
export interface DoctorOcr {
  isOcrRunning: boolean;
  isAnalysis: boolean;
  isMatched: boolean;
  nameFromOcr: string;
}


export type DoctorInfoUpdateResponse = BooleanResponse;

export type DoctorSubjectListResponse = {
  total: number;
  data: Treatmentsubject[];
};

export interface HospitalOpeningTimeMutationPayload {
  openingTimes: {
    weekday: number;
    startTime: string;
    endTime: string;
    breakStTime: string;
    breakEdTime: string;
  }[];
}

export type HospitalOpeningTimeMutationResponse = BooleanResponse;

export interface HospitalOpeningTimeListResponse {
  total: number;
  data: {
    id: number;
    weekday: number;
    startTime: string;
    endTime: string;
    breakStTime: string;
    breakEdTime: string;
    group: number;
  }[];
}

export interface HospitalTreatmentAndSubjectInfoResponse {
  title: string;
  desc: string;
  treatmentItem: {
    id: number;
    name: string;
    image: string;
    tag?: string[];
    isReimbursement: boolean;
  }[];
  treatmentSubject: {
    id: number;
    name: string;
  }[];
  banner: {
    name: string;
    imageUrl: string;
    redirectUrl: string;
  }[];
}

export interface DanalPhoneCertificationSuccessResult {
  success: true;
  error_code: string;
  error_msg: string;
  imp_uid: string;
  merchant_uid: string;
}
export interface DanalPhoneCertificationErrorResult {
  success: false;
  error_code: string;
  error_msg: string;
  imp_uid: string;
  merchant_uid: string;
}

export type DanalPhoneCertificationResult =
  | DanalPhoneCertificationSuccessResult
  | DanalPhoneCertificationErrorResult;

export interface DanalCertifiedUserDataResult {
  birth: number;
  birthday: string;
  ci: string;
  gender: string;
  name: string;
  phone: string;
  uniqueInSite: string;
  uniqueKey: string;
}

export type PhoneNumberCertificationResult =
  | (DanalPhoneCertificationSuccessResult & DanalCertifiedUserDataResult)
  | DanalPhoneCertificationErrorResult;
export interface PatientInfoResponse {
  id?: number;
  profile?: number;
  relation?: string;
  treatmentItem?: string;
  resRgstNum?: string;
  content?: string;
  status?: string;
  profileName?: string;
  age?: string;
  gender?: string;
  created?: string;
  mobile?: string;
  receptionProxy?: string;
  cancelList?: string[];
  price?: number;
  fileName?: string;
}
export interface CancelCallPayLoad {
  content: string;
}
export interface TerminateCallPayLoad {
  diagnosisRequestId: number;
}
export interface AddPrescriptionAndPricePayLoad {
  file: File;
  price: string;
  diagnosisResultId: string;
}

export interface AddPrescriptionAndPriceResponse {
  file: string;
  fileUrl: string;
  fileKey: string;
  price: string;
  isOcrRunning: boolean;
  isAnalysis: boolean;
  isMatched: boolean;
  nameFromOcr: string;
}
export interface DeletePrescriptionAndPricePayload {
  fileName?: string;
  price: number;
}

export interface FinalSavePayLoad {
  diagnosis_result_id: number;
  fileKey: string;
  price: number;
}

export type HospitalSearchResponse = {
  total: number;
  data: Hospital[];
};

export interface StartCallPayLoad {
  callType: string;
  isEnabledPush: boolean;
}
export type DiagnosisStatus = "waiting" | "ongoing" | "terminated";
// base types for day/time template literal types
type d = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type YYYY = `19${d}${d}` | `20${d}${d}`;
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
type DD = `0${oneToNine}` | `${1 | 2}${d}` | `3${0 | 1}`;
type hh = `0${d}` | `1${d}` | `2${0 | 1 | 2 | 3}`;
type mm = `${0 | 1 | 2 | 3 | 4 | 5}${d}`;
export type DateStringKebab = `${YYYY}-${MM}-${DD}`;
export type TimeString = `${hh}:${mm}`;

export type PrivateDiagnosisImmediately = "immediately" | "즉시";
export type PrivateDiagnosisReservation = "reservation" | "예약";

export type RequestPrivateDiagnosisPayload =
  | {
    type: PrivateDiagnosisImmediately;
    name: string;
    mobile: string;
    treatmentClassification: string;
  }
  | {
    type: PrivateDiagnosisReservation;
    name: string;
    mobile: string;
    reservedAt: number;
    treatmentClassification: string;
  };

export type PrivateDiagnosisReservationDetailResponse = {
  id: number;
  name: string;
  mobile: number;
  type: PrivateDiagnosisReservation | PrivateDiagnosisImmediately;
  status: PrivateReservationStatusType;
  reservedAt: string;
  hospitalUser: number;
  treatmentClassification: string;
};

export type RequestPrivateDiagnosisReservationUpdatePayload = {
  reservedAt: number;
};

export type RsvCanceled = "rsv_canceled" | "예약 취소";
export type RsvCompleted = "rsv_completed" | "예약 완료";
export type Waiting = "waiting" | "접수 대기";
export type DgnOnGoing = "dgn_ongoing" | "진료 진행";
export type DgnCompleted = "dgn_completed" | "진료 완료";
export type DgnCanceled = "dgn_canceled" | "진료 취소";
export type PrivateReservationStatusType =
  | RsvCanceled
  | RsvCompleted
  | Waiting
  | DgnOnGoing
  | DgnCompleted
  | DgnCanceled;

export type PrivateDiagnosisReservationListItemResponse =
  | {
    status: Waiting | DgnCompleted | RsvCanceled;
    id: number;
    username: string;
    mobile: string;
    reservedAt: number;
    patientName?: undefined;
    resRgst?: undefined;
  }
  | {
    status: RsvCompleted;
    id: number;
    username: string;
    mobile: string;
    reservedAt: string;
    patientName: string;
    resRgst: string;
  };

export interface PrivateDiagnosisReservationListResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: PrivateDiagnosisReservationListItemResponse[];
}

export type PrivateDiagnosisReservationTimeListResponse = Record<
  TimeString,
  number
>;

export type PrivateDiagnosisTreatmentListResponse = {
  total: number;
  data: string[];
};
export type DiagnosisNoticeListResponse = {
  count: number;
  next: any;
  previous: any;
  results: [];
};

export type DiagnosisPushReconnectPayload = {
  diagnosisRequestId: number;
};

export type DoctorAccountDetailsResponse = {
  id?: number;
  bankName?: string;
  accountHolder?: string;
  accountHolderBirthdate?: string;
  accountNumber?: string;
};
export type EditDoctorAccountDetailsPayload = {
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
};

export interface TreatmentItem {
  id: number;
  image: string;
  isActive: boolean;
  isReimbursement: boolean;
  name: string;
  subjectId: number | null;
}

export interface TreatmentItemListResponse {
  total: number;
  data: TreatmentItem[];
}

export interface DiagnosisDetailResponse {
  profile?: number;
  resRgstNum?: string;
  profileName?: string;
  age?: string;
  gender?: string;
  price?: number;
  fileName?: string;
  cancelList: string[];
  content: string;
  created: string;
  id: number;
  mobile: string;
  name: string;
  private: boolean;
  privateReservation: number;
  receptionProxy: string;
  relation: string;
  resRgtNum: string | null;
  status: typeof DIAGNOSIS_STATUS[keyof typeof DIAGNOSIS_STATUS];
  treatmentItem?: string;
  diagnosisNumber?: string;
  canceledReason?: { reason: string; userType: "고객" | "의사" };
  prescriptionUrl?: string;
  diagnosisResultId?: number;
  receptionType?: string;
}

export type PrivateDiagnosisImmediatelyResponse =
  | { isSuccess: true }
  | { isSuccess: false; message: string };

export type DiagnosisCancelReasonByDiagnosisResultIdResponse = {
  id: number;
  diagnosisResult: number;
  content: null;
  userType: "병원" | "고객";
  created: string;
};

export type DiagnosisCancelHistoryByHospitalUserIdResponse = {
  total: number;
  data: DiagnosisCancelReasonByDiagnosisResultIdResponse[];
};

export type TestResponse = {
  data: any;
}
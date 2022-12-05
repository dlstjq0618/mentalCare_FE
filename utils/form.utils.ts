import * as yup from "yup";
import "yup-phone-lite";
import { BANKS } from "~/utils/constants";

export const ERROR_MESSAGES = {
  name: "한글이나 영문만 입력하세요.",
  required: "필수 입력 항목입니다.",
  email: "올바른 이메일 주소 형식이 아닙니다.",
  phoneNumber: "올바른 전화번호 형식이 아닙니다.",
  sameId: "동일한 아이디로 가입한 내역이 있습니다.",
  passwordsNotMatched: "비밀번호가 일치하지 않습니다.",
  needPhoneCertification: "휴대폰 인증을 완료해주세요.",
  needProfilePic: "프로필 사진을 등록해주세요.",
  needDocLicence: "의사 면허증을 등록해주세요.",
  needHospitalRegister: "소속 병원을 등록해주세요.",
  bankAccountNotValid: "계좌 정보가 유효하지 않습니다.",
  needTermsAgreement: "약관에 동의해주세요.",
};

const mb = (mb: number) => mb * 1024 * 1024;

export const PROFILE_PIC_FILE_SIZE = 5;
export const PROFILE_PIC_FILE_TYPES: Array<"image/jpg" | "image/png"> = [
  "image/jpg",
  "image/png",
];
export const DOC_LICENSE_FILE_SIZE = 5;
export const DOC_LICENSE_FILE_TYPES: Array<"application/pdf"> = [
  "application/pdf",
];

export const passwordSchema = yup.object().shape({
  password: yup.string().required(ERROR_MESSAGES.required),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], ERROR_MESSAGES.passwordsNotMatched)
    .required("비밀번호를 확인해주세요."),
});

export const registerFormSchema = yup
  .object({
    email: yup
      .string()
      .email(ERROR_MESSAGES.email)
      .required(ERROR_MESSAGES.required),
    username: yup.string().required(ERROR_MESSAGES.required),
    mobile: yup
      .string()
      .phone("KR", "휴대폰을 인증해주세요.")
      .required("휴대폰을 인증해주세요."),
    certificate_image: yup.string().required("상담자격증을 등록해주세요."),
    qualification_level: yup.string().required("자격급수를 등록해주세요."),
    career: yup.string().required("경력 증명서를 등록해주세요."),
    education: yup.string().required("학력을 등록해주세요."),
    other_history: yup.string().required("기타 이력서를 등록해주세요."),
    termsChecked: yup
      .string()
      .oneOf(["true"], "약관에 동의해주세요.")
      .default("true"),
    accountHolder: yup.string().required("예금주명을 입력해주세요."),
    accountHolderBirthdate: yup.string().required("생년월일을 입력해주세요."),
    bankName: yup
      .string()
      .oneOf(Object.values(BANKS), "은행을 선택해주세요.")
      .required("은행을 선택해주세요."),
    accountNumber: yup.string().required("계좌번호를 입력해주세요."),
  })
  .concat(passwordSchema);

export const registerFormSchema2 = yup
  .object({
    email: yup
      .string()
      .email(ERROR_MESSAGES.email)
      .required(ERROR_MESSAGES.required),
    username: yup.string().required(ERROR_MESSAGES.required),
    mobile: yup
      .string()
      .phone("KR", "휴대폰을 인증해주세요.")
      .required("휴대폰을 인증해주세요."),
    certificate_image: yup.string().required("상담자격증을 등록해주세요."),
    termsChecked: yup
      .string()
      .oneOf(["true"], "약관에 동의해주세요.")
      .default("true"),
    accountHolder: yup.string().required("예금주명을 입력해주세요."),
    accountHolderBirthdate: yup.string().required("생년월일을 입력해주세요."),
    bankName: yup
      .string()
      .oneOf(Object.values(BANKS), "은행을 선택해주세요.")
      .required("은행을 선택해주세요."),
    accountNumber: yup.string().required("계좌번호를 입력해주세요."),
  })
  .concat(passwordSchema);

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  password: yup.string().required(ERROR_MESSAGES.required),
});

import { DIAGNOSIS_STATUS } from "./constants";

export const getDiagnosisStatus = (
  status?: typeof DIAGNOSIS_STATUS[keyof typeof DIAGNOSIS_STATUS]
) => {
  switch (status) {
    case DIAGNOSIS_STATUS.WAITING:
    case DIAGNOSIS_STATUS.WAITING_KR:
      return DIAGNOSIS_STATUS.WAITING;
    case DIAGNOSIS_STATUS.IN_PROGRESS:
    case DIAGNOSIS_STATUS.IN_PROGRESS_KR:
      return DIAGNOSIS_STATUS.IN_PROGRESS;
    case DIAGNOSIS_STATUS.PAY_READY:
    case DIAGNOSIS_STATUS.PAY_READY_KR:
      return DIAGNOSIS_STATUS.PAY_READY;
    case DIAGNOSIS_STATUS.FINISHED:
    case DIAGNOSIS_STATUS.FINISHED_KR:
      return DIAGNOSIS_STATUS.FINISHED;
    case DIAGNOSIS_STATUS.CANCELED:
    case DIAGNOSIS_STATUS.CANCELED_KR:
      return DIAGNOSIS_STATUS.CANCELED;
    default:
      return "noop" as const;
  }
};

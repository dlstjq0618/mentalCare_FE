import { FC, useEffect } from "react";
import {
  WaitingStep,
  OnGoingStep,
  PayReadyStep,
  FinalStep,
  CanceledStep,
} from "~/components/treatmentRoom/treatmentProgress";
import { DiagnosisDetailResponse, FormInputs, IFinalStep } from "~/interfaces";

interface Props {
  current: number;
  isCalling: boolean;
  completionData: any;
  status?: string;
  fileName?: string;
  price?: string;
  nextStep: () => void;
  voiceCallHandler: () => void;
  videoCallHandler: () => void;
  endCallHandler: () => void;
  retryCallHandler: () => void;
  submitPrescription: (data: FormInputs) => void;
  finalData: IFinalStep;
  canceledReason?: DiagnosisDetailResponse["canceledReason"];
}

export const TreatmentProgress: FC<Props> = (props) => {

  const steps = [
    {
      label: "진료대기",
      content: (
        <WaitingStep
          voiceCallHandler={props.voiceCallHandler}
          videoCallHandler={props.videoCallHandler}
          endCallHandler={props.endCallHandler}
        />
      ),
    },
    {
      label: "진료중",
      content: <OnGoingStep endCallHandler={props.endCallHandler} />,
    },
    {
      label: "진료 종료",
      content: (
        <PayReadyStep
          submitPrescription={props.submitPrescription}
          completionData={props.completionData}
          nextStep={props.nextStep}
          finalData={props.finalData}
        />
      ),
    },
    {
      label: "처방전 등록, 수납",
      content: <FinalStep />,
    },
    {
      label: "진료 실패",
      content: <CanceledStep />,
    },
  ];

  return <>{steps[props.current].content}</>;
};

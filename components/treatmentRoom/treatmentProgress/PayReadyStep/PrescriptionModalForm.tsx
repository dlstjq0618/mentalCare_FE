import { rem } from "polished";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PrescriptionViewerModal } from "./PrescriptionViewerModal";
import { Div, Input, RoundedButton } from "~/components";
import {
  useFinalSaveMutation,
  useGetDiagnosisDetailQuery,
} from "~/services/diagnosis";
import { styled } from "~/stitches.config";
import {
  selectDiagnosisDetailPrescription,
  selectDiagnosisDetailRequestId,
  selectDiagnosisDetailResultId,
} from "~/store/diagnosisDetailSlice";
import { selectWaitingData, setWaitingData } from "~/store/settingsSlice"
import { api } from "~/woozooapi";

const Wrapper = styled("div", {
  width: "100%",
  ".main": {
    display: "flex",
    flexDirection: "column",
    label: {
      fontSize: rem(14),
      color: "$gray01",
    },
    ".prescription-input": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      margin: `${rem(10)} 0 ${rem(19)}`,
      button: {
        position: "absolute",
        right: rem(28.6),
        top: "50%",
        transform: "translateY(-50%)",
        border: "none",
        width: rem(34),
        height: rem(34),
      },
    },
    ".fee-input": {
      position: "relative",
      margin: `${rem(10)} 0 ${rem(19)}`,
      span: {
        position: "absolute",
        right: rem(28.6),
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
    [`& ${Input}`]: {
      margin: 0,
      width: "100%",
    },
  },
});
interface Props {
  close: () => void;
  nextStep: () => void;
  price?: string;
  fileName: string;
  url?: string;
}

export const PrescriptionModalForm: React.FC<Props> = ({ ...props }) => {
  const [show, setShow] = useState<boolean>(false);
  const modalState = useSelector(selectWaitingData);
  const dispatch = useDispatch();
  const prescriptionData = useSelector(selectDiagnosisDetailPrescription);
  const diagnosisRequestId = useSelector(selectDiagnosisDetailRequestId);
  const diagnosis_result_id = useSelector(selectDiagnosisDetailResultId);
  const [finalSave, { isLoading: isSaving }] = useFinalSaveMutation();

  const { refetch: refreshDiagnosisDetail } =
    useGetDiagnosisDetailQuery(diagnosisRequestId);

  const closeViewer = () => {
    setShow(false);
  };

  const openViewer = () => {
    setShow(true);
  };
  const priceComma: number = Number(prescriptionData?.price?.replaceAll(",", ""));
  const priceValue = priceComma?.toLocaleString();

  const finalStep = () => {
    if (diagnosis_result_id === undefined) {
      alert("진단 결과 id가 없습니다.");
      return;
    }
    finalSave({
      fileKey: prescriptionData.fileKey ?? "",
      price: Number(prescriptionData.price),
      diagnosis_result_id,
    }).then((res: any) => {
      refreshDiagnosisDetail();
    })
      .catch((err) => console.log(err));
  };

  const finalStep2 = () => {
    if (diagnosis_result_id === undefined) {
      alert("진단 결과 id가 없습니다.");
      return;
    }
    if (prescriptionData.fileKey) {
      finalSave({
        fileKey: prescriptionData.fileKey ?? "",
        price: Number(prescriptionData.price),
        diagnosis_result_id,
      }).then((res) => {
        refreshDiagnosisDetail();
      })
        .catch((err) => console.log(err));
    } else {
      finalSave({
        fileKey: prescriptionData.fileKey ?? "",
        price: Number(prescriptionData.price),
        diagnosis_result_id,
      }).then((res) => {
        refreshDiagnosisDetail();
      })
        .catch((err) => console.log(err));
    }
  };

  const deleteData = () => {
    api.diagnosis
      .delete({
        fileName: prescriptionData.fileName,
        price: Number(prescriptionData.price),
      })
      .then((res) => {
        props.close();
      })
      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
  }, [modalState])

  return (
    <Wrapper>
      {
        modalState ?
          <div className="main">
            <label>처방전</label>
            <Div className="prescription-input">
              <Input
                shape="prescription"
                placeholder="등록된 처방전이 없습니다."
                value={prescriptionData.fileName ?? ""}
                disabled
                css={{
                  backgroundColor: "$gray08",
                  textDecoration: "none",
                  "&::placeholder": {
                    color: "$gray04",
                  },
                }}
              />
              {prescriptionData.fileName && (
                <Div
                  role="button"
                  onClick={openViewer}
                  css={{
                    position: "absolute",
                    right: "1.275rem",
                    cursor: "pointer",
                    color: "$primary",
                    textDecoration: "underline",
                  }}
                >
                  처방전 보기
                </Div>
              )}
            </Div>
            <Div
              css={{
                display: "flex",
                justifyContent: "space-between",
                margin: `${rem(21)} 0 ${rem(8)}`,
                gap: rem(12),
              }}
            >
              <RoundedButton
                color="black"
                css={{ width: 113, height: 50 }}
                onClick={deleteData}
              >
                취소
              </RoundedButton>
              <RoundedButton
                disabled={isSaving}
                color="orange"
                type="submit"
                css={{ flex: 1, height: 50 }}
                onClick={finalStep2}
              >
                처방전 재등록
              </RoundedButton>
            </Div>
          </div>
          :
          <div className="main">
            <label>처방전</label>
            <Div className="prescription-input">
              <Input
                shape="prescription"
                placeholder="등록된 처방전이 없습니다."
                value={prescriptionData.fileName ?? ""}
                disabled
                css={{
                  backgroundColor: "$gray08",
                  textDecoration: "none",
                  "&::placeholder": {
                    color: "$gray04",
                  },
                }}
              />
              {prescriptionData.fileName && (
                <Div
                  role="button"
                  onClick={openViewer}
                  css={{
                    position: "absolute",
                    right: "1.275rem",
                    cursor: "pointer",
                    color: "$primary",
                    textDecoration: "underline",
                  }}
                >
                  처방전 보기
                </Div>
              )}
            </Div>
            <label>진료비</label>
            <Div className="fee-input">
              <Input
                shape="treatmentRoom"
                css={{
                  backgroundColor: "$gray08",
                  padding: "11.4px 46.5px 11.4px 55.8px",
                  color: "$gray01",
                }}
                disabled
                value={priceValue}
              />
              <span aria-label="currency">원</span>
            </Div>

            <Div
              css={{
                display: "flex",
                justifyContent: "space-between",
                margin: `${rem(21)} 0 ${rem(8)}`,
                gap: rem(12),
              }}
            >
              <RoundedButton
                color="black"
                css={{ width: 113, height: 50 }}
                onClick={deleteData}
              >
                취소
              </RoundedButton>
              <RoundedButton
                disabled={isSaving}
                color="orange"
                type="submit"
                css={{ flex: 1, height: 50 }}
                onClick={finalStep}
              >
                진료비 결제를 요청합니다
              </RoundedButton>
            </Div>
          </div>
      }
      <PrescriptionViewerModal
        url={prescriptionData.fileUrl}
        close={closeViewer}
        showDialog={show}
      />
    </Wrapper>
  );
};

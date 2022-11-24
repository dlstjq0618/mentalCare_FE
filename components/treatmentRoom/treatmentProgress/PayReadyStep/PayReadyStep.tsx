import { rem } from "polished";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DevTool } from "@hookform/devtools";
import { ICompletionData, FormInputs, IFinalStep } from "interfaces";
import { PrescriptionSaveForm } from "./PrescriptionSaveForm";
import { Form, BaseDialog, BaseDialog2, LoadDialog, RoundedButton, PrescriptionModalForm, BigNoticeIcon } from "~/components";
import { P, Span } from "~/components/Elements";
import { useAddPrescriptionAndPriceMutation, useGetDiagnosisDetailQuery } from "~/services/diagnosis";
import { styled } from "~/stitches.config";
import {
  setDiagnosisDetailPrescriptionState,
  selectDiagnosisDetailPrescription,
  selectDiagnosisDetailResultId,
  setDiagnosisDetailPrescription,
  selectDiagnosisDetailPrescriptionState,
  selectDiagnosisDetailRequestId,
} from "~/store/diagnosisDetailSlice";
import GetLottie from "../../../lottie/GetLottie"
import { selectWaitingData } from "~/store/settingsSlice";
import { api } from "~/woozooapi"
import { consoleSandbox } from "@sentry/utils";


const ModalText = styled("div", {
  margin: `${rem(15)} 0 ${rem(26)}`,
  fontSize: rem(16),
  letterSpacing: "normal",
  textAlign: "center",
  '[aria-label = "orange"]': {
    color: "$primary",
  },
  '[aria-label="gray"]': {
    display: "inline-block",
    marginTop: rem(6),
    fontSize: rem(13),
    color: "$gray03",
  },
});

export const PayReadyStep: React.FC<{
  submitPrescription: (data: FormInputs) => void;
  completionData: ICompletionData;
  nextStep: () => void;
  finalData: IFinalStep;
}> = ({ ...props }) => {
  const methods = useForm<FormInputs>({
    mode: "onSubmit",
    defaultValues: {
      price: "0",
    },
  });
  // url 변경 diagnosis)result_id => id
  const diagnosisResultId = useSelector(selectDiagnosisDetailResultId);
  const [addPrescriptionAndPrice] = useAddPrescriptionAndPriceMutation();
  const dispatch = useDispatch();
  const prescriptionData = useSelector(selectDiagnosisDetailPrescription);
  const prescriptionState = useSelector(selectDiagnosisDetailPrescriptionState);
  const diagnosisRequestId = useSelector(selectDiagnosisDetailRequestId);
  const userDetailState = useGetDiagnosisDetailQuery(diagnosisRequestId);
  const [ocrName, setOcrName] = useState("")
  const [prescriptionName, setPrescriptionName] = useState<any>()
  const [fileDelete, setFileDelete] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const modalState = useSelector(selectWaitingData);
  const [error, setError] = useState("")

  const open = () => setShow(true);
  const open2 = () => setShow2(true)
  const close2 = () => setShow2(false)
  const close = () => {
    setShow(false);
  };
  const handleOcrPrescription = () => {
    close2();
    open();
  }
  const handleCancel = () => {
    close2();
    setFileDelete(true)
  }

  useEffect(() => {
    if (error === "FETCH_ERROR") {
      alert("file error");
      dispatch(setDiagnosisDetailPrescriptionState(false))
      setError("")
    }
  }, [error])

  const onSubmit = async (data: FormInputs) => {
    const payload = new FormData();
    payload.append("file", data.file);
    payload.append("price", data.price);
    payload.append("diagnosis_result_id", String(diagnosisResultId));
    setPrescriptionName(data.file)
    addPrescriptionAndPrice(payload).then((e: any) => setError(e.error?.status))
    if (Number(data.price) > 0 && Number(data.price) < 100) {
      alert(`금액을 확인해주세요.(100원 이하 입력불가)`)
      dispatch(setDiagnosisDetailPrescriptionState(false))
    } else {
      try {
        const result = await addPrescriptionAndPrice(payload).unwrap()
        if (result) {
          dispatch(setDiagnosisDetailPrescriptionState(false))
          setOcrName(result.nameFromOcr);
        }

        if (!data.file) {
          dispatch(
            setDiagnosisDetailPrescription({
              fileName: result.file,
              fileUrl: result.fileUrl,
              price: result.price,
              fileKey: result.fileKey,
            })
          );
          open();
        }

        if (result.isOcrRunning && result.isAnalysis && !result.isMatched) {
          dispatch(
            setDiagnosisDetailPrescription({
              fileName: result.file,
              fileUrl: result.fileUrl,
              price: result.price,
              fileKey: result.fileKey,
            })
          );
          open2()

        } else {
          dispatch(
            setDiagnosisDetailPrescription({
              fileName: result.file,
              fileUrl: result.fileUrl,
              price: result.price,
              fileKey: result.fileKey,
            })
          );
          open();
        }

      } catch (e: any) {
        const result = await addPrescriptionAndPrice(payload).unwrap()
        dispatch(setDiagnosisDetailPrescriptionState(false));
        console.log("error", e);
        dispatch(
          setDiagnosisDetailPrescription({
            fileName: result.file,
            fileUrl: result.fileUrl,
            price: result.price,
            fileKey: result.fileKey,
          })
        );
        open();
      }
    }
  };

  return (
    <>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <PrescriptionSaveForm state={fileDelete} />
          {prescriptionName && prescriptionState === true ?
            <LoadDialog showDialog={prescriptionState} close={close}>
              <span style={{
                fontWeight: "bold",
                height: rem(26),
                margin: "0 0 13px",
                marginTop: rem(7),
                fontSize: rem(22),
                lineHeight: 1.2,
                textAlignLast: "center",
              }}>처방전 등록 오류 방지를 위해<br />
                OCR 인식 중입니다.</span>
              <span style={{
                height: rem(34),
                margin: "13px, 57px 28px 56px",
                fontSize: rem(14),
                lineHeight: 1.2,
                color: "rgba(0, 0, 0, 0.5)",
                textAlign: "center",
                padding: rem(26)
              }}>
                잠시만 기다려주세요.<br />약 5초 내외로 완료됩니다.
              </span>
              <GetLottie />
            </LoadDialog>
            :
            <>
              <BaseDialog2 showDialog={show2} close={close2}>
                <span style={{
                  height: rem(52),
                  flexGrow: 0,
                  margin: "0.875rem 0 1.875rem 0",
                  fontSize: rem(20),
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  textAlign: "center",
                  color: "#000",
                }}>
                  접수환자 이름과
                  <strong style={{ color: "#eb541e" }}>
                    처방전 이름
                  </strong>이 같은지
                  <br />
                  다시 한번 확인해 주세요
                </span>
                <span style={{
                  fontSize: rem(12),
                  textAlign: "center",
                  marginBottom: rem(24)
                }}>처방전 인식 프로그램이 학습 중이므로 결과가 다르게 나올 수 있습니다.
                  <br />
                  이런 경우에는
                  <span style={{ color: "red" }}>
                    이대로 등록하기
                  </span>
                  로 강제 진행 해주세요.
                </span>
                <span style={{
                  width: "100%",
                  height: rem(21),
                  flexGrow: 0,
                  margin: "1.875rem 10.625 0.625rem 0",
                  fontSize: rem(15),
                  lineHeight: 1.4,
                  textAlign: "left",
                  color: "#333",
                  alignItems: "normal"
                }}>
                  접수 환자 이름
                </span>
                <div style={{
                  width: "100%",
                  height: rem(50),
                  flexGrow: 0,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 10,
                  margin: "10px 24px 20px 0",
                  padding: "14px 30px",
                  borderRadius: rem(100),
                  border: "solid 1px #f1f1f1",
                  backgroundColor: "#f7f7f7",
                }}>
                  <span style={{
                    width: "100%",
                    height: rem(22),
                    flexGrow: 0,
                    fontSize: rem(15),
                    fontWeight: "bold",
                    lineHeight: 1.4,
                    color: "#333",
                  }}>
                    {userDetailState.data?.name}
                  </span>
                </div>
                <span style={{
                  width: "100%",
                  height: rem(21),
                  flexGrow: 0,
                  margin: "1.875rem 10.625 0.625rem 0",
                  fontSize: rem(15),
                  lineHeight: 1.4,
                  textAlign: "left",
                  color: "#333",
                  alignItems: "normal"
                }}>
                  처방전 발급자명
                </span>
                <div style={{
                  width: "100%",
                  height: rem(50),
                  flexGrow: 0,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 10,
                  margin: "10px 24px 20px 0",
                  padding: "14px 30px",
                  borderRadius: rem(100),
                  border: "solid 1px #fbe3da",
                  backgroundColor: "#fff7f4",
                }}>
                  <span style={{
                    width: "100%",
                    height: rem(22),
                    flexGrow: 0,
                    fontSize: rem(15),
                    fontWeight: "bold",
                    lineHeight: 1.4,
                    color: "#333",
                  }}>
                    {ocrName}
                  </span>
                </div>
                <RoundedButton
                  onClick={handleOcrPrescription}
                  color="orange2"
                  outlined
                  css={{
                    boxShadow: "none",
                    fontSize: rem(15),
                    margin: "30px 24px 12px 0",
                    height: rem(50),
                    width: "100%",
                  }}
                >
                  이대로 등록하기
                </RoundedButton>
                <RoundedButton
                  onClick={handleCancel}
                  color="orange"
                  css={{
                    fontSize: rem(15),
                    margin: "12px 24px 0 0",
                    height: rem(50),
                    width: "100%",
                  }}
                >
                  처방전 다시 올리기
                </RoundedButton>
              </BaseDialog2>
              <BaseDialog showDialog={show} close={close}>
                <BigNoticeIcon />
                {
                  modalState ?
                    <ModalText>
                      {prescriptionData.fileName ? (
                        <>
                          <P
                            css={{
                              marginBottom: rem(7),
                              lineHeight: 1.3,
                              strong: {
                                fontWeight: "normal",
                                color: "$primary",
                                paddingBottom: rem(8),
                              },
                            }}
                          >
                            <Span css={{ fontWeight: "bold" }}>처방전을 다시 등록합니다.</Span>
                          </P>
                        </>
                      ) : (
                        <P
                          css={{
                            strong: { fontWeight: "normal", color: "$primary" },
                          }}
                        >
                          처방전을 <strong>등록하지 않고</strong>
                          <br />
                          <strong>진료비 결제</strong>만 요청하시겠습니까?
                        </P>
                      )}
                    </ModalText>
                    :
                    <ModalText>
                      {prescriptionData.fileName ? (
                        <>
                          <P
                            css={{
                              marginBottom: rem(7),
                              lineHeight: 1.3,
                              strong: {
                                fontWeight: "normal",
                                color: "$primary",
                                paddingBottom: rem(8),
                              },
                            }}
                          >
                            <strong>처방전</strong>과 <strong>진료비</strong>를
                            확인해주세요.
                          </P>
                          <P css={{ color: "$gray03", fontSize: rem(12) }}>
                            <span>등록 후 진료비 수정이 불가능하며,</span><br />
                            <span>부득이한 경우 약국에서 다른 약품으로 처방전 교체 발급</span><br />
                            <span>요청이 있을 수 있습니다.</span>
                          </P>
                        </>
                      ) : (
                        <P
                          css={{
                            strong: { fontWeight: "normal", color: "$primary" },
                          }}
                        >
                          처방전을 <strong>등록하지 않고</strong>
                          <br />
                          <strong>진료비 결제</strong>만 요청하시겠습니까?
                        </P>
                      )}
                    </ModalText>
                }
                <PrescriptionModalForm
                  fileName={prescriptionData.fileName ?? ""}
                  price={prescriptionData.price}
                  close={close}
                  url={prescriptionData.previewUrl}
                  nextStep={props.nextStep}
                />
              </BaseDialog>
            </>
          }
        </FormProvider>
        <DevTool control={methods.control} />
      </Form>
    </>
  );
};

import { rem } from "polished";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Div,
  RoundedButton,
  FileDropInput,
  Input,
  ExpandIcon,
  DelIcon,
  TickedIcon,
  IconButton,
  Label,
  PrescriptionViewerModal,
  Span,
  BigNoticeIcon,
} from "~/components";
import { AlertDialog } from "~/components/Dialog";
import { FormFieldErrorMessage } from "~/components/FormFieldErrorMessage";
import { P } from "~/components/Elements";
import {
  selectDiagnosisDetailPrescription,
  setDiagnosisDetailPrescription,
  setDiagnosisDetailPrescriptionState,
} from "~/store/diagnosisDetailSlice";
import { setWaitingData, selectWaitingData } from "~/store/settingsSlice"
import { ContentPasteOffSharp } from "@mui/icons-material";

interface PrescriptionSaveProps {
  state: boolean
};

const FEE_VALUE = [
  { amount: "0", text: "0원" },
  { amount: "5,000", text: "5천원" },
  { amount: "10,000", text: "1만원" },
  { amount: "20,000", text: "2만원" },
  { amount: "30,000", text: "3만원" },
  { amount: "50,000", text: "5만원" },
];

export const PrescriptionSaveForm = (props: PrescriptionSaveProps) => {
  const {
    register,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  const [showViewer, setShowViewer] = useState<boolean>(false);
  const dispatch = useDispatch();
  const previewUrl = useSelector(selectDiagnosisDetailPrescription)?.previewUrl;

  const selectedFile = watch("file");
  const [textValue, setTextValue] = useState("");

  const replacePriceValue = Number(textValue.replace(/\,/g, ""));

  const handlePrescriptionState = () => {
    dispatch(setDiagnosisDetailPrescriptionState(true))
    setValue("price", replacePriceValue)
  }
  const handlePrescriptionReUploadState = () => {
    dispatch(setDiagnosisDetailPrescriptionState(true))
    dispatch(setWaitingData(true))
  }

  useEffect(() => {
    if (!selectedFile) return;

    const previewUrl = URL.createObjectURL(selectedFile);
    dispatch(setDiagnosisDetailPrescription({ previewUrl }));

    trigger("file");
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [dispatch, selectedFile, setValue, trigger]);

  const handlePrescriptionFile = async (file: File) => {
    setValue("file", file);
  };

  const onlyNumberText1 = (data: string) => {
    setTextValue(data)
    if (data) {
      const replaceData = data.replace(/[^0-9]/g, "")
      const removedCommaValue: number = Number(replaceData.replaceAll(",", ""))
      return setTextValue(removedCommaValue.toLocaleString())
    }
  };

  return (
    <>
      {/* {
        <>
          <Div css={{ display: "grid", gridTemplateColumns: `${rem(140)} 1fr` }}>
            <div>
              {""}
            </div>
            <div style={{ display: "flex" }}>
              <BigNoticeIcon />
              <div style={{ fontSize: "19px", fontWeight: "bold", lineHeight: 1.4 }}>
                <span style={{
                  margin: "0 0 0 7px",
                  color: "#eb541e"
                }}>처방전</span>
                을
                <span style={{
                  margin: "0 0 0 7px",
                  color: "#eb541e"
                }}>다시등록</span>해 주세요.
              </div>
            </div>
          </Div>
          <Div css={{ display: "grid", gridTemplateColumns: `${rem(140)} 1fr`, marginTop: "29px" }}>
            <Label>요청자</Label>
            <span style={{ marginBottom: "13px", fontSize: "15px", fontWeight: "bold", lineHeight: 1.4, textAlign: "left", color: "#333" }}>
              {"밝은중앙약국"}
            </span>
          </Div>
          <Div css={{ display: "grid", gridTemplateColumns: `${rem(140)} 1fr` }}>
            <Label>사유</Label>
            <span style={{ marginBottom: "13px", fontSize: "15px", lineHeight: 1.4, textAlign: "left", color: "#333" }}>
              {"후시딘을 더마톱 10mg으로 변경하여 발급해 주세요. 안되면 마데카솔로 처방해 주셔도 됩니다."}
            </span>
          </Div>
          <Div css={{ display: "grid", gridTemplateColumns: `${rem(140)} 1fr` }}>
            <Label data-custom>처방전 등록</Label>
            <Div
              css={{
                margin: `${rem(10)} 0 ${rem(20)}`,
                ".hide": {
                  position: "absolute",
                  left: rem(-999999),
                  height: 0,
                  width: 0,
                },
              }}
            >
              {selectedFile && (
                <Div
                  css={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "$fileInputBgColor",
                    paddingLeft: rem(20),
                    margin: `${rem(10)} 0 ${rem(19)}`,
                    border: "1px solid #e6e6e6",
                    height: rem(50),
                    borderRadius: rem(100),
                    button: {
                      border: "none",
                      backgroundColor: "transparent",
                      width: rem(34),
                      height: rem(34),
                    },
                  }}
                >
                  {selectedFile.name}
                  <Div
                    css={{
                      position: "absolute",
                      display: "flex",
                      gap: rem(8),
                      alignItems: "center",
                      top: "50%",
                      right: rem(7),
                      transform: "translateY(-50%)",
                    }}
                  >
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowViewer(true);
                      }}
                    >
                      <ExpandIcon />
                    </button>
                    <IconButton
                      onClick={() => {
                        setValue("file", null);
                      }}
                    >
                      <DelIcon />
                    </IconButton>
                  </Div>
                </Div>
              )}
              <Div
                className={selectedFile ? "hide" : undefined}
                css={{
                  ".fileDrag": {
                    color: "$primary",
                    fontSize: rem(15),
                  },
                }}
              >
                <Controller
                  name="file"
                  control={control}
                  render={() => <FileDropInput handleFile={handlePrescriptionFile} />}
                />
                {errors.file && (
                  <FormFieldErrorMessage css={{ marginTop: rem(6) }}>
                    {errors.file.message}
                  </FormFieldErrorMessage>
                )}
              </Div>
            </Div>
            <RoundedButton
              onClick={handlePrescriptionReUploadState}
              css={{
                gridColumn: "2/3",
                height: rem(50),
                marginTop: rem(30),
              }}
              color="orange"
              type="submit"
            >
              <TickedIcon />
              <span>등록 완료</span>
            </RoundedButton>
            {
              previewUrl && (
                <PrescriptionViewerModal
                  url={previewUrl}
                  close={() => setShowViewer(false)}
                  showDialog={showViewer}
                />
              )
            }
          </Div >
        </>
      } */}
      <Div css={{ display: "grid", gridTemplateColumns: `${rem(140)} 1fr` }}>
        <Label data-custom>처방전 등록</Label>
        <Div
          css={{
            margin: `${rem(10)} 0 ${rem(20)}`,
            ".hide": {
              position: "absolute",
              left: rem(-999999),
              height: 0,
              width: 0,
            },
          }}
        >
          {selectedFile && (
            <Div
              css={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                backgroundColor: "$fileInputBgColor",
                paddingLeft: rem(20),
                margin: `${rem(10)} 0 ${rem(19)}`,
                border: "1px solid #e6e6e6",
                height: rem(50),
                borderRadius: rem(100),
                button: {
                  border: "none",
                  backgroundColor: "transparent",
                  width: rem(34),
                  height: rem(34),
                },
              }}
            >
              {selectedFile.name}
              <Div
                css={{
                  position: "absolute",
                  display: "flex",
                  gap: rem(8),
                  alignItems: "center",
                  top: "50%",
                  right: rem(7),
                  transform: "translateY(-50%)",
                }}
              >
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowViewer(true);
                  }}
                >
                  <ExpandIcon />
                </button>
                <IconButton
                  onClick={() => {
                    setValue("file", null);
                  }}
                >
                  <DelIcon />
                </IconButton>
              </Div>
            </Div>
          )}
          <Div
            className={selectedFile ? "hide" : undefined}
            css={{
              ".fileDrag": {
                color: "$primary",
                fontSize: rem(15),
              },
            }}
          >
            <Controller
              name="file"
              control={control}
              render={() => <FileDropInput handleFile={handlePrescriptionFile} />}
            />
            {errors.file && (
              <FormFieldErrorMessage css={{ marginTop: rem(6) }}>
                {errors.file.message}
              </FormFieldErrorMessage>
            )}
          </Div>
        </Div>
        <label data-custom>진료비 입력</label>
        <Div>
          <Div
            css={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <Input
              value={textValue}
              required
              shape="treatmentRoom"
              css={{ width: "100%" }}
              min={0}
              {...register("price", {
                required: true, onChange: (e) => {
                  onlyNumberText1(e.target.value)
                }
              })}
            />
            <Span css={{ position: "absolute", right: rem(60) }}>원</Span>
            <IconButton
              css={{ position: "absolute", right: rem(10) }}
              onClick={() => setValue("price", "")}
            >
              <DelIcon />
            </IconButton>
          </Div>
          <Div css={{ display: "flex", alignItems: "center", gap: rem(5) }}>
            {FEE_VALUE.map((item, index) => (
              <RoundedButton
                key={index}
                type="button"
                color="gray"
                css={{
                  width: rem(62),
                  height: rem(40),
                  "@bp1": { width: "100%" },
                }}
                onClick={() => onlyNumberText1(item.amount)}
              >
                {item.text}
              </RoundedButton>
            ))}
          </Div>
        </Div>
        <RoundedButton
          onClick={handlePrescriptionState}
          css={{
            gridColumn: "2/3",
            height: rem(50),
            marginTop: rem(30),
          }}
          color="orange"
          type="submit"
        >
          <TickedIcon />
          <span>입력 완료</span>
        </RoundedButton>
        {
          previewUrl && (
            <PrescriptionViewerModal
              url={previewUrl}
              close={() => setShowViewer(false)}
              showDialog={showViewer}
            />
          )
        }
      </Div >
    </>
  );
};

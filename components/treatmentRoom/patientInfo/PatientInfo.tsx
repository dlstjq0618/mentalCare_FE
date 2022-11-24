import { rem } from "polished";
import { PatientInfoHeader, LeftColumn, RightColumn } from "./Styles";
import { Div, Section, Span } from "~/components";
import { toDashedPhoneNumber } from "~/utils/phone.utils";
import { DiagnosisDetailResponse } from "~/interfaces";
import useCopyClipBoard from "~/utils/hook/useCopyClipBoard";
import styled from "styled-components";

const StyledButton = styled.button`
width: ${rem(33)};
  height: ${rem(20)};
  flex-grow: 0;
  margin-left: ${rem(5)};
  padding: ${rem(1)} ${rem(4)} ${rem(2)};
  border-radius: ${rem(3)};
  border: solid 1px #a6a6a6;
  background: white;
  padding: 0;
  cursor: pointer;
  &:active {
    border: 1px solid #5A5A5A;
    position: relative;
  }
`;

const StyledSpan = styled.div`
  flex-grow: 0;
  font-family: NotoSansCJKKR;
  font-size:${rem(11)};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #7d7d7d;
  &:active {
    color: #5A5A5A;
  }
`;



interface IPatientProps {
  diagnosisDetailData?: DiagnosisDetailResponse | undefined;
}

export const PatientInfo = (props: IPatientProps) => {


  const isPrivate = props.diagnosisDetailData?.private;
  const [isCopy, onCopy] = useCopyClipBoard();

  const handleCopyClipBoard = (text: any) => {
    onCopy(text);
  };


  return (
    <>
      {
        props.diagnosisDetailData ?
          <>
            <PatientInfoHeader>
              <span>
                환자 정보{" "}
                <span data-custom>{props.diagnosisDetailData?.diagnosisNumber}</span>
              </span>
              <span data-custom>진료신청: {props.diagnosisDetailData?.created}</span>
            </PatientInfoHeader>
            <Section
              css={{
                display: "grid",
                gridTemplateColumns: `${rem(140)} 1fr`,
                backgroundColor: "$white",
                borderTopRightRadius: rem(20),
                borderTopLeftRadius: rem(20),
                paddingTop: rem(10),
                div: {
                  borderRight: "none",
                },
              }}
            >
              <LeftColumn>
                <span aria-label="name">{props.diagnosisDetailData?.name}
                  <StyledButton style={{ position: "absolute", top: "16.1rem" }} onClick={() => handleCopyClipBoard(props.diagnosisDetailData?.name)}>
                    <StyledSpan>복사</StyledSpan>
                  </StyledButton></span>
              </LeftColumn>
              <RightColumn
                css={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: "1px dashed $gray06",
                  "& [data-custom]": {
                    color: "$primary",
                    fontSize: rem(16),
                    marginTop: rem(2),
                  },
                }}
              >
                <Div
                  css={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: rem(8),
                    color: "$gray01",
                    fontSize: rem(15),
                  }}
                >
                  {props.diagnosisDetailData?.age ||
                    (props.diagnosisDetailData?.gender && (
                      <div>
                        {props.diagnosisDetailData?.gender} / {props.diagnosisDetailData?.age} 세
                      </div>
                    ))}
                  <div>
                    {props.diagnosisDetailData?.mobile &&
                      toDashedPhoneNumber(props.diagnosisDetailData?.mobile)}
                    <StyledButton onClick={() => handleCopyClipBoard(props.diagnosisDetailData?.mobile)}>
                      <StyledSpan>복사</StyledSpan>
                    </StyledButton>
                  </div>
                  <div>
                    {props.diagnosisDetailData?.resRgstNum && props.diagnosisDetailData?.resRgstNum}{props.diagnosisDetailData?.resRgstNum ? <StyledButton onClick={() => handleCopyClipBoard(props.diagnosisDetailData?.resRgstNum)}><StyledSpan>복사</StyledSpan></StyledButton> : ""}
                  </div>
                </Div>
                <Div
                  css={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: rem(8),
                    div: {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  }}
                >
                  {props.diagnosisDetailData?.private ? (
                    <div>
                      <span>접수 유형</span>
                      <span data-custom>{props.diagnosisDetailData?.receptionType}</span>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span>접수자와의 관계</span>
                        <span data-custom>{props.diagnosisDetailData?.relation}</span>
                      </div>
                      <div>
                        <span>대리 접수 여부</span>
                        <span data-custom>{props.diagnosisDetailData?.receptionProxy}</span>
                      </div>
                      <div>
                        <span>본인인증, 개인정보 동의</span>
                        <span data-custom>완료</span>
                      </div>
                    </>
                  )}
                </Div>
              </RightColumn>
              <LeftColumn css={{ paddingTop: rem(20) }}>
                <span style={{ color: "#666666" }}>진료 항목</span>
                <span aria-label="treatment item">
                  {props.diagnosisDetailData?.treatmentItem}
                </span>
              </LeftColumn>
              <RightColumn
                css={{
                  display: "flex",
                  flexDirection: "column",
                  textarea: {
                    marginTop: rem(10),
                  },
                }}
              >
                <span className="symptom">증상</span>
                {isPrivate ? (
                  <Span css={{ marginTop: rem(4) }}>
                    {" : 병원에서 접수한 진료입니다."}
                  </Span>
                ) : (
                  <textarea
                    className="textarea"
                    value={props.diagnosisDetailData?.content ?? ""}
                    disabled
                  />
                )}
              </RightColumn>
            </Section>
          </> : null
      }
    </>
  );
};

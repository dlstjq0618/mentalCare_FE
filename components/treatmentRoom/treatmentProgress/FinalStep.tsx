import Link from "next/link";
import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PrescriptionViewerModal } from "./PayReadyStep";
import {
  Div,
  P,
  Span,
  Input,
  Label,
  DiagnosisFinishedStepCheckIcon,
  RoundedButton,
} from "~/components";
import { useGetDiagnosisDetailQuery } from "~/services/diagnosis";
import { selectDiagnosisDetailRequestId, } from "~/store/diagnosisDetailSlice";
import { selectWaitingData, setWaitingData } from "~/store/settingsSlice";

export const FinalStep: React.FC = () => {
  const diagnosisDetailId = useSelector(selectDiagnosisDetailRequestId);
  const modalState = useSelector(selectWaitingData);
  const dispatch = useDispatch();

  const { data: diagnosisDetailData } =
    useGetDiagnosisDetailQuery(diagnosisDetailId);

  const [show, setShow] = useState(false);

  const showPrescription = () => {
    setShow(true);
  };


  return (
    <>
      <Div
        css={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: `${rem(140)} 1fr`,
          rowGap: rem(20),
        }}
      >
        {diagnosisDetailData?.fileName && (
          <>
            <Label css={{ gridColumn: "1/2", placeSelf: "center left" }}>
              처방전
            </Label>
            <Div
              css={{
                gridColumn: "2/3",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <>
                <Input
                  shape="prescription"
                  value={diagnosisDetailData?.fileName}
                  css={{ textDecoration: "none", width: "100%" }}
                  disabled
                />
                <Div
                  role="button"
                  css={{
                    position: "absolute",
                    right: rem(30),
                    cursor: "pointer",
                    color: "$primary",
                    textDecoration: "underline",
                  }}
                  onClick={showPrescription}
                >
                  보기
                </Div>
              </>
            </Div>
          </>
        )}
        <Label css={{ gridColumn: "1/2", placeSelf: "center left" }}>
          진료비
        </Label>
        <Div css={{ gridColumn: "2/3", display: "flex", alignItems: "center" }}>
          <Input
            shape="treatmentRoom"
            css={{
              backgroundColor: "$gray08",
              padding: "11.4px 46.5px 11.4px 55.8px",
              color: "$gray01",
              width: "100%",
            }}
            value={diagnosisDetailData?.price?.toLocaleString() ?? 0}
            disabled
          />
          <Span
            css={{ position: "absolute", right: rem(30) }}
            aria-label="currency"
          >
            원
          </Span>
        </Div>
      </Div>
      <Div
        css={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBlock: `${rem(60)} ${rem(100)}`,
          svg: { display: "flex" },
        }}
      >
        <DiagnosisFinishedStepCheckIcon />
        <P
          css={{
            marginBlock: `${rem(16)} ${rem(6)}`,
            fontSize: rem(17),
            strong: {
              color: "$primary",
              fontWeight: "normal",
            },
          }}
        >
          {
            modalState ?
              <>
                <strong>처방전</strong> 이 <strong>재등록</strong>되었습니다.
              </> :
              <>
                <strong>처방전 등록</strong> 및 <strong>진료비 결제</strong>가
                요청되었습니다.
              </>
          }
        </P>
        <Link href="/diagnosis" passHref>
          <RoundedButton
            color="orange"
            css={{
              position: "absolute",
              bottom: rem(30),
              flex: 1,
              width: `calc(100% - ${rem(310)})`,
              height: rem(50),
            }}
          >
            대기실로 이동
          </RoundedButton>
        </Link>
      </Div>
      <PrescriptionViewerModal
        url={diagnosisDetailData?.prescriptionUrl}
        close={() => setShow(false)}
        showDialog={show}
      />
    </>
  );
};

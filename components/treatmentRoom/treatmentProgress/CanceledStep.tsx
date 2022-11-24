import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Article, Div, P } from "~/components/Elements";
import { useGetCancelReasonQuery } from "~/services/diagnosis";
import { selectDiagnosisDetailResultId, selectDiagnosisNotificationState, setDiagnosisNotificationState } from "~/store/diagnosisDetailSlice";
import { RoundedButton } from "~/components"
import { useRouter } from "next/router";

export const CanceledStep = () => {
  const dispatch = useDispatch()
  const diagnosisResultId = useSelector(selectDiagnosisDetailResultId);
  const { data: canceledReason } = useGetCancelReasonQuery(diagnosisResultId);
  const [showCancelDialog, setShowCancelDialog] = useState(true);
  const router = useRouter();
  const state = useSelector(selectDiagnosisNotificationState);

  return (
    <>
      <Article css={{ paddingBlock: rem(75), textAlign: "center" }}>
        <P
          css={{
            fontSize: rem(17),
            strong: { color: "$primary", fontWeight: "normal" },
          }}
        >
          {canceledReason?.userType}의 요청으로 <strong>진료</strong>가{" "}
          <strong>취소</strong>되었습니다.
        </P>
        <Div css={{ height: rem(8) }} />
        {canceledReason?.content && (
          <P css={{ fontSize: rem(15), color: "$gray04" }}>
            사유: {canceledReason.content}
          </P>
        )}
        <P css={{
          textAlign: "-webkit-center"
        }}>
          <RoundedButton
            onClick={() => { router.push("/diagnosis") }}
            color="orange"
            css={{
              marginTop: rem(20),
              width: rem(230),
              height: rem(50),
            }}
          >
            대기실로 이동
          </RoundedButton>
        </P>
      </Article>
    </>
  );
};

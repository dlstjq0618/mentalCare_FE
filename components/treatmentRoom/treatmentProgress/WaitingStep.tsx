import { rem } from "polished";
import React, { useEffect, useState } from "react";
import {
  RoundedButton,
  P,
  Div,
  VideoCallIcon,
  VoiceCallIcon,
} from "~/components";
import { Span } from "~/components/Elements";
import { NotiBlackIcon } from "~/components/icons";

export const WaitingStep: React.FC<{
  voiceCallHandler: () => void;
  videoCallHandler: () => void;
  endCallHandler: () => void;
}> = ({ videoCallHandler, voiceCallHandler, endCallHandler }) => {

  
  return (
    <Div
      css={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Div css={{ height: rem(38) }} />
      <P
        css={{
          fontSize: rem(16),
          strong: { color: "$primary", fontWeight: "normal" },
        }}
      >
        <strong>음성</strong> 또는 <strong>화상</strong> 진료 중 선택하시면
        앱에서 통화가 연결됩니다.
      </P>
      <Div css={{ height: rem(42) }} />
      <Div css={{ display: "flex", justifyContent: "center", gap: rem(14) }}>
        <RoundedButton
          css={{ width: rem(250), height: rem(50) }}
          color="black"
          onClick={voiceCallHandler}
        >
          <VoiceCallIcon />
          <span>음성 진료</span>
        </RoundedButton>
        <RoundedButton
          css={{ width: rem(250), height: rem(50) }}
          color="orange"
          onClick={videoCallHandler}
        >
          <VideoCallIcon />
          <span>화상 진료</span>
        </RoundedButton>
        <RoundedButton
          css={{ width: rem(250), height: rem(50), boxShadow: "none" }}
          outlined
          color="orange"
          onClick={() => {endCallHandler()}}
        >
          <span>일반 진료</span>
        </RoundedButton>
      </Div>
      <Div css={{ height: rem(48) }} />
      <P
        css={{
          fontSize: rem(13),
          color: "$gray04",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          wordBreak: "keep-all",
        }}
      >
        <Span css={{ display: "flex", alignItems: "center", gap: rem(6) }}>
          <NotiBlackIcon />
          음성 또는 화상 진료 통화 품질이 좋지 않아 로켓닥터 앱으로 연결되지
          않을 경우,
        </Span>
        <Span>
          유선전화로 진료를 진행해 주시고 <strong>일반 진료</strong> 버튼을
          클릭하여 처방전 및 진료비를 등록 하실 수 있습니다.
        </Span>
      </P>
      <Div css={{ height: rem(14) }} />
    </Div>
  );
};

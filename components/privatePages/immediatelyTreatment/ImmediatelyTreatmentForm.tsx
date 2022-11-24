import { rem } from "polished";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Grid, SubmitButton } from "./Styles";
import { Input, RoundedButton } from "~/components";
import { toDashedPhoneNumber } from "~/utils/phone.utils";

const NoticeIcon = () => (
  <svg
    width="50"
    height="60"
    viewBox="0 0 50 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#a)">
      <circle cx="25" cy="25" r="25" fill="#EB541E" />
    </g>
    <path
      d="M25 11.25v20"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="25" cy="37.5" r="1.25" fill="#fff" />
    <defs>
      <filter
        id="a"
        x="-3"
        y="0"
        width="56"
        height="56"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.55 0 0 0 0 0.55 0 0 0 0 0.55 0 0 0 0.2 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_810_7726"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_810_7726"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const ImmediatelyTreatmentForm = () => {
  const { register } = useFormContext();
  const [textValue, setTextValue] = useState("");

  const onlyText = (data: string) => {
    const notStr = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=^0-9]/gi
    setTextValue(data)
    if(data) {
      if(notStr.test(data)) {
       const replaceData = data.replace(notStr,"")
       return setTextValue(replaceData)
      }
    }
  };


  
  return (
    <>
      <Grid>
        <label>이름 (성인, 보호자)</label>
        <Input
          placeholder="한글과 영어만 입력하십시요."
          required
          value={textValue}
          type="string"
          usage="immediatelyTreatment"
          css={{ width: "100%" }}
          {...register("name", {
            onChange: (e) => {
              onlyText(e.target.value)
            },
          })}
        />
      </Grid>
      <Grid>
        <label>휴대폰 번호</label>
        <Input
          required
          placeholder="숫자만 입력해주세요."
          maxLength={13}
          usage="immediatelyTreatment"
          css={{ width: "100%" }}
          {...register("mobile", {
            onChange: (e) => {
              const inputStr = e.target.value.replaceAll("-", "");
              if (inputStr.length < 10) {
                e.target.value = inputStr;
              } else {
                e.target.value = toDashedPhoneNumber(inputStr);
              }
            },
          })}
        />
      </Grid>
      <SubmitButton>
        <NoticeIcon />
        <div>
          <p>접수를 요청하시겠어요?</p>
          <span className="text">
            접수 시 알림톡이 전송됩니다.
            <br />
            환자가 진료 신청서를 작성하면{" "}
            <span aria-label="orange-text">대기실</span>에서 <br />
            확인할 수 있습니다.
          </span>
          <RoundedButton
            css={{
              width: "100%",
              height: rem(50),
            }}
            color="orange"
            type="submit"
          >
            <span>접수하기</span>
          </RoundedButton>
        </div>
      </SubmitButton>
    </>
  );
};
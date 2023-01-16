import { useEffect, useState } from "react";
import { rem } from "polished";
import { useFormContext } from "react-hook-form";
import { Flex, Title, EditForm, Grid } from "./styles";
import {
  NoticeIcon,
  DelIcon,
  Dropdown,
  Input,
  RoundedButton,
  DropdownOnChange,
} from "~/components";
import { DoctorAccountDetailsResponse } from "~/interfaces";

const BANKS = [
  { label: "경남은행", value: "경남은행" },
  { label: "광주은행", value: "광주은행" },
  { label: "국민은행", value: "국민은행" },
  { label: "기업은행", value: "기업은행" },
  { label: "농협중앙회", value: "농협중앙회" },
  { label: "농협회원조합", value: "농협회원조합" },
  { label: "대구은행", value: "대구은행" },
  { label: "도이치은행", value: "도이치은행" },
  { label: "부산은행", value: "부산은행" },
  { label: "산업은행", value: "산업은행" },
  { label: "상호저축은행", value: "상호저축은행" },
  { label: "새마을금고", value: "새마을금고" },
  { label: "수협중앙회", value: "수협중앙회" },
  { label: "신한금융투자", value: "신한금융투자" },
  { label: "신한은행", value: "신한은행" },
  { label: "신협중앙회", value: "신협중앙회" },
  { label: "외환은행", value: "외환은행" },
  { label: "우리은행", value: "우리은행" },
  { label: "우체국", value: "우체국" },
  { label: "전북은행", value: "전북은행" },
  { label: "제주은행", value: "제주은행" },
  { label: "카카오뱅크", value: "카카오뱅크" },
  { label: "케이뱅크", value: "케이뱅크" },
  { label: "하나은행", value: "하나은행" },
  { label: "한국씨티은행", value: "한국씨티은행" },
  { label: "HSBC은행", value: "HSBC은행" },
  { label: "SC제일은행", value: "SC제일은행" },
  { label: "토스뱅크", value: "토스뱅크" },
];

interface Props {
  accountInfo?: DoctorAccountDetailsResponse;
  handleCancel: () => void;
  handleChangeBank: DropdownOnChange;
}

export const EditSettlementAccount: React.FC<Props> = ({ ...props }) => {
  const { register, setValue } = useFormContext();

  const convertedAccountNumber = props.accountInfo?.accountNumber?.replace(
    /(\d{3})(\d{4})(\d{4})(\d+)/,
    "$1-$2-$3-$4"
  );
  const onKeyUp = (e: any) => {
    if (
      e.key != "Backspace" &&
      (e.target.value.length === 3 ||
        e.target.value.length === 8 ||
        e.target.value.length === 13)
    ) {
      e.target.value += "-";
    }
  };

  return (
    <Flex css={{ flexDirection: "column" }}>
      <Title>정산 계좌 수정</Title>
      <EditForm>
        <Flex css={{ justifyContent: "left", alignItems: "center", gap: 5 }}>
          <NoticeIcon />
          <span>
            <span aria-label="orange-text">계좌정보</span>가 올바른지 확인해
            주세요.
          </span>
        </Flex>
        <Grid css={{ alignItems: "center", marginTop: "20px" }}>
          <label>은행</label>
          <Dropdown
            options={BANKS}
            defaultValue={BANKS.filter(
              (value) => value.value === props.accountInfo?.bankName
            )}
            onChange={props.handleChangeBank}
          />
        </Grid>
        <Grid
          css={{
            alignItems: "center",
            marginTop: "20px",
            position: "relative",
            svg: {
              position: "absolute",
              top: "50%",
              right: 13,
              transform: "translateY(-50%)",
            },
          }}
        >
          <label>예금주</label>
          <Input
            defaultValue={props.accountInfo?.accountHolder}
            {...register("accountHolder")}
          />
          <div onClick={() => setValue("accountHolder", "")}>
            <DelIcon />
          </div>
        </Grid>
        <Grid
          css={{
            alignItems: "center",
            marginTop: "20px",
            position: "relative",
            svg: {
              position: "absolute",
              top: "50%",
              right: 13,
              transform: "translateY(-50%)",
            },
            div: {
              cursor: "pointer",
            },
          }}
        >
          <label>계좌번호</label>
          <Input
            defaultValue={convertedAccountNumber}
            onKeyUp={onKeyUp}
            {...register("accountNumber")}
          />
          <div onClick={() => setValue("accountNumber", "")}>
            <DelIcon />
          </div>
        </Grid>
        <Grid css={{ alignItems: "center", marginTop: "20px" }}>
          <div></div>
          <Flex css={{ justifyContent: "space-between", gap: rem(11) }}>
            <RoundedButton
              color="black"
              css={{
                flex: `${rem(180)} 1`,
                maxWidth: rem(280),
                height: rem(45),
              }}
              onClick={() => {
                setValue("accountNumber", convertedAccountNumber);
                setValue("accountHolder", props.accountInfo?.accountHolder);
                props.handleCancel();
              }}
            >
              취소
            </RoundedButton>
            <RoundedButton
              type="submit"
              color="orange"
              css={{
                flex: `${rem(180)} 1`,
                maxWidth: rem(280),
                height: rem(45),
              }}
            >
              저장
            </RoundedButton>
          </Flex>
        </Grid>
      </EditForm>
    </Flex>
  );
};

import { rem } from "polished";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import {
  Div,
  Label,
  Input,
  FormRowItemWrapper,
  RegisterFormSection,
  DropdownDatePicker,
  DropdownDatePicker2,
  Dropdown,
  FormFieldErrorMessage,
} from "~/components";
import { selectCounselingInfoData } from "~/store/calendarDetailSlice";
import { BANKS } from "~/utils/constants";

interface IStyled {
  margin?: number;
  size?: number | string;
  bold?: string;
  flex?: boolean;
  width?: number;
}
interface IProps {
  title?: boolean;
}

const InfoGrid = styled.div<IStyled>`
margin-top: ${rem(30)};
  ${(props) =>
    props.width &&
    css`
        width: ${rem(props.width)};
    `}
    padding: ${rem(20)} ${rem(150)};
    height: ${rem(415)};
    flex-grow: 0;
    border-radius: 20px;
    background-color: #fff;
`;

const Text = styled.span`
line-height: 1.4;
color: #333;
font-size: ${rem(18)};
font-weight: bold;
`;


export const BankAccountInfoForm = (props: IProps) => {
  const { register, control, setValue, formState } = useFormContext();
  const bankInfoData = useSelector(selectCounselingInfoData);

  const [bankName, setBankName] = useState();
  const [accountNumber, setAccountNumber] = useState();

  //   useEffect(() => {
  //     setDayPrice(infoData.consultationFeeDay);
  //     setNightPrice(infoData.consultationFeeNight);
  // }, [infoData.consultationFeeDay, infoData.consultationFeeNight])

  useEffect(() => {

  }, [bankInfoData])

  return (
    <>
      {
        props.title ?
          <InfoGrid width={900}>
            <RegisterFormSection>
              {props.title ? <h2>계좌 정보</h2> : <Text>계좌 정보</Text>}
              <FormRowItemWrapper>
                <Label htmlFor="owner" required={false}>
                  예금주
                </Label>
                <Input
                  id="accountHolder"
                  type="text"
                  placeholder={bankInfoData?.accountInfo?.accountHolder}
                  usage="registerPage"
                  // {...register("accountHolder")}
                  onChange={(e) => {
                    setValue("accountHolder", e.target.value);
                  }}
                />
                {formState.errors.accountHolder?.message && (
                  <FormFieldErrorMessage
                    css={{ gridArea: "message", marginTop: rem(6) }}
                  >
                    {formState.errors.accountHolder?.message}
                  </FormFieldErrorMessage>
                )}
              </FormRowItemWrapper>
              <FormRowItemWrapper>
                <Label htmlFor="accountHolderBirthdate" required={false}>
                  생년월일
                </Label>
                <Controller
                  name="accountHolderBirthdate"
                  control={control}
                  render={() => (
                    <DropdownDatePicker
                      onComplete={(date) => setValue("accountHolderBirthdate", date)}
                    />
                  )}
                />
                {formState.errors.accountHolderBirthdate?.message && (
                  <FormFieldErrorMessage
                    css={{ gridArea: "message", marginTop: rem(6) }}
                  >
                    {formState.errors.accountHolderBirthdate?.message}
                  </FormFieldErrorMessage>
                )}
              </FormRowItemWrapper>
              <FormRowItemWrapper>
                <Label htmlFor="bankName" required={false}>
                  은행
                </Label>
                <Controller
                  name="bankName"
                  control={control}
                  render={() => (
                    <Dropdown
                      id="bankName"
                      placeholder={bankInfoData?.accountInfo?.bankName}
                      options={Object.values(BANKS)?.map((bank) => ({
                        label: bank,
                        value: bank,
                      }))}
                      onChange={(bank) => setValue("bankName", bank?.value)}
                    />
                  )}
                />
                {formState.errors.bankName?.message && (
                  <FormFieldErrorMessage
                    css={{ gridArea: "message", marginTop: rem(6) }}
                  >
                    {formState.errors.bankName?.message}
                  </FormFieldErrorMessage>
                )}
              </FormRowItemWrapper>
              <FormRowItemWrapper>
                <Label htmlFor="accountNumber" required={false}>
                  계좌번호
                </Label>
                <Div css={{ display: "flex", gap: rem(10) }}>
                  <Input
                    id="accountNumber"
                    type="number"
                    usage="registerPage"
                    placeholder={bankInfoData?.accountInfo?.accountNumber}
                    {...register("accountNumber")}
                    css={{ width: rem(240), flex: "auto" }}
                  />
                </Div>
                {formState.errors.accountNumber?.message && (
                  <FormFieldErrorMessage
                    css={{ gridArea: "message", marginTop: rem(6) }}
                  >
                    {formState.errors.accountNumber?.message}
                  </FormFieldErrorMessage>
                )}
              </FormRowItemWrapper>
            </RegisterFormSection>
          </InfoGrid>
          :
          <RegisterFormSection>
            {props.title ? <h2>계좌 정보</h2> : <Text>계좌 정보</Text>}
            <FormRowItemWrapper>
              <Label htmlFor="owner" required={false}>
                예금주
              </Label>
              <Input
                id="accountHolder"
                type="text"
                placeholder="예금주명을 입력해주세요"
                usage="registerPage"
                {...register("accountHolder")}
              />
              {formState.errors.accountHolder?.message && (
                <FormFieldErrorMessage
                  css={{ gridArea: "message", marginTop: rem(6) }}
                >
                  {formState.errors.accountHolder?.message}
                </FormFieldErrorMessage>
              )}
            </FormRowItemWrapper>
            <FormRowItemWrapper>
              <Label htmlFor="accountHolderBirthdate" required={false}>
                생년월일
              </Label>
              <Controller
                name="accountHolderBirthdate"
                control={control}
                render={() => (
                  <DropdownDatePicker2
                    onComplete={(date) => setValue("accountHolderBirthdate", date)}
                  />
                )}
              />
              {formState.errors.accountHolderBirthdate?.message && (
                <FormFieldErrorMessage
                  css={{ gridArea: "message", marginTop: rem(6) }}
                >
                  {formState.errors.accountHolderBirthdate?.message}
                </FormFieldErrorMessage>
              )}
            </FormRowItemWrapper>
            <FormRowItemWrapper>
              <Label htmlFor="bankName" required={false}>
                은행
              </Label>
              <Controller
                name="bankName"
                control={control}
                render={() => (
                  <Dropdown
                    id="bankName"
                    placeholder="은행을 선택해주세요"
                    options={Object.values(BANKS)?.map((bank) => ({
                      label: bank,
                      value: bank,
                    }))}
                    onChange={(bank) => setValue("bankName", bank?.value)}
                  />
                )}
              />
              {formState.errors.bankName?.message && (
                <FormFieldErrorMessage
                  css={{ gridArea: "message", marginTop: rem(6) }}
                >
                  {formState.errors.bankName?.message}
                </FormFieldErrorMessage>
              )}
            </FormRowItemWrapper>
            <FormRowItemWrapper>
              <Label htmlFor="accountNumber" required={false}>
                계좌번호
              </Label>
              <Div css={{ display: "flex", gap: rem(10) }}>
                <Input
                  id="accountNumber"
                  type="number"
                  usage="registerPage"
                  placeholder="계좌번호를 입력해주세요"
                  {...register("accountNumber")}
                  css={{ width: rem(240), flex: "auto" }}
                />
              </Div>
              {formState.errors.accountNumber?.message && (
                <FormFieldErrorMessage
                  css={{ gridArea: "message", marginTop: rem(6) }}
                >
                  {formState.errors.accountNumber?.message}
                </FormFieldErrorMessage>
              )}
            </FormRowItemWrapper>
          </RegisterFormSection>
      }
    </>
  );
};

import { Divider } from "antd";
import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { EditSettlementAccount } from "./EditSettlementAccount";
import { Flex, Title, Details, Grid } from "./styles";
import { RoundedButton, Div, DropdownOnChange } from "~/components";
import { DoctorAccountDetailsResponse } from "~/interfaces";
import { api } from "~/woozooapi";

export const DoctorAccountDetails: React.FC = () => {
  const methods = useForm();

  const [editable, setEditable] = useState<boolean>(false);
  const [bankName, setBankName] = useState<string>();
  const [accountInfo, setAccountInfo] =
    useState<DoctorAccountDetailsResponse>();

  const getDoctorAccountDetails = () => {
    api.settlementAccount
      .getDoctorAccountDetails()
      .then((response) => {
        console.log(response);
        setAccountInfo(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDoctorAccountDetails();
  }, []);

  const onSubmit = (data: any) => {
    if (data?.accountNumber && data.accountNumber.includes("-")) {
      const accountNumber = data.accountNumber.replaceAll("-", "");
      api.settlementAccount
        .editDoctorAccountDetails({
          bankName: bankName,
          accountHolder: data.accountHolder,
          accountNumber: accountNumber,
        })
        .then((response) => {
          setEditable(false);
          getDoctorAccountDetails();
        })
        .catch((err) => console.log(err));
    }
    return;
  };

  const handleChangeBank: DropdownOnChange = (value) => {
    setBankName(value?.value);
  };
  const handleCancelEdit = () => {
    setEditable(false);
  };
  const convertedAccountNumber = accountInfo?.accountNumber?.replace(
    /(\d{3})(\d{4})(\d{6})(\d+)/,
    "$1-$2-$3-$4"
  );
  return (
    <Div css={{ ".hide": { display: "none" } }}>
      <Flex
        className={editable == true ? "hide" : undefined}
        css={{
          flexDirection: "column",
          gap: rem(1),
        }}
      >
        <Flex css={{ justifyContent: "space-between", alignItems: "center" }}>
          <Title>정산 계좌</Title>
          <RoundedButton
            color="black"
            css={{ width: rem(80), height: rem(40) }}
            onClick={() => setEditable(true)}
          >
            수정
          </RoundedButton>
        </Flex>
        <Details>
          <span className="account-holder">{accountInfo?.accountHolder}</span>
          <Divider style={{ backgroundColor: "black" }} />
          <Grid>
            <span>은행</span>
            <span className="bank-info">{accountInfo?.bankName}</span>
          </Grid>
          <Grid css={{ marginTop: rem(20) }}>
            <span>계좌번호</span>
            <span className="bank-info">{convertedAccountNumber}</span>
          </Grid>
        </Details>
      </Flex>
      {editable && (
        <FormProvider {...methods}>
          <form className="main" onSubmit={methods.handleSubmit(onSubmit)}>
            <EditSettlementAccount
              accountInfo={accountInfo}
              handleCancel={handleCancelEdit}
              handleChangeBank={handleChangeBank}
            />
          </form>
        </FormProvider>
      )}
    </Div>
  );
};

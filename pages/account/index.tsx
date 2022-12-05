import React, { useEffect } from "react";
import Layout from "~/components/Layout";
import {
  MainTitle,
  DoctorAccountDetails,
  SettlementList,
} from "~/components/settlementAccount";

const Accounts = () => {
  return (
    <Layout>
      <MainTitle>정산</MainTitle>
      {/* <DoctorAccountDetails /> */}
      <SettlementList />
    </Layout>
  );
};

export default Accounts;

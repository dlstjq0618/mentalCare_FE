import Script from "next/script";
import { rem } from "polished";
import { VFC } from "react";
import { PhoneNumberCertificationResult } from "~//interfaces";
import { RoundedButton } from "~/components";
import { api } from "~/woozooapi";

export const PhoneNumberCertificationButton: VFC<{
  handleResult: (arg0: PhoneNumberCertificationResult) => void;
}> = ({ handleResult }) => {
  const handleCertificatePhoneNumberClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    api.auth.certificatePhoneNumber((result) => {
      handleResult(result);
    });
  };

  return (
    <>
      <RoundedButton
        color="orange"
        outlined
        css={{ height: rem(50) }}
        onClick={handleCertificatePhoneNumberClick}
      >
        휴대폰 인증
      </RoundedButton>

      {/* For Iamport certification sdk  */}
      <Script src="https://code.jquery.com/jquery-1.12.4.min.js" />
      <Script src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js" />
      {/* For Iamport certification sdk end  */}
    </>
  );
};

import React,{useEffect, useState} from "react";
import { rem } from "polished";
import { ComponentProps, VFC } from "react";
import { RoundedButton } from "~/components";

export const EstimatedPaymentAddButton: VFC<
  ComponentProps<typeof RoundedButton>
> = ({ css, ...props }) => {
  const [subPaymentState, setSubPaymentState] = useState(false)

  const handleSubPaymentAlert = () => {
      setSubPaymentState(false)
      console.log('subpaymet', subPaymentState);
  }
  return (
    <RoundedButton
      onClick={handleSubPaymentAlert}
      placeholder="추가 진료항목"
      type="button"
      outlined
      css={{
        gridColumn: "1/3",
        height: rem(44),
        border: "1px solid $primary",
        color: "$primary",
        backgroundColor: "$white",
        ...css,
      }}
      {...props}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9h16M9 17V1"
          stroke="#EB541E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      진료비 추가
    </RoundedButton>
  );
};

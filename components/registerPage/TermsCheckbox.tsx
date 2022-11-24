import { rem } from "polished";
import { ComponentProps } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { styled } from "~/stitches.config";


const CheckboxIconSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 34 34"
  >
    <circle className="circle" cx="17" cy="17" r="17" />
    <path
      d="m11.333 16.784 5.065 4.75 7.402-9.067"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CheckboxIcon = styled(CheckboxIconSVG, {});

const CheckboxIconSVG1 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 34 34"
  >
    <circle className="circle" cx="17" cy="17" r="17" />
    <path
      d="m11.333 16.784 5.065 4.75 7.402-9.067"
      stroke="#f7f7f7"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CheckboxIcon1 = styled(CheckboxIconSVG1, {});

const CheckboxIconSVG2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 34 34"
  >
    <circle className="circle" cx="17" cy="17" r="17" />
    <path
      d="m11.333 16.784 5.065 4.75 7.402-9.067"
      stroke="#f7f7f7"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CheckboxIcon2 = styled(CheckboxIconSVG2, {});

const CheckboxRoot = styled(RadixCheckbox.Root, {
  // reset browser default
  border: "none",
  background: "transparent",
  padding: 0,

  width: rem(34),
  height: rem(34),
  '&[data-state="unchecked"]': {
    svg: {
      fill: "#f7f7f7",
    },
  },
  '&[data-state="checked"]': {
    svg: {
      fill: "$primary",
    },
  },
});

const CheckboxRoot1 = styled(RadixCheckbox.Root, {
  // reset browser default
  border: "none",
  background: "transparent",
  padding: 0,

  width: rem(34),
  height: rem(34),
  '&[data-state="unchecked"]': {
    svg: {
      fill: "#fff",
    },
  },
  '&[data-state="checked"]': {
    svg: {
      fill: "$primary",
    },
  },
});

const CheckboxRoot2 = styled(RadixCheckbox.Root, {
  // reset browser default
  border: "none",
  background: "transparent",
  padding: 0,

  width: rem(24),
  height: rem(24),
  '&[data-state="unchecked"]': {
    svg: {
      fill: "red",
    },
  },
  '&[data-state="checked"]': {
    svg: {
      fill: "$primary",
    },
  },
});

type TermsCheckboxProps = ComponentProps<typeof CheckboxRoot>;
type TermsCheckboxProps1 = ComponentProps<typeof CheckboxRoot1>;
type TermsCheckboxProps2 = ComponentProps<typeof CheckboxRoot2>;

export const TermsCheckbox = (props: TermsCheckboxProps) => {
  return (
    <CheckboxRoot {...props}>
      <CheckboxIcon />
    </CheckboxRoot>
  );
};
export const TermsCheckbox1 = (props: TermsCheckboxProps1) => {
  return (
    <CheckboxRoot1 {...props}>
      <CheckboxIcon1 />
    </CheckboxRoot1>
  );
};
export const TermsCheckbox2 = (props: TermsCheckboxProps2) => {
  return (
    <CheckboxRoot1 {...props}>
      <CheckboxIcon2 />
    </CheckboxRoot1>
  );
};
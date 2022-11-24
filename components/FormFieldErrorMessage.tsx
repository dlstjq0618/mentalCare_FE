import { Div } from ".";
import { rem } from "polished";
import { ComponentPropsWithoutRef, FC } from "react";

import { styled } from "~/stitches.config";

export const FormFieldErrorIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6.5" cy="6.5" r="6" stroke="#EB541E" />
    <path fill="#EB541E" d="M6 3.5h1v4H6z" />
    <circle cx="6.5" cy="9" r=".5" fill="#EB541E" />
  </svg>
);

const FormFieldErrorMessageWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: rem(8),
  color: "$primary",
  fontSize: rem(12),
});

export const FormFieldErrorMessage: FC<
  ComponentPropsWithoutRef<typeof FormFieldErrorMessageWrapper>
> = ({ children, ...props }) => {
  return (
    <FormFieldErrorMessageWrapper {...props}>
      <FormFieldErrorIcon />
      {children}
    </FormFieldErrorMessageWrapper>
  );
};
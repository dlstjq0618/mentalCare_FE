import { ComponentProps, FC } from "react";


export const CheckedIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 7.691 8.01 13.5 17 3"
      stroke="#EB541E"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
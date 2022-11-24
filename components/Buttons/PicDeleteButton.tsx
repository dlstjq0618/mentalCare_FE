import { ComponentProps } from "react";
import { styled } from "~/stitches.config";

const PicDeleteButtonWrapper = styled("div", {});

export const PicDeleteButton = ({ onClick }: ComponentProps<"div">) => (
  <PicDeleteButtonWrapper role="button" onClick={onClick}>
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="#fff" />
      <circle cx="15" cy="15" fill="#000" fillOpacity=".6" r="12.5" />
      <path
        d="m10.834 10.833 8.684 8.684M10.834 19.518l8.684-8.685"
        stroke="#fff"
      />
    </svg>
  </PicDeleteButtonWrapper>
);

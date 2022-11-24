import { ComponentProps, FC } from "react";
import { styled } from "~/stitches.config";

const IconButtonWrapper = styled("div", {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const IconButton: FC<ComponentProps<typeof IconButtonWrapper>> = ({
  children,
  ...props
}) => {
  return (
    <IconButtonWrapper role="button" css={{}} {...props}>
      {children}
    </IconButtonWrapper>
  );
};

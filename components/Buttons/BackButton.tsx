import { rem } from "polished";
import { FC, ComponentProps } from "react";
import { BackBtnIcon } from "~/components";
import { styled } from "~/stitches.config";


const Button = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: rem(40),
  height: rem(40),
  borderRadius: "50%",
  border: "none",
  backgroundColor: "white",
  boxShadow: `0 ${rem(3)} ${rem(3)} 0 rgba(140, 140, 140, 0.2)`,
  "&:hover": {
    svg: {
      path: {
        stroke: "$primary",
      },
    },
  },
});

export const BackButton: FC<ComponentProps<typeof Button>> = (props) => {
  return (
    <Button {...props}>
      <BackBtnIcon />
    </Button>
  );
};

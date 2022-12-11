import { ComponentProps, FC } from "react";
import { styled } from "~/stitches.config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

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

export function IconLabelButtons() {
  return (
    <Button variant="contained" endIcon={<SendIcon />}>
      Send
    </Button>
  );
}

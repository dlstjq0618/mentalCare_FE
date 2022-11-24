import { rem } from "polished";
import { ComponentProps, FC, forwardRef } from "react";
import * as RadixToggle from "@radix-ui/react-toggle";
import { styled } from "stitches.config";
import { ToggleIcon } from "~/components";


const StyledToggle = styled(RadixToggle.Root, {
  all: "unset",
  backgroundColor: "white",
  height: rem(34),
  width: rem(34),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  circle: {
    fill: "$gray07",
  },
  "&[data-state=on]": {
    circle: {
      fill: "$primary",
    },
  },
});

export const Toggle = StyledToggle;

export const BaseToggle: FC<ComponentProps<typeof Toggle>> = forwardRef(
  ({ css, ...props }, ref) => {
    return (
      <Toggle
        css={{
          marginRight: rem(3),
          backgroundColor: "transparent",
          svg: {
            circle: {
              fill: "$white",
            },
            path: {
              stroke: "$gray07",
            },
          },
          "&[data-state=on]": {
            svg: {
              circle: {
                fill: "$primary",
              },

              path: {
                stroke: "$white",
              },
            },
          },
          ...css,
        }}
        {...props}
        ref={ref}
      >
        <ToggleIcon />
      </Toggle>
    );
  }
);
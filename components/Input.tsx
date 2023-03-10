import { rem } from "polished";
import { ComponentProps, FC, forwardRef, useState } from "react";
import { Div } from "./Elements";
import { Span } from "~/components";
import { styled } from "~/stitches.config";


export const Input = styled("input", {
  variants: {
    shape: {
      round: {
        height: 50,
        color: "$gray01",
        backgroundColor: "$white",

        border: "1px solid $gray06",
        borderRadius: 100,

        padding: "13px 20px 14px",
        "&:focus": {
          borderColor: "$red",
        },

        "&::placeholder": {
          color: "black",
          fontSize: rem(15),
        },
        '&[type="submit"]': {
          color: "$white",
          backgroundColor: "$primary",
          border: "none",
          boxShadow: "none",

          "&:active": {
            backgroundColor: "$darkRed",
            boxShadow: "none",
          },
        },
      },
      treatmentRoom: {
        margin: "10px 0",
        width: "100%",
        height: 50,
        color: "$primary",
        backgroundColor: "$white",
        fontSize: 17,
        textAlign: "right",

        border: "1px solid $gray06",
        borderRadius: 100,

        padding: "11.4px 80px 11.4px 30px",

        "&:focus": {
          borderColor: "$red",
        },
      },
      prescription: {
        width: "100%",
        height: 50,
        color: "$gray01",
        backgroundColor: "rgba(235, 84, 30, 0.06)",
        fontSize: 14,
        textAlign: "left",
        textDecoration: "underline",
        border: "none",
        borderRadius: 100,

        padding: "14px 51px 13.3px 30px",

        "&:focus": {
          color: "$primary",
          svg: {
            path: {
              stroke: "#d8430e",
            },
            circle: {
              stroke: "#d8430e",
            },
          },
        },
      },
    },
    usage: {
      loginPage: {},
      registerPage: {
        width: "100%",

        '&[type="submit"]': {
          height: 50,
        },

        '&[type="checkbox"]': {
          height: 34,
          width: 34,
        },
      },
      immediatelyTreatment: {
        margin: "10px 0",
        width: "100%",
        height: 50,
        color: "$gray01",
        backgroundColor: "$white",
        fontSize: rem(15),
        textAlign: "left",
        border: "1px solid $gray06",
        borderRadius: 100,
        padding: `${rem(14)} ${rem(60)} ${rem(14)} ${rem(30)}`,
      }
    },
  },
  defaultVariants: {
    shape: "round",
    usage: "loginPage",
  },
});


export const MoneyInput: FC<{ suffix?: "원" } & ComponentProps<typeof Input>> =
  forwardRef(({ css, suffix = "원", ...props }, ref) => {
    return (
      <Div
        css={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          ...css,
        }}
      >
        <Input
          min={0}
          css={{
            width: "100%",
            textAlign: "right",
            color: "$primary",
            fontSize: rem(17),
            paddingRight: rem(46),
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
          }}
          {...props}
          ref={ref}
        />
        <Span css={{ position: "absolute", right: rem(20), fontSize: rem(14) }}>원</Span>
      </Div>
    );
  });
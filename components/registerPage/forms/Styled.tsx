import { rem } from "polished";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormFieldErrorMessage, Input } from "~/components";
import { styled } from "~/stitches.config";

export const RegisterPageWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: `1fr ${rem(500)} 1fr`,
  "& > *": {
    gridColumn: 2,
  },
  paddingTop: rem(40),
  paddingBottom: rem(60),
  background: "$white",
});

export const RegisterPageHeading = styled("h1", {
  margin: 0,
  padding: `${rem(36)} 0 ${rem(20)}`,
  borderBottom: "1.4px solid $black",
  fontSize: rem(24),
  fontWeight: "bold",
  color: "$gray01",
});


export const RegisterForm = styled("form", {
  section: {},
});

export const RegisterFormSection = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: rem(20),
  padding: `${rem(30)} 0 ${rem(32)}`,
  borderBottom: "1px dashed $gray04",
  "&:first-of-type": {
    borderTop: "",
  },
  "&:last-of-type": {
    borderBottom: "none",
  },
  h2: {
    fontWeight: "bold",
    fontSize: rem(20),
    margin: 0,
  },
  label: {
    fontSize: rem(16),
  },
});

export const Label = styled("label", {
  fontSize: rem(16),
  '&[for="terms"]': {
    gridColumn: "",
  },
  variants: {
    required: {
      true: {
        "&::after": {
          content: '"*"',
          color: "$primary",
        },
      },
    },
  },
});


export const FormRowItemWrapper = styled("div", {
  position: "relative",
  display: "grid",
  gridTemplateColumns: `${rem(120)} 1fr`,
  gridTemplateRows: "max-content max-content",
  gridTemplateAreas: '"label input" "empty message"',

  label: {
    gridArea: "label",
    paddingTop: rem(8),
  },

  input: {
    gridArea: "input",
    "&[disabled]": {
      backgroundColor: "$gray08",
      border: "1px solid $gray06",
      "&.file": {
        backgroundColor: "$fileInputBgColor",
      },
    },
  },

  variants: {
    hide: {
      true: {
        display: "none",
      },
      false: {
        display: "grid",
      },
    },
  },
});
export const FormRowItemWrapperSetting = styled("div", {
  marginTop: "20px",
  position: "relative",
  display: "grid",
  gridTemplateColumns: `${rem(120)} 1fr`,
  gridTemplateRows: "max-content max-content",
  gridTemplateAreas: '"label input" "empty message"',

  label: {
    gridArea: "label",
    paddingTop: rem(8),
  },

  input: {
    gridArea: "input",
    "&[disabled]": {
      backgroundColor: "$gray08",
      border: "1px solid $gray06",
      "&.file": {
        backgroundColor: "$fileInputBgColor",
      },
    },
  },

  variants: {
    hide: {
      true: {
        display: "none",
      },
      false: {
        display: "grid",
      },
    },
  },
});

type InputProps = ComponentPropsWithoutRef<"input">;

export const RegisterFormRowItem = forwardRef<
  HTMLInputElement,
  InputProps &
  ComponentPropsWithoutRef<typeof FormRowItemWrapper> & { label: string }
>(({ id, required, label, type, hide, children, ...props }, ref) => {
  const { formState } = useFormContext();
  return (
    <FormRowItemWrapper hide={hide}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        required={required}
        usage="registerPage"
        ref={ref}
        {...props}
      />
      {children}
      {formState.errors?.[id ?? ""] && (
        <FormFieldErrorMessage
          css={{ gridArea: "message", paddingTop: rem(6) }}
        >
          {formState.errors?.[id ?? ""]?.message}
        </FormFieldErrorMessage>
      )}
    </FormRowItemWrapper>
  );
});

export const RegisterFormRowItem2 = forwardRef<
  HTMLInputElement,
  InputProps &
  ComponentPropsWithoutRef<typeof FormRowItemWrapper> & { label: string }
>(({ id, required, label, type, hide, children, ...props }, ref) => {
  const { formState } = useFormContext();
  return (
    <FormRowItemWrapper hide={hide}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        required={required}
        usage="registerPage"
        ref={ref}
        {...props}
      />
      {children}

    </FormRowItemWrapper>
  );
});

import { ComponentMeta } from "@storybook/react";
import { TermsCheckbox } from "~/components";

export default {
  title: "Components/TermsCheckbox",
  component: TermsCheckbox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TermsCheckbox>;

export const Basic = () => {
  return (
    <div>
      <TermsCheckbox />
    </div>
  );
};

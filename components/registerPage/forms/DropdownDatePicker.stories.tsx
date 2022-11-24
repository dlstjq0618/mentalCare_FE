import { ComponentMeta } from "@storybook/react";

import { DropdownDatePicker } from "~/components";

export default {
  title: "Components/DropdownDatePicker",
  component: DropdownDatePicker,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof DropdownDatePicker>;

export const Default = () => {
  return <DropdownDatePicker onComplete={(date) => console.log(date)} />;
};

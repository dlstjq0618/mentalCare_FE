import { ComponentMeta } from "@storybook/react";

import { DaumAddressSearch } from "~/components";

export default {
  title: "Components/DaumAddressSearch",
  component: DaumAddressSearch,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof DaumAddressSearch>;

export const Default = () => {
  return <DaumAddressSearch onComplete={(data) => console.log(data)} />;
};

import { ComponentMeta } from "@storybook/react";
import { StepsBar } from "./StepsBar";

export default {
  title: "Components/StepsBar",
  component: StepsBar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StepsBar>;

export const Basic = () => {
  return <StepsBar current={0} />;
};

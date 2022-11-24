import { ComponentMeta } from "@storybook/react";
import { Dropdown } from "~/components/Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Dropdown>;

export const Basic = () => {
  return (
    <div style={{ width: 150 }}>
      <Dropdown onChange={(v) => console.log(v)} />
    </div>
  );
};

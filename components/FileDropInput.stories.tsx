import { ComponentMeta } from "@storybook/react";
import { FileDropInput } from "./FileDropInput";


export default {
  title: "Components/FileInput",
  component: FileDropInput,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof FileDropInput>;

export const Basic = () => {
  return (
    <FileDropInput name="storybook" handleFile={(file) => console.log(file)} />
  );
};;
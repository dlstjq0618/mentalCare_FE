import testProfilePic from "public/test_profile_pic.png";
import { ComponentMeta } from "@storybook/react";
import { ProfilePic, HospitalPic } from "~/components";

export default {
  title: "Components/DeletableImage",
  component: ProfilePic,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfilePic>;

export const Basic = () => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <ProfilePic
        deletable
        src={testProfilePic}
        onDeleteClick={() => console.log("delete click")}
      />
      <HospitalPic
        src={testProfilePic}
        deletable
        onDeleteClick={() => console.log("delete click")}
      />
    </div>
  );
};

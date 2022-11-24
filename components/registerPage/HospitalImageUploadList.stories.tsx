import testProfilePic from "public/test_profile_pic.png";
import { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import { HospitalImageUploadList, HospitalPic } from "~/components";

export default {
  title: "Components/HospitalImageUploadList",
  component: HospitalPic,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof HospitalPic>;

export const Basic = () => {
  const [images, setImages] = useState([
    {
      alt: "",
      src: testProfilePic,
    },
    {
      alt: "",
      src: testProfilePic,
    },
    {
      alt: "",
      src: testProfilePic,
    },
    {
      alt: "",
      src: testProfilePic,
    },
    {
      alt: "",
      src: testProfilePic,
    },
    {
      alt: "",
      src: testProfilePic,
    },
    {
      alt: "",
      src: testProfilePic,
    },
  ]);
  return (
    <div style={{ width: 500, height: 500, background: "#eee" }}>
      <HospitalImageUploadList
        images={images}
        handleFiles={(files) => console.log(files)}
        onDeleteClick={(targetIndex) =>
          setImages((images) =>
            images.filter((_, index) => index !== targetIndex)
          )
        }
      />
    </div>
  );
};

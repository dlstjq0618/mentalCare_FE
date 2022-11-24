import { ComponentProps } from "react";
import { FileDropInputForList } from "~/components";

export const UploadHospitalImageButton = ({
  ...props
}: ComponentProps<typeof FileDropInputForList>) => {
  return (
    <FileDropInputForList
      accept="image/jpeg, image/png"
      name="hospitalImages"
      multiple
      {...props}
    />
  );
};

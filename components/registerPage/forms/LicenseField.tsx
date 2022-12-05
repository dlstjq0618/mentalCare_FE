import { rem } from "polished";
import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Label,
  FormRowItemWrapper,
  Div,
  FileDropInput,
  Input,
  FileInputDeleteIcon,
  IconButton,
  FormFieldErrorMessage,
  FormRowItemWrapperSetting
} from "~/components";
import { selectCounselingInfoData } from "~/store/calendarDetailSlice";

export const LicenceField: FC<{
  required?: boolean;
  label?: string;
  name: string;
  fileName?: string;
  handleUpload: (file: File) => void;
  handleDelete: () => void;
}> = ({ name, fileName, label, required, handleUpload, handleDelete }) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const fileHistoryData = useSelector(selectCounselingInfoData);

  return (
    <FormRowItemWrapperSetting>
      <Label required={required}>{label}</Label>
      <Input type="hidden" {...register(name)} />
      {fileName ? (
        <Div
          css={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input
            type="text"
            disabled
            className="file"
            value={fileName}
            css={{ flex: 1, paddingRight: "4em" }}
          />
          <IconButton
            css={{ position: "absolute", right: rem(10), cursor: "pointer" }}
            onClick={handleDelete}
          >
            <FileInputDeleteIcon />
          </IconButton>
        </Div>
      ) : (
        <FileDropInput handleFile={handleUpload} />
      )}
      {errors?.[name] && (
        <FormFieldErrorMessage css={{ gridArea: "message", marginTop: rem(6) }}>
          {errors[name]?.message}
        </FormFieldErrorMessage>
      )}
    </FormRowItemWrapperSetting>
  );
};

export const SettingLicenceField: FC<{
  required?: boolean;
  label?: string;
  name: string;
  fileName?: string;
  handleUpload: (file: File) => void;
  handleDelete: () => void;
}> = ({ name, fileName, label, required, handleUpload, handleDelete }) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  return (
    <FormRowItemWrapperSetting>
      <Label required={required}>{label}</Label>
      <Input type="hidden" {...register(name)} />
      {fileName ? (
        <Div
          css={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input
            type="text"
            disabled
            className="file"
            value={fileName}
            css={{ flex: 1, paddingRight: "4em" }}
          />
          <IconButton
            css={{ position: "absolute", right: rem(10), cursor: "pointer" }}
            onClick={handleDelete}
          >
            <FileInputDeleteIcon />
          </IconButton>
        </Div>
      ) : (
        <FileDropInput handleFile={handleUpload} />
      )}
      {errors?.[name] && (
        <FormFieldErrorMessage css={{ gridArea: "message", marginTop: rem(6) }}>
          {errors[name]?.message}
        </FormFieldErrorMessage>
      )}
    </FormRowItemWrapperSetting>
  );
};
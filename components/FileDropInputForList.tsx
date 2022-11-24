import { rem } from "polished";
import { ComponentProps, FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import {
  RoundedButton,
  FileUploadIcon,
  Div,
  FormFieldErrorMessage,
  Input,
} from "~/components";
import { styled } from "~/stitches.config";

const FileInputWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: 156,
  maxHeight: 156,
  borderRadius: 20,
  border: "1px dashed rgba(0, 0, 0, 0.2)",
  color: "$primary",
  fontSize: 15,
  p: {
    margin: 0,
    fontSize: "1em",
    "&:first-of-type": {
      paddingTop: 2,
    },
    "&:last-of-type": {
      paddingTop: 4,
      fontSize: 13,
      color: "$gray05",
    },
  },
  variants: {
    list: {
      true: {
        height: rem(86),
        width: rem(86),
        "p:last-of-type": {
          color: "$primary",
        },
      },
      false: {},
    },
    hide: {
      true: {
        position: "absolute",
        zIndex: -1,
      },
    },
  },
});

export const FileDropInputForList: FC<
  ComponentProps<"input"> & { handleFile: (arg0: File[]) => void }
> = ({ accept, name, multiple, handleFile, ...rest }) => {
  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      handleFile(acceptedFile);
    },
    [handleFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <Div>
      <FileInputWrapper list {...getRootProps()}>
        <input {...getInputProps()} {...rest} />
        <p>사진 등록</p>
        <RoundedButton
          color="black"
          css={{
            width: rem(60),
            height: rem(30),
            fontSize: rem(12),
            marginTop: 8,
          }}
          type="button"
        >
          선택
        </RoundedButton>
      </FileInputWrapper>
    </Div>
  );
};

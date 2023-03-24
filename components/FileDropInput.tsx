import { rem } from "polished";
import { ComponentProps, FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileUploadIcon, Div, Input } from "~/components";
import { styled } from "~/stitches.config";
import BadgeAvatars from "./settingPage/AvatarBadge";
import { useFormContext } from "react-hook-form";
import ImageIcon from '@mui/icons-material/Image';

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

export const FileDropInput: FC<
  ComponentProps<typeof Input> & {
    handleFile: (arg0: File) => void;
    hide?: boolean;
  }
> = ({ accept, name, multiple, hide, handleFile, ...rest }) => {
  const onDrop = useCallback(
    ([acceptedFile]: File[]) => {
      handleFile(acceptedFile);
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <>
      <FileInputWrapper hide={hide} {...getRootProps()}>
        <Input {...getInputProps()} {...rest} />
        <Div css={{ height: rem(4) }} />
        <FileUploadIcon />
        <p className="fileDrag">파일 드래그</p>
        <p>혹은</p>
        <Div css={{ height: rem(8) }} />
        <Div
          role="button"
          aria-label="파일 선택 버튼"
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "$black",
            color: "$white",
            width: rem(125),
            height: rem(40),
            fontSize: rem(14),
            borderRadius: rem(100),
            margin: 0,
          }}
        >
          파일 선택
        </Div>
      </FileInputWrapper>
    </>
  );
};
export const FileProfileInput: FC<
  ComponentProps<typeof Input> & {
    handleFile: (arg0: File) => void;
    hide?: boolean;
  }
> = ({ accept, name, multiple, hide, handleFile, ...rest }) => {
  const onDrop = useCallback(
    ([acceptedFile]: File[]) => {
      handleFile(acceptedFile);
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept,
    multiple,
  });
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FileInputWrapper hide={hide} {...getRootProps()} css={{ border: 'none', maxHeight: `${rem(107)}`, height: 124 }}>
        <Input {...getInputProps()} {...rest} />
        <BadgeAvatars />
      </FileInputWrapper>
    </>
  );
};

export const FileProfileInput2: FC<
  ComponentProps<typeof Input> & {
    handleFile: (arg0: File) => void;
    hide?: boolean;
  }
> = ({ accept, name, multiple, hide, handleFile, ...rest }) => {
  const onDrop = useCallback(
    ([acceptedFile]: File[]) => {
      handleFile(acceptedFile);
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <>
      <FileInputWrapper hide={hide} {...getRootProps()} css={{ border: 'none', maxHeight: `${rem(107)}`, height: 20, width: 17 }}>
        <Input {...getInputProps()} {...rest} />
        <ImageIcon />
      </FileInputWrapper>
    </>
  );
};

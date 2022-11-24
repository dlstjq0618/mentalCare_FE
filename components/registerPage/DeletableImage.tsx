import Image from "next/image";
import { rem } from "polished";
import { ComponentProps } from "react";
import { Div, PicDeleteButton } from "~/components";
import { styled } from "~/stitches.config";

const DeletablePicItemWrapper = styled("div", {
  position: "relative",
  "& > div": {
    borderRadius: rem(20),
  },
  span: /* next image */ {
    borderRadius: rem(20),
    outline: "1px solid $black10",
    overflow: "hidden",
  },
  'div[role="button"]': {
    position: "absolute",
    top: rem(-8),
    right: rem(-8),
  },
  userSelect: "none",
  variants: {
    usage: {
      profilePic: {
        width: rem(126),
        height: rem(126),
        span: /* next image */ {
          boxShadow: "$profilePic",
        },
      },
      hospitalImageList: {
        width: rem(80),
        height: rem(80),
      },
    },
  },
  defaultVariants: {
    usage: "profilePic",
  },
});

export type DeletableImageItemProps = ComponentProps<typeof Image> & {
  usage: ComponentProps<typeof DeletablePicItemWrapper>["usage"];
  onDeleteClick?: () => void;
};

export const DeletableImage = ({
  alt,
  height,
  usage,
  src,
  width,
  onDeleteClick,
}: DeletableImageItemProps) => {
  return (
    <DeletablePicItemWrapper usage={usage}>
      <Image
        className="deletable-image"
        src={src}
        alt={alt}
        layout="fixed"
        height={height}
        width={width}
        objectFit="cover"
      />
      <PicDeleteButton onClick={onDeleteClick} />
    </DeletablePicItemWrapper>
  );
};

export const ProfilePic = ({
  src,
  alt,
  onDeleteClick,
  deletable,
}: Partial<ComponentProps<typeof Image>> &
  (
    | {
        deletable: true;
        onDeleteClick: (arg0: unknown) => void;
      }
    | {
        deletable?: false;
        onDeleteClick?: undefined;
      }
  )) => {
  return (
    <DeletablePicItemWrapper>
      {!!src ? (
        <Image
          src={src}
          alt={alt}
          layout="fixed"
          height={126}
          width={126}
          objectFit="cover"
        />
      ) : (
        <Div
          className="skeleton"
          css={{
            height: rem(126),
            width: rem(126),
            backgroundColor: "$gray06",
          }}
        />
      )}
      {deletable && <PicDeleteButton onClick={onDeleteClick} />}
    </DeletablePicItemWrapper>
  );
};

export const HospitalPic = ({
  src,
  alt,
  onClick,
  deletable,
  onDeleteClick,
}: ComponentProps<typeof Image> &
  (
    | {
        deletable: true;
        onDeleteClick: () => void;
      }
    | {
        deletable?: false;
        onDeleteClick?: undefined;
      }
  )) => {
  return (
    <DeletablePicItemWrapper usage="hospitalImageList" onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        layout="fixed"
        height={80}
        width={80}
        objectFit="cover"
      />
      {deletable && <PicDeleteButton onClick={onDeleteClick} />}
    </DeletablePicItemWrapper>
  );
};

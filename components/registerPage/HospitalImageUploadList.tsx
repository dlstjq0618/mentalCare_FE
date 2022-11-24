import { rem } from "polished";
import {
  HospitalPic,
  DeletableImageItemProps,
  UploadHospitalImageButton,
} from "~/components";
import { styled } from "~/stitches.config";

const HospitalImageUploadListWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: rem(10),
  marginTop: rem(10),
});

export const HospitalImageUploadList = ({
  images,
  onDeleteClick,
  handleFiles,
}: {
  images?: Omit<DeletableImageItemProps, "usage">[];
  onDeleteClick: (targetIndex: number) => void;
  handleFiles: (files: File[]) => void;
}) => {
  return (
    <HospitalImageUploadListWrapper>
      <UploadHospitalImageButton handleFile={handleFiles} />
      {images?.length
        ? images?.map(({ src, alt }, index) => (
            <HospitalPic
              key={`${src}-${index}`}
              src={src}
              alt={alt}
              deletable
              onDeleteClick={() => onDeleteClick(index)}
            />
          ))
        : null}
    </HospitalImageUploadListWrapper>
  );
};

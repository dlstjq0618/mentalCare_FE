import { ComponentProps, useEffect, useRef } from "react";
import DaumPostCode, { Address } from "react-daum-postcode";
import { styled } from "~/stitches.config";

export const DaumPostCodeStyled = styled(DaumPostCode);

export const DaumAddressSearch = ({
  onComplete,
  ...props
}: ComponentProps<typeof DaumPostCodeStyled>) => {
  const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);

  useEffect(() => {
    if (window.kakao?.maps?.services?.Geocoder) {
      geocoderRef.current = new window.kakao.maps.services.Geocoder();
    }
  }, []);

  const handleOnComplete = (
    address: Address & { lat?: string; lng?: string }
  ) => {
    geocoderRef.current?.addressSearch(address.address, (result, status) => {
      if (status === window?.kakao?.maps?.services?.Status.OK) {
        address.lat = result[0].y;
        address.lng = result[0].x;
      }
    });

    if (onComplete) {
      onComplete(address);
    }
  };

  return <DaumPostCodeStyled onComplete={handleOnComplete} {...props} />;
};

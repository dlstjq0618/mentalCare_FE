import { rem } from "polished";
import { useState } from "react";
import { Address } from "react-daum-postcode";
import { useFormContext } from "react-hook-form";



import { Input, DaumAddressSearch } from "~/components";
import { styled } from "~/stitches.config";


const DaumAddressSearchOnRegisterPage = styled(DaumAddressSearch, {
  border: "1px solid $black10",
  borderRadius: rem(20),
  overflow: "hidden",
});

const AddressGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: rem(10),
});

export const HospitalAddressSearchInput = () => {
  const { register, setValue, getValues } = useFormContext();
  const [addressSearchState, setAddressSearchState] = useState<
    "initial" | "searching" | "done"
  >("initial");

  const handleAddressFocus = () => {
    setAddressSearchState("searching");
  };

  const handleAddressSearchComplete = ({ address, zonecode }: Address) => {
    setAddressSearchState("done");
    setValue("zonecode", zonecode);
    setValue("address1", address);
  };

  const showDaumAddressSearch = addressSearchState === "searching";
  const showAddress2Input =
    addressSearchState === "done" || getValues("address2") !== undefined;

  return (
    <AddressGroup>
      <Input
        id="zonecode"
        type="hidden"
        required
        usage="registerPage"
        {...register("zonecode")}
      />
      <Input
        id="address1"
        type="text"
        required
        usage="registerPage"
        onFocus={handleAddressFocus}
        {...register("address1")}
      />
      {showDaumAddressSearch && (
        <DaumAddressSearchOnRegisterPage
          onComplete={handleAddressSearchComplete}
        />
      )}
      {showAddress2Input && (
        <Input
          id="address2"
          type="text"
          usage="registerPage"
          {...register("address2")}
        />
      )}
    </AddressGroup>
  );
};
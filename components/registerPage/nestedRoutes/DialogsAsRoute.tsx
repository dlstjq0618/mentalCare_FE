import { useRouter } from "next/router";
import { rem } from "polished";
import { ChangeEvent, MouseEventHandler, useEffect, useRef } from "react";
import { Address } from "react-daum-postcode";
import { useFormContext } from "react-hook-form";
import { Hospital } from "~//interfaces";
import {
  AutocompleteHospitalSearch,
  DaumAddressSearch,
  Div,
  HospitalRegisterDialogHeader,
  HospitalRegisterDialogLayout,
  Input,
  Label,
  RegisterFormRowItem,
  FormRowItemWrapper,
  RoundedButton,
} from "~/components";

// /auth/register/hospital
export const HospitalRegisterInitialDialog = () => {
  const router = useRouter();

  return (
    <HospitalRegisterDialogLayout>
      <Input
        usage="registerPage"
        placeholder="병원 이름, 전화번호로 검색"
        css={{
          borderColor: "$gray01",
          boxShadow: `0 ${rem(3)} ${rem(3)} 0 rgba(140, 140, 140, 0.3);`,
        }}
        onFocus={() =>
          router.push(
            {
              pathname: "/auth/register/[...info]",
              query: {
                ...router.query,
                info: ["hospital", "search"],
              },
            },
            undefined,
            {
              scroll: false,
            }
          )
        }
      />
      <p>또는</p>
      <RoundedButton
        color="orange"
        outlined
        css={{ height: rem(50), width: "100%" }}
        onClick={(e) => {
          e.preventDefault();
          router.push(
            {
              pathname: "/auth/register/[...info]",
              query: {
                ...router.query,
                info: ["hospital", "custom"],
              },
            },
            undefined,
            {
              scroll: false,
            }
          );
        }}
      >
        직접 입력
      </RoundedButton>
    </HospitalRegisterDialogLayout>
  );
};

// /auth/register/hospital/search
export const HospitalRegisterBySearchDialog = () => {
  const { setValue, trigger } = useFormContext();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCustomHospitalClick: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();

    router.push(
      {
        pathname: "/auth/register/[...info]",
        query: {
          ...router.query,
          info: ["hospital", "custom"],
        },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  const handleSelectHospitalFromSearch = async (hospital: Hospital) => {
    setValue("hospital", hospital);
    setValue("hospitalZonecode", hospital.postcode);
    setValue("hospitalName", hospital.name);
    setValue("hospitalTel", hospital.phone);
    setValue("hospitalAddress1", hospital.address1);
    setValue("hospitalAddress2", hospital.address2);
    setValue("hospitalRegister", "true");
    await trigger([
      "hospital",
      "hospitalZonecode",
      "hospitalName",
      "hospitalTel",
      "hospitalAddress1",
      "hospitalAddress2",
      "hospitalRegister",
    ]);
    router.push("/auth/register");
  };

  return (
    <HospitalRegisterDialogLayout>
      <AutocompleteHospitalSearch
        handleSelect={handleSelectHospitalFromSearch}
      />
      <Div
        className="full"
        css={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: rem(90),
          borderTop: "1px solid $gray01",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${rem(20)} ${rem(30)}`,
          backgroundColor: "$white",
        }}
      >
        찾으시는 병원이 없으신가요?{" "}
        <RoundedButton
          color="orange"
          outlined
          css={{
            width: rem(180),
            height: rem(50),
            boxShadow: "0 3px 3px 0 rgba(140, 140, 140, 0.3)",
          }}
          onClick={handleCustomHospitalClick}
        >
          직접 입력
        </RoundedButton>
      </Div>
    </HospitalRegisterDialogLayout>
  );
};

// /auth/register/hospital/custom
export const HospitalRegisterByUserInputDialog = () => {
  const router = useRouter();
  const { setValue, getValues } = useFormContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const address1Ref = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.value = getValues("hospitalName") ?? "";
    }

    if (telRef.current) {
      telRef.current.value = getValues("hospitalTel") ?? "";
    }

    if (address1Ref.current) {
      address1Ref.current.value = getValues("hospitalAddress1") ?? "";
    }

    if (address2Ref.current) {
      address2Ref.current.value = getValues("hospitalAddress2") ?? "";
    }
  }, [getValues, setValue]);

  const handleAddressSearchClick = () => {
    router.push(
      {
        pathname: "/auth/register/[...info]",
        query: {
          ...router.query,
          info: ["hospital", "custom", "address"],
        },
      },
      undefined,
      { scroll: false }
    );
  };

  const handleCustomHospitalInfoSubmit = () => {
    setValue("hospitalRegister", "true");
    router.push("/auth/register");
  };

  const showAddressFields = Boolean(getValues("hospitalZonecode"));

  return (
    <HospitalRegisterDialogLayout headerText={"직접 입력"}>
      <RegisterFormRowItem
        label="병원 이름"
        id="hospitalName"
        placeholder="병원 이름을 입력해주세요."
        name="hospitalName"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue("hospitalName", e.target.value);
        }}
        ref={nameRef}
      />
      <RegisterFormRowItem
        label="전화번호"
        id="hospitalPhone"
        placeholder="전화번호를 입력해주세요."
        name="hospitalTel"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue("hospitalTel", e.target.value);
        }}
        ref={telRef}
      />
      <FormRowItemWrapper css={{ alignItems: "initial" }}>
        <Label>주소</Label>
        <Div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: rem(10),
            input: {
              width: "100%",
            },
          }}
        >
          <RoundedButton
            outlined
            css={{
              height: rem(50),
              color: "$black",
              backgroundColor: "$white",
              boxShadow: "0 3px 3px 0 rgba(140, 140, 140, 0.3)",
              fontWeight: "bold",
            }}
            onClick={handleAddressSearchClick}
          >
            주소 검색
          </RoundedButton>
          <Input
            id="hospitalAddress1Dialog"
            disabled
            hidden={!showAddressFields}
            css={{
              alignSelf: "flex-end",
              border: "1px solid $gray06",
              backgroundColor: "$gray08",
            }}
            ref={address1Ref}
          />
          <Input
            id="hospitalAddress2Dialog"
            hidden={!showAddressFields}
            css={{
              alignSelf: "flex-end",
              border: "1px solid $gray06",
              backgroundColor: "$gray08",
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("hospitalAddress2", e.target.value);
            }}
            ref={address2Ref}
          />
        </Div>
      </FormRowItemWrapper>
      <RoundedButton
        color="orange"
        css={{ marginTop: rem(20), height: rem(50) }}
        onClick={handleCustomHospitalInfoSubmit}
      >
        저장
      </RoundedButton>
    </HospitalRegisterDialogLayout>
  );
};

// /auth/register/hospital/custom/address
export const AddressSearchDialog = () => {
  const router = useRouter();
  const { setValue } = useFormContext();

  return (
    <>
      <HospitalRegisterDialogHeader
        backButton
        onBackButtonClick={() => {
          window.history.back();
        }}
        headerText="주소 검색"
      />
      <Div>
        <DaumAddressSearch
          style={{ height: `var(--sizes-dialogHeight)` }}
          onComplete={(addressData: Address) => {
            setValue("hospital", addressData);
            setValue("hospitalZonecode", addressData.zonecode);
            setValue("hospitalAddress1", addressData.address);

            router.push({
              pathname: "/auth/register/[...info]",
              query: {
                ...router.query,
                info: ["hospital", "custom"],
              },
            });
          }}
        />
      </Div>
    </>
  );
};

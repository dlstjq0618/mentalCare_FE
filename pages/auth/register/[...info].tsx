import { useRouter } from "next/router";
import { rem } from "polished";
import { ReactElement, ReactNode } from "react";
import {
  AddressSearchDialog,
  DialogWithCloseButton,
  HospitalRegisterBySearchDialog,
  HospitalRegisterByUserInputDialog,
  HospitalRegisterInitialDialog,
} from "~/components";
import { RegisterPageLayout } from "~/pages/auth/register";

export default function HospitalRegisterDialogAsNestedRoute() {
  const router = useRouter();

  const currentRoute = router.asPath;

  const componentMap: Record<string, ReactNode> = {
    "/auth/register/hospital": <HospitalRegisterInitialDialog />,
    "/auth/register/hospital/search": <HospitalRegisterBySearchDialog />,
    "/auth/register/hospital/custom": <HospitalRegisterByUserInputDialog />,
    "/auth/register/hospital/custom/address": <AddressSearchDialog />,
  };

  const dialog = componentMap[currentRoute];

  return (
    <DialogWithCloseButton
      aria-label="병원 등록 팝업"
      showDialog
      close={() => router.push("/auth/register", undefined, { scroll: false })}
      css={{
        "&[data-reach-dialog-content]": {
          display: "flex",
          flexDirection: "column",
          width: rem(476),
          padding: 0,
          overflow: "hidden",
          minHeight: "$dialogHeight",
        },

        header: {
          marginBottom: rem(30),
        },
        p: {
          textAlign: "center",
          margin: `${rem(30)} 0 ${rem(30)}`,
        },
      }}
    >
      {dialog}
    </DialogWithCloseButton>
  );
}

HospitalRegisterDialogAsNestedRoute.getLayout = function getLayout(
  page: ReactElement
) {
  return <RegisterPageLayout>{page}</RegisterPageLayout>;
};

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  ImmediatelyTreatmentForm,
  PrivateImmediatelyHeader,
  AlertDialog,
} from "~/components";
import Layout from "~/components/Layout";
import { PageTitle } from "~/components/PageTitle";
import { toIntPhoneNumber } from "~/utils/phone.utils";
import { api } from "~/woozooapi";

const PrivateImmediately: React.FC = () => {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  const formMethods = useForm({
    mode: "all",
  });

  const [dialogState, setDialogState] = useState({
    isOpen: false,
    message: "",
  });

  const onSubmit = (data: any) => {
    if (data.mobile && data.mobile.includes("-")) {
      const mobile = data.mobile.replaceAll("-", "");
      api.diagnosis
        .requestPrivateDiagnosis({
          type: "immediately",
          name: data.name,
          mobile: toIntPhoneNumber(mobile),
          treatmentClassification: data.treatment,
        })
        .then((response) => {
          if (response.isSuccess) {
            setDialogState({
              isOpen: true,
              message: `접수 요청이 완료되었습니다.
  환자가 진료 신청서를 작성하면 대기실로 입장합니다.`,
            });
          } else {
            setDialogState({
              isOpen: true,
              message: response.message,
            });
          }
        })
        .catch((err) => console.log(err));
    }
    return;
  };

  return (
    <>
      <PageTitle>즉시 접수</PageTitle>
      <Layout>
        <PrivateImmediatelyHeader />
        <FormProvider {...formMethods}>
          <form className="main" onSubmit={formMethods.handleSubmit(onSubmit)}>
            <ImmediatelyTreatmentForm />
          </form>
        </FormProvider>
      </Layout>
      <AlertDialog
        isOpen={dialogState.isOpen}
        onDismiss={() => {
          setDialogState((prev) => ({ ...prev, isOpen: false }));
          router.push("/diagnosis");
        }}
      >
        {dialogState.message}
      </AlertDialog>
    </>
  );
};

export default PrivateImmediately;

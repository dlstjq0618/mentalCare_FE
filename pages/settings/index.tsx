
import { useSession } from "next-auth/react";
import { rem } from 'polished';
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState, useReducer, Reducer } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import {
    Div,
    Heading,
    Section,
    BankAccountInfoForm,
    RegisterForm,
    Input
} from "~/components";
import LayoutComponent from "~/components/Layout";
import { PageTitle } from "~/components/PageTitle";
import { selectDiagnosisEditState } from "~/store/settingsSlice";
import SettingInfoForm from "~/components/settingPage/SettingInfoForm";
import OpeningTimeForm from "~/components/settingPage/OpeningTimeForm";

export default function SettingsPage({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm()
    const methods = useForm();
    const state = useSelector(selectDiagnosisEditState);
    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/login");
        },
    });
    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', () => setOpen(true))
        return () => {
            if (open && state === "edit") {
                if (!confirm("저장하지 않고 나가시겠습니까?")) {
                    router.push("/settings")
                }
            }
        }
    }, [open])

    const onSubmit = (data: any) => { // vi signUp Api request
        console.log("onsubmit", data);
        // api.doctor
        //   .signUp({
        //     email: data.email,
        //     username: data.name,
        //     password: data.pw1,
        //     mobile: data.phone,
        //     hospitalId: data.hospital.id,
        //     imageUrl: data.profilePic,
        //     doctorLicenseUrl: data.doctorLicense,
        //     specialistLicenseUrl: data.specialLicense,
        //     specialist: data.special,
        //     hospitalName: data.hospitalName,
        //     hospitalPhone: data.hospitalTel,
        //     postcode: data.hospital.zonecode,
        //     address1: data.hospitalAddress1,
        //     address2: data.hospitalAddress2,
        //     state: data.hospital.sido,
        //     city: data.hospital.sigungu,
        //     lat: data.hospital.lat,
        //     lng: data.hospital.lng,
        //     hospitalImageUrls: data.hospitalPics,
        //     accountHolder: data.accountHolder,
        //     bankName: data.bankName,
        //     accountNumber: data.accountNumber,
        //     accountHolderBirthdate: data.accountHolderBirthdate
        //   })
        //   .then(() => {
        //     router.push("/auth/register/complete");
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });
    };
    const onError = (e: any) => { // v1 error message
        console.error("e", e);
        // if (e.phone) {
        //     return alert("휴대폰 번호를 확인해주세요.")
        // }
        // if (e.doctorLicense) {
        //     return alert(e.doctorLicense.message)
        // }
        // if (e.profilePic) {
        //     return alert(e.profilePic.message)
        // }
        // if (e.accountHolder) {
        //     return alert(e.accountHolder.message)
        // }
        // if (e.hospitalRegister) {
        //     return alert(e.hospitalRegister.message)
        // }
    };

    return (
        <>
            <PageTitle>설정</PageTitle>
            <FormProvider {...methods}>
                <RegisterForm onSubmit={methods.handleSubmit(onSubmit)}>
                    <SettingInfoForm />
                    <BankAccountInfoForm title={false} />
                    <OpeningTimeForm />
                    <Div css={{
                        width: rem(900),
                        display: "flex",
                        justifyContent: "end"
                    }}>
                        <Input
                            css={{ width: rem(200), marginTop: rem(20), cursor: "pointer" }}
                            type="submit"
                            value="저장"
                        />
                    </Div>
                </RegisterForm>
            </FormProvider>
            <Div css={{ height: rem(20) }} />
            <Div css={{ height: rem(20) }} />
            <div id="hospital-info" />
            <Div css={{ height: rem(20) }} />
            <div id="openingtimes-info" />
            {children}
        </>
    );
}

export const SettingsPageBaseLayout: FC = ({ children }) => {
    return (
        <LayoutComponent>
            <Section
                css={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Heading
                    as="h1"
                    css={{
                        fontSize: rem(20),
                        fontWeight: "bold",
                        paddingBottom: rem(20),
                    }}
                >
                    설정
                </Heading>
                {children}
            </Section>
        </LayoutComponent>
    );
};

SettingsPage.getLayout = function getLayout(page: ReactNode) {
    return <SettingsPageBaseLayout>{page}</SettingsPageBaseLayout>;
};

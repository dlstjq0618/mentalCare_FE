
import { useSession } from "next-auth/react";
import { rem } from 'polished';
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState, useReducer, Reducer } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import {
    MainTitle,
} from "~/components/settlementAccount";
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
import { api } from "~/woozooapi";
import { selectCounselorId } from "~/store/doctorInfoForChangeSlice";
import { selectCounselingInfoData, selectSettingSaveControlls } from "~/store/calendarDetailSlice";

export default function SettingsPage({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm()
    const methods = useForm();
    const state = useSelector(selectDiagnosisEditState);
    const userId = useSelector(selectCounselorId);
    const fileUploadDate = useSelector(selectCounselingInfoData)
    const passwordSave = useSelector(selectSettingSaveControlls);

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

    useEffect(() => {
        console.log("passwordSave", passwordSave);
    })


    const onSubmit = (data: any) => { // vi signUp Api request
        if (!passwordSave) {
            return alert("비밀번호가 일치하지 않습니다.")
        }
        console.log("data", data);
        api.counselor
            .update(userId, {
                password: data.password,
                mobile: data.mobile,
                image: data.image === "" ? fileUploadDate.image : data.image, // 프로필 사진
                certificate_image: data.certificate_image,
                career: data.career,
                qualification_level: data.qualification_level,
                education: data.education,
                other_history: data.other_history,
                consultation_fee_day: data.consultation_fee_day,
                consultation_fee_night: data.consultation_fee_night,
                account_info: {
                    bank_name: data.bankName === "" ? fileUploadDate.accountInfo.bankName : data.bankName,
                    account_holder: data.accountHolder === "" ? fileUploadDate.accountInfo.accountHolder : data.accountHolder,
                    account_holder_birthdate: data.accountHolderBirthdate === "" ? fileUploadDate.accountInfo.accountHolderBirthdate : data.accountHolderBirthdate,
                    account_number: data.accountNumber === "" ? fileUploadDate.accountInfo.accountNumber : data.accountNumber,
                },
                opening_times: [
                    {
                        id: null,
                        weekday: 0,
                        start_time: "07:00:00",
                        end_time: "20:00:00"
                    },
                    {
                        id: null,
                        weekday: 1,
                        start_time: "07:00:00",
                        end_time: "22:00:00"
                    },
                ],
                counseling_subject: null,
            })
            .then((res) => {
                console.log("res", res)
            })
            .catch((e: any) => {
                console.error(e);
            });
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
                    <BankAccountInfoForm title={true} />
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
                {/* <Heading
                    as="h1"
                    css={{
                        marginTop: rem(32),
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        paddingBottom: rem(20),
                    }}
                >
                    설정
                </Heading> */}
                <MainTitle>
                    설정
                </MainTitle>
                {children}
            </Section>
        </LayoutComponent>
    );
};

SettingsPage.getLayout = function getLayout(page: ReactNode) {
    return <SettingsPageBaseLayout>{page}</SettingsPageBaseLayout>;
};

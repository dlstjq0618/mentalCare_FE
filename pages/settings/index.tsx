
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

    console.log("children", children);

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
        if (!passwordSave) {
            return alert("비밀번호가 일치하지 않습니다.")
        }
        const isMobile = data.mobile?.replace('010', '');
        console.log("ismobile", isMobile)
        const customMobile = "0810" + isMobile

        api.counselor
            .update(userId, {
                password: data.password,
                mobile: customMobile,
                image: data.image === "" ? fileUploadDate.image : data.image,
                certificate_image: data.certificate_image === "" ? fileUploadDate.certificateImage : data.certificate_image,
                career: data.career,
                qualification_level: data.qualification_level,
                education: data.education,
                other_history: data.other_history,
                consultation_fee_day: data.consultation_fee_day,
                consultation_fee_night: data.consultation_fee_night,
                call_consultation_fee_day: data.call_consultation_fee_day === null ? fileUploadDate.callConsultationFeeDay : data.call_consultation_fee_day,
                call_consultation_fee_night: data.call_consultation_fee_day === null ? fileUploadDate.callConsultationFeeNight : data.call_consultation_fee_night,
                account_info: {
                    bank_name: data.bankName === "" ? fileUploadDate.accountInfo.bankName : data.bankName,
                    account_holder: data.accountHolder === "" ? fileUploadDate.accountInfo.accountHolder : data.accountHolder,
                    account_holder_birthdate: data.accountHolderBirthdate === "" ? fileUploadDate.accountInfo.accountHolderBirthdate : data.accountHolderBirthdate,
                    account_number: data.accountNumber === "" ? fileUploadDate.accountInfo.accountNumber : data.accountNumber,
                },
                opening_times: data.opening_times.length === 0 ? fileUploadDate.openingTimes : data.opening_times,
                // opening_times: [{
                //     weekday: 0,
                //     start_time: '08:00:00',
                //     end_time: "22:00:00"
                // }],
                counseling_subject: data.counseling_subject.length === 0 ? fileUploadDate.counselingSubject : data.counseling_subject
            })
            .then((res) => {
                console.log("res", res)
                if (res.isSuccess) {
                    return alert('저장되었습니다.')
                }
            })
            .catch((error: {
                response: {
                    data: {
                        [x: string]: any;
                        detail: string; password: string;
                    };
                };
            }) => {
                if (error.response.data.image) {
                    return alert("프로필 사진을 등록해 주세요.")
                }
                if (error.response.data.password) {
                    return alert("비밀번호는 8자리 이상 입력해 주세요.")
                }
            });
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

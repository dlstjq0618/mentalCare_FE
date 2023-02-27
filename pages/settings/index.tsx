
import { useSession } from "next-auth/react";
import { rem } from 'polished';
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState, useReducer, Reducer } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import { selectCounselingInfoData, selectPriceZreo, selectSettingSaveControlls, setChatBoxOpenState } from "~/store/calendarDetailSlice";
import PriceGrid from "~/components/Grid/PriceGrid";
import { RowAndColumnSpacing } from "~/components/Grid/Grid";

export default function SettingsPage({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm()
    const methods = useForm();
    const state = useSelector(selectDiagnosisEditState);
    const userId = useSelector(selectCounselorId);
    const fileUploadDate = useSelector(selectCounselingInfoData)
    const passwordSave = useSelector(selectSettingSaveControlls);
    const dispatch = useDispatch();
    const price = useSelector(selectPriceZreo);

    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/login");
        },
    });
    const router = useRouter();


    useEffect(() => {
        dispatch(setChatBoxOpenState("null"))
    }, [])


    const onSubmit = (data: any) => { // vi signUp Api request

        console.log("data.opening_times", data.opening_times);
        if (!passwordSave) {
            return alert("비밀번호가 일치하지 않습니다.")
        }
        const isMobile = data.mobile?.replace('010', '');
        const customMobile = "0810" + isMobile

        // if (price) {
        //     return alert("가격 0원이상 입력해 주세요.")
        // }

        api.counselor
            .update(userId, {
                password: data.password,
                introduction: data.introduction === "" ? fileUploadDate.inintroduction : data.introduction,
                mobile: data.mobile,
                image: data.image === "" ? fileUploadDate.image : data.image,
                certificate_image: data.certificate_image === "" ? fileUploadDate.certificateImage : data.certificate_image,
                career: data.career,
                qualification_level: data.qualification_level,
                education: data.education,
                other_history: data.other_history,

                account_info: {
                    bank_name: data.bankName === "" ? fileUploadDate.accountInfo.bankName : data.bankName,
                    account_holder: data.accountHolder === "" ? fileUploadDate.accountInfo.accountHolder : data.accountHolder,
                    account_holder_birthdate: data.accountHolderBirthdate === "" ? fileUploadDate.accountInfo.accountHolderBirthdate : data.accountHolderBirthdate,
                    account_number: data.accountNumber === "" ? fileUploadDate.accountInfo.accountNumber : data.accountNumber,
                },
                // opening_times: data.opening_times,
                opening_times: [
                    {
                        weekday: 0,
                        startTime: "09:00:00",
                        endTime: "23:59:59"
                    },
                    {
                        weekday: 1,
                        startTime: "09:00:00",
                        endTime: "23:59:59"
                    },
                    {
                        weekday: 2,
                        startTime: "09:00:00",
                        endTime: "23:59:59"
                    },
                    {
                        weekday: 3,
                        startTime: "09:00:00",
                        endTime: "23:59:59"
                    },
                    {
                        weekday: 4,
                        startTime: "09:00:00",
                        endTime: "23:59:59"
                    },
                    {
                        weekday: 5,
                        startTime: "09:00:00",
                        endTime: "23:59:59"
                    },
                    {
                        weekday: 6,
                        startTime: "09:00:00",
                        endTime: "23:59:59"
                    },
                    {
                        weekday: 7,
                        startTime: "09:00:00",
                        endTime: "23:59:59"
                    },
                ],
                counseling_subject: data.counseling_subject.length === 0 ? fileUploadDate.counselingSubject : data.counseling_subject,
                /** 전화상담 금액 */
                call_consultation_fifty_fee_day: data.call_consultation_fifty_fee_day,
                call_consultation_fifty_fee_night: data.call_consultation_fifty_fee_night,
                call_thirty_consultation_fee_day: data.call_thirty_consultation_fee_day,
                call_thirty_consultation_fee_night: data.call_thirty_consultation_fee_night,
                /** 채팅상담 금액 */
                consultation_thirty_fee_day: data.consultation_thirty_fee_day,
                consultation_thirty_fee_night: data.consultation_thirty_fee_night,
                consultation_fifty_fee_day: data.consultation_fifty_fee_day,
                consultation_fifty_fee_night: data.consultation_fifty_fee_night,
            })
            .then((res) => {
                if (res.isSuccess) {
                    return alert('저장되었습니다.')
                }
            })
            .catch((error: {
                response: {
                    data: {
                        [x: string]: any;
                        detail: string; password: string; counselingSubject: string;
                    };
                };
            }) => {
                console.log('error', error.response)
                if (error.response.data.image) {
                    return alert("프로필 사진을 등록해 주세요.")
                }
                if (error.response.data.password) {
                    return alert("비밀번호는 8자리 이상 입력해 주세요.")
                }
                if (error.response.data.counselingSubject) {
                    return alert('상담과목을 선택해 주세요.')
                }
                // if (data.opening_times.length === 0) {
                //     return alert('상담시간을 선택해 주세요.')
                // }
            });
    };

    return (
        <>
            <PageTitle>설정</PageTitle>
            <FormProvider {...methods}>
                <RegisterForm onSubmit={methods.handleSubmit(onSubmit)} style={{ position: 'sticky', zIndex: 1 }}>
                    <SettingInfoForm />
                    <PriceGrid />
                    <RowAndColumnSpacing />
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

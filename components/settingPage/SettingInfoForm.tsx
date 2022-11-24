import React, { useRef } from 'react';
import { rem } from 'polished';
import { Reducer, ReducerState, useEffect, useReducer, useState } from "react";
import { validateImageFile } from "~/utils/validation.utils";
import styled, { css } from 'styled-components';
import { useForm, FormProvider } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import {
    LicenceField,
    Input,
    Label,
} from "~/components";
import BadgeAvatars from "~/components/settingPage/AvatarBadge";
import { api } from "~/woozooapi";

interface IProps {

}
interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
}

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;

`;
const Line = styled.div`
width: 100%;
  height: 1px;
  flex-grow: 0;
  color: #b4b4b4;
  margin-top: 37.5px;
  border-bottom: dotted;
`;

const InfoGrid = styled.div<IStyled>`
  ${(props) =>
        props.width &&
        css`
        width: ${rem(props.width)};
    `}
    padding: ${rem(50)} ${rem(150)};
    height: auto;
    flex-grow: 0;
    border-radius: 20px;
    background-color: #fff;
`;

const MainDiv = styled.div<IStyled>`
  display  : flex ;
  ${(props) =>
        props.margin &&
        css`
        margin-left: ${rem(props.margin)};
    `}
    ${(props) =>
        props.flex &&
        css`
        justify-content: space-between;
    `}
    ${(props) =>
        props.bottom &&
        css`
        margin-bottom: ${rem(props.bottom)};
    `}
`;

const Text = styled.span<IStyled>`
    line-height: 1.4;
      ${(props) =>
        props.size &&
        css`    
        font-size: ${rem(props.size)};
    `}
    ${(props) =>
        props.bold &&
        css`
        font-weight: ${props.bold};
    `}
    ${(props) =>
        props.color &&
        css`
        color: ${props.color};
    `}
    ${(props) =>
        props.margin &&
        css`
        margin-left: ${rem(props.margin)};
    `}
`;

const reducer: Reducer<
    {
        doctorLicenseFileName: string;
        careerLicenseFileName: string;
        qualificationLevelFileName: string;
        educationFileName: string;
        otherHistoryFileName: string;
    },
    {
        type: string;
        payload: any;
    }
> = (state, action) => {
    switch (action.type) {
        case "setDoctorLicenceFileName":
            return { ...state, doctorLicenseFileName: action.payload };
        case "setCareerLicenseFileName":
            return { ...state, careerLicenseFileName: action.payload };
        case "setQualificationLevelFileName":
            return { ...state, qualificationLevelFileName: action.payload };
        case "setEducationFileName":
            return { ...state, educationFileName: action.payload };
        case "setOtherHistoryFileName":
            return { ...state, otherHistoryFileName: action.payload };

        default:
            return state;
    }
};
const initialState: ReducerState<typeof reducer> = {
    doctorLicenseFileName: "",
    careerLicenseFileName: "",
    qualificationLevelFileName: "",
    educationFileName: "",
    otherHistoryFileName: "",
};

function SettingInfoForm(props: IProps) {
    const [registerFormState, dispatch] = useReducer(reducer, initialState);
    const [textValue, setTextValue] = useState("");
    const { register, setValue, setError, trigger, getValues, formState, watch } =
        useFormContext();
    const password = useRef({});
    password.current = watch("password", "");
    const formatter = new Intl.NumberFormat('ko');



    const handleDoctorLicenseUpload = async (file: File) => {
        const result = validateImageFile(file);
        if (!result.valid) {
            setError("certificate_image", {
                types: result.message,
            });
            return;
        }
        dispatch({ type: "setDoctorLicenceFileName", payload: file.name });
        const response = await api.fileUpload({
            file,
            name: "certificate_image",
        });
        setValue("certificate_image", response.url);
        await trigger("certificate_image");
    };

    const handleCareerLicenseUpload = async (file: File) => {
        const result = validateImageFile(file);
        if (!result.valid) {
            setError("career", {
                types: result.message,
            });
            return;
        }
        dispatch({ type: "setCareerLicenseFileName", payload: file.name });
        const response = await api.fileUpload({
            file,
            name: "career",
        });
        setValue("career", response.url);
        await trigger("career");
    };

    const handleQualificationLavelLicenseUpload = async (file: File) => {
        const result = validateImageFile(file);
        if (!result.valid) {
            setError("qualification_level", {
                types: result.message,
            });
            return;
        }
        dispatch({ type: "setQualificationLevelFileName", payload: file.name });
        const response = await api.fileUpload({
            file,
            name: "qualification_level",
        });
        setValue("qualification_level", response.url);
        await trigger("qualification_level");
    };

    const handleEducationLicenseUpload = async (file: File) => {
        const result = validateImageFile(file);
        if (!result.valid) {
            setError("education", {
                types: result.message,
            });
            return;
        }
        dispatch({ type: "setEducationFileName", payload: file.name });
        const response = await api.fileUpload({
            file,
            name: "education",
        });
        setValue("education", response.url);
        await trigger("education");
    };

    const handleOtherLicenseUpload = async (file: File) => {
        const result = validateImageFile(file);
        if (!result.valid) {
            setError("other_history", {
                types: result.message,
            });
            return;
        }
        dispatch({ type: "setOtherHistoryFileName", payload: file.name });
        const response = await api.fileUpload({
            file,
            name: "other_history",
        });
        setValue("other_history", response.url);
        await trigger("other_history");
    };


    // file Delete
    const handleDoctorLicenseDelete = async () => { // 상담자격증 삭제
        setValue("certificate_image", undefined);
        await trigger("certificate_image");
        dispatch({ type: "setDoctorLicenceFileName", payload: "" });
    };

    const handleCareerLicenseDelete = async () => { // 경력 삭제
        setValue("career", undefined);
        await trigger("career");
        dispatch({ type: "setCareerLicenseFileName", payload: "" });
    };
    const handleQualificationLavelLicenseDelete = async () => { // 자격급수 삭제
        setValue("qualification_level", undefined);
        await trigger("qualification_level");
        dispatch({ type: "setQualificationLevelFileName", payload: "" });
    };
    const handleEducationLicenseDelete = async () => { // 학력삭제
        setValue("education", undefined);
        await trigger("education");
        dispatch({ type: "setEducationFileName", payload: "" });
    };
    const handleOtherLicenseDelete = async () => { // 기타이력
        setValue("other_history", undefined);
        await trigger("other_history");
        dispatch({ type: "setOtherHistoryFileName", payload: "" });
    };

    const onlyNumberText = (data: string) => {
        setTextValue(data)
        if (data) {
            const replaceData = data.replace(/[^0-9]/g, "")
            return setTextValue(replaceData)
        }
    };


    return (
        <>
            <InfoGrid width={900}>
                <MainDiv>
                    <BadgeAvatars />
                    <div className="profile" style={{ width: "100%" }}>
                        <MainDiv margin={40} className="name" bottom={22}>
                            <Text size={22} bold={"bold"} color={"#333"}>
                                {"김의사"}
                            </Text>
                        </MainDiv>
                        <MainDiv margin={40} className="email" flex bottom={10}>
                            <Text size={17} color={"#999"}>
                                {"email"}
                            </Text>
                            <Text size={17} color={"#333"}>
                                {"sean@correctionvitale.com "}
                            </Text>
                        </MainDiv>
                        <MainDiv margin={40} className="phone">
                            <Text size={17} color={"#999"}>
                                {"휴대폰번호"}
                            </Text>
                            <Text size={17} color={"#333"} margin={140}>
                                {"010-5555-5555"}
                            </Text>
                        </MainDiv>
                    </div>
                </MainDiv>
                <Line></Line>
                <StyledDiv>
                    <Label
                        htmlFor="password"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            marginTop: rem(44.5)
                        }}
                    >
                        비밀번호
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <Input
                        autoComplete='off'
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        css={{
                            paddingInline: rem(30),
                            width: rem(475),
                            marginTop: rem(29.5)
                        }}
                    />
                </StyledDiv>
                <StyledDiv>
                    <Label
                        htmlFor="password2"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            marginTop: rem(44.5)
                        }}
                    >
                        비밀번호 확인
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <Input
                        {...register("password")}
                        autoComplete='off'
                        id="password2"
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        css={{
                            paddingInline: rem(30),
                            width: rem(475),
                            marginTop: rem(29.5)
                        }}
                    />
                </StyledDiv>
                <LicenceField
                    required
                    label='상담사 자격증'
                    name="certificate_image"
                    fileName={registerFormState.doctorLicenseFileName}
                    handleUpload={handleDoctorLicenseUpload}
                    handleDelete={handleDoctorLicenseDelete}
                />
                <LicenceField
                    required
                    label='경력'
                    name="career"
                    fileName={registerFormState.careerLicenseFileName}
                    handleUpload={handleCareerLicenseUpload}
                    handleDelete={handleCareerLicenseDelete}
                />
                <LicenceField
                    required
                    label='자격급수'
                    name="qualification_level"
                    fileName={registerFormState.qualificationLevelFileName}
                    handleUpload={handleQualificationLavelLicenseUpload}
                    handleDelete={handleQualificationLavelLicenseDelete}
                />
                <LicenceField
                    required
                    label='학력'
                    name="education"
                    fileName={registerFormState.educationFileName}
                    handleUpload={handleEducationLicenseUpload}
                    handleDelete={handleEducationLicenseDelete}
                />
                <LicenceField
                    required
                    label='기타 이력'
                    name="other_history"
                    fileName={registerFormState.otherHistoryFileName}
                    handleUpload={handleOtherLicenseUpload}
                    handleDelete={handleOtherLicenseDelete}
                />
                <StyledDiv>
                    <Label
                        htmlFor="AmPrice"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            marginTop: rem(44.5)
                        }}
                    >
                        주간 상담비
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <Input
                        {...register("consultation_fee_day", {
                            valueAsNumber: true,
                        })}
                        autoComplete='off'
                        id="AmPrice"
                        type="number"
                        placeholder="비밀번호를 입력해주세요."
                        css={{
                            paddingInline: rem(30),
                            width: rem(475),
                            marginTop: rem(29.5)
                        }}
                    />
                </StyledDiv>
                <StyledDiv>
                    <Label
                        htmlFor="PmPrice"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            marginTop: rem(44.5)
                        }}
                    >
                        야간 상담비
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <Input
                        {...register("consultation_fee_night", {
                            valueAsNumber: true,
                        })}
                        autoComplete='off'
                        id="PmPrice"
                        type="number"
                        placeholder="비밀번호를 한번 더 입력해주세요."
                        css={{
                            paddingInline: rem(30),
                            width: rem(475),
                            marginTop: rem(29.5)
                        }}
                    />
                </StyledDiv>
            </InfoGrid>
        </>
    );
}

export default SettingInfoForm;
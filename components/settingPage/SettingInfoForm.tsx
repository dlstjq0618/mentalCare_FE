import React, { useRef } from 'react';
import { rem } from 'polished';
import { Reducer, ReducerState, useEffect, useReducer, useState } from "react";
import { validateImageFile } from "~/utils/validation.utils";
import styled, { css } from 'styled-components';
import { useForm, FormProvider } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import {
    FileProfileInput,
    IconButton,
    Input,
    Label,
    SettingLicenceField,
    TextArea,
    MoneyInput
} from "~/components";
import BadgeAvatars from "~/components/settingPage/AvatarBadge";
import { api } from "~/woozooapi";
import { useDispatch, useSelector } from 'react-redux';
import { selectCounselorName } from '~/store/doctorInfoForChangeSlice';
import { selectCounselingInfoData, setCounselingProfileImage, selectCounselingProfileImage, setSettingSaveControlls } from '~/store/calendarDetailSlice';
import { info } from 'console';
import { RowAndColumnSpacing } from '../Grid/Grid';
import PriceGrid from '../Grid/PriceGrid';

interface IProps {

}
interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
    button?: boolean;
    spacing?: number;
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
    ${(props) =>
        props.spacing &&
        css`
            letter-spacing: ${rem(props.spacing)};
            opacity: 0.5;
    `}
    ${(props) =>
        props.button &&
        css`
        cursor: pointer;
        flex-grow: 0;
        height: 28px;
        flex-direction: row;
        text-align: center;
        padding: 1px 10px;
        align-items: flex-start;
        margin: 0px 3px 1px 14px;
        gap: 10px;
        border-radius: 4px;
        border: solid 1px rgba(0, 0, 0, 0.3);
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
    const dispatch2 = useDispatch();
    const [textValue, setTextValue] = useState("");
    const { register, setValue, setError, trigger, getValues, formState, watch } =
        useFormContext();
    const password = useRef({});
    password.current = watch("password", "");
    const userName = useSelector(selectCounselorName);
    const infoData = useSelector(selectCounselingInfoData);
    const [dayPrice, setDayPrice] = useState(infoData.consultationFeeDay)
    const [nightPrice, setNightPrice] = useState(infoData.consultationFeeNight);
    const [callDayPrice, setCallDayPrice] = useState("");
    const [callNightPrice, setCallNightPrice] = useState("");

    const [isPassword, setIsPassword] = useState("")
    const [isPasswordConfirm, setIsPasswordConfirm] = useState("");
    const [phoneNumberChange, setPhoneNumberChange] = useState(false);

    const [isPhoneNumber, setIsPhoneNumber] = useState('');

    const phoneNumber = infoData.mobile?.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '0$2-$3-$4');
    const phoneNumber2 = infoData.mobile?.substr(0, 3) + '-' + infoData.mobile?.substr(3, 4) + '-' + infoData.mobile?.substr(7, 4)

    const handleProfilePicUpload = async (file: File) => {
        const result = validateImageFile(file);

        if (!result.valid) {
            setError("profilePic", {
                types: result.message,
            });
            return;
        }
        const res = await api.fileUpload({
            file,
            prefix: "image",
            name: "image",
        }).then((data) => { return setValue("image", data.url), dispatch2(setCounselingProfileImage(data.url)) })
        await trigger("image");
    };


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

    // const handleCareerLicenseUpload = async (file: File) => {
    //     const result = validateImageFile(file);
    //     if (!result.valid) {
    //         setError("career", {
    //             types: result.message,
    //         });
    //         return;
    //     }
    //     dispatch({ type: "setCareerLicenseFileName", payload: file.name });
    //     const response = await api.fileUpload({
    //         file,
    //         name: "career",
    //     });
    //     setValue("career", response.url);
    //     await trigger("career");
    // };


    // file Delete
    const handleDoctorLicenseDelete = async () => { // ??????????????? ??????
        setValue("certificate_image", undefined);
        await trigger("certificate_image");
        dispatch({ type: "setDoctorLicenceFileName", payload: "" });
    };

    useEffect(() => {
        setDayPrice(infoData.consultationFeeDay);
        setNightPrice(infoData.consultationFeeNight);
        setCallNightPrice(infoData.callConsultationFeeNight);
        setCallDayPrice(infoData.callConsultationFeeDay);
    }, [infoData])

    useEffect(() => {
        if (isPassword === isPasswordConfirm) {
            dispatch2(setSettingSaveControlls(true))
        } else {
            dispatch2(setSettingSaveControlls(false))
        }
    }, [isPassword, isPasswordConfirm])

    const onlyNumberText = (data: string) => {
        setTextValue(data)
        if (data) {
            const replaceData = data.replace(/[^0-9]/g, "")
            setValue('mobile', replaceData)
            return setTextValue(replaceData)
        }
    };

    useEffect(() => {
        setIsPhoneNumber(infoData.mobile)
    }, [infoData])


    return (
        <>
            <InfoGrid width={900}>
                <MainDiv>
                    <FileProfileInput
                        handleFile={handleProfilePicUpload}
                    />
                    <div className="profile" style={{ width: "100%" }}>
                        <MainDiv margin={40} className="name" bottom={22}>
                            <Text size={22} bold={"bold"} color={"#333"}>
                                {userName}
                            </Text>
                        </MainDiv>
                        <MainDiv margin={40} className="email" flex bottom={10}>
                            <Text size={17} color={"#999"}>
                                {"email"}
                            </Text>
                            <Text size={17} color={"#333"} width={225} style={{ marginRight: `${rem(120)}` }}>
                                {infoData.uid}
                            </Text>
                        </MainDiv>
                        <MainDiv margin={40} className="phone" style={{ justifyContent: 'space-between' }}>
                            <Text size={17} color={"#999"} style={{ minWidth: `${rem(80)}` }}>
                                {"???????????????"}
                            </Text>
                            <Text size={17} color={"#333"} style={{ width: `${rem(225)}`, marginRight: `${rem(120)}` }}>
                                {
                                    !phoneNumberChange ?
                                        <div style={{ textAlign: `left` }}>
                                            {infoData?.mobile?.length === 11 ? phoneNumber2 : phoneNumber}
                                            <Text button onClick={() => setPhoneNumberChange(!phoneNumberChange)}>??????</Text>
                                        </div>
                                        :
                                        <div style={{ display: 'flex' }}>
                                            <Input css={{ height: rem(31), width: rem(150) }}
                                                value={textValue}
                                                autoComplete='false'
                                                onChange={(e) => {
                                                    // setValue('mobile', e.target.value)
                                                    onlyNumberText(e.target.value)
                                                }} maxLength={11} />
                                            <Text button onClick={() => setPhoneNumberChange(!phoneNumberChange)}>??????</Text>
                                        </div>
                                }
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
                            marginTop: rem(33)
                        }}
                    >
                        ????????????
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <Input
                        value={isPassword}
                        onChange={(e) => {
                            setIsPassword(e.target.value)
                        }}
                        autoComplete='new-password'
                        id="password"
                        type="password"
                        placeholder="??????????????? ??????????????????."
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
                            marginTop: rem(33)
                        }}
                    >
                        ???????????? ??????
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <Input
                        onChange={(e) => {
                            setValue("password", e.target.value), setIsPasswordConfirm(e.target.value)
                        }}
                        autoComplete='off'
                        id="password2"
                        type="password"
                        placeholder="??????????????? ??????????????????."
                        css={{
                            paddingInline: rem(30),
                            width: rem(475),
                            marginTop: rem(29.5)
                        }}
                    />
                </StyledDiv>
                <SettingLicenceField
                    required
                    label='????????? ?????????'
                    name="certificate_image"
                    fileName={infoData.certificateImage ? "????????? ?????? ?????????." : registerFormState.doctorLicenseFileName}
                    handleUpload={handleDoctorLicenseUpload}
                    handleDelete={handleDoctorLicenseDelete}
                />
                <StyledDiv style={{ marginTop: '20px' }}>
                    <Label
                        htmlFor="education"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            paddingTop: "0.5rem",
                        }}
                    >
                        ????????????
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <TextArea
                        onChange={(e) => {
                            setValue("introduction", e.target.value)
                        }}
                        defaultValue={infoData.introduction}
                        css={{
                            maxHeight: rem(150),
                            minHeight: rem(120),
                            height: rem(120),
                            width: rem(480),
                            border: "1px solid $gray06",
                            borderRadius: rem(20),
                            padding: `${rem(16)} ${rem(30)} ${rem(20)}`,
                        }}
                    />
                </StyledDiv>
                <StyledDiv style={{ marginTop: '20px' }}>
                    <Label
                        htmlFor="cereer"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            paddingTop: "0.5rem",
                        }}
                    >
                        ??????
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <TextArea
                        onChange={(e) => {
                            setValue("career", e.target.value)
                        }}
                        defaultValue={infoData.career}
                        css={{
                            maxHeight: rem(150),
                            minHeight: rem(120),
                            height: rem(120),
                            width: rem(480),
                            border: "1px solid $gray06",
                            borderRadius: rem(20),
                            padding: `${rem(16)} ${rem(30)} ${rem(20)}`,
                        }}
                    />
                </StyledDiv>
                <StyledDiv style={{ marginTop: '20px' }}>
                    <Label
                        htmlFor="qualification_level"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            paddingTop: "0.5rem",
                        }}
                    >
                        ????????????
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <TextArea
                        onChange={(e) => {
                            setValue("qualification_level", e.target.value)
                        }}
                        defaultValue={infoData.qualificationLevel}
                        css={{
                            maxHeight: rem(150),
                            minHeight: rem(120),
                            height: rem(120),
                            width: rem(480),
                            border: "1px solid $gray06",
                            borderRadius: rem(20),
                            padding: `${rem(16)} ${rem(30)} ${rem(20)}`,
                        }}
                    />
                </StyledDiv>
                <StyledDiv style={{ marginTop: '20px' }}>
                    <Label
                        htmlFor="education"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            paddingTop: "0.5rem",
                        }}
                    >
                        ??????
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <TextArea
                        onChange={(e) => {
                            setValue("education", e.target.value)
                        }}
                        defaultValue={infoData.education}
                        css={{
                            maxHeight: rem(150),
                            minHeight: rem(120),
                            height: rem(120),
                            width: rem(480),
                            border: "1px solid $gray06",
                            borderRadius: rem(20),
                            padding: `${rem(16)} ${rem(30)} ${rem(20)}`,
                        }}
                    />
                </StyledDiv>
                <StyledDiv style={{ marginTop: '20px' }}>
                    <Label
                        htmlFor="other_history"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            paddingTop: "0.5rem",
                        }}
                    >
                        ?????? ??????
                        <span style={{ color: "#eb541e" }}>
                            *
                        </span>
                    </Label>
                    <TextArea
                        onChange={(e) => {
                            setValue("other_history", e.target.value)
                        }}
                        defaultValue={infoData.otherHistory}
                        css={{
                            maxHeight: rem(150),
                            minHeight: rem(120),
                            height: rem(120),
                            width: rem(480),
                            border: "1px solid $gray06",
                            borderRadius: rem(20),
                            padding: `${rem(16)} ${rem(30)} ${rem(20)}`,
                        }}
                    />
                </StyledDiv>

                <StyledDiv>
                    <Label
                        htmlFor="PmPrice"
                        css={{
                            marginBottom: rem(10),
                            fontSize: rem(15),
                            marginTop: rem(33)
                        }}
                    >
                        <div>
                            {"????????????"}
                            <span style={{ color: "#eb541e" }}>
                                *
                            </span>
                        </div>
                    </Label>
                    <div style={{ width: `${rem(470)}` }}>
                        <RowAndColumnSpacing />
                    </div>
                </StyledDiv>
            </InfoGrid>
        </>
    );
}

export default SettingInfoForm;
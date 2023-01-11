import React, { useState, useEffect, useCallback } from 'react';
import { BaseDialog2, RoundedButton, Image } from '~/components';
import ko from "date-fns/locale/ko";
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from "date-fns";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import calendarIcon from '../../public/icon_calendar@3x.png';
import { DatePicker } from '../DatePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import BasicSelect from './SelectBox';
import { UPDATE_OPEN_TIMES_ALL } from '~/utils/constants';
import AntdTimePicker from '../googleCalendar.tsx/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCounselingFinalStepData,
    selectCounselingDate,
    selectCounselingTimes,
    setCounselingFinalStep,
    setCounselingFinalStepData,
    setScheduleSelectModla,
    selectScheduleSelectModla,
    selectWatingListBefore,
    selectDashBoardSelectUser,
    selectChatBoxOpenState,
    selectTestResultValue,
    setTestResultValueStatus,
    selectCounselingTimeStemp,
    setCounselingTimeStemp
} from '~/store/calendarDetailSlice';
import { selectTutorialTimeState } from '~/store/settingsSlice';
import TimeSleectBox from '../TimeSelectBox/TimeSleectBox';
import ReservationSelect from '../TimeSelectBox/ReservationSelectBox';
import TestValue from '../TestValue/TestValue';

interface IProps {
    userInfo: any;
    open: boolean;
    close: () => void;
}
interface IStyled {
    color?: string;
    bold?: string;
    size?: string | number;
    button?: boolean;
    text?: boolean;
    center?: boolean;
    bg?: boolean;
}

const Text = styled.span<IStyled>` 
    font-weight: bold;
    ${(props) =>
        props.size &&
        css`
        font-size: ${rem(props.size)};
        color: ${props.color};
    `}
    ${(props) =>
        props.bg &&
        css`
  height: ${rem(82)};
  margin-top: ${rem(16)};
  flex-grow: 0;
  padding-top: ${rem(15)};
  border-radius: 10px;
  margin-bottom: ${rem(18)};
  background-color: #fff7f4;
    `}
    ${(props) =>
        props.center &&
        css`
        text-align: center;
    `}
    ${(props) =>
        props.bold &&
        css`
        font-weight: ${props.bold};
    `}
    ${(props) =>
        props.button &&
        css`
        height: ${rem(30)};
        flex-grow: 0;
        cursor: pointer;
        padding: 5px 6px 6px;
        border-radius: 4px;
        border: solid 1px #eb541e;
        color:#eb541e;
        letter-spacing: -0.36px;
        font-weight: normal;
        line-height: 1.4;
        font-size: 12px;
    `}
`;
const Div = styled.div<IStyled>`
    display: flex;
    justify-content: space-between;
    ${(props) =>
        props.button &&
        css`
        margin-top: ${rem(30)};
    `}
`;
const Info = styled.div`
    flex-grow: 0;
  font-family: NotoSansCJKKR;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #eb541e;
`
const Line = styled.div`
    height: 1px;
    flex-grow: 0;
    margin: 20px 0 20px 0;
    background-color: #d9d9d9;
`;

const Input = styled.div`
    display: flex;
    cursor: pointer;
    height: ${rem(50)};
    flex-grow: 0;
    margin: 11px 2px 0 2px;
    padding: 13px 14px 14.4px 22px;
    border-radius: 6px;
    border: solid 1px #d3d3d3;
`;

const Select = styled.select<IStyled>`
    font-weight: bold;
    display: flex;
    cursor: pointer;
    height: ${rem(50)};
    flex-grow: 0;
    margin: 11px 2px 0 2px;
    padding: 13px 14px 14.4px 22px;
    border-radius: 6px;
    border: solid 1px #d3d3d3;
`;

function ApprovalModal(props: IProps) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState<boolean>(props.open);
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState("");
    const [selectTimes, setSelectTimes] = useState("");
    const [datePicker, setDatePicker] = useState(false);
    const storeData = useSelector(selectCounselingDate);
    const selectTime = useSelector(selectCounselingTimes);
    const finalStepData = useSelector(selectCounselingFinalStepData);
    const modalState = useSelector(selectScheduleSelectModla)
    const before_wating = useSelector(selectWatingListBefore) // 상담전 예약 데이터
    const select_user = useSelector(selectDashBoardSelectUser);
    const select_Time = useSelector(selectCounselingTimeStemp);


    const hour = Number(select_Time.substring(0, 2));

    const [test_modal, setTest_modal] = useState(false);
    const open3 = () => { setTest_modal(true), dispatch(setTestResultValueStatus(true)) }
    const close3 = () => setTest_modal(false)

    const handleClose = props.close
    const handleSelectTime = (e: any) => { // 예약시간 핸들러
        setSelectTimes(e.target.value)
    }
    const useOpen = useSelector(selectChatBoxOpenState) // 캘린더 클릭 X

    const modalClose = () => { dispatch(setScheduleSelectModla(false)), dispatch(setCounselingTimeStemp("")) }
    const dateOpen = () => setDatePicker(!datePicker);
    const close2 = () => setShow2(false);
    const open2 = () => setShow2(true);
    const open = () => {
        setShow(true);
    };
    const result = useSelector(selectTestResultValue);

    const close = () => setShow(false);
    const {
        register,
        setValue,
        getValues,
        control,
        handleSubmit,
        watch,
        trigger,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            phone: "",
            date: new Date().toISOString().split("T")[0],
            time: "",
            treatment: "",
        },
    });
    const selectedDate = watch("date");
    const selectedTime = watch("time");

    const handleDateChange = useCallback(
        (date) => {
            console.log({ date });
            const dateString = format(date, "yyyy-MM-dd");
            setValue("date", dateString);
        },
        [setValue]
    );
    const handleFinalStep = () => {
        dispatch(setCounselingFinalStep('yes'));
        dispatch(setCounselingFinalStepData(select_user));
        dispatch(setScheduleSelectModla(false));
        if (useOpen === "시작전") {
            return alert("일정이 변경되었습니다.")
        }
    }

    console.log("before_wating", before_wating);
    console.log("select_user4444", select_user);

    return (
        <>
            <BaseDialog2 style={{ paddingBottom: `${rem(40)}`, marginTop: `${rem(240)}`, maxHeight: `${rem(490)}`, minHeight: `${rem(490)}` }} showDialog={modalState} close={modalClose} >
                <Div button>
                    <Text size={20} bold="bold">
                        {select_user?.user_name} 님
                    </Text>
                    {
                        result.datas?.subject_name ?
                            <Text style={{ color: '#eb541e' }} size={15}>{result.datas?.subject_name}</Text>
                            :
                            <Text size={13} button onClick={open3}>
                                테스트 결과보기
                            </Text>
                    }
                </Div>
                <Line />
                <Div>
                    <Text bold='500' size={15} color="#999">
                        상담 방식
                    </Text>
                    <Text bold='normal' size={15} color='#666'>
                        {select_user?.method_str?.substr(2, 2) === "전화" ? "전화" : "채팅"}
                    </Text>
                </Div>
                <Div>
                    <Text bold='500' size={15} color="#999">
                        상담 요청 시간
                    </Text>
                    <Text bold='normal' size={15} color='#666'>
                        {select_user?.crated}
                    </Text>
                </Div>
                <Div>
                    <Text bold='500' size={15} color="#999">
                        상담 시간
                    </Text>
                    <Text bold='normal' size={15} color='#666'>
                        {select_user?.method_str}
                    </Text>
                </Div>

                <Input style={{ marginTop: `${rem(21)}`, justifyContent: 'space-between' }} onClick={dateOpen}>
                    <div style={{ display: 'flex' }}>
                        <Image src={calendarIcon} width={20} height={20} />
                        <Text style={{ marginLeft: `${rem(10)}`, display: 'flex' }}>{storeData ? format(storeData, "PPP", { locale: ko }) : <div>날짜선택</div>}</Text>
                    </div>
                    <KeyboardArrowDownIcon />
                </Input>
                <ReservationSelect />
                <div>
                    <RoundedButton
                        disabled={storeData !== "" && selectTime !== "" && hour > 0 ? false : true}
                        onClick={open}
                        color={storeData !== "" && selectTime !== "" && hour > 0 ? "orange" : "gray"}
                        css={{
                            fontSize: rem(15),
                            margin: `0 ${rem(24)} 0 0`,
                            height: rem(50),
                            width: "86%",
                            position: 'absolute',
                            bottom: rem(40),
                            zIndex: 1
                        }}
                    >
                        상담 승인
                    </RoundedButton>

                </div>
            </BaseDialog2>
            {
                datePicker && <DatePicker open={datePicker} date={new Date(selectedDate)} setDate={handleDateChange} />
            }
            <BaseDialog2 showDialog={show} close={close} style={{
                textAlign: 'center', marginTop: " 20vh", paddingBottom: `${rem(40)}`, width: `${rem(376)}`
            }}>
                <Text size={17} bold='normal' center>
                    <Text>{select_user?.user_name}</Text>님에게
                    <div>상담 예정 알림이 발송됩니다.</div>
                </Text>
                <Text bg>
                    <Text size={15} color="#666" bold='normal' center>
                        상담 예정 시간
                    </Text>
                    <Info>
                        {storeData ? format(storeData, "PPP", { locale: ko }) + " " + selectTime : ""}
                    </Info>
                </Text>
                <Text size={17} color={"#333"} bold={"normal"}>
                    상담 승인 하시겠습니까?
                </Text>
                <Div style={{ marginTop: `${rem(30)}` }}>
                    <RoundedButton
                        color="black"
                        css={{ flex: 1, height: rem(50), width: rem(153), marginRight: rem(10) }}
                        onClick={() => {
                            close()
                        }}
                    >
                        취소
                    </RoundedButton>
                    <RoundedButton
                        color="orange"
                        css={{ flex: 1, height: rem(50), width: rem(153) }}
                        onClick={() => { close(), handleClose(), handleFinalStep() }}
                    >
                        확인
                    </RoundedButton>
                </Div>
            </BaseDialog2>
            <TestValue open={test_modal} cancel={close3} />
        </>
    );
}

export default ApprovalModal;
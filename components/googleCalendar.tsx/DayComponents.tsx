import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import { BaseDialog2, RoundedButton, Image } from '~/components';
import { rem } from "polished";
import { selectCalendarModalState, setCounselingStart, selectCounselingInfoData, selectCalendarMonthState, setCounselingState, selectCounselingState, selectCounselingDate, selectDashBoardSelectUser, setDashBoardRoomJoin, selectUserCallNumber, setCancelStatus, setUserCallStatus, setAlertControlls3, setTestResultValueStatus, setAlertType, setCoustomAlert, selectAlertType, selectCoustomAlert, selectCallFinish, setCallFinish, selectAccoutList, selectImmediate } from "~/store/calendarDetailSlice"
import { useDispatch, useSelector } from 'react-redux';
import call_icon from '../../public/call@3x.png'
import chat_icon from '../../public/chat@3x.png'
import {
    selectCalendarUserList,
    selectCancelList,
    selectCompleteList,
    selectConsultingList,
    selectReservationList,
    selectWaitlist,
    setDashBoardSelectUser,
    selectChatBoxOpenState,
    setChatBoxOpenState,
    selectCounselingTimes,
    setAlertControlls2,
    selectTestResultValue,
    selectCounselingFinalStep,
    setChangeBeforeChatList,
    setImmediate
} from "~/store/calendarDetailSlice";
import { format } from "date-fns";
import TestValue from '../TestValue/TestValue';
import { CoustomAlertPopUp } from '../Dialog/AlertPopUp';

// 스텝바 진행상황 체크 ex) 상담중, 상담완료, 상담실패 등등 
interface IProps {
    days: any;
    rowIdx: number;
    key: number;
    open: boolean;
}
interface IStyled {
    primary?: string;
    idx?: number;
    month?: boolean;
    size?: any;
    center?: boolean;
    button?: boolean;
    bold?: string;
    bg?: boolean;
    step?: boolean;
    left?: boolean;
    border?: string;
}
const Div = styled.div<IStyled>`
    border-bottom: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    min-height: ${rem(130)};
    padding-bottom: ${rem(15)};
    ${(props) =>
        props.primary === 'Sat' &&
        css`
        border-right: none;
        `}

    ${(props) =>
        props.idx === 5 &&
        css`
    border-bottom: none;
    `}

    ${(props) =>
        props.step &&
        css`
        border-bottom: none;
        border-right: none;
        min-height: none;
        padding-bottom: ${rem(0)};
        min-height: ${rem(0)};
        margin-top: ${rem(47.5)} ;
        display: flex;
        justify-content: space-between;
    `}
`;
const StyledDiv = styled.div`
    cursor: pointer;
    align-items: center;
    &:hover{
        background-color: #FDEAE4;
    };
    display: flex;
    margin-left: ${rem(9)};
    font-size: ${rem(12)};
`;
const Line = styled.div`
    height: 1px;
    flex-grow: 0;
    margin: 20px 0 20px 0;
    background-color: #d9d9d9;
`;

const StyledP = styled.div`
    text-align: center;
    flex-grow: 0;
    height: ${rem(37)};
    font-size: ${rem(14)};
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #666;
    padding-top: ${rem(8)};
    background-color: #FDEAE4;
`;
const StyledDaySun = styled.p`
    text-align: center;
    flex-grow: 0;
    height: ${rem(37)};
    font-size: ${rem(14)};
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #666;
    padding-top: ${rem(8)};
    background-color: #FDEAE4;
    border-top-left-radius: 20px;
`;
const StyledDaySat = styled.p`
    text-align: center;
    flex-grow: 0;
    height: ${rem(37)};
    font-size: ${rem(14)};
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #666;
    padding-top: ${rem(8)};
    background-color: #FDEAE4;
    border-top-right-radius: 20px;
`;

const StyledSeeMonth = styled.p<IStyled>`
margin-top: ${rem(8)};
margin-left: ${rem(13)};
margin-bottom: ${rem(6)};
${(props) =>
        props.month === false &&
        css`
        color:#b4b4b4;
    `}
`;
const StyledToday = styled.p`
    background-color: #FDEAE4;
    margin-top: ${rem(8)};
    margin-left: ${rem(13)};
    width: ${rem(26)};
    height: ${rem(26)};
    border-radius: ${rem(20)};
    text-align: center;
    padding: ${rem(2)} ${rem(1)} 0 0;
`;

const Status = styled.span<IStyled>`
    width: ${rem(25)};
    height: ${rem(17)};
    margin-top: ${rem(2)};
    padding-bottom: ${rem(14)};
    border-radius: ${rem(3)};
    line-height: 1.4;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    margin-right: 3px;
    letter-spacing: -0.3px;
    ${(props) =>
        props.color &&
        css`
            color: ${props.color};
        `}
        ${(props) =>
        props.border &&
        css`
            border: solid 0.5px ${props.color};
        `}
`;

const Text = styled.span<IStyled>` 
    font-weight: bold;
    margin-bottom: ${rem(10)};
    letter-spacing: -0.72px;
    line-height: 1.4;
    ${(props) =>
        props.size &&
        css`
        font-size: ${rem(props.size)};
        color: ${props.color};
    `}
    ${(props) =>
        props.bg &&
        css`
        padding: 17px 22.5px 17px 22px;
        height: ${rem(82)};
        margin-top: ${rem(16)};
        flex-grow: 0;
        padding-top: ${rem(15)};
        border-radius: 10px;
        margin-bottom: ${rem(18)};
        background-color: #f5f5f5;
    `}
    ${(props) =>
        props.center &&
        css`
        text-align: center;
    `}
    ${(props) =>
        props.left &&
        css`
        margin-left: ${rem(5)};
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
const P = styled.p<IStyled>` 
    margin-bottom: 5px;
`;

const Input = styled.textarea`
    width: 316px;
    height: 160px;
    flex-grow: 0;
    margin: 25px 10px 30px;
    padding: 16px 30px;
    border-radius: 20px;
    border: solid 1px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    outline: none !important;
    max-height: ${rem(170)};
    min-height: ${rem(170)};
    &:focus{
            border: 2px solid #eb541e;
        };
`;

function DayComponents(props: IProps) {
    const userList: any = useSelector(selectCalendarUserList);
    const dispatch = useDispatch();
    const [day_ko, setDay_ko] = useState(props.days.format('ddd'));
    const options = "toolbar=no,locatipon=no,scrollbars=no,resizable=no,status=no,menubar=no,width=300, height=700, top=10,left=0";
    const seeMonth: any = useSelector(selectCalendarMonthState);
    const [show2, setShow2] = useState(false);
    const [userName, setUserName] = useState("");
    const [userDate, setUserDate] = useState("");
    const [userType, setUserType] = useState("");
    const [startButton, setStartButton] = useState(false);
    const [pause, setPause] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);


    const consultingList = useSelector(selectConsultingList); // 상담중
    const reservationList = useSelector(selectReservationList); // 예약 확정 O
    const waitlist = useSelector(selectWaitlist); // 상담 대기 > 스케줄등록 O 
    const completeList = useSelector(selectCompleteList); // 상담완료 O
    const cancelList = useSelector(selectCancelList); // 상담 취소


    const useOpen = useSelector(selectChatBoxOpenState) // 캘린더 클릭 X
    const select_data = useSelector(selectDashBoardSelectUser);
    const selectTime = useSelector(selectCounselingTimes);
    const [callStatus, setCallStatus] = useState<boolean>(false)
    const userPhoneNumber = useSelector(selectUserCallNumber);
    const finalStep = useSelector(selectCounselingFinalStep); // 최종 예약 확인
    const call_finish = useSelector(selectCallFinish);
    const [test_modal, setTest_modal] = useState(false);
    const immediate = useSelector(selectImmediate);

    const handleCancel = () => dispatch(setCancelStatus(true))
    const cancelOpen = () => setCancelModal(true);

    const handlePause = () => setPause(!pause);
    const start = () => setStartButton(true);
    const close2 = () => {
        dispatch(setCoustomAlert(true));
    };

    const call_type = useSelector(selectChatBoxOpenState);
    const type = useSelector(selectAlertType);
    const type2 = useSelector(selectCoustomAlert);

    const result = useSelector(selectTestResultValue);
    const open2 = () => setShow2(true);
    const close4 = () => { setShow2(false), dispatch(setChatBoxOpenState("null")), dispatch(setImmediate(null)), dispatch(setImmediate(false)) }
    const open3 = () => { setTest_modal(true); }
    const close3 = () => { setTest_modal(false), dispatch(setTestResultValueStatus(false)) }


    const handleDispatch = () => {
        close2()
        setShow2(false)
        dispatch(setAlertControlls2(true))
        dispatch(setCounselingState("start"));
        dispatch(setCounselingStart("start"));
        dispatch(setChatBoxOpenState('시작'));
    }

    useEffect(() => {
        return () => {
            dispatch(setAlertType(''));
        }
    }, [])


    useEffect(() => {
        if (finalStep === "yes") {
            close2()
        }
    }, [finalStep])

    useEffect(() => {
        if (call_finish === '완료') {
            close4();
            dispatch(setCallFinish(""));
        }
    }, [call_finish])

    useEffect(() => {
        if (type2 === false && type === '') {
            setShow2(false);
        }
    }, [type2])

    useEffect(() => {
        if (day_ko === 'Sun') {
            return setDay_ko("일")
        } else if (day_ko == 'Mon') {
            return setDay_ko("월")
        } else if (day_ko == 'Tue') {
            return setDay_ko("화")
        } else if (day_ko == 'Wed') {
            return setDay_ko("수")
        } else if (day_ko == 'Thu') {
            return setDay_ko("목")
        } else if (day_ko == 'Fri') {
            return setDay_ko("금")
        } else if (day_ko == 'Sat') {
            return setDay_ko("토")
        }
    }, [])



    const handleFinishDispatch = () => {
        dispatch(setChangeBeforeChatList(true));
        dispatch(setCounselingState('finish'));
    }
    return (
        <>
            <Div primary={props.days.format('ddd')} idx={props.rowIdx}>
                {props && props.rowIdx === 0 && (
                    props.days.format('ddd') === "Sun" ?
                        <StyledDaySun>{day_ko}</StyledDaySun>
                        : props.days.format('ddd') === "Sat" ?
                            <StyledDaySat>{day_ko}</StyledDaySat>
                            : <StyledP>{day_ko}</StyledP>
                )}
                {
                    props.days.format('YYYY-MM-DD') === dayjs().format("YYYY-MM-DD") ?
                        <StyledToday>
                            {props.days.format('DD')}
                        </StyledToday> :
                        <StyledSeeMonth month={seeMonth !== props.days.format('YYYY.MM') ? false : true}>
                            {props.days.format('DD')}
                        </StyledSeeMonth>
                }
                <span>
                    {reservationList && reservationList.result?.map((res: any, index: number) => { // 예약중
                        return res.reservation_date?.substr(0, 10) === props.days.format('YYYY-MM-DD') ?
                            <StyledDiv style={{ color: '#eb541e' }} key={index} onClick={() => {
                                useOpen !== "null" && useOpen !== "시작전" && useOpen !== "전화" ? console.log("done...") :
                                    open2(), res.method_str?.substr(0, 4) === "주간채팅" || res.method_str?.substr(0, 4) === "야간채팅" ? setUserType("채팅") : setUserType("전화"),
                                    setUserName(res.user_name),
                                    setUserDate(res.reservation_date),
                                    dispatch(setDashBoardSelectUser(res)),
                                    dispatch(setTestResultValueStatus(true)),
                                    dispatch(setImmediate(true)),
                                    res.method_str?.substr(2, 2) === "전화" ? dispatch(setChatBoxOpenState("null")) : dispatch(setChatBoxOpenState('시작전'))
                            }}>
                                <Status color='#d8430e' border='#eb541e'>예약</Status>
                                <Image src={res.method < 5 ? call_icon : chat_icon} width={12} height={12} />
                                <span style={{ letterSpacing: '-1px', margin: `0 ${rem(3)}` }}>{res.reservation_date && res.reservation_date.substr(11, 5)}</span>
                                {res.user_name.length > 5 ? res.user_name.substr(0, 4) + "..." : res.user_name}
                            </StyledDiv> : ""
                    })}
                    {
                        consultingList && consultingList.result?.map((res: any, index: number) => { //채팅중
                            return res.reservation_date?.substr(0, 10) === props.days.format('YYYY-MM-DD') ?
                                <StyledDiv style={{ color: '#60ae92' }} key={index} onClick={() => {
                                    useOpen !== "null" && res.status !== 2 ? console.log("done...") :
                                        dispatch(setAlertControlls3(true)), dispatch(setDashBoardRoomJoin('complate')), dispatch(setDashBoardSelectUser(res))
                                }}>
                                    <Status color='#60ae92' border='#60ae92'>진행</Status>
                                    <Image src={res.method < 5 ? call_icon : chat_icon} width={12} height={12} />
                                    <span style={{ letterSpacing: '-1px', margin: `0 ${rem(3)}` }}>{res.reservation_date && res.reservation_date.substr(11, 5)}</span>
                                    {res.user_name.length > 5 ? res.user_name.substr(0, 4) + "..." : res.user_name}
                                </StyledDiv>
                                : ""
                        })
                    }
                    {
                        completeList && completeList.result?.map((res: any, index: number) => { // 완료됨
                            return res.reservation_date?.substr(0, 10) === props.days.format('YYYY-MM-DD') ?
                                <StyledDiv style={{ color: '#666' }} key={index} onClick={() => {
                                    useOpen !== "null" ? handleFinishDispatch() :
                                        handleFinishDispatch(), dispatch(setDashBoardRoomJoin('complate')), dispatch(setDashBoardSelectUser(res))
                                }}>
                                    <Status color='#666' border='#666'>완료</Status>
                                    <Image src={res.method < 5 ? call_icon : chat_icon} width={12} height={12} />
                                    <span style={{ letterSpacing: '-1px', margin: `0 ${rem(3)}` }}>{res.reservation_date && res.reservation_date.substr(11, 5)}</span>
                                    {res.user_name.length > 5 ? res.user_name.substr(0, 4) + "..." : res.user_name}
                                </StyledDiv>
                                : ""
                        })
                    }
                    {
                        cancelList && cancelList.result?.map((res: any, index: number) => { // 취소됨
                            return res.reservation_date?.substr(0, 10) === props.days.format('YYYY-MM-DD') ?
                                <StyledDiv style={{ color: '#b4b4b4' }} key={index} onClick={() => { console.log("취소된 상담 건입니다.") }}>
                                    <Status color='#b4b4b4' border='#b4b4b4'>취소</Status>
                                    <Image src={res.method < 5 ? call_icon : chat_icon} width={12} height={12} />
                                    <span style={{ letterSpacing: '-1px', margin: `0 ${rem(3)}` }}>{res.reservation_date && res.reservation_date.substr(11, 5)}</span>
                                    {res.user_name.length > 5 ? res.user_name.substr(0, 4) + "..." : res.user_name}
                                </StyledDiv>
                                : ""
                        })
                    }
                </span>
            </Div>
            <TestValue open={test_modal} cancel={close3} />
        </>
    );
}

export default DayComponents;


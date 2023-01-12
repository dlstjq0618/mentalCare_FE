import React, { Fragment, useEffect, useState } from 'react';
import { rem } from "polished";
import DayComponents from './DayComponents';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import { BaseDialog2, RoundedButton, Image } from '~/components';
import {
    setCounselingStart,
    setCounselingState,
    selectDashBoardSelectUser,
    selectUserCallNumber,
    setAlertType,
    setCoustomAlert,
    selectAlertType,
    selectImmediate
} from "~/store/calendarDetailSlice"
import { useDispatch, useSelector } from 'react-redux';
import { StepsBar } from '../treatmentRoom/stepBar/StepsBar';
import calendarIcon from '../../public/icon_calendar@3x.png';
import {
    setChatBoxOpenState,
    setAlertControlls2,
    selectTestResultValue,
    setCounselingFinalStep,
    setImmediate
} from "~/store/calendarDetailSlice";
import { CoustomAlertPopUp } from '../Dialog/AlertPopUp';

interface Iprops {
    month: any[];
}

const Divs = styled.div`
width: ${rem(1055)};
border-radius: 20px;
line-height: normal;
background: #fff;
display: grid;

grid-template: ${rem(161)} auto auto auto auto auto / ${rem(151)} ${rem(151)} ${rem(151)} ${rem(151)} ${rem(151)} ${rem(151)} ${rem(151)};
`;
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

const Line = styled.div`
    height: 1px;
    flex-grow: 0;
    margin: 20px 0 20px 0;
    background-color: #d9d9d9;
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


function Month(props: Iprops) {
    const immediate = useSelector(selectImmediate);
    const [show, setShow] = useState<boolean>(false);
    const select_data = useSelector(selectDashBoardSelectUser);
    const userPhoneNumber = useSelector(selectUserCallNumber);
    const [show2, setShow2] = useState(false);
    const [userType, setUserType] = useState("");
    const dispatch = useDispatch()
    const type = useSelector(selectAlertType);
    const result = useSelector(selectTestResultValue);
    const [test_modal, setTest_modal] = useState(false);
    const open2 = () => setShow2(true);
    const close4 = () => { setShow2(false), dispatch(setChatBoxOpenState("null")), dispatch(setImmediate(null)), dispatch(setImmediate(false)) }
    const open3 = () => { setTest_modal(true); }
    const [cancelModal, setCancelModal] = useState(false);
    const [callStatus, setCallStatus] = useState<boolean>(false);
    const cancelOpen = () => setCancelModal(true);

    const close2 = () => {
        dispatch(setCoustomAlert(true));
        setCallStatus(false);
    };
    console.log("callStatus", callStatus)

    const handleDispatch = () => {
        close2()
        setShow2(false)
        dispatch(setAlertControlls2(true))
        dispatch(setCounselingState("start"));
        dispatch(setCounselingStart("start"));
        dispatch(setChatBoxOpenState('시작'));
        dispatch(setImmediate(false));
    }

    useEffect(() => {
        if (immediate) {
            setShow(true)
        }
    }, [immediate])

    console.log("typetype", type);
    return (
        <>
            <Divs>
                {props && props.month.map((row: any, i: number) => (
                    <Fragment key={i}>
                        {row && row.map((day: any, idx: number) => {
                            return <DayComponents days={day} key={idx} rowIdx={i} open={show} />
                        })}
                    </Fragment>
                ))}
            </Divs>

            <BaseDialog2 showDialog={immediate} close={close4} aria-label="상담 팝업" style={{ width: `${rem(540)}`, padding: `${rem(24)} ${rem(68)} 0 ${rem(76)}` }}>
                <StepsBar current={1} />
                <Div step>
                    <Text style={{ marginBottom: 0 }} size={20}>
                        {select_data.user_name}{" 님"}
                    </Text>
                    {
                        result.datas?.subject_name ?
                            <Text style={{ marginBottom: 0, color: '#eb541e' }} size={15}>{result.datas?.subject_name}</Text>
                            :
                            <Text style={{ marginBottom: 0 }} size={13} button onClick={open3}>
                                테스트 결과보기
                            </Text>
                    }
                </Div>
                <Line />
                {
                    select_data?.isimmediate === false &&
                    <>
                        <Div step style={{ marginTop: 0 }}>
                            <Text bold='normal' size={18} color={"#666"} style={{ display: 'flex' }}>
                                <div>일정</div>
                                <div style={{ color: "#000", marginLeft: `${rem(14)}` }}>
                                    {select_data.reservation_date?.substr(0, 10)?.replace(/-/gi, '.')}
                                </div>
                            </Text>
                            {/* <CalendarChip label='일정변경' /> */}
                            <div style={{ color: "#666", border: 'solid 1px #d3d3d3', borderRadius: 50, padding: '5px 13px 7px 11px', display: 'flex', height: 29 }}>
                                <div style={{ placeSelf: 'center', marginRight: 2, marginTop: 3 }}><Image src={calendarIcon} width={15} height={15} /></div>
                                <span style={{ placeSelf: 'center' }}>일정변경</span>
                            </div>
                        </Div>
                        <Div step style={{ marginTop: 0 }}>
                            <Text bold='normal' size={18} color={"#666"}>
                                시간
                                <span style={{ color: "#000", marginLeft: `${rem(14)}` }}>
                                    {select_data.reservation_date?.substr(10)}
                                </span>
                            </Text>
                            {/* <TimeChip label='시간변경' /> */}
                        </Div>
                    </>
                }

                {
                    select_data?.method < 5 ?
                        <>
                            <Div step style={{ marginTop: 0 }}>
                                <Text bold='normal' size={18} color={"#666"}>
                                    방식 <span style={{ color: "#000", marginLeft: `${rem(14)}` }}>
                                        {select_data.isimmediate ?
                                            <span>[바로상담]{select_data.method === 1 || select_data.method === 3 ? "전화상담(주간)" : "전화상담(야간)"}</span>
                                            :
                                            <span>[예약상담]{select_data.method === 1 || select_data.method === 3 ? "전화상담(주간)" : "전화상담(야간)"}</span>
                                        }
                                    </span>
                                </Text>
                            </Div>
                            {
                                console.log("userPhoneNumber", userPhoneNumber)
                            }
                            <Text size={18} bold='bold' style={{ marginLeft: `${rem(51)}`, lineHeight: 0.4 }}>
                                {userPhoneNumber && userPhoneNumber?.VirtualNumber?.substr(0, 3) + '-' + userPhoneNumber?.VirtualNumber?.substr(3, 4) + '-' + userPhoneNumber?.VirtualNumber?.substr(7, 4)}
                            </Text>
                        </>
                        :
                        <Div step style={{ marginTop: 0 }}>
                            {/* <Text bold='normal' size={18} color={"#666"}>
                                방식 <span style={{ color: "#000", marginLeft: `${rem(14)}` }}>{select_data?.method_str?.substr(0, 8)}</span>
                            </Text> */}
                            <Text bold='normal' size={18} color={"#666"}>
                                방식 <span style={{ color: "#000", marginLeft: `${rem(14)}` }}>
                                    {select_data.isimmediate ?
                                        <span>[바로상담]{select_data.method === 5 || select_data.method === 7 ? "채팅상담(주간)" : "채팅상담(야간)"}</span>
                                        :
                                        <span>[예약상담]{select_data.method === 5 || select_data.method === 5 ? "채팅상담(주간)" : "채팅상담(야간)"}</span>
                                    }
                                </span>
                            </Text>
                        </Div>
                }
                <Text bg size={15}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text bold='500' style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                            상담 요청 시간
                        </Text>
                        <Text bold='normal'>
                            {select_data.crated?.replace(/-/gi, '.')}
                        </Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text bold='500' style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                            상담 시간
                        </Text>
                        <Text bold='normal' >
                            {select_data?.method_str?.substr(4, 5)}
                        </Text>
                    </div>
                </Text>
                <Text color='#eb541e' size={13} bold='normal' center style={{ marginTop: `${rem(40)}` }}>
                    {
                        userType === "채팅" ?
                            <span>
                                상담시작 버튼을 누르면 채팅이 시작되며, 상담 시간이 카운트 됩니다.
                            </span>
                            :
                            <div>
                                <div>
                                    상담시작 버튼을 누르면 상담이 시작되며,
                                </div>
                                <span>
                                    상담이 종료되면 상담완료 버튼을 눌러주세요
                                </span>
                            </div>
                    }
                </Text>
                <CoustomAlertPopUp />
                {
                    select_data?.method < 4 && callStatus === false ?
                        <RoundedButton
                            onClick={() => { setCallStatus(true), dispatch(setCoustomAlert(true)), dispatch(setAlertType('상담시작')) }}
                            color="orange"
                            css={{
                                fontSize: rem(15),
                                margin: `${rem(0)} ${rem(24)} ${rem(30)} 0`,
                                height: rem(50),
                                width: "100%",
                            }}
                        >
                            상담시작(전화)
                        </RoundedButton>
                        : select_data?.method > 4 ?
                            <RoundedButton
                                onClick={() => { handleDispatch() }}
                                color="orange"
                                css={{
                                    fontSize: rem(15),
                                    margin: `${rem(0)} ${rem(24)} ${rem(30)} 0`,
                                    height: rem(50),
                                    width: "100%",
                                }}
                            >
                                상담시작
                            </RoundedButton>
                            // : select_data?.method < 4 && select_data?.status === 2 ?
                            : userPhoneNumber?.VirtualNumber ?
                                <RoundedButton
                                    onClick={() => { close2(), dispatch(setAlertType('상담완료')), setUserType("") }}
                                    color="orange"
                                    css={{
                                        fontSize: rem(15),
                                        margin: `${rem(0)} ${rem(24)} ${rem(30)} 0`,
                                        height: rem(50),
                                        width: "100%",
                                    }}
                                >
                                    상담완료(전화)
                                </RoundedButton>
                                :
                                ""
                }

                <div style={{ textAlign: 'center', marginBottom: `${rem(40)}` }}>
                    <Text size={13} bold="normal" color='#666' center
                        style={{ width: `${rem(51)}`, borderBottom: `1px solid #666`, cursor: "pointer" }}
                        onClick={cancelOpen}
                    >
                        상담취소
                    </Text>
                </div>
            </BaseDialog2>
        </>
    );
}

export default Month
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import { BaseDialog2, RoundedButton } from '~/components';
import { rem } from "polished";
import { selectCalendarModalState, setCounselingStart, selectCounselingInfoData, selectCalendarMonthState, selectCalendarUserList, selectSessionId, setCalendarModalState, setCounselingState, selectCounselingState, selectCounselingDate } from "~/store/calendarDetailSlice"
import { useDispatch, useSelector } from 'react-redux';
import { StepsBar } from '../treatmentRoom/stepBar/StepsBar';
import ButtonGroup from '../Buttons/ButtonGroup/ButtonGroup';
import { ConstructionOutlined } from '@mui/icons-material';
import { CalendarChip, TimeChip } from '../Chip/AvatarChips';
import { format } from "date-fns";


// 스텝바 진행상황 체크 ex) 상담중, 상담완료, 상담실패 등등 

interface IProps {
    days: any;
    rowIdx: number;
    key: number;
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
    &:hover{
        background-color: #FDEAE4;
    };
    display: flex;
    margin-left: ${rem(9)};
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
const StyledRadius = styled.div`
    width: ${rem(8)};
    height: ${rem(8)};
    flex-grow: 0;
    margin: ${rem(6)} ${rem(6)} ${rem(3)} 0;
    border-radius: 30px;
    background-color: #eb541e;
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
    const [cancelValue, setCancelValue] = useState("고객 부재로 인한 취소");
    const state = useSelector(selectCounselingState);
    const userId = useSelector(selectCounselingInfoData);
    const storeData = useSelector(selectCounselingDate);
    const counselingStatus = useSelector(selectCounselingState);



    const cancelOpen = () => setCancelModal(true);
    const cancelClose = () => setCancelModal(false);
    const handlePause = () => setPause(!pause);
    const start = () => setStartButton(true);
    const close2 = () => setShow2(false);
    const open2 = () => setShow2(true);

    const handleDispatch = () => {
        dispatch(setCounselingState("start"));
        dispatch(setCounselingStart("start"));
    }
    useEffect(() => {
        // console.log("userList", userList);
    }, [userList])
    // 영어 => 월화수목금토일 한글로  
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
                    {userList && userList.map((res: any, index: number) => {
                        return res.date === props.days.format('YYYY-MM-DD') ?
                            <StyledDiv key={index} onClick={() => { counselingStatus === 'pause' ? console.log("none") : open2(), setUserType(res.type), setUserName(res.id), setUserDate(res.date) }}><StyledRadius></StyledRadius>{res.id.length > 9 ? res.id.substr(0, 11) + "..." : res.id}</StyledDiv> : ""
                    })}
                </span>
            </Div>
            <BaseDialog2 showDialog={show2} close={close2} aria-label="상담 팝업" style={{ width: `${rem(540)}`, padding: `${rem(24)} ${rem(68)} 0 ${rem(76)}` }}>
                <StepsBar current={1} />
                <Div step>
                    <Text size={20}>
                        {userName}{" 님"}
                    </Text>
                    <Text size={13} button>
                        테스트 결과보기
                    </Text>
                </Div>
                <Line />
                <Div step style={{ marginTop: 0 }}>
                    <Text bold='normal' size={18} color={"#666"}>
                        일정 <span style={{ color: "#000", marginLeft: `${rem(14)}` }}>{userDate}</span>
                    </Text>
                    <CalendarChip label='일정변경' />
                </Div>
                <Div step style={{ marginTop: 0 }}>
                    <Text bold='normal' size={18} color={"#666"}>
                        시간 <span style={{ color: "#000", marginLeft: `${rem(14)}` }}>{"오후 12:30"}</span>
                    </Text>
                    <TimeChip label='시간변경' />
                </Div>
                {
                    userType === "전화" ?
                        <>
                            <Div step style={{ marginTop: 0 }}>
                                <Text bold='normal' size={18} color={"#666"}>
                                    방식 <span style={{ color: "#000", marginLeft: `${rem(14)}` }}>{userType}</span>
                                </Text>
                            </Div>
                            <Text size={18} bold='bold' style={{ marginLeft: `${rem(51)}`, lineHeight: 0.4 }}>
                                {"010-1234-5678"}
                            </Text>
                        </>
                        :
                        <Div step style={{ marginTop: 0 }}>
                            <Text bold='normal' size={18} color={"#666"}>
                                방식 <span style={{ color: "#000", marginLeft: `${rem(14)}` }}>{userType}</span>
                            </Text>
                        </Div>
                }
                <Text bg size={15}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text bold='500'>
                            상담 요청 시간
                        </Text>
                        <Text bold='normal'>
                            {"2022.10.12 12:30:45"}
                        </Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text bold='500'>
                            상담 시간
                        </Text>
                        <Text bold='normal'>
                            {"50분"}
                        </Text>
                    </div>
                </Text>
                <Text color='#eb541e' size={13} bold='normal' center style={{ marginTop: `${rem(40)}` }}>
                    상담시작 버튼을 누르면 채팅이 시작되며, 상담 시간이 카운트 됩니다.
                </Text>
                <RoundedButton
                    onClick={() => {
                        close2(), userType === "채팅" ?
                            handleDispatch()
                            :
                            console.log("전화상담")
                    }}
                    color="orange"
                    css={{
                        fontSize: rem(15),
                        margin: `${rem(0)} ${rem(24)} ${rem(30)} 0`,
                        height: rem(50),
                        width: "100%",
                    }}
                >
                    상담 시작
                </RoundedButton>

                {/* {
                    !startButton ?
                        <Text color='#eb541e' size={13} bold='normal' center style={{ marginTop: `${rem(40)}` }}>
                            상담시작 버튼을 누르면 채팅이 시작되며, 상담 시간이 카운트 됩니다.
                        </Text> :
                        <Text color='#eb541e' size={13} bold='normal' center style={{ marginTop: `${rem(40)}`, marginBottom: `${rem(14)}` }}>
                            상담 경과<Text left>44:30</Text>
                        </Text>
                } */}
                { /** 채팅상담일 때 새로운 창 생성*/}
                {/* {
                    !startButton ?
                        <RoundedButton
                            onClick={() => {
                                close2(),
                                    start(), userType === "채팅" ?
                                        handleDispatch()
                                        :
                                        console.log("전화상담")
                            }}
                            color="orange"
                            css={{
                                fontSize: rem(15),
                                margin: `${rem(0)} ${rem(24)} ${rem(30)} 0`,
                                height: rem(50),
                                width: "100%",
                            }}
                        >
                            상담 시작
                        </RoundedButton>
                        :
                        <Div step style={{ marginTop: 0 }}>
                            {
                                !pause ?
                                    <RoundedButton
                                        onClick={handlePause}
                                        color="lightOrange2"
                                        css={{
                                            gap: 0,
                                            fontSize: rem(15),
                                            margin: `${rem(0)} ${rem(24)} ${rem(30)} 0`,
                                            height: rem(50),
                                            width: rem(133),
                                        }}
                                    >
                                        <PauseIcon />
                                        일시정지
                                    </RoundedButton>
                                    :
                                    <RoundedButton
                                        onClick={handlePause}
                                        color="lightOrange2"
                                        css={{
                                            gap: 0,
                                            fontSize: rem(15),
                                            margin: `${rem(0)} ${rem(24)} ${rem(30)} 0`,
                                            height: rem(50),
                                            width: rem(133),
                                        }}
                                    >
                                        <PlayArrowIcon />
                                        상담재개
                                    </RoundedButton>

                            }
                            <RoundedButton
                                onClick={() => { console.log("상담완료"), dispatch(setCounselingState("finish")) }}
                                color="orange"
                                css={{
                                    fontWeight: 'bold',
                                    fontSize: rem(15),
                                    height: rem(50),
                                    width: rem(270),
                                }}
                            >
                                상담완료
                            </RoundedButton>
                        </Div>
                } */}
                <div style={{ textAlign: 'center', marginBottom: `${rem(40)}` }}>
                    <Text size={13} bold="normal" color='#666' center
                        style={{ width: `${rem(51)}`, borderBottom: `1px solid #666`, cursor: "pointer" }}
                        onClick={cancelOpen}
                    >
                        상담취소
                    </Text>
                </div>
            </BaseDialog2>
            <BaseDialog2 showDialog={cancelModal} close={cancelClose} aria-label="취소 팝업"
                style={{
                    marginTop: '18vh',
                    width: `${rem(376)}`,
                    height: `${rem(422)}`,
                    padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                }}>
                <Text center size={17} color={"#333"}>
                    상담을 취소 하시겠습니까?
                    <div style={{ fontSize: 15, fontWeight: "normal" }} >
                        사유를 입력해주세요.
                    </div>
                </Text>
                <Input onChange={(e) => setCancelValue(e.target.value)} value={cancelValue} />
                <RoundedButton
                    onClick={() => { cancelClose(), close2() }}
                    color="orange"
                    css={{
                        fontSize: rem(15),
                        height: rem(50),
                        width: "100%",
                    }}
                >
                    취소 완료
                </RoundedButton>
            </BaseDialog2>
        </>
    );
}

export default DayComponents;


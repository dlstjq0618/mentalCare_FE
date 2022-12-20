import React, { useState, useRef, useEffect } from 'react';
import MuiBox from '@mui/material/Box';
import { rem } from 'polished';
import styled, { css } from 'styled-components';
import InputAdornments from '~/components/Textfield/ChatTextField';
import { io } from "socket.io-client";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ConnectingAirportsOutlined, ConstructionOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCounselingState,
    selectCounselingTimeStemp,
    selectWaitlist,
    selectCounselingDate,
    selectCounselingInfoData,
    selectSocketConnected,
    selectCounselingFinalStep,
    selectCounselingState,
    setSocketData,
    setCounselingFinalStep,
    selectCounselingFinalStepData,
    selectCounselingStart,
    selectSocketData,
    setCounselingStart,
    setTotalCount,
    selectLoggedUser,
    setLoggedUser,
    setDashBoardReservationList,
    setDashBoardWatingList,
    setDashBoardConsultingList,
    setDashBoardCompleteList,
    setDashBoardCancelList,
    selectDashBoardSelectUser,
    setDashBoardRoomJoin,
    selectDashBoardRoomJoin,
    setFinishChatList,
    selectFinishChatList,
    setChatBoxOpenState,
    selectChatBoxOpenState,
    setHistoryChat,
    selectConsultingList,
    selectReservationList,
    selectHistoryList,
    selectCompleteList,
} from '~/store/calendarDetailSlice';
import TimeSleectBox from './TimeSelectBox/TimeSleectBox';
import { format } from 'date-fns';

interface IStyled {
    size?: any;
    bold?: string;
    center?: boolean;
    bg?: string;
    height?: string | number;
    type?: "time" | "footer" | "main" | "button" | "chat" | "left" | "right" | "finish" | "title";
}

const chatData = [{
    id: "기분좋아231",
    discription: "안녕하세요.고민 상담이 필요해서 왔어요.",
    time: "PM 10:24"
},
{
    id: "",
    discription: "안녕하세요. 상담메이트 김우주 입니다.어떤 상담이 필요하세요?",
    time: "PM 10:25"
},
]
const Div = styled.div<IStyled>`
${(props) =>
        props.type === "time" &&
        css`
        height: 45.5px;
        flex-grow: 0;
        margin: 4.3px 4.3px 23.3px;
        padding: 11.2px 18.8px 11.3px 15.8px;
        border: solid 0.5px #d2d2d2;
        background-color: #fff;
        display:  flex;
        justify-content: space-between;
    `}
    ${(props) =>
        props.type === "footer" &&
        css`
        clear: both;
        position: absolute;
        height: auto;
        bottom: 0;
        margin-top: 4%;
        width: 100%;
        padding: 7.3px;
        background: #fff;
    `}
    ${(props) =>
        props.bg &&
        css`
        background-color: ${props.bg};
        max-height: auto;
    `}
    ${(props) =>
        props.type === "main" &&
        css`
        background: linear-gradient(-45deg, lightblue, #f3f3a9);
    `}
    ${(props) =>
        props.height &&
        css`
        height: ${rem(props.height)};
    `}
    ${(props) =>
        props.type === "left" &&
        css`
        padding: ${rem(14)};
        max-width: ${rem(288)};
        height: auto;
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
    `}
    ${(props) =>
        props.type === "right" &&
        css`
        padding: ${rem(14)};
        max-width: ${rem(288)};
        height: auto;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
    `}
    ${(props) =>
        props.type === "chat" &&
        css`
        margin-top: ${rem(25)};
        display: flex;
        justify-content: space-between;
    `}
`;

const Text = styled.div<IStyled>`
    ${(props) =>
        props.type === "title" &&
        css`
        max-height: ${rem(50)};
        margin-top: ${rem(17)};
        margin-left:${rem(19)}; 
    `}

    ${(props) =>
        props.size &&
        css`
        font-size: ${rem(props.size)};
        color: ${props.color};
    `}
    ${(props) =>
        props.bold &&
        css`
        font-weight: ${props.bold};
    `}
    ${(props) =>
        props.center &&
        css`
        text-align: center;
        padding-top: ${rem(4)};
    `}
    ${(props) =>
        props.height &&
        css`
        max-height: ${rem(props.height)};
    `}

    ${(props) =>
        props.type === "finish" &&
        css`
        text-align: center;
        margin-top: 49px;
    `}
    ${(props) =>
        props.type === "button" &&
        css`
        width: ${rem(93)};
        height: ${rem(23)};
        flex-grow: 0;
        border: solid 1px #e8440a;
        text-align: center;
        border-radius: 20px;
    `}
`;
const userId = window?.localStorage?.getItem("userId");
const base64EncodedText = Buffer.from(userId + "_doraemon01", "utf8").toString('base64');
const base64DecodedText = Buffer.from(base64EncodedText, 'base64').toString('utf8');
console.log("🚀 ~ file: _app.tsx:67 ~ useEffect ~ base64DecodedText", base64DecodedText)
// const socket = io("http://bo.local.api.woozoo.clinic", {
const socket = io("https://bo.dev.api.woozoo.clinic", {
    // transports: ["websocket"],
    transports: ["polling"],
    extraHeaders: {
        "identity": "counselor",
        "x-auth-token": base64EncodedText,
    }
});
// log socket connection

export default function BoxSx() {
    /*
1. 로그인하면
2. 소캣을 연결하는데
3. 응답해야할것들을 받아야 한다.
4. 응답해야할것들은 couselor_noti 이벤트로 받는다.
*/
    const dispatch = useDispatch()
    const [socketId, setSocketId] = useState("");
    const [type, setType] = useState("");
    const [state, setState] = useState({ message: '' });
    const [chatList, setChatList] = useState<any>([]);
    const infoData = useSelector(selectCounselingInfoData);
    const userId = String(infoData?.id);
    const connected = useSelector(selectSocketConnected);
    const counselingStatus = useSelector(selectCounselingState);
    const finalStep = useSelector(selectCounselingFinalStep); // 최종 예약 확인
    const finalStepData = useSelector(selectCounselingFinalStepData);
    const storeData = useSelector(selectCounselingDate);
    const selectTime = useSelector(selectCounselingTimeStemp);
    const reservationTime = (new Date(storeData).getTime() / 1000);
    const roomJoin = useSelector(selectCounselingStart);
    const watingList = useSelector(selectSocketData);
    const [lastChatlist, setLastChatList] = useState<any>([])
    const select_user = useSelector(selectDashBoardSelectUser);
    const user_dashborad = useSelector(selectChatBoxOpenState)
    const [user_name, setUser_name] = useState('');

    const [roomId, setRoomId] = useState(0);
    const [userPaymentRequestStatus, setUserPaymentRequestStatus] = useState(false);
    const [userPaymentList, setUserPaymentList] = useState<any>([]);

    const [waitCount, setWaitCount] = useState(0); // 상담대기중 count
    const [waitList, setWaitList] = useState<any>([]); // 상담대기중 list

    const nowTime = Date.now();

    const getTime = format(nowTime, 'a hh:mm');
    const [finishChat, setFinishChat] = useState<any>([]);
    const messageEndRef = useRef<any>(null);



    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            // connection id 바꼇으면 감지하여 룸입장 다시해야함
        });
    }, [])

    // useEffect(() => {
    //     dispatch(setChatBoxOpenState(true));
    //     return () => {
    //         dispatch(setChatBoxOpenState(false))
    //     }
    // }, [])



    useEffect(() => {
        socket.on("counsel_noti", (res: any) => {
            const { method, datas } = res;
            console.log("counsel_noti", method)
            const waitingIofo = datas.waitingList;
            switch (method) {
                case "chat": ; break;
                case "payment/user/ok": ; // 사용자 결제 완료시 
                    console.log('사용자 결제 정보 받음', res.datas);
                    // setUserPaymentList([...userPaymentList, res.datas]); // payment
                    dispatch(setSocketData(waitingIofo));
                    setUser_name(res.datas.user_name);
                    setUserPaymentList([res.datas]); // 임시로 덥어쓴다
                    setUserPaymentRequestStatus(true);

                    break;
                case "room/chat/list":
                    const chatList = res.datas?.list;
                    setFinishChat(chatList);
                    dispatch(setHistoryChat(res.datas));
                    dispatch(setFinishChatList(chatList));
            }
        })
    }, [user_name])

    useEffect(() => {
        // dashboard 내용 받기 count 리랜더링 되어야함 
        socket.on('dashboard', (res: any) => {
            const { method, datas } = res;
            console.log("🚀 ~ file: ChatBox.tsx:234 ~ socket.on dashboard ~ method", method, datas)

            const waitingInfoList = datas.waitingList
            switch (method) {
                case "init": ;
                    const waitingIofo = datas.waitingList;
                    console.log('dashboard 데이터를 받았습니다.', waitingIofo);
                    dispatch(setSocketData(waitingInfoList))
                    dispatch(setTotalCount(waitingIofo.count))
                    setWaitCount(waitingIofo.count);
                    setWaitList(waitingIofo.list);
                    if (!waitingIofo.status) alert(`대쉬보드데이터를 받는중 error가 발생 하엿습니다. (${waitingIofo.message})`); return;
            }

            if (method === 'reservationList') {
                const result = datas.list;
                console.log("예약", result)
                dispatch(setDashBoardReservationList(result))
            } else if (method === "waitlist") {
                const result0 = datas.list;
                console.log("대기", result0);
                dispatch(setDashBoardWatingList(result0))
            } else if (method === 'consultingList') {
                const result1 = datas.list;
                console.log("상담중", result1);
                dispatch(setDashBoardConsultingList(result1))
            } else if (method === 'completeList') {
                const result2 = datas.list;
                console.log("완료됨", result2);
                dispatch(setDashBoardCompleteList(result2))
            } else if (method === 'cancelList') {
                const result3 = datas.list;
                console.log("취소", result3);
                dispatch(setDashBoardCancelList(result3))
            }
        })
    }, [user_dashborad, user_name])

    const historyList = useSelector(selectHistoryList);

    useEffect(() => { // 상대방 채팅데이터
        socket.on("chat", (res: any) => {
            console.log("res", res);
            setChatList([...chatList, res])
            dispatch(setLoggedUser(res))
        })
    }, [])

    useEffect(() => { // 새로운 정보 들어왔는지 확인
        console.log('받은 결제 정보가 있음 확인해주자!', userPaymentList);
    }, [userPaymentRequestStatus]);

    const finalSetData = useSelector(selectCounselingFinalStepData);
    async function hadnleEmit() { // emit 보낸후 랜더링 초기화로 한번만 실행, onclick evnet 역할
        const data1 = {
            method: "room/reservation_date",
            datas: {
                roomId: finalSetData.room_id,
                reservation_date: reservationTime
            }
        }
        socket.emit('counsel_submit', data1);
        console.log("emit 실행");
        await dispatch(setCounselingFinalStep(""))
    }

    const room_join = useSelector(selectDashBoardRoomJoin)

    // async function handleComplateRoom() {
    //     if (room_join === 'complate') {
    //         const req = {
    //             roomId: select_user.room_id,
    //             user_type: 6,
    //             message: "안녕하세요 상담을 시작하겠습니다."
    //         };
    //         console.log(req);
    //         socket.emit('chat', {
    //             "method": "join",
    //             "datas": req
    //         });
    //     }
    // }

    const consultingList = useSelector(selectConsultingList); // 상담중
    const reservationList = useSelector(selectReservationList); // 예약 확정 O
    const waitlist = useSelector(selectWaitlist); // 상담 대기 > 스케줄등록 O 
    const completeList = useSelector(selectCompleteList); // 상담완료 O

    async function handleRoomJoin() {
        if (counselingStatus === 'start') {
            if (confirm(`테스트용 채팅을 "${select_user.user_name}" 님과 시작 하시겠습니까?`)) {
                // roomJoin
                const req = {
                    roomId: select_user.room_id,
                    user_type: 6,
                    message: "안녕하세요 상담을 시작하겠습니다."
                };
                console.log(req);
                socket.emit('chat', {
                    "method": "join",
                    "datas": req
                });
                const resser = reservationList?.result?.filter((res: any) => res.user_name !== select_user.user_name);
                // const consult = consultingList?.result?.filter((res: any) => res.user_name !== select_user.user_name);
                // const comple = completeList?.result?.filter((res: any) => res.user_name !== select_user.user_name);
                // await dispatch(setDashBoardReservationList(resser))
                // await dispatch(setDashBoardConsultingList(consult))
                dispatch(setChatBoxOpenState(true))
                await dispatch(setCounselingState('pause'))
            } else {
                return dispatch(setCounselingState('finish'))
            }
        }
    }
    const intRoom_id = Number(select_user.room_id)

    async function handleFinishChatList() { // 지난 채팅 리스트
        const data1 = {
            method: "room/chat/list",
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        }
        socket.emit('counsel_submit', data1)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (select_user.status === 3) {
            console.log("상담완료");
        } else {
            event.preventDefault();
            const chat = {
                roomId: intRoom_id,
                user_type: 6,
                message: state.message,
                time: getTime
            };
            socket.emit('chat', {
                method: "chat",
                datas: chat
            });
            dispatch(setLoggedUser(chat))
            setState({ message: '' })
        }
    };


    const handleEnter = (e: any) => { // 엔터 쳤을때 이벤트 발생 
        setState({ message: e.target.value });
        console.log('e', e.target.value)
        if (e.key === "Enter") {
            const chat = {
                roomId: intRoom_id,
                user_type: 6,
                message: e.target.value,
                time: getTime
            };
            socket.emit('chat', {
                method: "chat",
                datas: chat
            });
            dispatch(setLoggedUser(chat))
            setState({ message: '' })
        }
    }

    const handleOnFinalSelect = () => { // finish
        socket.emit('counsel_submit', {
            method: 'room/complete',
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        })
    }

    const use_last_chat = useSelector(selectFinishChatList);

    console.log("counselingStatus", counselingStatus);

    useEffect(() => {
        if (room_join === 'complate' || room_join === 'consulting') {
            handleFinishChatList()
        }
    }, [room_join])

    useEffect(() => {
        if (counselingStatus === 'start') {
            handleRoomJoin()
        } else if (counselingStatus === 'finish') {
            handleOnFinalSelect()
        }
    }, [counselingStatus])


    useEffect(() => {
        if (finalStep === 'yes') {
            hadnleEmit()
        }
    }, [finalStep])

    const test = useSelector(selectLoggedUser);
    useEffect(() => {
        messageEndRef?.current?.scrollIntoView();
    }, [test])
    return (
        <>
            {
                counselingStatus !== 'finish' && counselingStatus !== "" || room_join === "complate" ?
                    <div>
                        <MuiBox
                            sx={{
                                zIndex: 10,
                                boxShadow: `3px 2px 5px black;`,
                                width: 500,
                                maxWidth: 500,
                                maxHeight: rem(1000),
                                Height: rem(1000),
                                position: 'absolute',
                                bottom: rem(20),
                                right: 30,
                                backgroundColor: 'lightgray',
                            }}
                        >
                            <Div type='main'>
                                <Div bg='#fff' style={{ display: 'flex', justifyContent: 'space-between', maxHeight: 59 }}>
                                    <Text size={17} bold="600" color='#000' type='title'>
                                        우주 상담소
                                    </Text>
                                    <TimeSleectBox />
                                </Div>
                                <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                    <Div type='time' >
                                        <Text size={13} color='#b53e14' >{"상담예약 시간" + " " + `${select_user.reservation_date.substr(0, 11)}`}</Text>
                                        {/* <Text size={12} type='button' color='#e8440a'>
                                            상담 경과 44:15 
                                        </Text> */}
                                    </Div>
                                    <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(700), maxWidth: rem(500), overflowX: 'hidden', overflowY: 'auto' }}>
                                        {
                                            select_user.status === 3 ?
                                                finishChat?.map((res: any, index: number) => (
                                                    <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                        {
                                                            res?.type === 'receve' ?
                                                                <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                    <Div bg='#ffffe7' type="right">
                                                                        {res?.message}
                                                                    </Div>
                                                                    <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                        {format(res?.time, 'a hh:mm')}
                                                                    </Div>
                                                                </Div>
                                                                :
                                                                <Div type='chat'>
                                                                    <div />
                                                                    <Div style={{ display: "flex" }}>
                                                                        <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                            {format(res?.time, 'a hh:mm')}
                                                                        </Div>
                                                                        <Div type='left' bg='white' style={{ maxHeight: 'auto', height: 'auto' }} >
                                                                            {res?.message}
                                                                        </Div>
                                                                    </Div>
                                                                </Div>
                                                        }
                                                    </div>
                                                ))
                                                :
                                                // select_user.status === 2 ?
                                                //     historyList[0]?.map((res: any, index: number) => (
                                                //         <>
                                                //             <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                //                 {console.log("bbbb", res)}
                                                //                 {
                                                //                     res?.type === 'receve' ?
                                                //                         <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                //                             <Div bg='#ffffe7' type="right">
                                                //                                 {res?.message}
                                                //                             </Div>
                                                //                             <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                //                                 {format(res?.time, 'a hh:mm')}
                                                //                             </Div>
                                                //                         </Div>
                                                //                         :
                                                //                         <Div type='chat'>
                                                //                             <div />
                                                //                             <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                //                                 <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                //                                     {format(res?.time, 'a hh:mm')}
                                                //                                 </Div>
                                                //                                 <Div type='left' bg='white' style={{ maxHeight: 'auto', height: 'auto' }} >
                                                //                                     {res?.message}
                                                //                                 </Div>
                                                //                             </Div>
                                                //                         </Div>
                                                //                 }
                                                //             </div>
                                                //         </>
                                                //     ))
                                                //     :
                                                test?.map((res: any, index: number) => (
                                                    <>
                                                        <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                            {
                                                                res?.datas?.type ?
                                                                    <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                        <Div bg='#ffffe7' type="right">
                                                                            {res.datas?.message}
                                                                        </Div>
                                                                        <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                            {format(res.datas?.time, 'a hh:mm')}
                                                                        </Div>
                                                                    </Div>
                                                                    :
                                                                    <Div type='chat'>
                                                                        <div />
                                                                        <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                            <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                                {res?.time}
                                                                            </Div>
                                                                            <Div type='left' bg='white' style={{ maxHeight: 'auto', height: 'auto' }} >
                                                                                {res?.message}
                                                                            </Div>
                                                                        </Div>
                                                                    </Div>
                                                            }
                                                        </div>
                                                        <div ref={messageEndRef} />
                                                    </>
                                                ))
                                        }
                                        {
                                            counselingStatus === "finish" ?
                                                <>
                                                    <Text type='finish'>
                                                        ----상담이 완료 되었습니다.----
                                                    </Text>
                                                </>
                                                : ""
                                        }
                                    </Div>
                                </Text>
                                <Text height={40}>
                                    <Box sx={{
                                        display: 'flex', flexWrap: 'wrap', background: "white", height: rem(40), marginTop: rem(12)
                                    }}>
                                        <FormControl sx={{
                                            m: 0, width: '100%', '& legend': { display: 'none', borderRadius: 'none' },
                                            '& fieldset': { top: 0 },
                                        }} variant="outlined">
                                            <OutlinedInput
                                                style={{ height: 40 }}
                                                disabled={counselingStatus === "finish" ? true : false}
                                                placeholder={`${counselingStatus === "finish" ? "상담이 완료 되었습니다." : ""}`}
                                                id="outlined-adornment-password"
                                                value={state.message}
                                                label={"none"}
                                                size={"small"}
                                                autoComplete={"off"}
                                                onKeyPress={handleEnter}
                                                // onKeyPress={handleTest}
                                                onChange={(e) => setState({ message: e.target.value })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            style={{
                                                                background: `${counselingStatus === "finish" ? "#c4c4c4" : "#e8440a"}`, color: "white",
                                                                marginRight: "-11.2px", width: "35px", height: "35px"
                                                            }}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            <ArrowUpwardIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Box>
                                </Text>
                            </Div>
                        </MuiBox>
                    </div> : ""
            }
        </>
    );
}
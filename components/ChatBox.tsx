import React, { useState, useEffect } from 'react';
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
    selectCounselingDate,
    selectCounselingInfoData,
    selectSocketConnected,
    selectCounselingFinalStep,
    selectCounselingState,
    setSocketData,
    setCounselingFinalStep,
    selectCounselingFinalStepData,
    selectCounselingStart, selectSocketData,
    setCounselingStart, setTotalCount,
    selectLoggedUser,
    setLoggedUser,
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
        max-height: ${rem(75)};
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

    const [roomId, setRoomId] = useState(0);
    const [userPaymentRequestStatus, setUserPaymentRequestStatus] = useState(false);
    const [userPaymentList, setUserPaymentList] = useState<any>([]);

    const [waitCount, setWaitCount] = useState(0); // 상담대기중 count
    const [waitList, setWaitList] = useState<any>([]); // 상담대기중 list
    // const totalCount = useSelector(select)

    const nowTime = Date.now();

    const getTime = format(nowTime, 'a hh:mm')
    console.log("getTime", getTime)


    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            // connection id 바꼇으면 감지하여 룸입장 다시해야함
        });
    }, [])

    useEffect(() => {
        socket.on("counsel_noti", (res: any) => {
            const { method, datas } = res;
            console.log("🚀 ~ file: ChatBox.tsx:233 ~ socket.on ~ method", method)
            switch (method) {
                case "chat": ; break;
                case "payment/user/ok": ; // 사용자 결제 완료시 
                    console.log('사용자 결제 정보 받음', res.datas);
                    // setUserPaymentList([...userPaymentList, res.datas]); // payment
                    // dispatch(setTotalCount())
                    setUserPaymentList([res.datas]); // 임시로 덥어쓴다
                    setUserPaymentRequestStatus(true);
                    break;
                case "room/chat/list":
                    console.log("asdasdasd", res);
                // setChatList([...chatList, res.list]);
            }
        })
        // dashboard 내용 받기 count 리랜더링 되어야함 
        socket.on('dashboard', (res: any) => {
            const { method, datas } = res;
            console.log("🚀 ~ file: ChatBox.tsx:234 ~ socket.on dashboard ~ method", method, datas)
            const waitingIofo = datas.waitingList;
            dispatch(setSocketData(waitingIofo))
            switch (method) {
                case "init": ;
                    const waitingIofo = datas.waitingList;
                    console.log('dashboard 데이터를 받았습니다.', waitingIofo);
                    dispatch(setSocketData(waitingIofo))
                    dispatch(setTotalCount(waitingIofo.count))
                    setWaitCount(waitingIofo.count);
                    setWaitList(waitingIofo.list);
                    if (!waitingIofo.status) alert(`대쉬보드데이터를 받는중 error가 발생 하엿습니다. (${waitingIofo.message})`); return;
                    break;
            }
        })
    }, [userPaymentList])

    useEffect(() => { // 상대방 채팅데이터
        socket.on("chat", (res: any) => {
            console.log("res", res);
            setChatList([...chatList, res])
            dispatch(setLoggedUser(res))
        })
    }, [])

    // useEffect(() => { // 상대방 챗팅데이터 확인
    //     socket.on("chat", (res: any) => {
    //         console.log("res", res);
    //         dispatch(setCounselingChatList(res.message))
    //     })
    // }, [])

    // const list = useSelector(selectCounselingChatList);
    // console.log("list", list)
    useEffect(() => { // 새로운 정보 들어왔는지 확인
        console.log('받은 결제 정보가 있음 확인해주자!', userPaymentList);
    }, [userPaymentRequestStatus]);

    async function hadnleEmit() { // emit 보낸후 랜더링 초기화로 한번만 실행, onclick evnet 역할
        const data1 = {
            method: "room/reservation_date",
            datas: {
                roomId: finalStepData.room_id,
                reservation_date: reservationTime
            }
        }
        socket.emit('counsel_submit', data1);
        console.log("emit 실행");
        await dispatch(setCounselingFinalStep(""))
    }
    async function handleRoomJoin() {
        if (counselingStatus === 'start') {
            if (confirm(`테스트용 채팅을 "${finalStepData.user_name}" 님과 시작 하시겠습니까?`)) {
                // roomJoin
                const req = {
                    roomId: finalStepData.room_id,
                    user_type: 6,
                    message: "안녕하세요 상담을 시작하겠습니다."
                };
                console.log(req);
                socket.emit('chat', {
                    "method": "join",
                    "datas": req
                });
                await dispatch(setCounselingState('pause'))
            } else {
                return dispatch(setCounselingState('finish'))
            }
        }
    }
    const intRoom_id = Number(finalStepData.room_id)

    // const handleList = () => { // 지난 채팅 리스트 
    //     const data1 = {
    //         method: "room/chat/list",
    //         datas: {
    //             roomId: intRoom_id,
    //             user_type: 6
    //         }
    //     }
    //     socket.emit('counsel_submit', data1)
    // }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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

    useEffect(() => {
        console.log("counselingStatus", counselingStatus)
    })

    const test = useSelector(selectLoggedUser);
    const handleTest = (e: any) => {
        if (e.key === "Enter") {
            const inputData = {
                value: e.target.value
            }
            dispatch(setLoggedUser(inputData))
        }
    }


    return (
        <>
            {
                counselingStatus !== 'finish' && counselingStatus !== "" ?
                    <div>
                        <MuiBox
                            sx={{
                                zIndex: 10,
                                boxShadow: `3px 2px 5px black;`,
                                width: 500,
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
                                    {/* <button onClick={() => { handleList() }}>
                                        지난 list
                                    </button> */}
                                    <TimeSleectBox />
                                </Div>
                                <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                    <Div type='time' >
                                        <Text size={13} color='#b53e14' >상담시간이 49분 남았습니다.</Text>
                                        <Text size={12} type='button' color='#e8440a'>
                                            상담 경과 44:15 { /** 상담시간 체크*/}
                                        </Text>
                                    </Div>
                                    <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(500) }}>
                                        {
                                            test.length > 0 && test.map((res: any, index: number) => (
                                                <>
                                                    <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                        <Text bold='bold' style={{ marginBottom: 7, marginTop: `${index > 0 ? rem(30) : 0}` }}>
                                                            {/* {res.datas?.joindUser ? res.datas?.joindUser : ""} */}
                                                        </Text>
                                                        {
                                                            res?.datas?.type ?
                                                                <Div style={{ display: "flex" }}>
                                                                    <Div bg='#ffffe7' height={62} type="right">
                                                                        {res.datas?.message}
                                                                    </Div>
                                                                    <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                        {format(res.datas?.time, 'a hh:mm')}
                                                                    </Div>
                                                                </Div>
                                                                :
                                                                <Div type='chat'>
                                                                    <div />
                                                                    <Div style={{ display: "flex" }}>
                                                                        <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                            {res?.time}
                                                                        </Div>
                                                                        <Div type='left' bg='white' height={62} >
                                                                            {res?.message}
                                                                        </Div>
                                                                    </Div>
                                                                </Div>
                                                        }
                                                    </div>
                                                </>
                                            ))
                                        }
                                        { /** 대화가 끝났을때 이벤트 체크 후 종료 안내*/}
                                        {
                                            counselingStatus === "finish" ?
                                                <>
                                                    <Text type='finish'>
                                                        ----상담이 완료 되었습니다.----
                                                        <Div>{"PM 22:10"}</Div>
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
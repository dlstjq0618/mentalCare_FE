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
import { ChatBubble, ConnectingAirportsOutlined, ConstructionOutlined, ResetTvRounded } from '@mui/icons-material';
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
    selectCounselingTimeStempNumber,
    selectWatingListBefore,
    selectAlertControlls3,
    selectSelectBoxControlls,
    removeList,
    clear,
    setTestResultValueStatus,
    setUserCallNumber,
    selectCancelStatus,
    setCancelStatus,
    selectUserCall,
    selectAlertControlls,
    setTestResultValue,
    selectTestResultValueStatus,
    selectChangeBeforeChatList,
    setChangeBeforeChatList,
    setAccountList,
    setConferenceList,
    setTimeCount,
    selectTimeCount,
    setCoustomAlert,
    setCounselingTimeStempNumber,
    setAlertType,
    setCounselingTimeStemp,
    setPaidWaitList,
    selectSocketControlls2
} from '~/store/calendarDetailSlice';
import TimeSleectBox from './TimeSelectBox/TimeSleectBox';
import { format } from 'date-fns';
import { async } from '@firebase/util';
import { setTimeout } from 'timers';
import useInterval from '~/utils/hook/useInterval';
import { CoustomAlertPopUp } from '../components/Dialog';
import Draggable from "react-draggable";
import { api2 } from '~/mentalcareapi';

interface IStyled {
    size?: any;
    bold?: string;
    center?: boolean;
    bg?: string;
    height?: string | number;
    type?: "time" | "footer" | "main" | "button" | "chat" | "left" | "right" | "finish" | "title" | "name";
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
        /* background: linear-gradient(-45deg, lightblue, #f3f3a9); */
        background: #fff1ea;
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
const Button = styled.div<IStyled>`
align-items: center;
display: flex;
color: #fff;
width: ${rem(100)};
justify-content: space-around;
height: 36px;
background-color: #eb541e;
${(props) =>
        props.type === 'finish' &&
        css`
        background-color: #999;
        width: 60px;
    `}
margin: 12px 0;
  flex-grow: 0;
  border-radius: 6px;
  border: solid 1px #d3d3d3;
  font-weight: bold;
  font-size: 14px;
  justify-content: center;
  cursor: pointer;
`;

const Text = styled.div<IStyled>`
    ${(props) =>
        props.type === "name" &&
        css`
  flex-grow: 0;
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
    `}

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
// 여긴  디벨롭
const userId = window?.localStorage?.getItem("userId");
const base64EncodedText = Buffer.from(userId + "_doraemon01", "utf8").toString('base64');
const base64DecodedText = Buffer.from(base64EncodedText, 'base64').toString('utf8');
console.log("🚀 ~ file: _app.tsx:67 ~ useEffect ~ base64DecodedText", base64DecodedText)
// const socket = io("http://bo.local.api.woozoo.clinic", {
// bo.dev.api.woozoo.clinic  개발
// bo.stag.api 스테이징
// bo.api 운영
const socket = io(`${process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ?
    "https://bo.api.woozoo.clinic" : "https://bo.dev.api.woozoo.clinic"}`, {
    transports: ["polling"],
    extraHeaders: {
        "identity": "counselor",
        "x-auth-token": base64EncodedText,
    }
    // log socket connection
})
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
    const before_wating = useSelector(selectWatingListBefore) // 상담전 예약 데이터 
    const reservationTime = (new Date(storeData).getTime() / 1000);
    const nowTimes = new Date().getTime() / 1000
    const selectNum = useSelector(selectCounselingTimeStempNumber);
    const totalTime = reservationTime + selectNum
    const roomJoin = useSelector(selectCounselingStart);
    const watingList = useSelector(selectSocketData);
    const [lastChatlist, setLastChatList] = useState<any>([])
    const select_user = useSelector(selectDashBoardSelectUser);
    const user_dashborad = useSelector(selectChatBoxOpenState)
    const [user_name, setUser_name] = useState('');
    const [roomId, setRoomId] = useState(0);
    const [userPaymentRequestStatus, setUserPaymentRequestStatus] = useState(false);
    const [userPaymentList, setUserPaymentList] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [filterMessage, setFilterMessage] = useState<any>([]);
    const [waitCount, setWaitCount] = useState(0); // 상담대기중 count
    const [waitList, setWaitList] = useState<any>([]); // 상담대기중 list
    const consultingList = useSelector(selectConsultingList); // 상담중
    const reservationList = useSelector(selectReservationList); // 예약 확정 O
    const waitlist = useSelector(selectWaitlist); // 상담 대기 > 스케줄등록 O 
    const completeList = useSelector(selectCompleteList); // 상담완료 O
    const useOpen = useSelector(selectChatBoxOpenState) // 캘린더 클릭 닫기
    const cancel_status = useSelector(selectCancelStatus);
    const nowTime = Date.now();
    const getTime = nowTime;
    const [finishChat, setFinishChat] = useState<any>([]);
    const [isMessage, setIsMessage] = useState<any>([])
    const messageEndRef = useRef<any>(null);
    const status = useSelector(selectUserCall)
    const [userName, setUserName] = useState("")
    const test_status = useSelector(selectTestResultValueStatus);
    const [comfrim_isMessage, setComfrimIsMessage] = useState<any>([])
    const [object, setObject] = useState<any>({});
    const [hello, setHello] = useState<any>({});
    const coco = useSelector(selectChangeBeforeChatList);
    const status_alert = useSelector(selectAlertControlls3);
    const [time_count, setTime_count] = useState("");
    const [time, setTime] = useState(0);
    const [count_start, setCount_start] = useState(0);
    const default_count = useSelector(selectTimeCount);
    const socketImmediely = useSelector(selectSocketControlls2);
    const nodeRef = useRef(null);
    const [clickPosition, setClickPosition] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [position2, setPosition2] = useState({ x: 50, y: 50 });

    const [Opacity, setOpacity] = useState(false);
    const [Opacity2, setOpacity2] = useState(false);

    const trackPos = (data: any) => {
        setPosition({ x: data.x, y: data.y });
    };

    const trackPos2 = (data: any) => {
        setPosition2({ x: data.x, y: data.y });
    };

    const handleStart = () => {
        setOpacity(true);
    };
    const handleEnd = () => {
        setOpacity(false);
    };

    const handleStart2 = () => {
        setOpacity2(true);
    };
    const handleEnd2 = () => {
        setOpacity2(false);
    };

    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            // connection id 바꼇으면 감지하여 룸입장 다시해야함
        });
    }, [])

    const test = useSelector(selectLoggedUser);

    useEffect(() => {
        socket.on("counsel_noti", (res: any) => {
            const { method, datas } = res;
            const waitingIofo = datas?.waitingList;
            switch (method) {
                case "payment/user/ok": ;

                case "room/test/result":
                    dispatch(setTestResultValue(res.datas))
                    break;
                case "room/call/join/":
                    dispatch(setUserCallNumber(res.datas))
                    break;
                case "chat": ; break;
                case "payment/user/ok": ; // 사용자 결제 완료시 
                    // setUserPaymentList([...userPaymentList, res.datas]); // payment
                    dispatch(setSocketData(waitingIofo));
                    setUser_name(res.datas.user_name);
                    setUserPaymentList([res.datas]); // 임시로 덥어쓴다
                    setUserPaymentRequestStatus(true);
                    break;
                case "room/chat/list":
                    const chatList = res.datas?.list // 이전대화 리스트
                    const historyList = res.datas?.list[0]
                    setFinishChat(chatList); // 이전대화 목록이 들어간다.
                    dispatch(setHistoryChat(historyList));
                    dispatch(setFinishChatList(chatList));
                    setIsMessage(chatList)
                    setTime_count(res.datas?.start_time);

            }
        })
    }, [select_user, before_wating.user_name])


    useEffect(() => {
        // dashboard 내용 받기 count 리랜더링 되어야함 
        socket.on('dashboard', (res: any) => {
            const { method, datas } = res;

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
                dispatch(setDashBoardReservationList(result))
            } else if (method === "waitlist") {
                const result0 = datas.list;
                dispatch(setDashBoardWatingList(result0))
            } else if (method === 'consultingList') {
                const result1 = datas.list;
                dispatch(setDashBoardConsultingList(result1))
            } else if (method === 'completeList') {
                const result2 = datas.list;
                dispatch(setDashBoardCompleteList(result2))
            } else if (method === 'cancelList') {
                const result3 = datas.list;

                dispatch(setDashBoardCancelList(result3))
            } else if (method === 'paidList') {
                const result4 = datas.list;

                dispatch(setAccountList(result4));
            } else if (method === 'confirmRequestList') {
                const result5 = datas.list;
                dispatch(setConferenceList(result5))

            } else if (method === 'paidWaitList') {
                const result6 = datas.list;
                dispatch(setPaidWaitList(result6));
            }
        })
    }, [user_dashborad, user_name])


    useEffect(() => { // 상대방 채팅데이터
        socket.on("chat", (res: any) => { // 만약 selectLoggedUser를 filter 를 사용하여 chat_id 와 res.datas.chat_id 와 같은게 있으면 넣지 마라 
            dispatch(setLoggedUser(res?.datas));
            setObject(res?.datas);
            setHello(res);
        })
    }, [])

    useEffect(() => {
        if (object?.roomId !== undefined) {
            if (object?.roomId === select_user?.room_id) {
                setIsMessage([...isMessage, object])
            } else {
            }
        }
    }, [object])

    useEffect(() => {
        if (hello?.roomId !== undefined) {
            if (hello?.roomId === select_user?.room_id) {
                if (hello?.message) {
                    const data1 = {
                        type: "receve",
                        // message: hello.message,
                        message: select_user.user_name + "님 입장하였습니다.",
                        timestr: "",
                        time: getTime
                    }
                    setIsMessage([...isMessage, data1])
                }
            }
        }
    }, [hello])

    const finish_chat = useSelector(selectFinishChatList)
    const finalSetData = useSelector(selectCounselingFinalStepData);
    // nowTime

    async function hadnleEmit() { //예약시간 설정 , emit 보낸후 랜더링 초기화로 한번만 실행, onclick evnet 역할
        setIsMessage([])
        const data1 = {
            method: "room/reservation_date",
            datas: {
                roomId: select_user?.room_id,
                reservation_date: select_user.isimmediate ? nowTimes : totalTime
            }
        }
        socket.emit('counsel_submit', data1);

        await dispatch(setCounselingFinalStep(""))
        await dispatch(setCounselingTimeStempNumber(0))
        await dispatch(setCounselingTimeStemp(""))
    }

    async function handleTest() {
        const data1 = {
            method: "room/test/result",
            datas: {
                roomId: select_user.room_id
            }
        }
        socket.emit('counsel_submit', data1)
        await dispatch(setTestResultValueStatus(false))
    }

    const room_join = useSelector(selectDashBoardRoomJoin)

    async function handleRoomJoin() { // 처음 시작할때
        if (select_user.isimmediate) {
            hadnleEmit();
            setTimeout(() => {
                handleFinishChatList();
                setIsMessage([]);
            }, 1000)
            const req = {
                roomId: select_user.room_id,
                user_type: 6,
                message: "안녕하세요 상담을 시작하겠습니다."
            };
            socket.emit('chat', {
                "method": "join",
                "datas": req
            });
        } else {
            handleFinishChatList();
            setIsMessage([])
            const req = {
                roomId: select_user.room_id,
                user_type: 6,
                message: "안녕하세요 상담을 시작하겠습니다."
            };
            socket.emit('chat', {
                "method": "join",
                "datas": req
            });
        }
    }
    const alert_status = useSelector(selectAlertControlls);
    const alert_status3 = useSelector(selectAlertControlls);

    async function handleChatCreate() { // 협의 시작 하기전 앱으로 던지는 이벤트 
        const data1 = {
            method: "room/reservation/chat/create",
            datas: {
                roomId: select_user.room_id
            }
        }
        socket.emit('counsel_submit', data1)
    }

    async function handleFirstRoomJoin() { // 일정 협의 할 채팅방
        handleChatCreate();
        await dispatch(clear());
        // roomJoin
        const req = {
            roomId: select_user.room_id,
            user_type: 6,
            message: "안녕하세요 상담을 시작하겠습니다."
        };
        socket.emit('chat', {
            "method": "join",
            "datas": req
        });
        await handleFinishChatList();

    }

    async function handleWaitingRoomJoin() { // 진행중
        await dispatch(clear());
        // roomJoin
        const req = {
            roomId: select_user.room_id,
            user_type: 6,
            message: "안녕하세요 상담을 시작하겠습니다."
        };
        socket.emit('chat', {
            "method": "join",
            "datas": req
        });
        await handleFinishChatList();
    }

    const intRoom_id = Number(select_user.room_id)

    async function handleFirstChatList2() { // 일정 협의 에서 새로고침 후 다시 들어왔을 때 정보를 불러옴
        const data1 = {
            method: "room/chat/list",
            datas: {
                roomId: before_wating.room_id,
                user_type: 6
            }
        }
        socket.emit('counsel_submit', data1);
        await handleFirstRoomJoin()
    }

    async function handleFinishChatList() { // 지난 채팅 리스트 불러옴
        await dispatch(clear())
        setIsMessage([]);
        const data1 = {
            method: "room/chat/list",
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        }
        socket.emit('counsel_submit', data1);
        await dispatch(setChangeBeforeChatList(false))
    }

    const handleOnComplete = () => { // 상담완료, 채팅창의 선택박스에서 상담완료 설정
        socket.emit('counsel_submit', {
            method: 'room/complete',
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        })
        setCount_start(0);
        handleFinishChatList();
    }

    async function handleCallOnComplete() { //  전화 상담완료
        socket.emit('counsel_submit', {
            method: 'room/complete',
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        })
        await dispatch(setUserCallNumber(""))
    }

    async function handleCallCounselorting() {
        if (select_user.isimmediate) {
            hadnleEmit()
            socket.emit('counsel_submit', {
                method: 'room/call/join',
                datas: {
                    roomId: select_user.room_id,
                }
            })
        } else {
            console.log("전화 핸들러 실행");
            socket.emit('counsel_submit', {
                method: 'room/call/join',
                datas: {
                    roomId: select_user.room_id,
                }
            })
        }
        await dispatch(setChatBoxOpenState("null"))
    }

    const handleFirstOnComplete = () => { // 일정 협의 채팅방 종료 
        socket.emit('counsel_submit', {
            method: 'room/call/join',
            datas: {
                roomId: before_wating.room_id,
            }
        })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { // 채팅방에서 마우스 클릭
        if (state.message !== '') {
            const chat = {
                datas: {
                    message: state.message,
                    time: getTime,
                    type: "send"
                },
                roomId: intRoom_id,
                user_type: 6,
                message: state.message,
                time: getTime,
                type: "send"
            };
            socket.emit('chat', {
                method: "chat",
                datas: chat
            });
            // api2.counselor.chat({
            //     roomId: intRoom_id,
            //     message: chat?.message
            // });
            dispatch(setLoggedUser(chat))
            setIsMessage([...isMessage, chat])
            setState({ message: '' })
        }
    };

    const handleMouseFirstDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { // 일정 협의 채팅방에서 마우스 클릭
        if (state.message !== '') {
            const chat = {
                datas: {
                    message: state.message,
                    time: getTime,
                    type: "send"
                },
                roomId: before_wating.room_id,
                user_type: 6,
                message: state.message,
                time: getTime,
                type: "send"
            };
            socket.emit('chat', {
                method: "chat",
                datas: chat
            });

            // api2.counselor.chat({
            //     roomId: intRoom_id,
            //     message: chat?.message
            // });

            dispatch(setLoggedUser(chat))
            setState({ message: '' })
            setIsMessage([...isMessage, chat])
        }
    };


    const handleEnter = (e: any) => { // 유입된 유저와 대화했던 데이터 저장 채팅방 엔터 눌렀을때 전송
        setState({ message: e.target.value }); // 이거는 인풋박스 온체인지
        if (e.key === "Enter" && state.message !== "") { // 엔터를 했을때 쳇 데이터 안에 룸 번호와 메세지와 시간을 보낸다.
            const chat = {
                datas: {
                    message: e.target.value,
                    time: getTime,
                    type: "send"
                },
                roomId: intRoom_id,
                user_type: 6,
                message: e.target.value,
                time: getTime,
                type: "send"
            };
            socket.emit('chat', { // 서버로 전송
                method: "chat",
                datas: chat
            });

            // api2.counselor.chat({
            //     roomId: intRoom_id,
            //     message: chat?.message
            // });

            dispatch(setLoggedUser(chat));
            setIsMessage([...isMessage, chat]);
            setState({ message: '' });
        }
    }

    const handleFirstEnter = (e: any) => { // 일정 협의 채팅방 메세지 보내는 엔터
        setState({ message: e.target.value });
        if (e.key === "Enter" && state.message !== "") {
            const chat = {
                datas: {
                    message: e.target.value,
                    time: getTime,
                    type: "send"
                },
                roomId: before_wating.room_id,
                user_type: 6,
                message: e.target.value,
                type: "send",
                time: getTime,
            };
            socket.emit('chat', {
                method: "chat",
                datas: chat
            });
            // api2.counselor.chat({
            //     roomId: intRoom_id,
            //     message: chat?.message
            // }).then((res) => res);


            dispatch(setLoggedUser(chat));
            setIsMessage([...isMessage, chat]);
            setState({ message: '' })
        }
    }

    async function handleCancel() {
        console.log("상담취소 이벤트 보냄")
        socket.emit('counsel_submit', {
            method: 'room/cancel',
            datas: {
                roomId: select_user.room_id,
            }
        })
        await dispatch(setCancelStatus(false))
    }

    async function handleComplete() { // 협의 완료시 실행되어야함
        console.log("협의완료시작")
        socket.emit('counsel_submit', {
            method: 'room/confirm/complete',
            datas: {
                roomId: select_user.room_id,
            }
        })
        await dispatch(setChatBoxOpenState("null"))
    }

    async function handleConfirmCancel() {
        console.log("상담중 취소")
        socket.emit('counsel_submit', {
            method: 'room/confirm/cancel',
            datas: {
                roomId: select_user.room_id,
            }
        })
        await dispatch(setChatBoxOpenState("null"))
    }

    async function handlePaidWaitList() { // 결제요
        socket.emit('counsel_submit', {
            method: 'request/payment/confirm/immediate',
            datas: {
                roomId: select_user.room_id,
            }
        })
        await dispatch(setChatBoxOpenState("null"))
    }

    const use_last_chat = useSelector(selectFinishChatList);

    async function handleImmediately() {
        console.log("소캣 바로상담 상태 전송", infoData.id, socketImmediely);
        await socket.emit('counselor', {
            method: 'request/immediate',
            datas: {
                id: infoData.id,
                immediate: socketImmediely

            }
        })
    }

    useEffect(() => {
        if (counselingStatus === 'finish') {
            handleFinishChatList()
        }
    }, [counselingStatus, coco])

    useEffect(() => { // 캘린더 컨트롤 
        if (useOpen === '완료') {
            handleOnComplete()
        } else if (useOpen === '전화완료') {
            handleCallOnComplete()
        } else if (useOpen === '진행') {
            handleWaitingRoomJoin()
        } else if (useOpen === '시작') {
            handleRoomJoin()
        } else if (useOpen === "협의") {
            handleFirstRoomJoin()
        } else if (useOpen === "전화") {
            handleCallCounselorting()
        } else if (useOpen === "협의완료") {
            handleComplete()
        } else if (useOpen === "협의취소") {
            handleConfirmCancel()
        } else if (useOpen === "결제요청") {
            handlePaidWaitList()
        }
    }, [useOpen])

    useEffect(() => {
        if (socketImmediely.length !== 0) {
            handleImmediately();
        }
    }, [socketImmediely])

    console.log("길이", socketImmediely.length)

    useEffect(() => { // 테스트 결과보기
        if (test_status) {
            handleTest()
        }
    }, [test_status])

    useEffect(() => { // 상담승인 할때 이벤트 발생
        if (finalStep === 'yes') {
            hadnleEmit()
        }
    }, [finalStep])

    useEffect(() => {
        if (cancel_status) {
            handleCancel();
        }
    }, [cancel_status])

    useEffect(() => {
        if (!status_alert) {
            setUserName(select_user?.user_name)
        }
    }, [status_alert])

    useEffect(() => {
        messageEndRef?.current?.scrollIntoView(false);
    }, [isMessage, filterMessage])

    const arrUnique = test.filter((character: { chat_id: string }, idx: any, arr: any) => {
        return arr.findIndex((item: { chat_id: string }) => item?.chat_id === character?.chat_id) === idx
    });

    const select_room_id = Number(select_user.room_id);

    useEffect(() => {
        if (select_user?.method === 5 || select_user?.method === 6) {
            setTime(30);
        } else if (select_user?.method === 7 || select_user?.method === 8) {
            setTime(50);
        }
    }, [select_user.method])

    useInterval(() => {
        if (useOpen === '진행' || useOpen === '시작' && count_start > 0) {
            setCount_start(count_start - 1);
        }
    }, 60000);

    console.log("select_user.room_id", select_user.room_id)

    useEffect(() => {
        // 시간 공식
        const times = Number(time_count?.substring(11, 13));
        const minut = Number(time_count?.substring(14, 16));
        const start = times * 60 + minut;
        const end = start + time;

        // 현재시간 공식
        const get_Time = new Date().getHours();
        const get_Miu = new Date().getMinutes();
        const get_Times = get_Time * 60 + get_Miu;
        const affter_time = end - get_Times;

        setCount_start(affter_time); // 남은시간 체크 하기위한 랜더링
    }, [time_count])

    return (
        <>
            <Draggable
                cancel=".no-drag"
                nodeRef={nodeRef}
                onDrag={(e, data) => trackPos(data)}
                onStart={handleStart}
                onStop={handleEnd}
            >
                <div
                    ref={nodeRef}
                    className="box"
                    style={{ opacity: Opacity && clickPosition ? "0.6" : "1" }}
                >
                    {
                        counselingStatus === 'finish' ?
                            <div>
                                <MuiBox
                                    sx={{
                                        zIndex: 1,
                                        boxShadow: `0 30px 30px 0 rgba(0, 0, 0, 0.25)`,
                                        width: 500,
                                        maxWidth: rem(500),
                                        maxHeight: rem(1000),
                                        Height: rem(1000),
                                        position: 'fixed',
                                        bottom: rem(20),
                                        right: 30,
                                        backgroundColor: 'lightgray',
                                    }}
                                >
                                    <Div type='main'>
                                        <Div onPointerDown={() => setClickPosition(true)} onPointerUp={() => setClickPosition(false)} bg='#fff' style={{ display: 'flex', justifyContent: 'space-between', maxHeight: 59 }}>
                                            <Text size={17} bold="600" color='#000' type='title' style={{ display: "flex" }}>
                                                <div style={{ color: '#b53e14' }}>  <div style={{ color: '#b53e14' }}>{select_user?.user_name}</div></div>(완료)
                                            </Text>
                                            <TimeSleectBox />
                                        </Div>
                                        <Text className='no-drag' style={{ overflow: 'auto', minHeight: 700 }}>
                                            <Div type='time' >
                                                <Text size={13} color='#b53e14' >{"상담예약 날짜" + " " + `${select_user?.reservation_date?.substr(0, 11)}`}</Text>
                                                {/* <Text size={12} type='button' color='#e8440a'>
                                            상담 경과 44:15 
                                        </Text> */}
                                            </Div>
                                            <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(700), maxWidth: rem(500), overflowX: 'hidden', overflowY: 'auto' }}>
                                                {
                                                    finish_chat?.map((res: any, index: number) => (
                                                        <>
                                                            <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                                {
                                                                    res?.type === 'receve' ?
                                                                        <>
                                                                            <Text type='name'>{select_user?.user_name}</Text>
                                                                            <Div style={{ display: "flex", marginBottom: `${rem(10)}`, marginTop: `${rem(7)}` }}>
                                                                                <Div bg='#ffffe7' type="right">
                                                                                    {res?.message}
                                                                                </Div>.
                                                                                <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                                    {format(new Date(res?.time), 'a hh:mm')}
                                                                                </Div>
                                                                            </Div>

                                                                        </>
                                                                        :
                                                                        res?.type === 'send' ?
                                                                            <Div type='chat'>
                                                                                <div />
                                                                                <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                                    <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                                        {res?.time && format(new Date(res?.time), 'a hh:mm')}
                                                                                    </Div>
                                                                                    <Div type='left' bg='white' style={{ maxHeight: 'auto', height: 'auto' }} >
                                                                                        {res?.message}
                                                                                    </Div>
                                                                                </Div>
                                                                            </Div>
                                                                            : ""
                                                                }
                                                            </div>
                                                            {/* <div ref={messageEndRef} /> */}
                                                        </>
                                                    ))
                                                }
                                                {
                                                    <Text type='finish'>
                                                        ----상담이 완료 되었습니다.----
                                                    </Text>
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
                                                        disabled={true}
                                                        placeholder={"상담이 완료 되었습니다."}
                                                        id="outlined-adornment-password"
                                                        value={state.message}
                                                        label={"none"}
                                                        size={"small"}
                                                        autoComplete={"off"}
                                                        // onKeyPress={handleEnter}
                                                        // onKeyPress={handleTest}
                                                        onChange={(e) => setState({ message: e.target.value })}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    style={{
                                                                        background: "#c4c4c4", color: "white",
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
                            </div>
                            :
                            useOpen === '시작' ?
                                <div>
                                    <MuiBox
                                        sx={{
                                            zIndex: 1,
                                            boxShadow: `0 30px 30px 0 rgba(0, 0, 0, 0.25)`,
                                            width: 500,
                                            maxWidth: 500,
                                            maxHeight: rem(1000),
                                            Height: rem(1000),
                                            position: 'fixed',
                                            bottom: rem(20),
                                            right: 30,
                                            backgroundColor: 'lightgray',
                                        }}
                                    >
                                        <Div type='main'>
                                            <Div onPointerDown={() => setClickPosition(true)} onPointerUp={() => setClickPosition(false)} bg='#fff' style={{ display: 'flex', justifyContent: 'space-between', maxHeight: 59 }}>
                                                <Text size={17} bold="600" color='#000' type='title' style={{ display: "flex" }}>
                                                    <div style={{ color: '#b53e14' }}>  <div style={{ color: '#b53e14' }}>{select_user?.user_name}</div></div>(시작)
                                                </Text>
                                                <div style={{ display: 'flex' }}>
                                                    {/* <button onClick={() => dispatch(setChatBoxOpenState('닫기'))}>닫기</button> */}
                                                    <TimeSleectBox />
                                                </div>
                                            </Div>
                                            <Text className='no-drag' style={{ overflow: 'auto', minHeight: 700 }}>
                                                <Div type='time' >
                                                    {/* <Text size={13} color='#b53e14' >{"상담예약 날짜" + " " + `${select_user?.reservation_date?.substr(0, 11)}`}</Text> */}
                                                    <Text size={13} color='#b53e14' >{"상담 시간이" + ` ${count_start < 0 ? 0 : count_start}` + "분 남았습니다."}</Text>
                                                </Div>
                                                <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(700), maxWidth: rem(500), overflowX: 'hidden', overflowY: 'auto' }}>
                                                    {
                                                        isMessage && isMessage?.map((res: any, index: number) => (
                                                            <>
                                                                <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                                    {
                                                                        res?.type === 'receve' ?
                                                                            <>
                                                                                <Text type='name'>{select_user?.user_name}</Text>
                                                                                <Div style={{ display: "flex", marginBottom: `${rem(25)}`, marginTop: `${rem(7)}` }}>
                                                                                    <Div bg='#ffffe7' type="right">
                                                                                        {res?.message}
                                                                                    </Div>
                                                                                    <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                                        {/* {format(res.datas?.time, 'a hh:mm')} */}
                                                                                        {res?.timestr ? res?.timestr : format(new Date(res?.time), 'a hh:mm')}
                                                                                    </Div>
                                                                                </Div>
                                                                            </>
                                                                            :
                                                                            res?.type === 'send' ?
                                                                                <Div type='chat'>
                                                                                    <div />
                                                                                    <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                                        <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                                            {res?.time && format(new Date(res?.time), 'a hh:mm')}
                                                                                        </Div>
                                                                                        <Div type='left' bg='white' style={{ maxHeight: 'auto', height: 'auto' }} >
                                                                                            {res?.message}
                                                                                        </Div>
                                                                                    </Div>
                                                                                </Div> : ""
                                                                    }
                                                                </div>
                                                                <div ref={messageEndRef} />
                                                            </>
                                                        ))

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
                                                                            background: "#e8440a",
                                                                            color: "white",
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
                                </div>
                                : useOpen === '협의' ?
                                    <div>
                                        <MuiBox
                                            sx={{
                                                zIndex: 1,
                                                boxShadow: `0 30px 30px 0 rgba(0, 0, 0, 0.25)`,
                                                width: 500,
                                                maxWidth: 500,
                                                maxHeight: rem(1000),
                                                Height: rem(1000),
                                                position: 'fixed',
                                                bottom: rem(20),
                                                right: 30,
                                                backgroundColor: 'lightgray',
                                            }}
                                        >
                                            <Div type='main'>
                                                <Div onPointerDown={() => setClickPosition(true)} onPointerUp={() => setClickPosition(false)} bg='#fff' style={{ display: 'flex', justifyContent: 'space-between', maxHeight: 59 }}>
                                                    <Text className='no-drag' size={17} bold="600" color='#000' type='title' style={{ display: 'flex' }}>
                                                        <div style={{ color: '#b53e14' }}>{before_wating.user_name}</div>(협의)
                                                    </Text>
                                                    <div style={{ display: 'flex' }}>
                                                        <Button style={{ border: 'none', width: `${rem(90)}`, marginRight: `${rem(-10)}` }} onClick={() => { dispatch(setCoustomAlert(true)), dispatch(setAlertType("협의취소")) }} type={"finish"}>{"협의취소"}</Button>
                                                        <TimeSleectBox first />
                                                    </div>
                                                </Div>
                                                <CoustomAlertPopUp />
                                                <Text className='no-drag' style={{ overflow: 'auto', minHeight: 700 }}>
                                                    <Div type='time' >
                                                        <Text size={13} color='#b53e14' >{"일정을 협의해 주세요."}</Text>
                                                    </Div>
                                                    <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(700), maxWidth: rem(500), overflowX: 'hidden', overflowY: 'auto' }}>
                                                        {
                                                            isMessage?.map((res: any, index: number) => (
                                                                <>
                                                                    <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                                        {
                                                                            res?.type === 'receve' ?
                                                                                <>
                                                                                    <Text type='name'>{before_wating.user_name}</Text>
                                                                                    <Div style={{ display: "flex", marginBottom: `${rem(25)}`, marginTop: `${rem(7)}` }}>
                                                                                        <Div bg='#ffffe7' type="right">
                                                                                            {res?.message}
                                                                                        </Div>
                                                                                        <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                                            {/* {format(res.datas?.time, 'a hh:mm')} */}
                                                                                            {res?.timestr}
                                                                                        </Div>
                                                                                    </Div>
                                                                                </>
                                                                                :
                                                                                res?.type === 'send' ?
                                                                                    <Div type='chat'>
                                                                                        <div />
                                                                                        <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                                            <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                                                {/* {res?.time} */}
                                                                                                {res?.time && format(new Date(res?.time), 'a hh:mm')}
                                                                                            </Div>
                                                                                            <Div type='left' bg='white' style={{ maxHeight: 'auto', height: 'auto' }} >
                                                                                                {res?.message}
                                                                                            </Div>
                                                                                        </Div>
                                                                                    </Div>
                                                                                    :
                                                                                    res === undefined ?
                                                                                        <Div style={{ display: "flex", marginBottom: `${rem(10)}`, marginTop: `${rem(7)}` }}>
                                                                                            <Div bg='#ffffe7' type="right">
                                                                                                {`${before_wating.user_name} 님이 입장하셨습니다.`}
                                                                                            </Div>
                                                                                            <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                                                {/* {format(res.datas?.time, 'a hh:mm')} */}
                                                                                                {res?.timestr}
                                                                                            </Div>
                                                                                        </Div>
                                                                                        : ""
                                                                        }
                                                                    </div>
                                                                    <div ref={messageEndRef} />
                                                                </>
                                                            ))

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
                                                                id="outlined-adornment-password"
                                                                value={state.message}
                                                                label={"none"}
                                                                size={"small"}
                                                                autoComplete={"off"}
                                                                onKeyPress={handleFirstEnter}
                                                                onChange={(e) => setState({ message: e.target.value })}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            style={{
                                                                                background: "#e8440a",
                                                                                color: "white",
                                                                                marginRight: "-11.2px", width: "35px", height: "35px"
                                                                            }}
                                                                            onMouseDown={handleMouseFirstDownPassword}
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
                                    </div>
                                    :
                                    useOpen === '진행' ?
                                        <div>
                                            <MuiBox
                                                sx={{
                                                    zIndex: 1,
                                                    boxShadow: `0 30px 30px 0 rgba(0, 0, 0, 0.25)`,
                                                    width: rem(500),
                                                    maxWidth: 500,
                                                    maxHeight: rem(1000),
                                                    Height: rem(1000),
                                                    position: 'fixed',
                                                    bottom: rem(20),
                                                    right: 30,
                                                    backgroundColor: 'lightgray',
                                                }}
                                            >
                                                <Div type='main'>
                                                    <Div onPointerDown={() => setClickPosition(true)} onPointerUp={() => setClickPosition(false)} bg='#fff' style={{ display: 'flex', justifyContent: 'space-between', maxHeight: 59 }}>
                                                        <Text size={17} bold="600" color='#000' type='title' style={{ display: "flex" }}>
                                                            <div style={{ color: '#b53e14' }}>  <div style={{ color: '#b53e14' }}>{userName}</div></div>(진행)
                                                        </Text>
                                                        <div style={{ display: 'flex' }}>
                                                            {/* <button onClick={() => dispatch(setChatBoxOpenState('닫기'))}>닫기</button> */}
                                                            <TimeSleectBox />
                                                        </div>
                                                    </Div>
                                                    <Text className='no-drag' style={{ overflow: 'auto', minHeight: 700 }}>
                                                        <Div type='time' >
                                                            {/* <Text size={13} color='#b53e14' >{"상담예약 날짜" + " " + `${select_user?.reservation_date?.substr(0, 11)}`}</Text> */}
                                                            <Text size={13} color='#b53e14' >{"상담 시간이" + ` ${count_start < 0 ? 0 : count_start}` + "분 남았습니다."}</Text>
                                                        </Div>
                                                        <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(700), maxWidth: rem(500), overflowX: 'hidden', overflowY: 'auto' }}>
                                                            {
                                                                isMessage?.map((res: any, index: number) => (
                                                                    <>
                                                                        {
                                                                            res?.type === 'receve' ?
                                                                                <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                                                    <Text type='name'>{userName}</Text>
                                                                                    <Div style={{ display: "flex", marginBottom: `${rem(25)}`, marginTop: `${rem(7)}` }}>
                                                                                        <Div bg='#ffffe7' type="right">
                                                                                            {res?.message}
                                                                                        </Div>
                                                                                        <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                                            {res?.timestr ? res?.timestr : res?.time && format(new Date(res?.time), 'a hh:mm')}
                                                                                        </Div>
                                                                                    </Div>
                                                                                </div>
                                                                                :
                                                                                res?.type === 'send' ?
                                                                                    <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                                                        <Div type='chat'>
                                                                                            <div />
                                                                                            <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                                                <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                                                    {format(new Date(res?.time), 'a hh:mm')}
                                                                                                </Div>
                                                                                                <Div type='left' bg='white' style={{ maxHeight: 'auto', height: 'auto' }} >
                                                                                                    {res?.message}
                                                                                                </Div>
                                                                                            </Div>
                                                                                        </Div>
                                                                                    </div>
                                                                                    :
                                                                                    res?.type === 'noti' ?
                                                                                        <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                                                            <Div type='chat'>
                                                                                                <div />
                                                                                                <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                                                    <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                                                        {format(new Date(res?.time), 'a hh:mm')}
                                                                                                    </Div>
                                                                                                    <Div type='left' bg='white' style={{ maxHeight: 'auto', height: 'auto' }} >
                                                                                                        {res?.message}
                                                                                                    </Div>
                                                                                                </Div>
                                                                                            </Div>
                                                                                        </div>
                                                                                        :
                                                                                        null
                                                                        }
                                                                        < div ref={messageEndRef} />
                                                                    </>

                                                                ))
                                                            }
                                                        </Div>
                                                    </Text>
                                                    <Text height={40} >
                                                        <Box sx={{
                                                            display: 'flex', flexWrap: 'wrap', background: "white", height: rem(40), marginTop: rem(12)
                                                        }}>
                                                            <FormControl sx={{
                                                                m: 0, width: '100%', '& legend': { display: 'none', borderRadius: 'none' },
                                                                '& fieldset': { top: 0 },
                                                            }} variant="outlined">
                                                                <OutlinedInput
                                                                    style={{ height: 40 }}
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
                                                                                    background: "#e8440a",
                                                                                    color: "white",
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
                </div>
            </Draggable>

        </>
    );
}

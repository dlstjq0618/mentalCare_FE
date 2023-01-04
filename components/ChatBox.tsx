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
    selectSelectBoxControlls,
    removeList,
    clear,
    setUserChatRefresh,
    selectUserChatRefresh,
    setUserCallNumber,
    selectCancelStatus,
    setCancelStatus,
    selectUserCall,
    selectAlertControlls,
    setTestResultValue,
    selectTestResultValueStatus,
} from '~/store/calendarDetailSlice';
import TimeSleectBox from './TimeSelectBox/TimeSleectBox';
import { format } from 'date-fns';
import { async } from '@firebase/util';

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
    const before_wating = useSelector(selectWatingListBefore) // 상담전 예약 데이터 
    const reservationTime = (new Date(storeData).getTime() / 1000);
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
    const [object, setObject] = useState({});


    console.log("before_wating", before_wating);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            // connection id 바꼇으면 감지하여 룸입장 다시해야함
        });
    }, [])

    const test = useSelector(selectLoggedUser);

    // useEffect(() => {
    //     const filterData = test.filter((res: any) => {
    //         return res?.roomId === select_user.room_id
    //     })

    //     const newArray = test?.filter((item: { chat_id: any; }, i: any) => {
    //         return (
    //             test?.findIndex((item2: { chat_id: any; }, j: any) => {
    //                 return item?.chat_id === item2?.chat_id;
    //             }) === i
    //         );
    //     });

    // }, [test])


    // console.log("newArray", newArray);
    console.log("test", test);

    useEffect(() => {
        socket.on("counsel_noti", (res: any) => {
            const { method, datas } = res;
            console.log("counsel_noti", method)
            console.log("counsel_noti_ res", res)
            const waitingIofo = datas?.waitingList;
            switch (method) {
                case "room/test/result":
                    console.log("테스트결과값", res)
                    dispatch(setTestResultValue(res.datas))
                    break;
                case "room/call/join/":
                    console.log("전화상담 데이터", res);
                    dispatch(setUserCallNumber(res.datas))
                    break;
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
                    const chatList = res.datas?.list // 이전대화 리스트
                    const historyList = res.datas?.list[0]
                    setFinishChat(chatList); // 이전대화 목록이 들어간다.
                    dispatch(setHistoryChat(historyList));
                    dispatch(setFinishChatList(chatList));
                    // setIsMessage([...isMessage, ...chatList]); // 기존 배열에 이전 대화 리스트 들어간다.
                    setIsMessage(chatList)

            }
        })
    }, [select_user, before_wating.user_name])

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



    // 정리 : 새로고침후 처음 다시 드로워에 있는 데이터를 클릭했을 때, 드로워 데이터를 가지고 이전 대화리스트 불러온 후 추가로 입력하는 정보를 뿌려줘라.

    useEffect(() => { // 상대방 채팅데이터
        socket.on("chat", (res: any) => { // 만약 selectLoggedUser를 filter 를 사용하여 chat_id 와 res.datas.chat_id 와 같은게 있으면 넣지 마라 
            dispatch(setLoggedUser(res?.datas));
            setObject(res?.datas)
        })
    }, [])

    useEffect(() => {
        setIsMessage([...isMessage, object])
    }, [object])




    const finish_chat = useSelector(selectFinishChatList)


    useEffect(() => { // 새로운 정보 들어왔는지 확인
        console.log('받은 결제 정보가 있음 확인해주자!', userPaymentList);
    }, [userPaymentRequestStatus]);

    const finalSetData = useSelector(selectCounselingFinalStepData);
    async function hadnleEmit() { //예약시간 설정 , emit 보낸후 랜더링 초기화로 한번만 실행, onclick evnet 역할
        setIsMessage([])
        const data1 = {
            method: "room/reservation_date",
            datas: {
                roomId: finalSetData.room_id,
                reservation_date: totalTime
            }
        }
        socket.emit('counsel_submit', data1);
        console.log("emit 실행");

        await dispatch(setCounselingFinalStep(""))
    }

    const handleTest = () => {
        const data1 = {
            method: "room/test/result",
            datas: {
                roomId: select_user.room_id
            }
        }
        socket.emit('counsel_submit', data1)
    }

    const room_join = useSelector(selectDashBoardRoomJoin)

    async function handleRoomJoin() { // 처음 시작할때 
        dispatch(setChatBoxOpenState('시작'))
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
        // if (confirm(`테스트용 채팅을 "${select_user.user_name}" 님과 시작 하시겠습니까?`)) {
        //     // roomJoin
        //     dispatch(setChatBoxOpenState('시작'))
        //     const req = {
        //         roomId: select_user.room_id,
        //         user_type: 6,
        //         message: "안녕하세요 상담을 시작하겠습니다."
        //     };
        //     console.log(req);
        //     socket.emit('chat', {
        //         "method": "join",
        //         "datas": req
        //     });
        // } else {
        //     await dispatch(setChatBoxOpenState('null'))
        // }
    }
    const alert_status = useSelector(selectAlertControlls);
    const alert_status3 = useSelector(selectAlertControlls);

    async function handleFirstRoomJoin() { // 일정 협의 할 채팅방
        await dispatch(clear());
        await handleFinishChatList();
        // roomJoin
        const req = {
            roomId: before_wating.room_id,
            user_type: 6,
            message: "안녕하세요 상담을 시작하겠습니다."
        };
        socket.emit('chat', {
            "method": "join",
            "datas": req
        });
    }

    async function handleWaitingRoomJoin() { // 진행중
        await dispatch(clear());
        await handleFinishChatList();
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
        await setIsMessage([]);
        const data1 = {
            method: "room/chat/list",
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        }
        socket.emit('counsel_submit', data1);
    }

    const handleOnComplete = () => { // 상담완료, 채팅창의 선택박스에서 상담완료 설정
        socket.emit('counsel_submit', {
            method: 'room/complete',
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        })
        handleFinishChatList()
    }

    async function handleCallOnComplete() { //  전화 상담완료
        socket.emit('counsel_submit', {
            method: 'room/complete',
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        })
    }

    const handleCallCounselorting = () => {
        console.log("전화 핸들러 실행");
        socket.emit('counsel_submit', {
            method: 'room/call/join',
            datas: {
                roomId: select_user.room_id,
            }
        })
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
            dispatch(setLoggedUser(chat))
            setIsMessage([...isMessage, chat])
            setState({ message: '' })
        }
    };

    const handleMouseFirstDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { // 채팅방에서 마우스 클릭
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

            dispatch(setLoggedUser(chat)); // 엔터를 칠때마다 내가친 데이터가 안으로 들어간다. 그럼? 새로고침해도 최근친 데이터는 남아있나?
            setIsMessage([...isMessage, chat])
            setState({ message: '' })
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
                time: getTime,
                type: "send"
            };
            socket.emit('chat', {
                method: "chat",
                datas: chat
            });
            dispatch(setLoggedUser(chat));
            setIsMessage([...isMessage, chat]);
            setState({ message: '' })
        }
    }

    async function handleCancel() {
        socket.emit('counsel_submit', {
            method: 'room/cancel',
            datas: {
                roomId: select_user.room_id,
            }
        })
        await dispatch(setCancelStatus(false))
    }


    const use_last_chat = useSelector(selectFinishChatList);

    useEffect(() => {
        if (counselingStatus === 'finish') {
            handleFinishChatList()
        }
    }, [counselingStatus])

    useEffect(() => { // 캘린더 컨트롤 
        if (useOpen === '완료') {
            handleOnComplete()
        }
    }, [useOpen])

    useEffect(() => { // 캘린더 컨트롤 
        if (useOpen === '전화완료') {
            handleCallOnComplete()
        }
    }, [useOpen])

    useEffect(() => {  // 진행중인 화면, 즉 기록이 있는 채팅 
        if (useOpen === '진행') {
            handleWaitingRoomJoin()
        }
    }, [useOpen])

    useEffect(() => {
        if (useOpen === '시작') { // 채팅상담 시작
            handleRoomJoin()
        }
    }, [useOpen])

    useEffect(() => { // 상담승인 할때 이벤트 발생
        if (finalStep === 'yes') {
            hadnleEmit()
        }
    }, [finalStep])

    useEffect(() => { // 상담전 협의 챗 발생 
        if (useOpen === "협의") {
            handleFirstRoomJoin()
        }
    }, [useOpen])

    useEffect(() => {
        if (useOpen === "전화") { //전화 상담 시작할때 
            console.log("전화상담 실행 ")
            handleCallCounselorting()
        }
    }, [useOpen])

    useEffect(() => { // 테스트 결과보기
        if (test_status) {
            handleTest()
        }
    }, [test_status])


    useEffect(() => {
        messageEndRef?.current?.scrollIntoView();
    }, [test, isMessage, filterMessage])

    const arrUnique = test.filter((character: { chat_id: string }, idx: any, arr: any) => {
        return arr.findIndex((item: { chat_id: string }) => item?.chat_id === character?.chat_id) === idx
    });

    useEffect(() => {
        console.log("isMessage", isMessage);
    }, [isMessage])

    useEffect(() => {
        setUserName(select_user?.user_name)
    }, [counselingStatus])

    useEffect(() => {
        if (cancel_status) {
            handleCancel();
            console.log("xxxxx")
        }
    }, [cancel_status])




    const select_room_id = Number(select_user.room_id)

    console.log("finish_chat", finish_chat); // 완료된 상담내역 리스트 체크 

    console.log("useOpen", useOpen);
    // console.log("arrisMessage", filterMessage);
    console.log('finish', finish_chat);
    console.log("counselingStatus", counselingStatus);
    console.log("select_user", select_user);
    // console.log("select_room_id", select_room_id) // map 에서 룸 ID 체크해서 채팅방 노출, 룸ID 와 select_roomId 가 같으면 표출

    return (
        <>
            {
                counselingStatus === 'finish' ?
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
                                        우주약방 마음상담(완료)
                                    </Text>
                                    <TimeSleectBox />
                                </Div>
                                <Text style={{ overflow: 'auto', minHeight: 700 }}>
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
                                                                    <span>{userName}</span>
                                                                    <Div style={{ display: "flex", marginBottom: `${rem(10)}`, marginTop: `${rem(7)}` }}>
                                                                        <Div bg='#ffffe7' type="right">
                                                                            {res?.message}
                                                                        </Div>.
                                                                        <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                            {format(new Date(res?.time * 1000), 'a hh:mm')}
                                                                        </Div>
                                                                    </Div>

                                                                </>
                                                                :
                                                                res?.type === 'send' ?
                                                                    <Div type='chat'>
                                                                        <div />
                                                                        <Div style={{ display: "flex", marginBottom: `${rem(10)}` }}>
                                                                            <Div style={{ margin: `auto ${rem(6)} ${rem(0)}`, textAlign: 'right' }}>
                                                                                {res?.time && format(new Date(res?.time * 1000), 'a hh:mm')}
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
                                        <Text size={17} bold="600" color='#000' type='title' style={{ display: "flex" }}>
                                            우주약방 마음상담<div style={{ color: '#b53e14' }}>({select_user?.user_name})</div>(시작)
                                        </Text>
                                        <div style={{ display: 'flex' }}>
                                            {/* <button onClick={() => dispatch(setChatBoxOpenState('닫기'))}>닫기</button> */}
                                            <TimeSleectBox />
                                        </div>
                                    </Div>
                                    <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                        <Div type='time' >
                                            <Text size={13} color='#b53e14' >{"상담예약 날짜" + " " + `${select_user?.reservation_date?.substr(0, 11)}`}</Text>
                                            {/* <Text size={12} type='button' color='#e8440a'>
                                        상담 경과 44:15 
                                    </Text> */}
                                        </Div>
                                        <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(700), maxWidth: rem(500), overflowX: 'hidden', overflowY: 'auto' }}>
                                            {
                                                isMessage && isMessage?.map((res: any, index: number) => (
                                                    <>
                                                        <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                            {
                                                                res?.type === 'receve' ?
                                                                    <>
                                                                        <span>{select_user?.user_name}</span>
                                                                        <Div style={{ display: "flex", marginBottom: `${rem(10)}`, marginTop: `${rem(7)}` }}>
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
                                            <Text size={17} bold="600" color='#000' type='title' style={{ display: 'flex' }}>
                                                우주약방 마음상담<div style={{ color: '#b53e14' }}>{before_wating.user_name}</div>(협의)
                                            </Text>
                                            <TimeSleectBox first />
                                        </Div>
                                        <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                            <Div type='time' >
                                                <Text size={13} color='#b53e14' >{"일정을 협의해 주세요."}</Text>
                                            </Div>
                                            <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(700), maxWidth: rem(500), overflowX: 'hidden', overflowY: 'auto' }}>
                                                {
                                                    isMessage?.map((res: any, index: number) => (
                                                        <>
                                                            <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                                <span></span>
                                                                {
                                                                    res?.type === 'receve' ?
                                                                        <>
                                                                            <span>{before_wating.user_name}</span>
                                                                            <Div style={{ display: "flex", marginBottom: `${rem(10)}`, marginTop: `${rem(7)}` }}>
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
                                                    우주약방 마음상담(진행)
                                                </Text>
                                                <div style={{ display: 'flex' }}>
                                                    {/* <button onClick={() => dispatch(setChatBoxOpenState('닫기'))}>닫기</button> */}
                                                    <TimeSleectBox />
                                                </div>
                                            </Div>
                                            <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                                <Div type='time' >
                                                    <Text size={13} color='#b53e14' >{"상담예약 날짜" + " " + `${select_user?.reservation_date?.substr(0, 11)}`}</Text>
                                                </Div>
                                                <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(700), maxWidth: rem(500), overflowX: 'hidden', overflowY: 'auto' }}>
                                                    {
                                                        isMessage?.map((res: any, index: number) => (
                                                            res?.type === 'receve' ?
                                                                <>
                                                                    <span>{select_user?.user_name}</span>
                                                                    <div key={index} style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                                        <Div style={{ display: "flex", marginBottom: `${rem(10)}`, marginTop: `${rem(20)}` }}>
                                                                            <Div bg='#ffffe7' type="right">
                                                                                {res?.message}
                                                                            </Div>
                                                                            <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                                {res?.time && format(new Date(res?.time * 1000), 'a hh:mm')}
                                                                            </Div>
                                                                        </Div>
                                                                    </div>
                                                                </>
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
                                                                    console.log("다른것")


                                                        ))
                                                    }
                                                    < div ref={messageEndRef} />
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
                                </div> : ""
            }
        </>
    );
}

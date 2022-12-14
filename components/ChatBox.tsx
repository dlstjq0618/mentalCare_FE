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
    setAlertType,
} from '~/store/calendarDetailSlice';
import TimeSleectBox from './TimeSelectBox/TimeSleectBox';
import { format } from 'date-fns';
import { async } from '@firebase/util';
import { setTimeout } from 'timers';
import useInterval from '~/utils/hook/useInterval';
import { CoustomAlertPopUp } from './Dialog/AlertPopUp';

interface IStyled {
    size?: any;
    bold?: string;
    center?: boolean;
    bg?: string;
    height?: string | number;
    type?: "time" | "footer" | "main" | "button" | "chat" | "left" | "right" | "finish" | "title" | "name";
}

const chatData = [{
    id: "????????????231",
    discription: "???????????????.?????? ????????? ???????????? ?????????.",
    time: "PM 10:24"
},
{
    id: "",
    discription: "???????????????. ??????????????? ????????? ?????????.?????? ????????? ????????????????",
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
const userId = window?.localStorage?.getItem("userId");
const base64EncodedText = Buffer.from(userId + "_doraemon01", "utf8").toString('base64');
const base64DecodedText = Buffer.from(base64EncodedText, 'base64').toString('utf8');
console.log("???? ~ file: _app.tsx:67 ~ useEffect ~ base64DecodedText", base64DecodedText)
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
1. ???????????????
2. ????????? ???????????????
3. ???????????????????????? ????????? ??????.
4. ???????????????????????? couselor_noti ???????????? ?????????.
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
    const finalStep = useSelector(selectCounselingFinalStep); // ?????? ?????? ??????
    const finalStepData = useSelector(selectCounselingFinalStepData);
    const storeData = useSelector(selectCounselingDate);
    const selectTime = useSelector(selectCounselingTimeStemp);
    const before_wating = useSelector(selectWatingListBefore) // ????????? ?????? ????????? 
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
    const [waitCount, setWaitCount] = useState(0); // ??????????????? count
    const [waitList, setWaitList] = useState<any>([]); // ??????????????? list
    const consultingList = useSelector(selectConsultingList); // ?????????
    const reservationList = useSelector(selectReservationList); // ?????? ?????? O
    const waitlist = useSelector(selectWaitlist); // ?????? ?????? > ??????????????? O 
    const completeList = useSelector(selectCompleteList); // ???????????? O
    const useOpen = useSelector(selectChatBoxOpenState) // ????????? ?????? ??????
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




    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            // connection id ???????????? ???????????? ????????? ???????????????
        });
    }, [])

    const test = useSelector(selectLoggedUser);

    useEffect(() => {
        socket.on("counsel_noti", (res: any) => {
            const { method, datas } = res;
            console.log("counsel_noti", method);
            console.log("counsel_noti_ res", res);
            const waitingIofo = datas?.waitingList;
            switch (method) {
                case "payment/user/ok": ;

                case "room/test/result":
                    console.log("??????????????????", res)
                    dispatch(setTestResultValue(res.datas))
                    break;
                case "room/call/join/":
                    console.log("???????????? ?????????", res);
                    dispatch(setUserCallNumber(res.datas))
                    break;
                case "chat": ; break;
                case "payment/user/ok": ; // ????????? ?????? ????????? 
                    console.log('????????? ?????? ?????? ??????', res.datas);
                    // setUserPaymentList([...userPaymentList, res.datas]); // payment
                    dispatch(setSocketData(waitingIofo));
                    setUser_name(res.datas.user_name);
                    setUserPaymentList([res.datas]); // ????????? ????????????
                    setUserPaymentRequestStatus(true);
                    break;
                case "room/chat/list":
                    const chatList = res.datas?.list // ???????????? ?????????
                    const historyList = res.datas?.list[0]
                    console.log("chatList", chatList)
                    setFinishChat(chatList); // ???????????? ????????? ????????????.
                    dispatch(setHistoryChat(historyList));
                    dispatch(setFinishChatList(chatList));
                    // setIsMessage([...isMessage, ...chatList]); // ?????? ????????? ?????? ?????? ????????? ????????????.
                    setIsMessage(chatList)
                    setTime_count(res.datas?.start_time);
                // console.log("chatList", chatList);

            }
        })
    }, [select_user, before_wating.user_name])


    useEffect(() => {
        // dashboard ?????? ?????? count ???????????? ???????????? 
        socket.on('dashboard', (res: any) => {
            const { method, datas } = res;
            console.log("???? ~ file: ChatBox.tsx:234 ~ socket.on dashboard ~ method", method, datas)

            const waitingInfoList = datas.waitingList
            switch (method) {
                case "init": ;
                    const waitingIofo = datas.waitingList;
                    console.log('dashboard ???????????? ???????????????.', waitingIofo);
                    dispatch(setSocketData(waitingInfoList))
                    dispatch(setTotalCount(waitingIofo.count))
                    setWaitCount(waitingIofo.count);
                    setWaitList(waitingIofo.list);
                    if (!waitingIofo.status) alert(`???????????????????????? ????????? error??? ?????? ???????????????. (${waitingIofo.message})`); return;
            }

            if (method === 'reservationList') {
                const result = datas.list;
                console.log("??????", result)
                dispatch(setDashBoardReservationList(result))
            } else if (method === "waitlist") {
                const result0 = datas.list;
                console.log("??????", result0);
                dispatch(setDashBoardWatingList(result0))
            } else if (method === 'consultingList') {
                const result1 = datas.list;
                console.log("?????????", result1);
                dispatch(setDashBoardConsultingList(result1))
            } else if (method === 'completeList') {
                const result2 = datas.list;
                console.log("?????????", result2);
                dispatch(setDashBoardCompleteList(result2))
            } else if (method === 'cancelList') {
                const result3 = datas.list;
                console.log("??????", result3);
                dispatch(setDashBoardCancelList(result3))
            } else if (method === 'paidList') {
                const result4 = datas.list;
                console.log("????????????", result4)
                dispatch(setAccountList(result4));
            } else if (method === 'confirmRequestList') {
                const result5 = datas.list;
                dispatch(setConferenceList(result5))
                console.log("???????????? ?????????", result5)
            }
        })
    }, [user_dashborad, user_name])


    useEffect(() => { // ????????? ???????????????
        socket.on("chat", (res: any) => { // ?????? selectLoggedUser??? filter ??? ???????????? chat_id ??? res.datas.chat_id ??? ????????? ????????? ?????? ?????? 
            dispatch(setLoggedUser(res?.datas));
            setObject(res?.datas);
            setHello(res);
        })
    }, [])

    useEffect(() => {
        if (object?.roomId !== undefined) {
            if (object?.roomId === select_user?.room_id) {
                console.log("??????");
                setIsMessage([...isMessage, object])
            } else {
                console.log("??????")
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
                        message: select_user.user_name + "??? ?????????????????????.",
                        timestr: "",
                        time: getTime
                    }
                    setIsMessage([...isMessage, data1])
                }
            } else {
                console.log("??????")
            }
        }
    }, [hello])



    const finish_chat = useSelector(selectFinishChatList)


    useEffect(() => { // ????????? ?????? ??????????????? ??????
        console.log('?????? ?????? ????????? ?????? ???????????????!', userPaymentList);
    }, [userPaymentRequestStatus]);

    const finalSetData = useSelector(selectCounselingFinalStepData);
    async function hadnleEmit() { //???????????? ?????? , emit ????????? ????????? ???????????? ????????? ??????, onclick evnet ??????
        setIsMessage([])
        const data1 = {
            method: "room/reservation_date",
            datas: {
                roomId: finalSetData.room_id,
                reservation_date: totalTime
            }
        }
        socket.emit('counsel_submit', data1);
        console.log("emit ??????");

        await dispatch(setCounselingFinalStep(""))
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

    async function handleRoomJoin() { // ?????? ???????????? 
        dispatch(setChatBoxOpenState('??????'))
        handleFinishChatList();
        setIsMessage([])
        const req = {
            roomId: select_user.room_id,
            user_type: 6,
            message: "??????????????? ????????? ?????????????????????."
        };
        console.log(req);
        socket.emit('chat', {
            "method": "join",
            "datas": req
        });
    }
    const alert_status = useSelector(selectAlertControlls);
    const alert_status3 = useSelector(selectAlertControlls);

    async function handleChatCreate() { // ?????? ?????? ????????? ????????? ????????? ????????? 
        const data1 = {
            method: "room/reservation/chat/create",
            datas: {
                roomId: select_user.room_id
            }
        }
        socket.emit('counsel_submit', data1)
    }

    async function handleFirstRoomJoin() { // ?????? ?????? ??? ?????????
        handleChatCreate();
        await dispatch(clear());
        // roomJoin
        const req = {
            roomId: select_user.room_id,
            user_type: 6,
            message: "??????????????? ????????? ?????????????????????."
        };
        socket.emit('chat', {
            "method": "join",
            "datas": req
        });
        await handleFinishChatList();

    }

    async function handleWaitingRoomJoin() { // ?????????
        await dispatch(clear());
        // roomJoin
        const req = {
            roomId: select_user.room_id,
            user_type: 6,
            message: "??????????????? ????????? ?????????????????????."
        };
        console.log(req);
        socket.emit('chat', {
            "method": "join",
            "datas": req
        });
        await handleFinishChatList();
    }

    console.log("count_srtart", count_start);

    const intRoom_id = Number(select_user.room_id)

    async function handleFirstChatList2() { // ?????? ?????? ?????? ???????????? ??? ?????? ???????????? ??? ????????? ?????????
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

    async function handleFinishChatList() { // ?????? ?????? ????????? ?????????
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

    const handleOnComplete = () => { // ????????????, ???????????? ?????????????????? ???????????? ??????
        socket.emit('counsel_submit', {
            method: 'room/complete',
            datas: {
                roomId: intRoom_id,
                user_type: 6
            }
        })
        handleFinishChatList();
    }

    async function handleCallOnComplete() { //  ?????? ????????????
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
        console.log("?????? ????????? ??????");
        socket.emit('counsel_submit', {
            method: 'room/call/join',
            datas: {
                roomId: select_user.room_id,
            }
        })
        await dispatch(setChatBoxOpenState("null"))
    }

    const handleFirstOnComplete = () => { // ?????? ?????? ????????? ?????? 
        socket.emit('counsel_submit', {
            method: 'room/call/join',
            datas: {
                roomId: before_wating.room_id,
            }
        })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { // ??????????????? ????????? ??????
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

    const handleMouseFirstDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { // ??????????????? ????????? ??????
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

    const handleEnter = (e: any) => { // ????????? ????????? ???????????? ????????? ?????? ????????? ?????? ???????????? ??????
        setState({ message: e.target.value }); // ????????? ???????????? ????????????
        if (e.key === "Enter" && state.message !== "") { // ????????? ????????? ??? ????????? ?????? ??? ????????? ???????????? ????????? ?????????.
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
            socket.emit('chat', { // ????????? ??????
                method: "chat",
                datas: chat
            });

            dispatch(setLoggedUser(chat)); // ????????? ???????????? ????????? ???????????? ????????? ????????????. ??????? ?????????????????? ????????? ???????????? ?????????????
            setIsMessage([...isMessage, chat])
            setState({ message: '' })
        }
    }

    const handleFirstEnter = (e: any) => { // ?????? ?????? ????????? ????????? ????????? ??????
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

    async function handleComplete() { // ?????? ????????? ??????????????????
        console.log("??????????????????")
        socket.emit('counsel_submit', {
            method: 'room/confirm/complete',
            datas: {
                roomId: select_user.room_id,
            }
        })
        await dispatch(setChatBoxOpenState("null"))
    }

    async function handleConfirmCancel() {
        console.log("????????? ??????")
        socket.emit('counsel_submit', {
            method: 'room/confirm/cancel',
            datas: {
                roomId: select_user.room_id,
            }
        })
        await dispatch(setChatBoxOpenState("null"))
    }

    const use_last_chat = useSelector(selectFinishChatList);

    useEffect(() => {
        if (counselingStatus === 'finish') {
            handleFinishChatList()
        }
    }, [counselingStatus, coco])

    useEffect(() => { // ????????? ????????? 
        if (useOpen === '??????') {
            handleOnComplete()
        } else if (useOpen === '????????????') {
            handleCallOnComplete()
        } else if (useOpen === '??????') {
            handleWaitingRoomJoin()
        } else if (useOpen === '??????') {
            handleRoomJoin()
        } else if (useOpen === "??????") {
            handleFirstRoomJoin()
        } else if (useOpen === "??????") {
            handleCallCounselorting()
        } else if (useOpen === "????????????") {
            handleComplete()
        } else if (useOpen === "????????????") {
            handleConfirmCancel()
        }

        console.log("useOpen", useOpen);
    }, [useOpen])




    useEffect(() => {
        console.log("counselingStatus", counselingStatus)
    }, [counselingStatus])

    useEffect(() => { // ????????? ????????????
        if (test_status) {
            handleTest()
        }
    }, [test_status])

    useEffect(() => { // ???????????? ?????? ????????? ??????
        if (finalStep === 'yes') {
            hadnleEmit()
        }
    }, [finalStep])

    useEffect(() => {
        console.log("isMessage", isMessage);
    }, [isMessage])

    useEffect(() => {
        if (cancel_status) {
            handleCancel();
            console.log("xxxxx")
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

    console.log("time_count", time_count); // ????????????


    // if (affter_time < 20 && affter_time >= 0) {
    //     console.log("????????? ??????")

    // }


    useEffect(() => {
        if (select_user?.method === 5 || select_user?.method === 6) {
            setTime(30);
        } else if (select_user?.method === 7 || select_user?.method === 8) {
            setTime(50);
        }
    }, [select_user.method])

    useInterval(() => {
        if (useOpen === '??????' || useOpen === '??????' && count_start > 0) {
            setCount_start(count_start - 1);
        }
    }, 60000);

    console.log("affter", default_count);
    useEffect(() => {
        // ?????? ??????
        const times = Number(time_count?.substring(11, 13));
        const minut = Number(time_count?.substring(14, 16));
        const start = times * 60 + minut;
        const end = start + time;

        // ???????????? ??????
        const get_Time = new Date().getHours();
        const get_Miu = new Date().getMinutes();
        const get_Times = get_Time * 60 + get_Miu;
        const affter_time = end - get_Times;

        console.log("affter_time", affter_time);

        setCount_start(affter_time); // ???????????? ?????? ???????????? ?????????
    }, [time_count])



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
                                maxWidth: rem(500),
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
                                        <div style={{ color: '#b53e14' }}>  <div style={{ color: '#b53e14' }}>{select_user?.user_name}</div></div>(??????)
                                    </Text>
                                    <TimeSleectBox />
                                </Div>
                                <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                    <Div type='time' >
                                        <Text size={13} color='#b53e14' >{"???????????? ??????" + " " + `${select_user?.reservation_date?.substr(0, 11)}`}</Text>
                                        {/* <Text size={12} type='button' color='#e8440a'>
                                            ?????? ?????? 44:15 
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
                                                ----????????? ?????? ???????????????.----
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
                                                placeholder={"????????? ?????? ???????????????."}
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
                    useOpen === '??????' ?
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
                                            <div style={{ color: '#b53e14' }}>  <div style={{ color: '#b53e14' }}>{select_user?.user_name}</div></div>(??????)
                                        </Text>
                                        <div style={{ display: 'flex' }}>
                                            {/* <button onClick={() => dispatch(setChatBoxOpenState('??????'))}>??????</button> */}
                                            <TimeSleectBox />
                                        </div>
                                    </Div>
                                    <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                        <Div type='time' >
                                            {/* <Text size={13} color='#b53e14' >{"???????????? ??????" + " " + `${select_user?.reservation_date?.substr(0, 11)}`}</Text> */}
                                            <Text size={13} color='#b53e14' >{"?????? ?????????" + ` ${count_start < 0 ? 0 : count_start}` + "??? ???????????????."}</Text>
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
                        : useOpen === '??????' ?
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
                                                <div style={{ color: '#b53e14' }}>{before_wating.user_name}</div>(??????)
                                            </Text>
                                            <div style={{ display: 'flex' }}>
                                                <Button onClick={() => { dispatch(setCoustomAlert(true)), dispatch(setAlertType("????????????")) }} type={"finish"}>{"????????????"}</Button>
                                                <TimeSleectBox first />
                                            </div>
                                        </Div>
                                        <CoustomAlertPopUp />
                                        <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                            <Div type='time' >
                                                <Text size={13} color='#b53e14' >{"????????? ????????? ?????????."}</Text>
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
                                                                                        {`${before_wating.user_name} ?????? ?????????????????????.`}
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
                            useOpen === '??????' ?
                                <div>
                                    <MuiBox
                                        sx={{
                                            zIndex: 10,
                                            boxShadow: `3px 2px 5px black;`,
                                            width: rem(500),
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
                                                    <div style={{ color: '#b53e14' }}>  <div style={{ color: '#b53e14' }}>{userName}</div></div>(??????)
                                                </Text>
                                                <div style={{ display: 'flex' }}>
                                                    {/* <button onClick={() => dispatch(setChatBoxOpenState('??????'))}>??????</button> */}
                                                    <TimeSleectBox />
                                                </div>
                                            </Div>
                                            <Text style={{ overflow: 'auto', minHeight: 700 }}>
                                                <Div type='time' >
                                                    {/* <Text size={13} color='#b53e14' >{"???????????? ??????" + " " + `${select_user?.reservation_date?.substr(0, 11)}`}</Text> */}
                                                    <Text size={13} color='#b53e14' >{"?????? ?????????" + ` ${count_start < 0 ? 0 : count_start}` + "??? ???????????????."}</Text>
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
                                                                                console.log("?????????")
                                                                }
                                                                < div ref={messageEndRef} />
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
                                </div> : ""
            }
        </>
    );
}

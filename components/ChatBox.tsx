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
import { selectCounselingInfoData, selectSocketConnected, setSocketConnected } from '~/store/calendarDetailSlice';

interface IStyled {
    size?: any;
    bold?: string;
    center?: boolean;
    bg?: string;
    height?: string | number;
    type?: "time" | "footer" | "main" | "button" | "chat" | "left" | "right" | "finish";
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
{
    id: "기분좋아231",
    discription: "아무말대잔치로 육행시 해보겠습니다.ㅋㅋ.",
    time: "PM 10:27"
},
{
    id: "",
    discription: "평소 잠은 잘 주무시나요? 무기력하세요?",
    time: "PM 10:38"
},
{
    id: "",
    discription: "안녕하세요. 상담메이트 김우주 입니다.어떤 상담이 필요하세요?",
    time: "PM 10:25"
},
{
    id: "",
    discription: "안녕하세요. 상담메이트 김우주 입니다.어떤 상담이 필요하세요?",
    time: "PM 10:25"
},
{
    id: "",
    discription: "안녕하세요. 상담메이트 김우주 입니다.어떤 상담이 필요하세요?",
    time: "PM 10:25"
},
{
    id: "",
    discription: "안녕하세요. 상담메이트 김우주 입니다.어떤 상담이 필요하세요?",
    time: "PM 10:25"
},
{
    id: "기분좋아231",
    discription: "아무말대잔치로 육행시 해보겠습니다.ㅋㅋ.",
    time: "PM 10:27"
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
        height: ${rem(props.height)};
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
    const [type, setType] = useState("finish");
    const [state, setState] = useState({ message: '', method: '', request: '', roomId: '', time: 0, userId: '' });
    const [chatList, setChatList] = useState<any>([]);
    const infoData = useSelector(selectCounselingInfoData);
    const userId = String(infoData?.id);
    const connected = useSelector(selectSocketConnected);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
        });
        socket.on("counsel_noti", (res: any) => {
            setChatList([...chatList, res])
        })
    }, [state.message])

    useEffect(() => {
        console.log("chatList", chatList)
    })

    // const handleOnChange = (e:any) => {
    //     setState({message: e.target.value})
    // }


    // useEffect(() => {
    //     // const userId = window?.localStorage?.getItem("userId");
    //     // 로그인 비로그인 체크 해야함
    //     const base64EncodedText = Buffer.from(userId + "_doraemon01", "utf8").toString('base64');
    //     const base64DecodedText = Buffer.from(base64EncodedText, 'base64').toString('utf8');
    //     console.log("🚀 ~ file: _app.tsx:67 ~ useEffect ~ base64DecodedText", base64DecodedText)
    //     // const socket = io("http://bo.local.api.woozoo.clinic", {
    //     const socket = io("https://bo.dev.api.woozoo.clinic", {
    //         // transports: ["websocket"],
    //         transports: ["polling"],
    //         extraHeaders: {
    //             "identity": "counselor",
    //             "x-auth-token": base64EncodedText,
    //         }
    //     });
    //     // log socket connection
    //     socket.on("connect", () => {
    //         console.log("SOCKET CONNECTED!", socket.id);
    //     });

    //     socket.emit("counsel_noti", '여기는 우주상담사 웹에서 보내고 있다!');
    //     socket.on("counsel_noti", (res: any) => {
    //         console.log("받은 내용!", res);
    //     });
    //     // 이곳은 상담요청이 들어 왓을때 데이터가 들어오는 곳입니다.
    //     socket.on('advice/request', (res: any) => {
    //         console.log("advice", res)
    //     })
    //     socket.on('ping', (res: any) => {
    //         console.log("ping", res)
    //     })

    //     // socket disconnect on component unmount if exists
    //     socket.on("disconnect", () => {
    //         console.log("SOCKET DIE!", socket.id);
    //     });
    //     // socket.disconnect(); // 로그아웃시 작동해야함
    // }, [userId]);


    return (
        <>
            <div>
                <MuiBox
                    sx={{
                        boxShadow: `3px 2px 5px black;`,
                        width: 350,
                        maxHeight: rem(700),
                        position: 'absolute',
                        bottom: rem(20),
                        right: 30,
                        backgroundColor: 'lightgray',
                    }}
                >
                    <Div type='main'>
                        <Div bg='#fff'>
                            <Text center size={17} bold="600" color='#000' height={44}>
                                우주 상담소
                            </Text>
                        </Div>
                        <Text style={{ overflow: 'auto' }}>
                            <Div type='time' >
                                <Text size={13} color='#b53e14' >상담시간이 49분 남았습니다.</Text>
                                <Text size={12} type='button' color='#e8440a'>
                                    상담 경과 44:15 { /** 상담시간 체크*/}
                                </Text>
                            </Div>
                            <Div className='chat_main' style={{ height: 'auto', maxHeight: rem(500) }}>
                                {
                                    chatData.map((res: any, index: number) => (
                                        <>
                                            <div style={{ marginBottom: "25px", margin: "0 14px" }}>
                                                <Text bold='bold' style={{ marginBottom: 7, marginTop: `${index > 0 ? rem(30) : 0}` }}>
                                                    {res.id ?? res.id}
                                                </Text>
                                                {
                                                    res.id ?
                                                        <Div style={{ display: "flex" }}>
                                                            <Div bg='#ffffe7' height={62} type="right">
                                                                {res.discription}
                                                            </Div>
                                                            <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                {res.time}
                                                            </Div>
                                                        </Div>
                                                        :
                                                        <Div type='chat'>
                                                            <div />
                                                            <Div style={{ display: "flex" }}>
                                                                <Div style={{ margin: `auto ${rem(6)} ${rem(0)}` }}>
                                                                    {res.time}
                                                                </Div>
                                                                <Div type='left' bg='white' height={62}>
                                                                    {res.discription}
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
                                    type === "finish" ?
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
                        {/* <Text height={40}>
                            <Box sx={{
                                display: 'flex', flexWrap: 'wrap', background: "white", height: rem(40), marginTop: rem(12)
                            }}>
                                <FormControl sx={{
                                    m: 0, width: '100%', '& legend': { display: 'none', borderRadius: 'none' },
                                    '& fieldset': { top: 0 },
                                }} variant="outlined">
                                    <OutlinedInput
                                        style={{ height: 40 }}
                                        disabled={type === "finish" ? true : false}
                                        placeholder={`${type === "finish" ? "상담이 완료 되었습니다." : ""}`}
                                        id="outlined-adornment-password"
                                        value={state.message}
                                        label={"none"}
                                        size={"small"}
                                        onChange={(e) => handleOnChange(e)}
                                        autoComplete={"off"}
                                        onKeyPress={handleEnter}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    style={{
                                                        background: `${state === "finish" ? "#c4c4c4" : "#e8440a"}`, color: "white",
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
                        </Text> */}
                    </Div>
                </MuiBox>
            </div>
        </>
    );
}
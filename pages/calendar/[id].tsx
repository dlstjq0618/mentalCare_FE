import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import InputAdornments from '~/components/Textfield/ChatTextField';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectCounselingInfoData } from '~/store/calendarDetailSlice';
import { api } from "~/woozooapi";

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
]

interface IStyled {
    size?: any;
    bold?: string;
    center?: boolean;
    bg?: string;
    height?: string | number;
    type?: "time" | "footer" | "main" | "button" | "chat" | "left" | "right" | "finish";
}

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

function ChatDetail() {
    const [state, setState] = useState("");

    /**
     1. 상담이 완료됐을 때 끊어주는 이벤트 emit
     2. 채팅창 component 에서 연결해주는 socket 이벤트
     
     */

    // useEffect(() => {
    //     let chatId;
    //     api.counselor.info(NumUserId).then((res: any) => {
    //         chatId = res.id
    //     }).then(() => { })

    //     const userId = window?.localStorage?.getItem("userId");
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
    //         console.log("chatBrowser", res)
    //         // console.log('받은 내용!', res + `${userNumber}`);

    //         switch (res.method) {
    //             case 'new-1': res.data.a; // 들어온값을 어딘가 보여주면됨
    //         }
    //         // 먼가 왓는데 그게 상담을 받는거야
    //         // 상담사에게 상담예약을 하라고 서버가 알려준거야.
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
    // }, []);

    return (
        <>
            <Div type='main'>
                <Div bg='#fff'>
                    <Text center size={17} bold="600" color='#000' height={44}>
                        우주 상담소
                    </Text>
                </Div>
                <Text>
                    <Div type='time' >
                        <Text size={13} color='#b53e14' >상담시간이 49분 남았습니다.</Text>
                        <Text size={12} type='button' color='#e8440a'>
                            상담 경과 44:15 { /** 상담시간 체크*/}
                        </Text>
                    </Div>
                    <Div className='chat_main'>
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
                            state === "finish" ?
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
                <Div type='footer'>
                    <InputAdornments state={state} />
                </Div>
            </Div>
        </>
    );
}

export default ChatDetail;
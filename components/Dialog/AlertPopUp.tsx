import React, { useState, useEffect } from 'react';
import { BaseDialog2, RoundedButton } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { rem } from "polished";
import styled, { css } from 'styled-components';
import {
    selectAlertControlls,
    selectDashBoardSelectUser,
    selectWatingListBefore,
    setAlertControlls,
    setAlertControlls2,
    setAlertControlls3,
    setChatBoxOpenState,
    selectAlertControlls2,
    setCounselingState,
    selectAlertControlls3,
} from '~/store/calendarDetailSlice';

interface IProps {
}


interface IStyled {
    color?: string;
    size?: any;
}


const Text = styled.span<IStyled>` 
    padding: ${rem(20)} 0 ${rem(20)} 0;
    margin-bottom: ${rem(10)};
    letter-spacing: -0.72px;
    line-height: 1.4;
    text-align: center;
    ${(props) =>
        props.size &&
        css`
        font-size: ${rem(props.size)};
        color: ${props.color};
    `}
`;
const P = styled.p<IStyled>` 
    margin-bottom: 5px;
`;

export function AlertPopUp(props: IProps) { // 협의 팝업
    const select_user = useSelector(selectDashBoardSelectUser);
    const wating_user = useSelector(selectWatingListBefore) // 상담전 예약 데이터
    const open = useSelector(selectAlertControlls);
    const dispatch = useDispatch()
    const handleClose = () => dispatch(setAlertControlls(false));

    return (
        <BaseDialog2 showDialog={open} close={handleClose} aria-label="채팅방 입장 팝업"
            style={{
                marginTop: '23vh',
                width: `${rem(440)}`,
                height: `auto`,
                padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
            }}>
            <Text size={17} color={"#333"}>
                <span style={{ fontWeight: "bold" }}>{wating_user.user_name}</span>님과
                <P>예약 상담 일정 협의를 시작하시겠습니까?</P>
                <P>확인을 누르면 내담자에게 즉시</P>
                <P>일정 협의 요청 카카오 알림톡이 발송 됩니다.</P>
            </Text>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <RoundedButton
                    onClick={() => { dispatch(setAlertControlls(false)), dispatch(setChatBoxOpenState("협의")) }}
                    color="orange"
                    css={{
                        width: '100%',
                        fontSize: rem(15),
                        height: rem(50),
                    }}
                >
                    확인
                </RoundedButton>
                <RoundedButton
                    onClick={() => { dispatch(setAlertControlls(false)) }}
                    color="gray"
                    css={{
                        width: '100%',
                        fontSize: rem(15),
                        height: rem(50),
                    }}
                >
                    취소
                </RoundedButton>
            </div>

        </BaseDialog2>
    );
}

export function AlertPopUp3(props: IProps) { // 진행중인 팝업
    const select_user = useSelector(selectDashBoardSelectUser);
    const open = useSelector(selectAlertControlls3);
    const dispatch = useDispatch()
    const handleClose = () => dispatch(setAlertControlls3(false));

    async function handleChatingRoomOpen() {
        await dispatch(setChatBoxOpenState('null'));
        dispatch(setAlertControlls3(false))
        await dispatch(setChatBoxOpenState('진행'));
        dispatch(setCounselingState("null"))
    }



    return (
        <BaseDialog2 showDialog={open} close={handleClose} aria-label="상담중 입장 팝업"
            style={{
                marginTop: '23vh',
                width: `${rem(376)}`,
                height: `${rem(248)}`,
                padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
            }}>
            <Text size={17} color={"#333"}>
                <span style={{ fontWeight: "bold" }}>{select_user.user_name}</span>님과
                <p>상담을 이어가시겠습니까?</p>
            </Text>
            <RoundedButton
                onClick={() => { handleChatingRoomOpen() }}
                color="orange"
                css={{
                    fontSize: rem(15),
                    height: rem(50),
                    width: "100%",
                }}
            >
                확인
            </RoundedButton>
        </BaseDialog2>
    );
}

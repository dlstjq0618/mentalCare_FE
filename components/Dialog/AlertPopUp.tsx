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
    selectAlertControlls3,
} from '~/store/calendarDetailSlice';

interface IProps {
}


interface IStyled {
    color?: string;
    size?: any;
}


const Text = styled.span<IStyled>` 
    font-weight: bold;
    padding: ${rem(20)} 0 ${rem(20)} 0;
    margin: ${rem(70)} 0 ${rem(0)} 0;
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

export function AlertPopUp(props: IProps) { // 협의 팝업
    const select_user = useSelector(selectDashBoardSelectUser);
    const wating_user = useSelector(selectWatingListBefore) // 상담전 예약 데이터
    const open = useSelector(selectAlertControlls);
    const dispatch = useDispatch()
    const handleClose = () => dispatch(setAlertControlls(false));

    console.log("open", open);



    return (
        <BaseDialog2 showDialog={open} close={handleClose} aria-label="채팅방 입장 팝업"
            style={{
                marginTop: '18vh',
                width: `${rem(376)}`,
                height: `${rem(422)}`,
                padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
            }}>
            <Text size={17} color={"#333"}>
                (일정협의) {wating_user.user_name}님과 하시겠습니까?
            </Text>
            <RoundedButton
                onClick={() => { console.log("확인"), dispatch(setAlertControlls(false)), dispatch(setChatBoxOpenState("협의")) }}
                color="orange"
                css={{
                    marginTop: rem(130),
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

export function AlertPopUp3(props: IProps) { // 진행중인 팝업
    const select_user = useSelector(selectDashBoardSelectUser);
    const open = useSelector(selectAlertControlls3);
    const dispatch = useDispatch()
    const handleClose = () => dispatch(setAlertControlls3(false));

    return (
        <BaseDialog2 showDialog={open} close={handleClose} aria-label="상담중 입장 팝업"
            style={{
                marginTop: '18vh',
                width: `${rem(376)}`,
                height: `${rem(422)}`,
                padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
            }}>
            <Text size={17} color={"#333"}>
                {select_user.user_name}님과 상담을 이어가시겠습니까?
            </Text>
            <RoundedButton
                onClick={() => { console.log("확인"), dispatch(setAlertControlls3(false)), dispatch(setChatBoxOpenState('진행')) }}
                color="orange"
                css={{
                    marginTop: rem(130),
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

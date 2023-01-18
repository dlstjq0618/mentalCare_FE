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
    selectCoustomAlert,
    setCoustomAlert,
    setCounselingStart,
    selectAlertType,
    setAlertType,
    setChatToggle,
    setStopModal,
    setCallFinish,
    setImmediate,
    setScheduleSelectModla,
    setUserCallNumber
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
    const handleClose2 = () => { dispatch(setAlertType("")) }

    return (
        <BaseDialog2 showDialog={open} close={handleClose} aria-label="채팅방 입장 팝업"
            style={{
                marginTop: `${rem(400)}`,
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

export function CoustomAlertPopUp(props: IProps) { // 협의 팝업
    const select_user = useSelector(selectDashBoardSelectUser);
    const wating_user = useSelector(selectWatingListBefore) // 상담전 예약 데이터
    const open = useSelector(selectCoustomAlert); // 컨트롤하는 스토어 
    const dispatch = useDispatch()
    const handleClose = () => { dispatch(setCoustomAlert(false)), dispatch(setAlertType("")) };
    const type = useSelector(selectAlertType);

    const handleFinishDispatch = () => {
        dispatch(setCallFinish("완료"));
        dispatch(setAlertType(""));
        dispatch(setChatToggle(false));
    }


    console.log("open", open);
    console.log("typetype", type);

    const handleDispatch = () => { // 결제요청
        dispatch(setChatBoxOpenState("결제요청"))
        dispatch(setStopModal("null"))
        dispatch(setAlertType(''))
    }

    async function handleConferenceDispatch() {
        dispatch(setCoustomAlert(false));
        await dispatch(setChatBoxOpenState("협의완료"));
        dispatch(setAlertType(""));
        dispatch(setChatBoxOpenState("결제요청"));
    }
    return (
        type === '협의취소' ?
            <BaseDialog2 showDialog={open} close={() => handleClose()} aria-label="협의취소 팝업"
                style={{
                    marginTop: '23vh',
                    width: `${rem(440)}`,
                    height: `auto`,
                    padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                }}>
                <Text size={17} color={"#333"}>
                    <P>일정 협의를 취소하시겠습니까?</P>
                    <P>협의 취소 버튼 클릭시 일정 협의 채팅방은</P>
                    <P>삭제 되며 고객에게 협의 취소 알림이 발송 됩니다.</P>
                    <P>정말 취소하시겠습니까?</P>
                </Text>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <RoundedButton
                        onClick={() => { dispatch(setCoustomAlert(false)), dispatch(setChatBoxOpenState("협의취소")) }}
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
                        onClick={() => { dispatch(setCoustomAlert(false)) }}
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
            : type === '협의완료' ?
                <BaseDialog2 showDialog={open} close={() => handleClose()} aria-label="협의완료 팝업"
                    style={{
                        marginTop: '23vh',
                        width: `${rem(440)}`,
                        height: `auto`,
                        padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                    }}>
                    <Text size={17} color={"#333"}>
                        <P>일정 협의를 완료하셨습니까?</P>
                        <P>확인 버튼 클릭시</P>
                        <P>협의한 일정을 승인할 수 있는 창이 뜨며</P>
                        <P>다시 일정 협의 채팅방을</P>
                        <P>확인하실 수 없습니다.</P>
                        <P>정말 완료 하시겠습니까?</P>
                    </Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <RoundedButton
                            onClick={() => { handleConferenceDispatch() }}
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
                            onClick={() => { dispatch(setCoustomAlert(false)), dispatch(setAlertType("")) }}
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
                :
                type === '상담시작' ?
                    <BaseDialog2 showDialog={open} close={() => handleClose()} aria-label="상담시작 팝업"
                        style={{
                            marginTop: '23vh',
                            width: `${rem(440)}`,
                            height: `auto`,
                            padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                        }}>
                        <Text size={17} color={"#333"}>
                            <P>상담을 시작하시겠습니까?</P>
                            <P>시작 버튼 클릭시</P>
                            <P>바로 상담 시간이 카운트 됩니다.</P>
                        </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <RoundedButton
                                onClick={() => { dispatch(setCoustomAlert(false)), dispatch(setChatBoxOpenState("전화")) }}
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
                                onClick={() => { dispatch(setCoustomAlert(false)), dispatch(setAlertType("")) }}
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
                    :
                    type === '상담완료' ?
                        <BaseDialog2 showDialog={open} close={() => handleClose()} aria-label="상담완료 팝업"
                            style={{
                                marginTop: '23vh',
                                width: `${rem(440)}`,
                                height: `auto`,
                                padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                            }}>
                            <Text size={17} color={"#333"}>
                                <P>상담을 완료 하시겠습니까?</P>
                                <P>확인 버튼 클릭시 즉시 상담이 완료 되며</P>
                                <P>더이상 상담을 진행하실 수 없습니다</P>
                                <P>이대로 상담을 완료하시겠습니까?</P>
                            </Text>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <RoundedButton
                                    onClick={() => {
                                        dispatch(setUserCallNumber("")),
                                            dispatch(setImmediate(false)),
                                            dispatch(setCoustomAlert(false)),
                                            dispatch(setChatBoxOpenState("전화완료")),
                                            dispatch(setAlertType("전화상담완료"))
                                    }}
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
                                    onClick={() => { dispatch(setCoustomAlert(false)) }}
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
                        :
                        type === '상담취소' ?
                            <BaseDialog2 showDialog={open} close={() => handleClose()} aria-label="협의완료 팝업"
                                style={{
                                    marginTop: '23vh',
                                    width: `${rem(440)}`,
                                    height: `auto`,
                                    padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                                }}>
                                <Text size={17} color={"#333"}>
                                    <P>상담을 취소하시겠습니까?</P>
                                    <P>취소 완료 버튼 클릭시 내담자가 결제한 금액은</P>
                                    <P>측시 취소되며 재결제 불가합니다</P>
                                    <P>정말 취소하시겠습니까?</P>
                                </Text>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <RoundedButton
                                        onClick={() => { dispatch(setCoustomAlert(false)), dispatch(setChatBoxOpenState("협의완료")) }}
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
                                        onClick={() => { dispatch(setCoustomAlert(false)) }}
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
                            : type === '전화상담완료' ?
                                <BaseDialog2 showDialog={true} close={() => dispatch(setAlertType(""))} aria-label="팝업"
                                    style={{
                                        zIndex: 99,
                                        marginTop: '18vh',
                                        width: `${rem(500)}`,
                                        // height: `${rem(422)}`,
                                        height: 'auto',
                                        padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                                    }}>
                                    <Text size={17} color={"#333"}>
                                        <P style={{ fontWeight: 'bold' }}>상담이 완료되었습니다.</P>
                                        <P>바로상담을 on 상태로 켜서 상담을 받으실 경우 확인 버튼을</P>
                                        <P>바로상담을 off 상태로 유지 하실경우 취소 버튼을 눌러주세요.</P>
                                    </Text>
                                    <div style={{ display: 'flex' }}>
                                        <RoundedButton
                                            onClick={() => {
                                                dispatch(setCallFinish("완료")), dispatch(setChatToggle(true)), dispatch(setStopModal("null")), dispatch(setAlertType(''))
                                            }}
                                            color="orange"
                                            css={{
                                                fontSize: rem(15),
                                                height: rem(50),
                                                width: "100%",
                                            }}
                                        >
                                            확인
                                        </RoundedButton>
                                        <RoundedButton
                                            onClick={() => {
                                                dispatch(setCallFinish("완료")), dispatch(setChatToggle(false)), dispatch(setStopModal("null")), dispatch(setAlertType(''))
                                            }}
                                            color="gray"
                                            css={{
                                                fontSize: rem(15),
                                                height: rem(50),
                                                width: "100%",
                                            }}
                                        >
                                            취소
                                        </RoundedButton>
                                    </div>
                                </BaseDialog2>
                                :
                                type === '승인요청' ?
                                    <BaseDialog2 showDialog={true} close={() => dispatch(setAlertType(""))} aria-label="팝업"
                                        style={{
                                            zIndex: 99,
                                            marginTop: '18vh',
                                            width: `${rem(500)}`,
                                            // height: `${rem(422)}`,
                                            height: 'auto',
                                            padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                                        }}>
                                        <Text size={17} color={"#333"}>
                                            <P>확인시 내담자에게 결제요청 알림이 발송되며</P>
                                            <P>내담자 결제 완료 후 상태값이 결제 완료로</P>
                                            <P>변경되면 바로 상담을 진행할 수 있습니다.</P>
                                            <P>바로 상담 요청을 승인하시겠습니까?</P>
                                        </Text>
                                        <div style={{ display: 'flex' }}>
                                            <RoundedButton
                                                onClick={() => {
                                                    handleDispatch()
                                                }}
                                                color="orange"
                                                css={{
                                                    fontSize: rem(15),
                                                    height: rem(50),
                                                    width: "100%",
                                                }}
                                            >
                                                확인
                                            </RoundedButton>
                                            <RoundedButton
                                                onClick={() => {
                                                    dispatch(setCallFinish("완료")), dispatch(setStopModal("null")), dispatch(setAlertType(''))
                                                }}
                                                color="gray"
                                                css={{
                                                    fontSize: rem(15),
                                                    height: rem(50),
                                                    width: "100%",
                                                }}
                                            >
                                                취소
                                            </RoundedButton>
                                        </div>
                                    </BaseDialog2>
                                    :
                                    <></>
    );
}

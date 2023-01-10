import React, { useEffect, useState } from 'react';
import { rem } from 'polished';
import styled, { css } from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { setSocketControlls2, selectChatBoxOpenState, clear2, setCoustomAlert, setScheduleSelectModla, selectCounselingState, setCounselingState, selectDashBoardSelectUser, setDashBoardRoomJoin, setChatBoxOpenState, setSelectBoxControlls, selectSelectBoxControlls, setAlertType, setChatToggle, setStopModal, selectStopModal } from '~/store/calendarDetailSlice';
import { BaseDialog2, RoundedButton } from '~/components';
import { api } from '~/woozooapi';

interface Iprops {
    first?: boolean;
}

interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
    check?: boolean;
    type?: string;
    center?: boolean;
}

const Arricle = styled.article<IStyled>`
    position: relative;
`;

const Button = styled.div<IStyled>`
align-items: center;
display: flex;
color: #fff;
width: ${rem(105)};
justify-content: space-around;
height: 36px;
padding: 10px 9px 9px 16px;
background-color: #eb541e;
${(props) =>
        props.type === 'finish' &&
        css`
        background-color: #999;
        justify-content: start;
        width: 60px;
    `}
margin: 12px 17px;
  flex-grow: 0;
  border-radius: 6px;
  border: solid 1px #d3d3d3;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;
const Text = styled.span<IStyled>` 
    margin-bottom: ${rem(10)};
    letter-spacing: -0.72px;
    line-height: 1.4;
    ${(props) =>
        props.size &&
        css`
        font-size: ${rem(props.size)};
        color: ${props.color};
    `}
    ${(props) =>
        props.center &&
        css`
        text-align: center;
    `}

    ${(props) =>
        props.bold &&
        css`
        font-weight: ${props.bold};
    `}
`;
const P = styled.p<IStyled>` 
    margin-bottom: 5px;
`;

const Ul = styled.ul`
background-color: #fff;
    max-height: ${rem(250)};
    font-weight: bold;
    overflow: auto;
    border-radius: 6px;
    margin: -10px 0 0 17px;
    padding: 0;
    border: 1px solid #d3d3d3;
    cursor: pointer;
    
`
const Li = styled.li<IStyled>`
    ${(props) =>
        props.check &&
        css`
        justify-content: space-evenly;
        margin-top: 11px;
    `}
    width: 100;
    list-style: none;
    height: ${rem(40)};
    display: flex;
    background-color: #fff;
    :hover {
        opacity: 0.8
    }
`

const selectType = [
    {
        label: '상담중',
        value: 'start'
    },
    // {
    //     label: '일시정지',
    //     value: 'pause'
    // },
    {
        label: '상담완료',
        value: 'finish'
    },
]


function TimeSleectBox(props: Iprops) {
    const [check, setCheck] = useState(false);
    const [type, setType] = useState("상담중");
    const dispatch = useDispatch();
    const status = useSelector(selectCounselingState);
    const select_user = useSelector(selectDashBoardSelectUser);
    const counselingStatus = useSelector(selectCounselingState);
    const box = useSelector(selectSelectBoxControlls);
    const useOpen = useSelector(selectChatBoxOpenState) // 캘린더 클릭 닫기
    const [closeStatus, setCloseStatus] = useState<boolean>(false)
    const stop = useSelector(selectStopModal);

    console.log("closeStatus", closeStatus);

    const open = () => setCloseStatus(true);
    const close = () => { setCloseStatus(false), dispatch(setCounselingState("null")) };

    const handleOpenStatus = (data: any) => {
        console.log("data", data)
        if (data === 'finish') {
            dispatch(setSelectBoxControlls('완료'));
            dispatch(setChatBoxOpenState("완료"));
            dispatch(setCounselingState("null"));
            dispatch(setStopModal("완료"));
        }
    }

    async function handleOpenStatus2() {
        dispatch(setSelectBoxControlls('완료'))
        await dispatch(setSelectBoxControlls("null"))
        dispatch(setCounselingState("null"))
    }

    async function handleClose() {
        dispatch(setCounselingState("null"))
        dispatch(setChatBoxOpenState('null'))
        dispatch(setSelectBoxControlls('완료'))
        dispatch(clear2())
    }

    useEffect(() => {
        console.log("stop", stop)
        if (stop === '완료') {
            setCloseStatus(true)
        }
    }, [counselingStatus])

    return (
        <>
            <Arricle>
                {
                    props.first ?
                        <Button style={{ width: `${rem(90)}`, paddingLeft: `${rem(10)}` }} onClick={() => {
                            // dispatch(setChatBoxOpenState("협의완료")),
                            dispatch(setCoustomAlert(true)),
                                dispatch(setAlertType('협의완료')),
                                handleOpenStatus2(),
                                dispatch(setScheduleSelectModla(false)) // 날짜, 시간 선택하는 모달 팝업 컨트롤
                        }}>
                            {"협의완료"}
                        </Button>
                        :
                        counselingStatus === 'finish' ?
                            <>
                                <Button onClick={handleClose} type={"finish"}>{"닫기"}</Button>
                            </>
                            :
                            <Button type={status} onClick={() => setCheck(!check)}>{type} <KeyboardArrowDownIcon /></Button>
                }
                {
                    check &&
                    <Ul>
                        {
                            selectType.map((res: { label: string, value: string }, index: number) => {
                                return <Li check onClick={() => {
                                    setType(res.label),
                                        setCheck(false),
                                        handleOpenStatus(res.value),
                                        dispatch(setCounselingState(res.value))
                                }} key={index} value={res.value}>{res.label}{type === res.label ? <CheckIcon style={{ color: '#eb541e' }} />
                                    :
                                    <CheckIcon style={{ color: "#fff" }} />}</Li>
                            })
                        }
                    </Ul>
                }
            </Arricle>
            <BaseDialog2 showDialog={closeStatus} close={close} aria-label="팝업"
                style={{
                    zIndex: 99,
                    marginTop: '18vh',
                    width: `${rem(500)}`,
                    // height: `${rem(422)}`,
                    height: 'auto',
                    padding: `${rem(22)} ${rem(20)} ${rem(20)}`,
                }}>
                <Text center size={17} color={"#333"}>
                    <p style={{ fontWeight: 'bold' }}>상담이 완료되었습니다.</p>
                    <p>바로상담을 on 상태로 켜서 상담을 받으실 경우 확인 버튼을</p>
                    <p>바로상담을 off 상태로 유지 하실경우 취소 버튼을 눌러주세요.</p>
                </Text>
                <div style={{ display: 'flex' }}>
                    <RoundedButton
                        onClick={() => {
                            dispatch(setChatToggle(true)), close(), dispatch(setStopModal("null")), dispatch(setAlertType(''))
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
                            dispatch(setChatToggle(false)), close(), dispatch(setStopModal("null")), dispatch(setAlertType(''))
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
        </>
    );
}

export default TimeSleectBox;
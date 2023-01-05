import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { rem } from 'polished';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { RoundedButton, ModalCloseIcon, Div } from '~/components';
import styled, { css } from 'styled-components';
import ApprovalModal from './ApprovalModal';
import { AlertPopUp, AlertPopUp3 } from '../Dialog/AlertPopUp';
import { useDispatch, useSelector } from 'react-redux';
import { setTestResultValueStatus, selectSocketData, setCounselingDate, setCounselingTimes, selectWaitlist, setChatBoxOpenState, setWatingListBefore, setAlertControlls, setDashBoardSelectUser, setScheduleSelectModla, selectAccoutList } from '~/store/calendarDetailSlice';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface IProps {
    open: boolean;
    name: string;
}

interface IStyled {
    size?: any;
    bold?: boolean;
    subtitle?: boolean;

}

const Title = styled.span<IStyled>`
  flex-grow: 0;
  margin: ${rem(37)} ${rem(50)} ${rem(27)} ${rem(8)};
  font-size: ${rem(19)};
  font-weight: bold;
  display: flex;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`;

const Text = styled.span<IStyled>`
        ${(props) =>
        props.size &&
        css`
        font-size: ${rem(props.size)};
    `}
    ${(props) =>
        props.bold === true &&
        css`
        font-weight: bold;
    `}
    ${(props) =>
        props.bold === false &&
        css`
        font-weight: 600;
    `}
    ${(props) =>
        props.color &&
        css`
        color: ${props.color};
    `}
    ${(props) =>
        props.subtitle &&
        css`
        font-weight: normal;
    `}
`;

const BoxItem = styled.div`
cursor: pointer;
  height: ${rem(132)};
  flex-grow: 0;
  margin: ${rem(24)} ${rem(3)} ${rem(20)} ${rem(0)};
  padding: ${rem(19)} ${rem(25)} ${rem(48)} ${rem(27)};
  border-radius: 20px;
  box-shadow: 0 ${rem(6)} ${rem(10)} 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

export default function TemporaryDrawer(props: IProps) {
    const socketInfo = useSelector(selectSocketData);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectUserData, setSelectUserData] = useState<any>();
    const account_list = useSelector(selectAccoutList);
    const close = () => setModalOpen(false);
    const dispatch = useDispatch()
    const [wating_add, setWating_add] = useState<any>([])
    const waitlist = useSelector(selectWaitlist); // 상담 대기 > 스케줄등록 O 
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    useEffect(() => {
        console.log("기존 대기리스트1", waitlist)
        setWating_add(waitlist.result);
    }, [waitlist])

    // useEffect(() => {
    //     console.log("결제완료 된 리스트", account_list);
    //     setWating_add([...wating_add, account_list])
    //     console.log("추가된 대기리스트", wating_add);
    // }, [account_list])



    const [show, setShow] = useState(false);

    const open = () => setShow(true);
    const show_close = () => setShow(false)

    const handleDispatch = () => {
        dispatch(setCounselingDate(""))
        dispatch(setCounselingTimes(""))
    }

    const handleIsImmediateDispatch = (data: any) => {
        dispatch(setTestResultValueStatus(true))
        dispatch(setChatBoxOpenState('null'))
        if (data.isimmediate) {
            dispatch(setScheduleSelectModla(true));
            dispatch(setDashBoardSelectUser(data));
            dispatch(setAlertControlls(false));
        } else {
            dispatch(setDashBoardSelectUser(data)),
                dispatch(setWatingListBefore(data)),
                dispatch(setAlertControlls(true))
        }
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            style={{ background: "#f7f7f7", padding: `${rem(30)}`, height: 'auto', minHeight: '100%' }}
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : `${rem(430)}` }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Div
                css={{
                    alignItems: "center",
                    fontSize: rem(30),
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Title>상담대기 &nbsp;<div style={{ color: "#eb541e" }}>{waitlist?.count}</div>건</Title>
                <ModalCloseIcon />
            </Div>
            {
                waitlist?.result?.length !== 0 ?
                    waitlist?.result?.map((list: any, index: number) => {
                        return (
                            // <BoxItem key={index} onClick={() => { setModalOpen(true), setSelectUserData(list), handleDispatch() }}>
                            <BoxItem key={index} onClick={() => { handleIsImmediateDispatch(list) }}>
                                <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: `${rem(16)}` }}>
                                    <Text bold size={18}>{list.user_name}</Text>
                                    <KeyboardArrowRightIcon style={{ cursor: 'pointer' }} />
                                </div>
                                <div style={{ display: "grid" }}>
                                    <Text
                                        color=' rgba(0, 0, 0, 0.4)'
                                        bold={false} size={15}>
                                        요청 시간
                                        <Text
                                            subtitle
                                            style={{ marginLeft: `${rem(20)}` }}
                                            bold={false} size={15} color="#000">
                                            {list.crated}
                                        </Text>
                                    </Text>
                                    <Text color=' rgba(0, 0, 0, 0.4)' bold={false} size={15}>
                                        상담 방식
                                        <Text subtitle
                                            style={{ marginLeft: `${rem(20)}` }}
                                            bold={false}
                                            size={15}
                                            color="#000">
                                            {list.isimmediate === true ?
                                                <span style={{ fontWeight: 'bold', color: '#eb541e' }}>
                                                    [바로상담]
                                                </span>
                                                :
                                                <span style={{ fontWeight: 'bold', color: '#60ae92' }}>
                                                    [예약상담]
                                                </span>}{list.method_str}
                                        </Text>
                                    </Text>
                                </div>
                            </BoxItem>
                        )
                    })
                    :
                    <BoxItem onClick={() => { dispatch(setScheduleSelectModla(true)) }}>
                        <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: `${rem(16)}` }}>
                            <Text bold size={18}>{account_list?.user_name}</Text>
                            <KeyboardArrowRightIcon style={{ cursor: 'pointer' }} />
                        </div>
                        <div style={{ display: "grid" }}>
                            <Text
                                color=' rgba(0, 0, 0, 0.4)'
                                bold={false} size={15}>
                                요청 시간
                                <Text
                                    subtitle
                                    style={{ marginLeft: `${rem(20)}` }}
                                    bold={false} size={15} color="#000">
                                    {"2023-01-05 17:08"}
                                </Text>
                            </Text>
                            <Text color=' rgba(0, 0, 0, 0.4)' bold={false} size={15}>
                                상담 방식
                                <Text subtitle
                                    style={{ marginLeft: `${rem(20)}` }}
                                    bold={false}
                                    size={15}
                                    color="#000">
                                    {/* {list.isimmediate === true ?
                                    <span style={{ fontWeight: 'bold', color: '#eb541e' }}>
                                        [바로상담]
                                    </span>
                                    :
                                    <span style={{ fontWeight: 'bold', color: '#60ae92' }}>
                                        [예약상담]
                                    </span>
                                    }{list.method_str} */}
                                    <span style={{ fontWeight: 'bold', color: '#60ae92' }}>
                                        [예약상담] 주간채팅 30분 상당
                                    </span>
                                </Text>
                            </Text>
                        </div>
                    </BoxItem>
            }
        </Box >
    );

    return (
        <>
            <RoundedButton
                onClick={toggleDrawer("right", true)}
                color="orange"
                css={{
                    fontSize: rem(20),
                    height: rem(50),
                    width: rem(188),
                }}
            >
                {props.name}
            </RoundedButton>
            <Drawer
                sx={{ bg: "#f7f7f7" }}
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
            >
                {list("right")}
            </Drawer>
            <ApprovalModal open={modalOpen} close={close} userInfo={selectUserData} />
            <AlertPopUp />
            <AlertPopUp3 />
        </>
    );
}

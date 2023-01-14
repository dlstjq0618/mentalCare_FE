import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { rem } from 'polished';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { RoundedButton, ModalCloseIcon, Div } from '~/components';
import styled, { css } from 'styled-components';
import ApprovalModal from './ApprovalModal';
import { AlertPopUp, AlertPopUp3, CoustomAlertPopUp } from '../Dialog/AlertPopUp';
import { useDispatch, useSelector } from 'react-redux';
import { setTestResultValueStatus, selectSocketData, setCounselingDate, setCounselingTimes, selectWaitlist, setChatBoxOpenState, setWatingListBefore, setAlertControlls, setDashBoardSelectUser, setScheduleSelectModla, selectAccoutList, selectConferenceList, setToggleButton, setAlertType, setImmediate, selectPaidWaitLis } from '~/store/calendarDetailSlice';
import { TramRounded } from '@mui/icons-material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface IProps {
    open?: boolean;
    name?: string;
}

interface IStyled {
    size?: any;
    bold?: boolean;
    subtitle?: boolean;
    badge?: boolean;
    border?: boolean;
    left?: number;
    schedule?: boolean;
    count?: boolean;
    underLine?: boolean;

}

const Divs = styled.div`
    display: flex;
    align-items: center;
`;
const StyledSpan = styled.span<IStyled>` 
    font-weight: bold;
    ${(props) =>
        props.count === true &&
        css`
        font-size: ${rem(props.size)};
        color: ${props.color};
    `}
    ${(props) =>
        props.underLine === true &&
        css`
        border-bottom: 1px solid;
        cursor: pointer;
    line-height: 1.2;
    `}
`;

const Header = styled.header<IStyled>`
    justify-content: space-between;
    display: flex;
    background: #fff;
    width: ${rem(1050)};
    height: ${rem(60)};
    flex-grow: 0;
    margin: ${rem(30)} 0 ${rem(25)};
    padding: ${rem(14)} ${rem(35)} ${rem(14)} ${rem(30)};
    border-radius: 20px;
    background-color: #fff;
    ${(props) =>
        props.schedule === true &&
        css`
    width: ${rem(1050)};
    height: ${rem(90)};
    background-color:#f7f7f7;
    flex-grow: 0;
    padding: 20px 39px 20px 32px;
    border-radius: 20px;
    border: solid ${rem(2)} #eb541e;
    justify-content: none;
    `}
`;

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
const Badge = styled.div<IStyled>`
    padding: 0;
    width: ${rem(47)};
    height: ${rem(19)};
    margin-top: ${rem(2)};
    border-radius: ${rem(3)};
    line-height: 1.4;
    font-size: 10px;
    text-align: center;
    letter-spacing: -0.3px;
    font-size: 12px;
    color: #fff;
    font-weight: 500;
    ${(props) =>
        props.color &&
        css`
        background-color: ${props.color};
        `}
        ${(props) =>
        props.border &&
        css`
            border: solid 0.5px ${props.color};
        `}
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
    ${(props) =>
        props.left &&
        css`
        margin-left: ${rem(props.left)};
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
    const [typeList, setTypeList] = useState();
    const conference_list = useSelector(selectConferenceList);
    const paidWait_list = useSelector(selectPaidWaitLis);
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
    const [count, setCount] = useState(0);

    const handleImmediate = (data: any) => { // 즉시 시작일 때 
        if (data.isimmediate) {
            dispatch(setScheduleSelectModla(false));
            dispatch(setTestResultValueStatus(true));
            dispatch(setDashBoardSelectUser(data));
            dispatch(setImmediate(true));
        } else {
            dispatch(setScheduleSelectModla(true));
            dispatch(setTestResultValueStatus(true));
            dispatch(setDashBoardSelectUser(data));
        }
    }

    useEffect(() => {
        const value = account_list.result?.map((res: any) => {
            return res.isimmediate === true
        })

        console.log("value", value)
    }, [account_list])



    useEffect(() => {
        if (account_list.count === undefined) {
            const totalCount = 0 + waitlist?.count;
            setCount(totalCount)
        } else if (account_list.count !== undefined) {
            const totalCount1 = account_list?.count + waitlist?.count + conference_list?.count + paidWait_list?.count;
            setCount(totalCount1)
        }

    }, [account_list.count, waitlist.count, conference_list?.count, paidWait_list?.count])



    console.log("count", count);

    useEffect(() => {
        console.log("이게 실행되는건가?")
        function is_true(element: any) {
            if (element.isimmediate === true) {
                return true;
            }
        }
        const true_value = account_list.result?.filter(is_true);
        if (true_value?.length > 0) {
            dispatch(setToggleButton(true)); // 바로상담이 있을 때 버튼 disabled 
        } else {
            dispatch(setToggleButton(false));
        }
    }, [account_list])


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
            dispatch(setAlertType("승인요청"))
            // dispatch(setScheduleSelectModla(true));
            dispatch(setDashBoardSelectUser(data));
            dispatch(setAlertControlls(false));
        } else {
            dispatch(setDashBoardSelectUser(data)),
                dispatch(setWatingListBefore(data)),
                dispatch(setAlertControlls(true))
        }
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean, name: string) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
                setTitle(name);
            };

    const list = (anchor: Anchor) => (
        <Box
            style={{ background: "#f7f7f7", padding: `${rem(30)}`, height: 'auto', minHeight: '100%' }}
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : `${rem(430)}` }}
            role="presentation"
            onClick={toggleDrawer(anchor, false, title)}
            onKeyDown={toggleDrawer(anchor, false, title)}
        >
            <Div
                css={{
                    alignItems: "center",
                    fontSize: rem(30),
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Title>{title} &nbsp;<div style={{ color: "#eb541e" }}>{0}</div>건</Title>
                {/* <Title>{title} &nbsp;<div style={{ color: "#eb541e" }}>{Number.isNaN(count) ? 0 : count}</div>건</Title> */}
                {/* <Title>상담대기 &nbsp;<div style={{ color: "#eb541e" }}>{Number.isNaN(count) ? 0 : count}</div>건</Title> */}
                <ModalCloseIcon />
            </Div>
            {
                conference_list?.result?.map((list: any, index: number) => {
                    return (
                        <BoxItem key={index} onClick={() => { dispatch(setTestResultValueStatus(true)), dispatch(setDashBoardSelectUser(list)), dispatch(setWatingListBefore(list)), dispatch(setChatBoxOpenState("협의")) }} style={{ background: "#f7f7f7" }}>
                            <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: `${rem(16)}` }}>
                                <div style={{ display: 'flex' }}>
                                    <Badge color='#046400' border>협의대기</Badge>
                                    <Text left={18} bold size={18}>{list.user_name}</Text>
                                </div>
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
            }
            {
                paidWait_list?.result?.map((list: any, index: number) => {
                    return (
                        // <BoxItem key={index} onClick={() => { setModalOpen(true), setSelectUserData(list), handleDispatch() }}>
                        <BoxItem key={index} style={{ background: "#f7f7f7" }} onClick={() => { console.log("결제대기 누르는중./..") }}>
                            <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: `${rem(16)}` }}>
                                <div style={{ display: 'flex' }}>
                                    <Badge color='#666666' border>결제대기</Badge>
                                    <Text left={18} bold size={18}>{list.user_name}</Text>
                                </div>
                                {list?.isimmediate ?
                                    <div style={{
                                        borderBottom: 'solid 1px #999999',
                                        color: "#999999",
                                        fontSize: 12,
                                        height: 20,
                                        letterSpacing: -0.36,
                                    }} onClick={() => {
                                        dispatch(setChatBoxOpenState("협의취소"))
                                    }}>취소하기</div>
                                    :
                                    <KeyboardArrowRightIcon style={{ cursor: 'pointer' }} />}
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
                                            <span key={index} style={{ fontWeight: 'bold', color: '#eb541e' }}>
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
            }
            {
                account_list?.result?.map((list: any, index: number) => {
                    return (
                        // <BoxItem key={index} onClick={() => { setModalOpen(true), setSelectUserData(list), handleDispatch() }}>
                        <BoxItem key={index} onClick={() => {
                            list.isimmediate === true ? handleImmediate(list)
                                :
                                handleImmediate(list)
                        }} style={{ background: "#f7f7f7" }}>
                            <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: `${rem(16)}` }}>
                                <div style={{ display: 'flex' }}>
                                    <Badge color='#60ae92' border>결제완료</Badge>
                                    <Text left={18} bold size={18}>{list.user_name}</Text>
                                </div>
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
                                            <span key={index} style={{ fontWeight: 'bold', color: '#eb541e' }}>
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
            }

            {
                waitlist?.result?.map((list: any, index: number) => {
                    return (
                        title === "바로상담 대기" && list.isimmediate ?
                            <BoxItem key={index} onClick={() => { handleIsImmediateDispatch(list) }} style={{ background: "#f7f7f7" }}>
                                <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: `${rem(16)}` }}>
                                    <div style={{ display: 'flex' }}>
                                        {list.isimmediate ? "" : <Badge color='#046400' border>협의대기</Badge>}
                                        <Text left={list?.isimmediate ? 0 : 18} bold size={18}>{list.user_name}</Text>
                                    </div>
                                    {list?.isimmediate ? <div style={{ padding: '7px 26px', borderRadius: 7, border: 'solid 1px 4px', width: 81, height: 34, background: "#e8440a", color: "#fff" }}>승인</div>
                                        :
                                        <KeyboardArrowRightIcon style={{ cursor: 'pointer' }} />}
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
                            :
                            title === "예약상담 대기" && list.isimmediate === false ?
                                <BoxItem key={index} onClick={() => { handleIsImmediateDispatch(list) }} style={{ background: "#f7f7f7" }}>
                                    <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: `${rem(16)}` }}>
                                        <div style={{ display: 'flex' }}>
                                            {list.isimmediate ? "" : <Badge color='#046400' border>협의대기</Badge>}
                                            <Text left={list?.isimmediate ? 0 : 18} bold size={18}>{list.user_name}</Text>
                                        </div>
                                        {list?.isimmediate ? <div style={{ padding: '7px 26px', borderRadius: 7, border: 'solid 1px 4px', width: 81, height: 34, background: "#e8440a", color: "#fff" }}>승인</div>
                                            :
                                            <KeyboardArrowRightIcon style={{ cursor: 'pointer' }} />}
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
                                :
                                <></>
                    )
                })
            }
        </Box >
    );

    const [title, setTitle] = useState("");
    /** Immediately */
    return (
        <>
            <Header schedule={true}>
                <Divs>
                    <StyledSpan count size={20}>
                        바로상담 대기
                    </StyledSpan>&nbsp;&nbsp;&nbsp;
                    <StyledSpan underLine size={30} color='#eb541e' count onClick={toggleDrawer("right", true, "바로상담 대기")}>
                        {/* {Number.isNaN(count) ? 0 : count} */}
                        {0}
                    </StyledSpan>
                    <StyledSpan size={30} count color='black'>
                        명
                    </StyledSpan>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <StyledSpan count size={20}>
                        예약상담 대기
                    </StyledSpan>&nbsp;&nbsp;&nbsp;
                    <StyledSpan underLine size={30} color='#eb541e' count onClick={toggleDrawer("right", true, "예약상담 대기")}>
                        {/* {Number.isNaN(count) ? 0 : count} */}
                        {0}
                    </StyledSpan>
                    <StyledSpan size={30} count color='black'>
                        명
                    </StyledSpan>
                </Divs>
            </Header>
            {/* <RoundedButton
                onClick={toggleDrawer("right", true, "바로상담 대기")}
                color="orange"
                css={{
                    fontSize: rem(20),
                    height: rem(50),
                    width: rem(188),
                }}
            >
                {props.name}
            </RoundedButton> */}

            <Drawer
                sx={{ bg: "#f7f7f7" }}
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false, "예약상담 대기")}
            >
                {list("right")}
            </Drawer>
            <ApprovalModal open={modalOpen} close={close} userInfo={selectUserData} />
            <AlertPopUp />
            <AlertPopUp3 />
            <CoustomAlertPopUp />
        </>
    );
}

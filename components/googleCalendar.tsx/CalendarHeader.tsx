import React, { useContext, useEffect, useState } from 'react';
import { rem } from 'polished';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import GlobalContext from '~/context/GlobalContext';
import { BaseDialog2, RoundedButton } from '~/components';
import dayjs from 'dayjs'
import styled, { css } from 'styled-components';
import TemporaryDrawer from '../Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { selectConferenceList, selectAccoutList, selectPaidWaitLis, selectLoggedUser, selectSocketData, setCalendarMonthState, selectWaitlist, setChatBoxOpenState } from '~/store/calendarDetailSlice';

interface IStyled {
    schedule?: boolean;
    count?: boolean;
    size?: any;
    underLine?: boolean;
}

const Div = styled.div`
    display: flex;
    align-items: center;
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

const StyledDate = styled.span`
    height: ${rem(31)};
    margin: ${rem(1)} ${rem(20)} 0 ${rem(10)};
    font-size: ${rem(22)};
    line-height: 1.4;
    letter-spacing: normal;
    text-align: left;
    color: #000;
`;

const StyledButton = styled.div`
    width: ${rem(54)};
    height: ${rem(32)};
    font-size: ${rem(14)};
    padding-top: ${rem(5)};
    border-radius: ${rem(6)};
    border: solid 1px #b4b4b4;
    font-size: ${rem(14)};
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: #000;
    cursor: pointer;
`;

function CalendarHeader() {
    const [show2, setShow2] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const socketInfo = useSelector(selectSocketData);
    const waitlist = useSelector(selectWaitlist); // 상담 대기 > 스케줄등록 O 
    const account_list = useSelector(selectAccoutList);
    const [count, setCount] = useState(0);
    const conference_list = useSelector(selectConferenceList);
    const paidWait_list = useSelector(selectPaidWaitLis);
    const close2 = () => setShow2(false);
    const open2 = () => setShow2(true);
    const handleDrawerOpen = () => setDrawerOpen(!drawerOpen)

    const { monthIndex, setMonthIndex } = useContext(GlobalContext)
    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    }
    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    }
    const handleReset = () => {
        setMonthIndex(dayjs().month())
    }
    useEffect(() => {
        dispatch(setCalendarMonthState(dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY.MM")))
    }, [dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY.MM")])

    useEffect(() => {
        if (account_list.count === undefined) {
            const totalCount = 0 + waitlist?.count;
            setCount(totalCount)
        } else if (account_list.count !== undefined) {
            const totalCount1 = account_list?.count + waitlist?.count + conference_list?.count + paidWait_list?.count;
            setCount(totalCount1)
        }

    }, [account_list.count, waitlist.count, conference_list?.count, paidWait_list?.count])

    return (
        <>
            <Header>
                <Div>
                    <KeyboardArrowLeftIcon style={{ cursor: 'pointer' }} onClick={() => handlePrevMonth()} />
                    <KeyboardArrowRightIcon style={{ cursor: 'pointer' }} onClick={() => handleNextMonth()} />

                    <StyledDate>{dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY.MM")}</StyledDate>
                    <StyledButton onClick={() => handleReset()}>
                        오늘
                    </StyledButton>
                </Div>
            </Header>
            <TemporaryDrawer open={drawerOpen} />
        </>
    );
}

export default CalendarHeader;
import React, { useState, useEffect } from 'react';
import { rem } from 'polished';
import styled, { css } from 'styled-components';
import { UPDATE_OPEN_TIMES_ALL } from '~/utils/constants';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { selectCounselingDate, setCounselingTimes, selectCounselingTimes, setCounselingTimeStemp, selectCounselingTimeStemp, setCounselingTimeStempNumber } from '~/store/calendarDetailSlice';

interface Iprops {

}

interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
    check?: boolean;
}

const Arricle = styled.article<IStyled>`
    position: relative;
`;

const Button = styled.div<IStyled>`
    justify-content: space-between;
    display: flex;
height: ${rem(50)};
padding: 13px 14px 14.4px 22px;
margin: 11px 2px 0px 2px;
  flex-grow: 0;
  border-radius: 6px;
  border: solid 1px #d3d3d3;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const Ul = styled.ul`
background-color: #fff;
    max-height: ${rem(300)};
    font-weight: bold;
    overflow: auto;
    border-radius: 6px;
    margin: 2px 0 0 0;
    padding: 0;
    border: 1px solid #d3d3d3;
    position: relative;
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

function ReservationSelect(props: Iprops) {
    // 시간선택은 모든것이 분을 기준으로 선택 
    const [check, setCheck] = useState(false);
    const [select, setSelect] = useState("시간 선택");
    const dispatch = useDispatch();
    const selectTime = useSelector(selectCounselingTimeStemp);
    const selectDate = useSelector(selectCounselingDate)
    const hour = Number(selectTime.substring(0, 2)) * 3600;
    const min = Number(select.substring(6, 8)) * 60;
    const selectTimeNumber = hour + min;

    const time = new Date().getHours() * 60; // 시간
    const minut = new Date().getMinutes();  // 분 
    const day = new Date().getDate() * 60 * 24; // 일
    const month = (new Date().getMonth() + 1) * 60 * 24 * 32 // 월

    const days = new Date(selectDate).getDate() * 60 * 24; //선택한 날짜
    const months = (new Date(selectDate).getMonth() + 1) * 60 * 24 * 32

    // 분으로 계산한 후 비교 time*60 + minit
    const lastTime = day + time + minut + month + 1; // 현재시간 

    useEffect(() => {
        dispatch(setCounselingTimeStempNumber(selectTimeNumber))
    }, [selectTimeNumber])



    return (
        <>
            <Arricle >
                <Button onClick={() => setCheck(!check)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}><AccessTimeIcon style={{ marginRight: '0.625rem' }} />{select}</div> <KeyboardArrowDownIcon />
                </Button>
                {
                    check &&
                    <Ul style={{ zIndex: 10 }}>
                        {
                            UPDATE_OPEN_TIMES_ALL.map((res: { label: string, value: string }, index: number) => {
                                const times = Number(res.value?.substring(0, 2));
                                const minuts = Number(res.value?.substring(3, 5));
                                const last_times = times * 60 + minuts + days + months;
                                if (lastTime < last_times) {
                                    return <Li check onClick={() => {
                                        setSelect(res.label), setCheck(false), dispatch(setCounselingTimes(res.label)),
                                            dispatch(setCounselingTimeStemp(res.value))
                                    }}
                                        key={index} value={res.value}>
                                        {res.label}
                                    </Li>
                                }
                            })
                        }
                    </Ul>
                }
            </Arricle>
        </>
    );
}

export default ReservationSelect;
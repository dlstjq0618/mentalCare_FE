import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { TermsCheckbox1 } from '../registerPage';
import IconCheckboxes from './circleCheckbox';
import { ALL_TIME_OPTIONS } from '~/utils/constants';
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { selectCounselorOpeningTimes, setCounselorOpeningTimes } from '~/store/settingsSlice';
const weekDay = [
    {
        active: false,
        id: 0,
        value: 0,
        label: "월요일"
    },
    {
        active: false,
        id: 1,
        value: 1,
        label: "화요일"
    },
    {
        active: false,
        id: 2,
        value: 2,
        label: "수요일"
    },
    {
        active: false,
        id: 3,
        value: 3,
        label: "목요일"
    },
    {
        active: false,
        id: 4,
        value: 4,
        label: "금요일"
    },
    {
        active: false,
        id: 5,
        value: 5,
        label: "토요일"
    },
    {
        active: false,
        id: 6,
        value: 6,
        label: "일요일"
    },
    {
        active: false,
        id: 7,
        value: 7,
        label: "공휴일"
    },

]

interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
}

const InfoGrid = styled.div<IStyled>`
  ${(props) =>
        props.width &&
        css`
        width: ${rem(props.width)};
    `}
    padding: ${rem(50)} ${rem(150)};
    height: ${rem(587)};
    flex-grow: 0;
    border-radius: 20px;
    background-color: #fff;
    margin-top: ${rem(30)};
`;

const Div = styled.div<IStyled>`
${(props) =>
        props.flex &&
        css`
        display: flex;
        align-items: center;
    `}
${(props) =>
        props.margin &&
        css`
        margin-bottom: ${rem(props.margin)};
    `}
`;

const Text = styled.span<IStyled>`
    line-height: 1.4;
      ${(props) =>
        props.size &&
        css`    
        font-size: ${rem(props.size)};
    `}
    ${(props) =>
        props.bold &&
        css`
        font-weight: ${props.bold};
    `}
    ${(props) =>
        props.color &&
        css`
        color: ${props.color};
    `}
`;

const Select = styled.select<IStyled>`
    width: 162px;
    height: 46px;
    flex-grow: 0;
    margin: 0 ${rem(18)} 0 ${rem(18)};
    border-radius: 100px;
    border: solid 1px #eee;
    background-color: #fff;
    text-align: center;
    &:focus {
      outline: none;
  }
`;

function OpeningTimeForm() {
    const { register, setValue, setError, trigger, getValues, formState, watch } =
        useFormContext();
    const [inputs, setInputs] = useState({
        id: 0,
        weekday: 0,
        start_time: '',
        end_time: '',
    })
    const { id, weekday, start_time, end_time } = inputs;
    const [users, setUsers] = useState<any>([]);
    const dispatch = useDispatch();
    const opData = useSelector(selectCounselorOpeningTimes);


    const onCreate = (data: any) => {
        console.log('data', data);
        const user = {
            id,
            weekday,
            start_time,
            end_time
        }
        setUsers([...users, user])
        setInputs({
            id: data.id,
            weekday: data.value,
            start_time: '07:00:00',
            end_time: '23:00:00'
        })
    }

    const onRemove = (id: number) => {
        setUsers(users.filter((user: { id: number; }) => user.id !== id));
    }

    useEffect(() => {
        onCreate;
        console.log("users", users);
    }, [inputs, users]);

    useEffect(() => {
        setValue('opening_times', users)
    }, [users])
    return (
        <InfoGrid width={900}>
            <Div className='OpeningTime' margin={24}>
                <Text size={18} bold='bold' color='#333'>
                    운영시간
                </Text>
            </Div>
            <>
                {weekDay.map((res: any, index: number) => {
                    return <>
                        <Div key={index} flex margin={10}>
                            <div key={index} onClick={() => { onCreate(res) }}>
                                <IconCheckboxes />
                            </div>
                            <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                                {res.label}
                            </div>
                            <div>
                                <Select>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} defaultValue={'07:00:00'}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} defaultValue={'23:00:00'}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </Div>
                    </>
                })}
            </>
        </InfoGrid>
    );
}

export default OpeningTimeForm;
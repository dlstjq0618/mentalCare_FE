import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { TermsCheckbox1 } from '../registerPage';
import IconCheckboxes from './circleCheckbox';
import { ALL_TIME_OPTIONS } from '~/utils/constants';
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { selectCounselorOpeningTimes, setCounselorOpeningTimes } from '~/store/settingsSlice';
import { selectCounselingInfoData } from '~/store/calendarDetailSlice';
import { api } from '~/woozooapi';
import { selectCounselorId } from '~/store/doctorInfoForChangeSlice';

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
    const infoData = useSelector(selectCounselingInfoData);
    const [users, setUsers] = useState<any>([]);
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [checked6, setChecked6] = useState(false);
    const [checked7, setChecked7] = useState(false);

    const dispatch = useDispatch();

    const [check, setCheck] = useState(false)
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [check5, setCheck5] = useState(false)
    const [check6, setCheck6] = useState(false)
    const [check7, setCheck7] = useState(false)


    const handleStartTimeSelect = (e: any) => {
        if (users) {
            users[0].start_time = e.target.value;
        }
    }
    const handleEndTimeSelect = (e: any) => {
        if (users) {
            users[0].end_time = e.target.value
        }

    }

    const handleCheckControlls = (id: number) => {
        if (id === 0 && !check) {
            onCreate(0)
        } else if (id === 0 && check) {
            onRemove(0)
        }
    }

    const handleCheckControlls1 = (id: number) => {
        if (id === 1 && !check1) {
            onCreate(1)
        } else if (id === 1 && check1) {
            onRemove(1)
        }
    }
    const handleCheckControlls2 = (id: number) => {
        if (id === 2 && !check2) {
            onCreate(2)
        } else if (id === 2 && check2) {
            onRemove(2)
        }
    }
    const handleCheckControlls3 = (id: number) => {
        if (id === 3 && !check3) {
            onCreate(3)
        } else if (id === 3 && check3) {
            onRemove(3)
        }
    }
    const handleCheckControlls4 = (id: number) => {
        if (id === 4 && !check4) {
            onCreate(4)
        } else if (id === 4 && check4) {
            onRemove(4)
        }
    }
    const handleCheckControlls5 = (id: number) => {
        if (id === 5 && !check5) {
            onCreate(5)
        } else if (id === 5 && check5) {
            onRemove(5)
        }
    }
    const handleCheckControlls6 = (id: number) => {
        if (id === 6 && !check6) {
            onCreate(6)
        } else if (id === 6 && check6) {
            onRemove(6)
        }
    }
    const handleCheckControlls7 = (id: number) => {
        if (id === 7 && !check7) {
            onCreate(7)
        } else if (id === 7 && check7) {
            onRemove(7)
        }
    }

    const onRemove = (id: number) => {
        setUsers(users.filter((user: { weekday: number; }) => user.weekday !== id));
        console.log("onRemove")
    };

    const onCreate = (res: any) => {
        const user = {
            weekday: res,
            start_time: "07:00:00",
            end_time: "23:00:00"
        }
        setUsers([...users, user]);
    }

    const findData = (data: any) => {
        return data.weekday === 0
    }
    const findData1 = (data: any) => {
        return data.weekday === 1
    }
    const findData2 = (data: any) => {
        return data.weekday === 2
    }
    const findData3 = (data: any) => {
        return data.weekday === 3
    }
    const findData4 = (data: any) => {
        return data.weekday === 4
    }
    const findData5 = (data: any) => {
        return data.weekday === 5
    }
    const findData6 = (data: any) => {
        return data.weekday === 6
    }
    const findData7 = (data: any) => {
        return data.weekday === 7
    }

    const handleMap = () => {
        infoData.openingTimes?.map((res: any) => {
            console.log("res", res)
            const user = {
                weekday: res.weekday,
                start_time: "07:00:00",
                end_time: "23:00:00"
            }
            setUsers(users.concat(user))
        })

        console.log("res", users)
    }

    useEffect(() => {
        console.log("users", users);
        setValue('opening_times', users)
    }, [users])

    useEffect(() => {
        infoData.openingTimes?.find(findData) !== undefined ? setCheck(true) : setChecked(false);
        infoData.openingTimes?.find(findData1) !== undefined ? setCheck1(true) : setChecked1(false);
        infoData.openingTimes?.find(findData2) !== undefined ? setCheck2(true) : setChecked2(false);
        infoData.openingTimes?.find(findData3) !== undefined ? setCheck3(true) : setChecked3(false);
        infoData.openingTimes?.find(findData4) !== undefined ? setCheck4(true) : setChecked4(false);
        infoData.openingTimes?.find(findData5) !== undefined ? setCheck5(true) : setChecked5(false);
        infoData.openingTimes?.find(findData6) !== undefined ? setCheck6(true) : setChecked6(false);
        infoData.openingTimes?.find(findData7) !== undefined ? setCheck7(true) : setChecked7(false);
    }, [infoData])




    return (
        <InfoGrid width={900}>
            <Div className='OpeningTime' margin={24}>
                <Text size={18} bold='bold' color='#382b2b'>
                    운영시간
                </Text>
            </Div>
            <>
                <Div>
                    <Div margin={10} flex>
                        <div onClick={() => { handleCheckControlls(0), setCheck(!check) }}>
                            <IconCheckboxes check={check} />
                        </div>
                        <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                            {"월요일"}
                        </div>
                        <div>
                            <div>
                                <Select onChange={handleStartTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={handleEndTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Div>
                    <Div margin={10} flex>
                        <div onClick={() => { handleCheckControlls1(1), setCheck1(!check1) }}>
                            <IconCheckboxes check={check1} />
                        </div>
                        <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                            {"화요일"}
                        </div>
                        <div>
                            <div>
                                <Select onChange={handleStartTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={handleEndTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Div>
                    <Div margin={10} flex>
                        <div onClick={() => { handleCheckControlls2(2), setCheck2(!check2) }}>
                            <IconCheckboxes check={check2} />
                        </div>
                        <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                            {"수요일"}
                        </div>
                        <div>
                            <div>
                                <Select onChange={handleStartTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={handleEndTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Div>
                    <Div margin={10} flex>
                        <div onClick={() => { handleCheckControlls3(3), setCheck3(!check3) }}>
                            <IconCheckboxes check={check3} />
                        </div>
                        <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                            {"목요일"}
                        </div>
                        <div>
                            <div>
                                <Select onChange={handleStartTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={handleEndTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Div>
                    <Div margin={10} flex>
                        <div onClick={() => { handleCheckControlls4(4), setCheck4(!check4) }}>
                            <IconCheckboxes check={check4} />
                        </div>
                        <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                            {"금요일"}
                        </div>
                        <div>
                            <div>
                                <Select onChange={handleStartTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={handleEndTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Div>
                    <Div margin={10} flex>
                        <div onClick={() => { handleCheckControlls5(5), setCheck5(!check5) }}>
                            <IconCheckboxes check={check5} />
                        </div>
                        <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                            {"토요일"}
                        </div>
                        <div>
                            <div>
                                <Select onChange={handleStartTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={handleEndTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Div>
                    <Div margin={10} flex>
                        <div onClick={() => { handleCheckControlls6(6), setCheck6(!check6) }}>
                            <IconCheckboxes check={check6} />
                        </div>
                        <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                            {"일요일"}
                        </div>
                        <div>
                            <div>
                                <Select onChange={handleStartTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={handleEndTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Div>
                    <Div margin={10} flex>
                        <div onClick={() => { handleCheckControlls7(7), setCheck7(!check7) }}>
                            <IconCheckboxes check={check7} />
                        </div>
                        <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(10)}` }}>
                            {"법정공휴일"}
                        </div>
                        <div>
                            <div>
                                <Select onChange={handleStartTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={handleEndTimeSelect}>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Div>
                </Div>
            </>
        </InfoGrid>
    );
}

export default OpeningTimeForm;
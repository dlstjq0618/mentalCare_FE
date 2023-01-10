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

    const dispatch = useDispatch();

    const [check, setCheck] = useState(false)
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [check5, setCheck5] = useState(false)
    const [check6, setCheck6] = useState(false)
    const [check7, setCheck7] = useState(false)

    const [mon, setMon] = useState<any>({});
    const [tue, setTue] = useState<any>({});
    const [wed, setWed] = useState<any>({});
    const [thu, setThu] = useState<any>({});
    const [fri, setFri] = useState<any>({});
    const [sat, setSat] = useState<any>({});
    const [sun, setSun] = useState<any>({});
    const [hol, setHol] = useState<any>({});



    const handleStartTimeSelect = (e: any, value: number) => {
        setUsers(users.map((user: any) =>
            user?.weekday === value ? { ...user, startTime: e.target.value } : user
        ))
    }
    const handleEndTimeSelect = (e: any, value: number) => {
        setUsers(users.map((user: any) =>
            user?.weekday === value ? { ...user, endTime: e.target.value } : user
        ))
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
            startTime: "08:00:00",
            endTime: "22:00:00"
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

    const isMonday = (element: any) => {
        if (element.weekday === 0) {
            return true
        }
    }
    const isTuesday = (element: any) => {
        if (element.weekday === 1) {
            return true
        }
    }
    const isWednesday = (element: any) => {
        if (element.weekday === 2) {
            return true
        }
    }
    const isThursday = (element: any) => {
        if (element.weekday === 3) {
            return true
        }
    }
    const isFriday = (element: any) => {
        if (element.weekday === 4) {
            return true
        }
    }
    const isSaturday = (element: any) => {
        if (element.weekday === 5) {
            return true
        }
    }
    const isSunday = (element: any) => {
        if (element.weekday === 6) {
            return true
        }
    }
    const isHoliday = (element: any) => {
        if (element.weekday === 7) {
            return true
        }
    }


    useEffect(() => {
        setValue('opening_times', users)
    }, [users])

    useEffect(() => {
        infoData.openingTimes?.find(findData) !== undefined ? setCheck(true) : setCheck(false);
        infoData.openingTimes?.find(findData1) !== undefined ? setCheck1(true) : setCheck1(false);
        infoData.openingTimes?.find(findData2) !== undefined ? setCheck2(true) : setCheck2(false);
        infoData.openingTimes?.find(findData3) !== undefined ? setCheck3(true) : setCheck3(false);
        infoData.openingTimes?.find(findData4) !== undefined ? setCheck4(true) : setCheck4(false);
        infoData.openingTimes?.find(findData5) !== undefined ? setCheck5(true) : setCheck5(false);
        infoData.openingTimes?.find(findData6) !== undefined ? setCheck6(true) : setCheck6(false);
        infoData.openingTimes?.find(findData7) !== undefined ? setCheck7(true) : setCheck7(false);
        infoData.openingTimes?.find(isMonday) !== undefined ? setMon(infoData.openingTimes.find(isMonday)) : ""
        infoData.openingTimes?.find(isTuesday) !== undefined ? setTue(infoData.openingTimes.find(isTuesday)) : ""
        infoData.openingTimes?.find(isWednesday) !== undefined ? setWed(infoData.openingTimes.find(isWednesday)) : ""
        infoData.openingTimes?.find(isThursday) !== undefined ? setThu(infoData.openingTimes.find(isThursday)) : ""
        infoData.openingTimes?.find(isFriday) !== undefined ? setFri(infoData.openingTimes.find(isFriday)) : ""
        infoData.openingTimes?.find(isSaturday) !== undefined ? setSat(infoData.openingTimes.find(isSaturday)) : ""
        infoData.openingTimes?.find(isSunday) !== undefined ? setSun(infoData.openingTimes.find(isSunday)) : ""
        infoData.openingTimes?.find(isHoliday) !== undefined ? setHol(infoData.openingTimes.find(isHoliday)) : ""
        setUsers(infoData.openingTimes)
    }, [infoData])



    return (
        <InfoGrid width={900} style={{ display: 'none' }}>
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
                                <Select onChange={(e) => handleStartTimeSelect(e, 0)} defaultValue={mon.startTime ?? "none"} disabled={!check}>
                                    <option value={mon.startTime ?? "none"} hidden>{mon.startTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={(e) => handleEndTimeSelect(e, 0)} defaultValue={mon.endTime ?? "none"} disabled={!check}>
                                    <option value={mon.endTime ?? "none"} hidden>{mon.endTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label === "none" ? "시간 선택" : res.label}
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
                                <Select onChange={(e) => handleStartTimeSelect(e, 1)} defaultValue={tue.startTime ?? "none"} disabled={!check1}>
                                    <option value={tue.startTime ?? "none"} hidden >{tue.startTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label === "none" ? "시간 선택" : res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={(e) => handleEndTimeSelect(e, 1)} defaultValue={tue.endTime ?? "none"} disabled={!check1}>
                                    <option value={tue.endTime ?? "none"} hidden>{tue.endTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label === "none" ? "시간 선택" : res.label}
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
                                <Select onChange={(e) => handleStartTimeSelect(e, 2)} defaultValue={wed.startTime ?? "none"} disabled={!check2}>
                                    <option value={wed.startTime ?? "none"} hidden >{wed.startTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={(e) => handleEndTimeSelect(e, 2)} defaultValue={wed.endTime ?? "none"} disabled={!check2}>
                                    <option value={wed.endTime ?? "none"} hidden >{wed.endTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label === "none" ? "시간 선택" : res.label}
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
                                <Select onChange={(e) => handleStartTimeSelect(e, 3)} defaultValue={thu.startTime ?? "none"} disabled={!check3}>
                                    <option value={thu.startTime ?? "none"} hidden >{thu.startTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={(e) => handleEndTimeSelect(e, 3)} defaultValue={thu.endTime ?? "none"} disabled={!check3}>
                                    <option value={thu.endTime ?? "none"} hidden >{thu.endTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
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
                                <Select onChange={(e) => handleStartTimeSelect(e, 4)} defaultValue={fri.startTime ?? "none"} disabled={!check4}>
                                    <option value={fri.startTime ?? "none"} hidden >{fri.startTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label === "none" ? "시간 선택" : res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={(e) => handleEndTimeSelect(e, 4)} defaultValue={fri.endTime ?? "none"} disabled={!check4}>
                                    <option value={fri.endTime ?? "none"} hidden >{fri.endTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
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
                                <Select onChange={(e) => handleStartTimeSelect(e, 5)} defaultValue={sat.startTime ?? "none"} disabled={!check5}>
                                    <option value={sat.startTime ?? "none"} hidden>{sat.startTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={(e) => handleEndTimeSelect(e, 5)} defaultValue={sat.endTime ?? "none"} disabled={!check5}>
                                    <option value={sat.endTime ?? "none"} hidden>{sat.endTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
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
                                <Select onChange={(e) => handleStartTimeSelect(e, 6)} defaultValue={sun.startTime ?? "none"} disabled={!check6}>
                                    <option value={sun.startTime ?? "none"} hidden >{sun.startTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={(e) => handleEndTimeSelect(e, 6)} defaultValue={sun.endTime ?? "none"} disabled={!check6}>
                                    <option value={sun.endTime ?? "none"} hidden >{sun.endTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
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
                                <Select onChange={(e) => handleStartTimeSelect(e, 7)} defaultValue={hol.startTime ?? "none"} disabled={!check7}>
                                    <option value={hol.startTime ?? "none"} hidden >{hol.startTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select onChange={(e) => handleEndTimeSelect(e, 7)} defaultValue={hol.endTime ?? "none"} disabled={!check7}>
                                    <option value={hol.endTime ?? "none"} hidden >{hol.endTime?.substr(0, 5) ?? "시간선택"}</option>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value} >
                                            {res.label === "none" ? "시간 선택" : res.label}
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
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setTutorialHospitalBreakArray,
    setTutorialHospitalOpeningArray,
    setTutorialTimeState2,
    setTutorialTimeState
} from "~/store/settingsSlice";
import NumberFormat from 'react-number-format';
import { rem } from "polished";
interface IInputProps {
    index?: number;
    value?: string | undefined;
    onChange?(value: any): void;
    storeWeekData?: any
    storeBreakData?: any
    type: boolean;
    length?: number;
    allLength?: boolean
}
export const numberFormat = (value: number | bigint) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(value);




export function CustomStInput(props: IInputProps) {
    const dispatch = useDispatch();
    const [defaultStValue, setDefaultStValue] = useState("09:00")
    const handleDispatch = () => {
        if (props.type === true) {
            dispatch(setTutorialHospitalOpeningArray([props.storeWeekData]))
        } else if (props.type === false) {
            dispatch(setTutorialHospitalBreakArray(props.storeWeekData))
        }

        if (props.value) {
            dispatch(setTutorialTimeState(true))
        } else {
            dispatch(setTutorialTimeState(false))
        }
    }

    const MAX_VAL = 2358;
    const withValueCap = (inputObj: any) => {
        const { value } = inputObj;
        if (value <= MAX_VAL) return true;
        return false;
    };

    return (
        <>
            <NumberFormat
                format={"##:##"}
                maxLength={6}
                type="text"
                value={props.value}
                onChange={props.onChange}
                onKeyUp={handleDispatch}
                isAllowed={withValueCap}
                placeholder={"09:00"}
                style={{
                    width: rem(89),
                    height: rem(51.9),
                    textAlignLast: "center",
                    flexGrow: 0,
                    margin: "0 24px 0 24px",
                    padding: "14px 21px 15px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#f7f7f7"
                }}>
            </NumberFormat>
        </>
    )
}

export function CustomEnInput(props: IInputProps) {
    const dispatch = useDispatch();
    const [defaultEnValue, setDefaultEnValue] = useState("18:00")

    const handleDispatch = () => {
        if (props.type === true) {
            dispatch(setTutorialHospitalOpeningArray([props.storeWeekData]))
        } else if (props.type === false) {
            dispatch(setTutorialHospitalBreakArray(props.storeWeekData))
        }
        if (props.value) {
            dispatch(setTutorialTimeState2(true))
        } else {
            dispatch(setTutorialTimeState2(false))
        }
    }
    const MAX_VAL = 2359;
    const withValueCap = (inputObj: any) => {
        const { value } = inputObj;
        if (value <= MAX_VAL) return true;
        return false;
    };

    return (
        <>
            <NumberFormat
                format={"##:##"}
                maxLength={6}
                value={props.value}
                onChange={props.onChange}
                onKeyUp={handleDispatch}
                isAllowed={withValueCap}
                placeholder={"21:00"}
                style={{
                    width: rem(89),
                    height: rem(51.9),
                    textAlignLast: "center",
                    flexGrow: 0,
                    margin: "0 24px 0 24px",
                    padding: "14px 21px 15px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#f7f7f7"
                }}>
            </NumberFormat>
        </>
    )
}

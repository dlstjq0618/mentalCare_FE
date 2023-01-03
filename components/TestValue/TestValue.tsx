import React, { useState, useEffect } from 'react';
import { rem } from 'polished';
import { BaseDialog2, RoundedButton } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestResultValue } from '~/store/calendarDetailSlice';

interface Iprops {
    open: boolean;
    cancel: () => void;
}

function TestValue(props: Iprops) {
    const result = useSelector(selectTestResultValue);

    useEffect(() => {
        console.log("result", result)
    }, [result])

    return (
        <>
            <BaseDialog2 showDialog={props.open} close={props.cancel}>
                {result?.datas?.map((res: any, index: number) => {
                    <div>
                        {res.qustion}
                    </div>
                    Object.entries(res.answer).map(([key, value]) => {
                        return <>
                            {console.log("key", key)}
                            {console.log("key", value)}
                        </>
                    })
                })}
            </BaseDialog2>
        </>
    );
}

export default TestValue;
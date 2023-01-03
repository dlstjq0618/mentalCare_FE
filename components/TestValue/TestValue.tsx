import React, { useState, useEffect } from 'react';
import { rem } from 'polished';
import { BaseDialog2, RoundedButton } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestResultValue, selectTestResultValueStatus, setTestResultValueStatus } from '~/store/calendarDetailSlice';

interface Iprops {
    open: boolean;
    cancel: () => void;
}

function TestValue(props: Iprops) {
    const result = useSelector(selectTestResultValue);
    const test = useSelector(selectTestResultValueStatus);

    return (
        <>
            <BaseDialog2 showDialog={props.open} close={props.cancel} style={{ width: `${rem(600)}`, paddingBottom: `${rem(42)}` }}>
                {result?.datas?.map((res: any, index: number) => {
                    return <div key={index}>
                        <div>
                            {res.question}
                        </div>
                        <div>
                            {
                                Object.entries(res.answer).map(([key, value]) => {
                                    return <div key={index} style={{ color: 'red' }}>
                                        {value}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })}
            </BaseDialog2>
        </>
    );
}

export default TestValue;
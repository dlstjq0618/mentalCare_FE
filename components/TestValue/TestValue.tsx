import React, { useState, useEffect } from 'react';
import { rem } from 'polished';
import { BaseDialog2, RoundedButton } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestResultValue, selectTestResultValueStatus, setTestResultValueStatus } from '~/store/calendarDetailSlice';
import styled, { css } from 'styled-components';
interface IStyled {
    size?: any;
    bold?: boolean;
}
const Text = styled.div<IStyled>`
line-height: 1.4;
    ${(props) =>
        props.size &&
        css`
        font-size: ${rem(props.size)};
    `}
    ${(props) =>
        props.bold &&
        css`
        text-align: center;
        font-weight: bold;
        color: #333;
    `}
`;

interface Iprops {
    open: boolean;
    cancel: () => void;
}

function TestValue(props: Iprops) {
    const result = useSelector(selectTestResultValue);
    const test = useSelector(selectTestResultValueStatus);

    console.log("result", result)

    return (
        <>
            <BaseDialog2 showDialog={props.open} close={props.cancel} style={{ width: `${rem(600)}`, paddingBottom: `${rem(42)}` }}>
                <Text bold size={20}>테스트 결과</Text>
                {result.datas?.length > 0 && result?.datas?.map((res: any, index: number) => {
                    return <div key={index}>
                        <div>
                            {res?.question}
                        </div>
                        <div>
                            {
                                Object?.entries(res?.answer).map(([key, value]) => {
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
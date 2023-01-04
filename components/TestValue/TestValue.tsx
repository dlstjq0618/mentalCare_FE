import React, { useState, useEffect } from 'react';
import { rem } from 'polished';
import { BaseDialog2, RoundedButton } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestResultValue, selectTestResultValueStatus, setTestResultValueStatus } from '~/store/calendarDetailSlice';
import styled, { css } from 'styled-components';
interface IStyled {
    size?: any;
    bold?: boolean;
    center?: boolean;
    discription?: boolean;

}
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
        font-weight: bold;
        color: #333;
    `}
    ${(props) =>
        props.bold &&
        css`
        font-weight: bold;
        color: #333;
    `}
    ${(props) =>
        props.center &&
        css`
        padding-bottom: 32px;
        text-align: center;
    `}
    ${(props) =>
        props.discription &&
        css`
        margin-bottom: 14px;
    letter-spacing: -0.45px;
    `}
`;

interface Iprops {
    open: boolean;
    cancel: () => void;
}

function TestValue(props: Iprops) {
    const result = useSelector(selectTestResultValue);
    const test = useSelector(selectTestResultValueStatus);

    return (
        <>
            <BaseDialog2 showDialog={props.open} close={props.cancel} style={{ width: `${rem(570)}`, padding: `${rem(40)}` }}>
                <Text bold center size={20}>테스트 결과</Text>
                {result.datas?.length > 0 && result?.datas?.map((res: any, index: number) => {
                    return <Text key={index} discription>
                        <Text size={15} bold>
                            {res?.question}
                        </Text>
                        <div>
                            {
                                Object?.entries(res?.answer).map(([key, value]: any) => {
                                    return <Text key={index} size={15}>
                                        {value}
                                    </Text>
                                })
                            }
                        </div>
                    </Text>
                })}
            </BaseDialog2>
        </>
    );
}

export default TestValue;
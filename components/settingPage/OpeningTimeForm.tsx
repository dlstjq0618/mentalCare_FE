import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { TermsCheckbox1 } from '../registerPage';
import IconCheckboxes from './circleCheckbox';
import { ALL_TIME_OPTIONS } from '~/utils/constants';
import { useFormContext } from "react-hook-form";

const weekDay = [
    {
        value: 0,
        label: "월요일"
    },
    {
        value: 1,
        label: "화요일"
    },
    {
        value: 2,
        label: "수요일"
    },
    {
        value: 3,
        label: "목요일"
    },
    {
        value: 4,
        label: "금요일"
    },
    {
        value: 5,
        label: "토요일"
    },
    {
        value: 6,
        label: "일요일"
    },
    {
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
    return (
        <InfoGrid width={900}>
            <Div margin={24}>
                <Text size={18} bold='bold' color='#333'>
                    운영시간
                </Text>
            </Div>
            <>
                {weekDay.map((res: any, index: number) => {
                    return <>
                        <Div key={index} flex margin={10}>
                            <IconCheckboxes />
                            <div style={{ marginLeft: `${rem(5)}`, marginRight: `${rem(35)}` }}>
                                {res.label}
                            </div>
                            <div>
                                <Select>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
                                            {res.label}
                                        </option>
                                    ))}
                                </Select>
                                ~
                                <Select>
                                    {ALL_TIME_OPTIONS.map((res: any, index: number) => (
                                        <option key={index} value={res.value}>
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
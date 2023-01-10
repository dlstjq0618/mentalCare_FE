import React, { Fragment, useEffect } from 'react';
import { rem } from "polished";
import styled from 'styled-components';
import DayComponents from './DayComponents';


interface Iprops {
    month: any[];
}

const Div = styled.div`
width: ${rem(1055)};
border-radius: 20px;
line-height: normal;
background: #fff;
display: grid;

grid-template: ${rem(161)} auto auto auto auto auto / ${rem(151)} ${rem(151)} ${rem(151)} ${rem(151)} ${rem(151)} ${rem(151)} ${rem(151)};
`;


function Month(props: Iprops) {
    return (
        <Div>
            {props && props.month.map((row: any, i: number) => (
                <Fragment key={i}>
                    {row && row.map((day: any, idx: number) => {
                        return <DayComponents days={day} key={idx} rowIdx={i} />
                    })}
                </Fragment>
            ))}
        </Div>
    );
}

export default Month
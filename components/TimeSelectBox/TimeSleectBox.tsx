import React, { useState } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';
import { UPDATE_OPEN_TIMES_ALL } from '~/utils/constants';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Iprops {

}

interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
}

const Arricle = styled.article<IStyled>`
    position: relative;
    margin-bottom: ${rem(40)};
`;

const Button = styled.div<IStyled>`
width: ${rem(314)};
display: flex;
  height: 50px;
  flex-grow: 0;
  padding: 13px 21px 15px 22px;
  border-radius: 6px;
  border: solid 1px #d3d3d3;
  font-weight: bold;
  cursor: pointer;
`;

const Ul = styled.ul`
    max-height: ${rem(250)};
    font-weight: bold;
    overflow: auto;
    width: ${rem(314)};
    border-radius: 6px;
    margin: 0;
    border: 1px solid #d3d3d3;
    cursor: pointer;
    
`
const Li = styled.li`
    list-style: none;
    height: ${rem(40)};
    padding: 0;
    :hover{
        background-color: #FDEAE4;
    }
`

function TimeSleectBox(props: Iprops) {
    const [check, setCheck] = useState(false);
    const [time, setTime] = useState("")

    return (
        <>
            <Arricle>
                <Button onClick={() => setCheck(!check)}><AccessTimeIcon />{time ? time : "시간 선택"}</Button>
                {
                    check &&
                    <Ul>
                        {
                            UPDATE_OPEN_TIMES_ALL.map((time: { label: string, value: string }, index: number) => {
                                return <Li onClick={() => { setTime(time.label), setCheck(false) }} key={index} value={time.value}>{time.label}</Li>
                            })
                        }
                    </Ul>
                }
            </Arricle>
        </>
    );
}

export default TimeSleectBox;
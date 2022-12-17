import React, { useState } from 'react';
import { rem } from 'polished';
import styled, { css } from 'styled-components';
import { UPDATE_OPEN_TIMES_ALL } from '~/utils/constants';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';

interface Iprops {

}

interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
    check?: boolean;
}

const Arricle = styled.article<IStyled>`
    position: relative;
`;

const Button = styled.div<IStyled>`
align-items: center;
display: flex;
color: #fff;
width: ${rem(103)};
justify-content: space-around;
height: 36px;
padding: 10px 9px 9px 16px;
background-color: #eb541e;
margin: 12px 17px;
  flex-grow: 0;
  border-radius: 6px;
  border: solid 1px #d3d3d3;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const Ul = styled.ul`
background-color: #fff;
    max-height: ${rem(250)};
    font-weight: bold;
    overflow: auto;
    border-radius: 6px;
    margin: -10px 0 0 17px;
    padding: 0;
    border: 1px solid #d3d3d3;
    cursor: pointer;
    
`
const Li = styled.li<IStyled>`
    ${(props) =>
        props.check &&
        css`
        justify-content: space-evenly;
        margin-top: 11px;
    `}
    width: 100;
    list-style: none;
    height: ${rem(40)};
    display: flex;
    background-color: #fff;
`

const selectType = [
    {
        label: '상담중',
        value: '상담중'
    },
    {
        label: '일시정지',
        value: '일시정지'
    },
    {
        label: '상담완료',
        value: '상담완료'
    },
]

function TimeSleectBox(props: Iprops) {
    const [check, setCheck] = useState(false);
    const [type, setType] = useState("상담중");

    return (
        <>
            <Arricle>
                <Button onClick={() => setCheck(!check)}>{type} <KeyboardArrowDownIcon /></Button>
                {
                    check &&
                    <Ul>
                        {
                            selectType.map((res: { label: string, value: string }, index: number) => {
                                return <Li check onClick={() => { setType(res.label), setCheck(false) }} key={index} value={res.value}>{res.label}{type === res.label ? <CheckIcon style={{ color: '#eb541e' }} /> : <CheckIcon style={{ color: "#fff" }} />}</Li>
                            })
                        }
                    </Ul>
                }
            </Arricle>
        </>
    );
}

export default TimeSleectBox;
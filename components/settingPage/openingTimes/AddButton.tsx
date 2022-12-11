import * as React from 'react';
import { PlusIcon, MinusIcon } from '~/components';
import styled from "styled-components";
import { rem } from "polished";

const Radius = styled.div`
background: rgba(0, 0, 0, 0.3);
border-radius: ${rem(500)};
text-align: center;
margin-left: ${rem(6)};
cursor: pointer;
`;

interface Props {
    onClick?(): void;
};

export function AddButton(props: Props) {
    return (
        <div>
            <Radius onClick={props.onClick}>
                <div style={{ padding: "15px 15px 10px " }}><PlusIcon /></div>
            </Radius>
        </div>
    );
};

export function MinusButton(props: Props) {
    return (
        <div>
            <Radius onClick={props.onClick}>
                <div style={{ padding: "15px 15px 10px " }}><MinusIcon /></div>
            </Radius>
        </div>
    );
};
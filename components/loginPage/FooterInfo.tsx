import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

interface IStyle {
    left?: boolean;
    right?: boolean;
}

const Div = styled.div`
margin-top: ${rem(12)};
    font-size: 14;
    color: #9197a4;
`;

const Span = styled.span<IStyle>`
    ${(props) =>
        props.left &&
        css`
        padding-left: ${rem(74)};
        font-weight: 600;
    `}
    ${(props) =>
        props.right &&
        css`
        padding-right: ${rem(74)};
    `}
`;

function FooterInfo() {
    return (
        <Div>
            <Span right><span style={{ fontWeight: 600 }}>전화문의</span> 02-522-7706</Span>
            <Span left>이메일 문의</Span> hello@correctionvitale.com
        </Div>
    );
}

export default FooterInfo;

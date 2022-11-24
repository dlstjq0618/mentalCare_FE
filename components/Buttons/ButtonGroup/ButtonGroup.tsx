import React, { useState, useEffect } from 'react';
import { BaseDialog2, RoundedButton } from '~/components';
import { rem } from "polished";
import styled, { css } from 'styled-components';


interface IProps {
}

const StyledDiv = styled.div`
  display: flex;
`;
const StyledTitle = styled.span`
    font-weight: bold;
    text-align: center;
    font-size: ${rem(25)};
    margin-bottom: ${rem(30)};
`;

function ButtonGroup(props: IProps) {
    const [cancelModal, setCancelModal] = useState(false);

    const handleCancelModalOpen = () => setCancelModal(true);
    const handleCancelModalClose = () => setCancelModal(false);
    return (
        <>
            <StyledDiv>
                <RoundedButton
                    color="gray"
                    css={{
                        fontSize: rem(15),
                        height: rem(35),
                        width: "100%",
                    }}
                >
                    상담 시작
                </RoundedButton>
                <RoundedButton
                    color="gray"
                    css={{
                        fontSize: rem(15),
                        height: rem(35),
                        width: rem(500),
                    }}
                >
                    상담 시간 변경
                </RoundedButton>
                <RoundedButton
                    onClick={() => { handleCancelModalOpen() }}
                    color="gray"
                    css={{
                        fontSize: rem(15),
                        height: rem(35),
                        width: "100%",
                    }}
                >
                    상담 취소
                </RoundedButton>
            </StyledDiv>
            <BaseDialog2 showDialog={cancelModal} close={handleCancelModalClose}>
                <StyledTitle>
                    상담 취소
                </StyledTitle>
                <RoundedButton
                    color="orange"
                    css={{
                        fontSize: rem(15),
                        margin: `${rem(12)} ${rem(24)} 0 0`,
                        height: rem(50),
                        width: "100%",
                    }}
                >
                    취소 완료
                </RoundedButton>
            </BaseDialog2>
        </>
    );
}

export default ButtonGroup;
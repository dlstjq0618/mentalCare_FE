import React, { useState, useEffect } from 'react';
import { rem } from 'polished';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useFormContext } from "react-hook-form";
import {
    MoneyInput
} from "~/components";
import styled, { css } from 'styled-components';
import { selectCounselingInfoData, selectPriceZreo, setPriceZreo } from '~/store/calendarDetailSlice';
import { useDispatch, useSelector } from 'react-redux';

interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
}

// const Item = styled(Paper)(({ theme }) => ({
//     boxShadow: 'none',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     display: 'flex'
// }));

const InfoGrid = styled.div<IStyled>`
  ${(props) =>
        props.width &&
        css`
        width: ${rem(props.width)};
    `}
    padding: ${rem(50)} ${rem(150)};
    height: auto;
    flex-grow: 0;
    border-radius: 20px;
    background-color: #fff;
    margin-top: 1.875rem;
`;

const Item = styled.div<IStyled>`
    box-shadow: 'none';
    text-align: center;
    display: flex;
    color: #666;
    ${(props) =>
        props.bottom &&
        css`
        margin-bottom: ${rem(props.bottom)};
    `}
`;
const Span = styled.span`
font-size: 17px;
margin-right: 6px;
  line-height: 1.4;
  letter-spacing: normal;
  color: #000;
`

export default function PriceGrid() {
    const { register, setValue, setError, trigger, getValues, formState, watch } =
        useFormContext();

    const [am30time, setAm30time] = useState("");
    const [pm30time, setPm30time] = useState("");
    const [am50time, setAm50time] = useState("");
    const [pm50time, setPm50time] = useState("");

    const [call_am30time, setCallAm30time] = useState("");
    const [call_pm30time, setCallPm30time] = useState("");
    const [call_am50time, setCallAm50time] = useState("");
    const [call_pm50time, setCallPm50time] = useState("");
    const infoData = useSelector(selectCounselingInfoData);
    const dispatch = useDispatch()

    const priceData = useSelector(selectPriceZreo);

    useEffect(() => {

        if (Number(am30time) + Number(pm30time) + Number(am50time) + Number(pm50time)
            + Number(call_am30time) + Number(call_pm30time) + Number(call_am50time) + Number(call_pm50time) === 0
            // + infoData?.callConsultationFiftyFeeDay + infoData?.callConsultationFiftyFeeNight +
            // infoData?.callThirtyConsultationFeeDay + infoData.callThirtyConsultationFeeNight +
            // infoData.consultationFiftyFeeDay + infoData.consultationFiftyFeeNight +
            // infoData?.consultationThirtyFeeDay + infoData.consultationThirtyFeeNight === 0
        ) {
            dispatch(setPriceZreo(true));
        } else {
            dispatch(setPriceZreo(false));
        }

        const totle_length = am30time.length + pm30time.length + am50time.length + pm50time.length + call_am30time.length + call_pm30time.length + call_am50time.length + call_pm50time.length
    })



    return (
        <InfoGrid width={900}>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Item bottom={30} style={{ marginBottom: 30, fontSize: 18, lineHeight: 1.4, color: '#333', fontWeight: 'bold' }}>채팅 상담비</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item bottom={16}>
                            <Span>주간</Span><span style={{ marginTop: 2 }}>09:00~18:00</span>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item bottom={16}>
                            <Span>야간</Span><span style={{ marginTop: 2 }}>18:00~22:00</span>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{ placeSelf: "center" }}>30분<span style={{ color: '#eb541e' }}>*</span></span>
                            <MoneyInput
                                onChange={(e) => {
                                    setAm30time(e.target.value), setValue('consultation_thirty_fee_day', e.target.value)
                                }}
                                type="number"
                                placeholder={infoData.consultationThirtyFeeDay?.toLocaleString()}
                                css={{
                                    width: rem(220),
                                    input: { fontSize: rem(17) },
                                    span: { fontSize: rem(14) },
                                }}
                                min={0}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{ placeSelf: "center" }}>30분<span style={{ color: '#eb541e' }}>*</span></span>
                            <MoneyInput
                                onChange={(e) => {
                                    setPm30time(e.target.value), setValue('consultation_thirty_fee_night', e.target.value)
                                }}
                                type="number"
                                placeholder={infoData.consultationThirtyFeeNight?.toLocaleString()}
                                css={{
                                    width: rem(220),
                                    input: { fontSize: rem(17) },
                                    span: { fontSize: rem(14) },
                                }}
                                min={0}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{ placeSelf: "center" }}>50분<span style={{ color: '#eb541e' }}>*</span></span>
                            <MoneyInput
                                onChange={(e) => {
                                    setAm50time(e.target.value), setValue('consultation_fifty_fee_day', e.target.value)
                                }}
                                type="number"
                                placeholder={infoData.consultationFiftyFeeDay?.toLocaleString()}
                                css={{
                                    width: rem(220),
                                    input: { fontSize: rem(17) },
                                    span: { fontSize: rem(14) },
                                }}
                                min={0}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{ placeSelf: "center" }}>50분<span style={{ color: '#eb541e' }}>*</span></span>
                            <MoneyInput
                                onChange={(e) => {
                                    setPm50time(e.target.value), setValue('consultation_fifty_fee_night', e.target.value)
                                }}
                                type="number"
                                placeholder={infoData.consultationFiftyFeeNight?.toLocaleString()}
                                css={{
                                    width: rem(220),
                                    input: { fontSize: rem(17) },
                                    span: { fontSize: rem(14) },
                                }}
                                min={0}
                            />
                        </Item>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: 20 }}>
                    <Grid item xs={12}>
                        <Item bottom={30} style={{ fontSize: 18, lineHeight: 1.4, color: '#333', fontWeight: 'bold' }}>전화 상담비</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item bottom={16}>
                            <Span>주간</Span><span style={{ marginTop: 2 }}>09:00~18:00</span>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item bottom={16}>
                            <Span>야간</Span><span style={{ marginTop: 2 }}>18:00~22:00</span>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{ placeSelf: "center" }}>30분<span style={{ color: '#eb541e' }}>*</span></span>
                            <MoneyInput
                                onChange={(e) => {
                                    setCallAm30time(e.target.value), setValue('call_thirty_consultation_fee_day', e.target.value)
                                }}
                                type="number"
                                placeholder={infoData.callThirtyConsultationFeeDay?.toLocaleString()}
                                css={{
                                    width: rem(220),
                                    input: { fontSize: rem(17) },
                                    span: { fontSize: rem(14) },
                                }}
                                min={0}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{ placeSelf: "center" }}>30분<span style={{ color: '#eb541e' }}>*</span></span>
                            <MoneyInput
                                onChange={(e) => {
                                    setCallPm30time(e.target.value), setValue('call_thirty_consultation_fee_night', e.target.value)
                                }}
                                type="number"
                                placeholder={infoData.callThirtyConsultationFeeNight?.toLocaleString()}
                                css={{
                                    width: rem(220),
                                    input: { fontSize: rem(17) },
                                    span: { fontSize: rem(14) },
                                }}
                                min={0}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{ placeSelf: "center" }}>50분<span style={{ color: '#eb541e' }}>*</span></span>
                            <MoneyInput
                                onChange={(e) => {
                                    setCallAm50time(e.target.value), setValue('call_consultation_fifty_fee_day', e.target.value)
                                }}
                                type="number"
                                placeholder={infoData.callConsultationFiftyFeeDay?.toLocaleString()}
                                css={{
                                    width: rem(220),
                                    input: { fontSize: rem(17) },
                                    span: { fontSize: rem(14) },
                                }}
                                min={0}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{ placeSelf: "center" }}>50분<span style={{ color: '#eb541e' }}>*</span></span>
                            <MoneyInput
                                onChange={(e) => {
                                    setCallPm50time(e.target.value), setValue('call_consultation_fifty_fee_night', e.target.value)
                                }}
                                type="number"
                                placeholder={infoData.callConsultationFiftyFeeNight?.toLocaleString()}
                                css={{
                                    width: rem(220),
                                    input: { fontSize: rem(17) },
                                    span: { fontSize: rem(14) },
                                }}
                                min={0}
                            />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </InfoGrid>
    );
}
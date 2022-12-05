import React, { useState, useEffect, useCallback } from 'react';
import { BaseDialog2, RoundedButton } from '~/components';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from "date-fns";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker } from '../DatePicker';
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import BasicSelect from './SelectBox';
import { UPDATE_OPEN_TIMES_ALL } from '~/utils/constants';
import AntdTimePicker from '../googleCalendar.tsx/DatePicker';
import { useSelector } from 'react-redux';
import { selectCounselingDate } from '~/store/calendarDetailSlice';

interface IProps {
    open: boolean;
    close: () => void;
}
interface IStyled {
    color?: string;
    bold?: string;
    size?: string | number;
    button?: boolean;
    text?: boolean;
    center?: boolean;
    bg?: boolean;
}

const Text = styled.span<IStyled>` 
    font-weight: bold;
    ${(props) =>
        props.size &&
        css`
        font-size: ${rem(props.size)};
        color: ${props.color};
    `}
    ${(props) =>
        props.bg &&
        css`
  height: ${rem(82)};
  margin-top: ${rem(16)};
  flex-grow: 0;
  padding-top: ${rem(15)};
  border-radius: 10px;
  margin-bottom: ${rem(18)};
  background-color: #fff7f4;
    `}
    ${(props) =>
        props.center &&
        css`
        text-align: center;
    `}
    ${(props) =>
        props.bold &&
        css`
        font-weight: ${props.bold};
    `}
    ${(props) =>
        props.button &&
        css`
        height: ${rem(30)};
        flex-grow: 0;
        cursor: pointer;
        padding: 5px 6px 6px;
        border-radius: 4px;
        border: solid 1px #eb541e;
        color:#eb541e;
        letter-spacing: -0.36px;
        font-weight: normal;
        line-height: 1.4;
        font-size: 12px;
    `}
`;
const Div = styled.div<IStyled>`
    display: flex;
    justify-content: space-between;
    ${(props) =>
        props.button &&
        css`
        margin-top: ${rem(30)};
    `}
`;
const Info = styled.div`
    flex-grow: 0;
  font-family: NotoSansCJKKR;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #eb541e;
`
const Line = styled.div`
    height: 1px;
    flex-grow: 0;
    margin: 20px 0 20px 0;
    background-color: #d9d9d9;
`;

const Input = styled.div`
    display: flex;
    cursor: pointer;
    height: ${rem(50)};
    flex-grow: 0;
    margin: 11px 2px 0 2px;
    padding: 13px 14px 14.4px 22px;
    border-radius: 6px;
    border: solid 1px #d3d3d3;
`;

const Select = styled.select<IStyled>`
font-weight: bold;
        display: flex;
    cursor: pointer;
    height: ${rem(50)};
    flex-grow: 0;
    margin: 11px 2px 0 2px;
    padding: 13px 14px 14.4px 22px;
    border-radius: 6px;
    border: solid 1px #d3d3d3;
`;

function ApprovalModal(props: IProps) {
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState<boolean>(props.open);
    const [userName, setUserName] = useState("");
    const [userDate, setUserDate] = useState("");
    const [datePicker, setDatePicker] = useState(false);
    const storeData = useSelector(selectCounselingDate);

    const handleClose = props.close

    const dateOpen = () => setDatePicker(!datePicker);
    const close2 = () => setShow2(false);
    const open2 = () => setShow2(true);
    const open = () => {
        setShow(true);
    };

    const close = () => setShow(false);

    const {
        register,
        setValue,
        getValues,
        control,
        handleSubmit,
        watch,
        trigger,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            phone: "",
            date: new Date().toISOString().split("T")[0],
            time: "",
            treatment: "",
        },
    });
    const selectedDate = watch("date");
    const selectedTime = watch("time");

    const handleDateChange = useCallback(
        (date) => {
            console.log({ date });
            const dateString = format(date, "yyyy-MM-dd");
            setValue("date", dateString);
        },
        [setValue]
    );
    return (
        <>
            <BaseDialog2 style={{ paddingBottom: `${rem(40)}` }} showDialog={props.open} close={handleClose} >
                <Div button>
                    <Text size={20} bold="bold">
                        {"기분좋아 2031"} 님
                    </Text>
                    <Text button>
                        테스트 결과보기
                    </Text>
                </Div>
                <Line />
                <Div>
                    <Text bold='500' size={15} color="#999">
                        상담 방식
                    </Text>
                    <Text bold='normal' size={15} color='#666'>
                        전화
                    </Text>
                </Div>
                <Div>
                    <Text bold='500' size={15} color="#999">
                        상담 요청 시간
                    </Text>
                    <Text bold='normal' size={15} color='#666'>
                        {"2022.10.12 12:30:45"}
                    </Text>
                </Div>
                <Div>
                    <Text bold='500' size={15} color="#999">
                        상담 시간
                    </Text>
                    <Text bold='normal' size={15} color='#666'>
                        {"50분"}
                    </Text>
                </Div>

                <Input style={{ marginTop: `${rem(21)}` }} onClick={dateOpen}>
                    <CalendarTodayIcon />
                    <Text style={{ marginLeft: `${rem(10)}` }}>날짜 선택</Text>
                </Input>

                <Select style={{ marginBottom: `${rem(40)}` }}>
                    <option value={"none"}>날짜선택</option>
                    {
                        UPDATE_OPEN_TIMES_ALL.map((time: { label: string, value: string }, index: number) => {
                            return <option key={index} value={time.value}>{time.label}</option>
                        })
                    }
                </Select>
                <RoundedButton
                    onClick={open}
                    color="orange"
                    css={{
                        fontSize: rem(15),
                        margin: `0 ${rem(24)} 0 0`,
                        height: rem(50),
                        width: "100%",
                    }}
                >
                    상담 승인
                </RoundedButton>
            </BaseDialog2>
            {
                datePicker && <DatePicker open={datePicker} date={new Date(selectedDate)} setDate={handleDateChange} />
            }
            <BaseDialog2 showDialog={show} close={close} style={{
                height: `${rem(387)}`, textAlign: 'center', marginTop: " 14vh"
            }}>
                <Text size={17} bold='normal' center>
                    <Text>기분좋아293</Text>님에게
                    <div>상담 예정 알림이 발송됩니다.</div>
                </Text>
                <Text bg>
                    <Text size={15} color="#666" bold='normal' center>
                        상담 예정 시간
                    </Text>
                    <Info>
                        2022.10.12 오후 12:30
                    </Info>
                </Text>
                <Text size={17} color={"#333"} bold={"normal"}>
                    상담 승인 하시겠습니까?
                </Text>
                <Div style={{ marginTop: `${rem(30)}` }}>
                    <RoundedButton
                        color="black"
                        css={{ flex: 1, height: rem(50), width: rem(153), marginRight: rem(10) }}
                        onClick={() => {
                            console.log("aaaa")
                        }}
                    >
                        취소
                    </RoundedButton>
                    <RoundedButton
                        color="orange"
                        css={{ flex: 1, height: rem(50), width: rem(153) }}
                        onClick={() => { close(), handleClose() }} // 예약확인 api 후 return get api
                    >
                        확인
                    </RoundedButton>
                </Div>
            </BaseDialog2>
        </>
    );
}

export default ApprovalModal;
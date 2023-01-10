import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useDispatch } from 'react-redux';
import { setScheduleSelectModla } from '~/store/calendarDetailSlice';
import { BaseDialog2, RoundedButton, Image } from '~/components';
import calendarIcon from '../../public/icon_calendar@3x.png';

interface IProps {
    label?: string;
}

export function TimeChip(props: IProps) {
    return (
        <Stack direction="row" style={{ padding: `5px 0 7px 14px` }} >
            <Chip style={{ cursor: "pointer" }} icon={<AccessTimeIcon fontSize='small' />} label={props.label} variant="outlined" />
        </Stack>
    );
}

export function CalendarChip(props: IProps) {
    const dispatch = useDispatch();
    return (
        <Stack direction="row" style={{ padding: `5px 0 7px 14px` }} onClick={() => { console.log("aa"), dispatch(setScheduleSelectModla(true)) }}>
            <Chip style={{ cursor: "pointer" }} icon={<Image src={calendarIcon} width={15} height={15} />} label={props.label} variant="outlined" />
        </Stack>
    );
}

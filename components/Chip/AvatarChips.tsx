import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface IProps {
    label?: string;
}

export function TimeChip(props: IProps) {
    return (
        <Stack direction="row" style={{ padding: `5px 0 7px 14px` }} >
            <Chip style={{ cursor: "pointer" }} icon={<AccessTimeIcon />} label={props.label} variant="outlined" />
        </Stack>
    );
}

export function CalendarChip(props: IProps) {
    return (
        <Stack direction="row" style={{ padding: `5px 0 7px 14px` }} >
            <Chip style={{ cursor: "pointer" }} icon={<CalendarTodayIcon />} label={props.label} variant="outlined" />
        </Stack>
    );
}
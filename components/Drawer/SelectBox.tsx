import * as React from 'react';
import Box from '@mui/material/Box';
import { rem } from 'polished';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UPDATE_OPEN_TIMES_ALL } from '~/utils/constants';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function BasicSelect() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <Box sx={{ width: "100%" }}
            style={{
                display: "flex",
                cursor: "pointer",
                height: `${rem(50)}`,
                flexGrow: 0,
                margin: `${rem(11)} ${rem(2)} ${rem(0)} ${rem(2)}`,
                padding: `${rem(13)} ${rem(14)} ${rem(14.4)} ${rem(22)}`,
                borderRadius: `${rem(6)}`,
                border: "solid 1px #d3d3d3",
            }}>
            <FormControl fullWidth>
                <Select
                    IconComponent={() => (
                        <AccessTimeIcon />
                    )}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    sx={{
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0 },
                    }}
                    variant="outlined"
                >
                    {
                        UPDATE_OPEN_TIMES_ALL.map((time: { label: string, value: string }, index: number) => {
                            return <MenuItem key={index} value={time.value}>{time.label}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    );
}
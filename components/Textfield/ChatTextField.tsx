import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { rem } from 'polished'

interface IProps {
    state?: string;

}

export default function InputAdornments(props: IProps) {
    // const state = useSelector(selectCounselingState); // api 상태체크
    const [state, setState] = React.useState("");
    const [values, setValues] = React.useState("");

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleEnter = (e: any) => {
        if (e.key === "Enter") {
            alert("메세지 입력")
        }
    }
    return (
        <Box sx={{
            display: 'flex', flexWrap: 'wrap', background: "white", height: rem(40), marginTop: rem(12)
        }}>
            <FormControl sx={{
                m: 0, width: '100%', '& legend': { display: 'none', borderRadius: 'none' },
                '& fieldset': { top: 0 },
            }} variant="outlined">
                <OutlinedInput
                    style={{ height: 40 }}
                    disabled={props.state === "finish" ? true : false}
                    placeholder={`${state === "finish" ? "상담이 완료 되었습니다." : ""}`}
                    id="outlined-adornment-password"
                    value={values}
                    label={"none"}
                    size={"small"}
                    onChange={(e) => setValues(e.target.value)}
                    autoComplete={"off"}
                    onKeyPress={handleEnter}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                style={{
                                    background: `${state === "finish" ? "#c4c4c4" : "#e8440a"}`, color: "white",
                                    marginRight: "-11.2px", width: "35px", height: "35px"
                                }}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
}
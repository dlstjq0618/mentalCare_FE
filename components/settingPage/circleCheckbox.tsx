import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Iprops {
    check?: any
}

export default function IconCheckboxes(props: Iprops) {
    // infoData 호출 후 weekday 있으면 checked
    return (
        <div>
            <Checkbox
                {...label}
                checked={props.check}
                sx={{
                    padding: 0,
                    color: "gray",
                    '&.Mui-checked': {
                        color: "#eb541e",
                    },
                }}
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
            />
        </div>
    );
}
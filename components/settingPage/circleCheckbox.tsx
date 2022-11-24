import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function IconCheckboxes() {
    return (
        <div>
            <Checkbox
                {...label}
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
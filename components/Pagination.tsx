import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { api2 } from "~/mentalcareapi";
import { useDispatch } from 'react-redux';
import { setNoticeDescription } from "~/store/settingsSlice";

interface Iprops {
    pages: any;
}

export default function PaginationControlled(props: Iprops) {
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        api2.counselor.Lists(page).then((res: any) => {
            dispatch(setNoticeDescription(res.query?.result.postList))
        })
    }, [page])

    console.log("change", page);

    return (
        <Stack spacing={2}>
            <Pagination count={props.pages} page={page} onChange={handleChange} sx={{ placeSelf: 'center' }} />
        </Stack>
    );
}
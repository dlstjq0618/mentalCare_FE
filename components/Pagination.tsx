import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { api2 } from "~/mentalcareapi";
import { useDispatch } from 'react-redux';
import { setNoticeDescription, setNoticeDescription2 } from "~/store/settingsSlice";

interface Iprops {
    pages: any;
}

export default function PaginationControlled(props: Iprops) {
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        api2.counselor.Lists(page).then((res: any) => {
            dispatch(setNoticeDescription(res.query?.result.postList))
            // dispatch(setNoticeDescription2(res.query?.result.noticeList))
        })
    }, [page])

    useEffect(() => {
        setPageCount(Math.floor(props.pages / 10))
    }, [props.pages])

    return (
        <Stack spacing={2}>
            <Pagination count={pageCount} page={page} onChange={handleChange} sx={{ placeSelf: 'center' }} />
        </Stack>
    );
}
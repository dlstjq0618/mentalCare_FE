import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarIndex from "~/components/googleCalendar.tsx";
import Layout from "~/components/Layout";
import {
    MainTitle,
} from "~/components/settlementAccount";
import { setCalendarUserList } from "~/store/calendarDetailSlice";

// api는 page component 안에서 호출 및 스토어 저장

function ScheduleIndex() {
    const testData = [{
        id: "Sean",
        date: "2022-10-18",
        type: "전화",
    },
    {
        id: "Emily",
        date: "2022-10-18",
        type: "전화"
    },
    {
        id: "Sean",
        date: "2022-10-18",
        type: "전화"
    },
    {
        id: "Emily",
        date: "2022-10-18",
        type: "전화"
    },
    {
        id: "Sean",
        date: "2022-10-18",
        type: "전화"
    },
    {
        id: "Kei",
        date: "2022-10-19",
        type: "채팅"
    },
    {
        id: "Mason",
        date: "2022-10-24",
        type: "채팅"
    },
    {
        id: "Moon",
        date: "2022-10-01",
        type: "채팅"
    },
    {
        id: "Daniel",
        date: "2022-10-02",
        type: "채팅"
    },
    {
        id: "Lucky",
        date: "2022-10-08",
        type: "채팅"
    },
    {
        id: "RavinRavinRavinRavin",
        date: "2022-10-15",
        type: "채팅"
    },
    {
        id: "Ravin",
        date: "2022-10-15",
        type: "채팅"
    },
    {
        id: "Ravin",
        date: "2022-10-15",
        type: "채팅"
    },
    {
        id: "Ravin",
        date: "2022-10-15",
        type: "채팅"
    },
    {
        id: "Ravin",
        date: "2022-10-15",
        type: "채팅"
    },
    {
        id: "Ravin",
        date: "2022-10-15",
        type: "채팅"
    },
    {
        id: "Ravin",
        date: "2022-10-15",
        type: "채팅"
    },
    {
        id: "Yily",
        date: "2022-10-05",
        type: "채팅"
    },
    {
        id: "Yily",
        date: "2022-10-05",
        type: "전화"
    },

    ]
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCalendarUserList(testData));
    }, [testData]);

    return (
        <Layout>
            <MainTitle>대기실</MainTitle>
            <CalendarIndex />
        </Layout>
    );
};

export default ScheduleIndex;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarIndex from "~/components/googleCalendar.tsx";
import {
    MainTitle,
} from "~/components/settlementAccount";
import LayoutComponent from "~/components/Layout";
import BoxSx from "~/components/ChatBox";

// api는 page component 안에서 호출 및 스토어 저장

interface Iprops {
}

function ScheduleIndex(props: Iprops) {

    return (
        <>
            <LayoutComponent>
                <MainTitle>대기실</MainTitle>
                <CalendarIndex />
                <BoxSx />
            </LayoutComponent>
        </>
    );
};

export default ScheduleIndex;

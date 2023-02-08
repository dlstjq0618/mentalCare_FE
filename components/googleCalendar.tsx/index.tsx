import React, { useState, useContext, useEffect } from "react";
import { getMonth } from '~/utils/getMonth'
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import GlobalContext from "~/context/GlobalContext";
import styled from 'styled-components';
import dynamic from "next/dynamic";

const Div = styled.div`
    width: 100%;
`

function CalendarIndex() {
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const { monthIndex } = useContext(GlobalContext);

    // const DynamicHeader = dynamic(() => import('./CalendarHeader'), {
    //     ssr: false,
    // })

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])


    return (
        <Div>
            <CalendarHeader />
            <Month month={currentMonth} />
        </Div>
    );
};

export default CalendarIndex;

import React, { useState } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs'

function ContextWrapper(props: any) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    return (
        <GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;
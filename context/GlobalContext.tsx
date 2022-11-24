import React from 'react'

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index: number) => { },
})

export default GlobalContext
import React, { useEffect } from 'react';

interface Iprops {
    chat?: any
}

function _footer(props: Iprops) {
    useEffect(() => {
        console.log("props.chat", props.chat)
    })
    return (
        <>

        </>
    );
}

export default _footer;
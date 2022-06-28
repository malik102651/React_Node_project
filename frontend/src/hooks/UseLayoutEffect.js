import React, { useLayoutEffect, useEffect } from 'react'

function UseLayoutEffect() {
    useLayoutEffect(() => {
        console.log("UseLayoutEffect");
    }, [])
    useEffect(() => {
        console.log("UseEffect");
    }, [])
    return (
        <div>UseLayoutEffect</div>
    )
}

export default UseLayoutEffect
import React, { useRef } from 'react'
import UserefChild from './UserefChild';

function UserefParent() {

    let inputRef = useRef(null);
    const updateInput = () => {
        inputRef.current.value="1000"
        inputRef.current.style.color="red"
        inputRef.current.focus()
    }

    return (
        <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center"}}>
            <h1>Forward Ref in react</h1>
            <UserefChild ref={inputRef}/>
            <button onClick={updateInput}>UpdateInput Box</button>
        </div>

    )
}

export default UserefParent
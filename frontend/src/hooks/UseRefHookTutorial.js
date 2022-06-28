import React, { useRef } from 'react'

function UseRefHookTutorial() {
    const inputRef = useRef(null);
    const onClick = () => {
       // inputRef.current.focus();
      // inputRef.current.value=""
       console.log(inputRef.current.value)
    }

    return (
        <div>
            <h1>UseRefHookTutorial</h1>
            <input type='text' placeholder='Ex........' ref={inputRef} />
            <button onClick={onClick}>Change Name</button>
        </div>
    )
}

export default UseRefHookTutorial
import React, { useState, useMemo } from 'react'

function UseMemoHook() {
    const [count, setCount] = useState(0);
    const [item, setItem] = useState(10);
    const multiCountMemo = useMemo(() => {
        console.log("multicount")
        return count * 5;
    },[count])
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h1>UseMemoHook</h1>
            <h2>Count: {count}</h2>
            <h2>Item: {item}</h2>
            {multiCountMemo}
            <div>
                <button onClick={() => setCount(count + 1)}>Update Count</button>
                <button onClick={() => setItem(item * 10)}>Update Item</button>
            </div>
        </div>
    )
}

export default UseMemoHook
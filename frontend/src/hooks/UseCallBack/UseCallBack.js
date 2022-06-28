import React, { useCallback, useState } from 'react'
import Todo from './Todo'

function UseCallBack() {
    const [count, setCount] = useState(0)
    const [todo, setTodo] = useState([])

    const handleIncrement = () => {
        setCount(count + 1);
    }
    const addnewtodo = useCallback(() => {
        console.log("Some Operations")
        setTodo("List Updated")
    }, [todo])

    return (
        <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center"}}>
            <h1> UseCallBack </h1>
            <Todo todo={todo} addnewtodo={addnewtodo} />
            <h2>Count Value is: {count}</h2>
            <button onClick={handleIncrement}>Increment</button>
        </div>
    )
}

export default UseCallBack
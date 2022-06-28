import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap';

function UseRefHook() {
    const [inputValue, setInputValue] = useState("");
    const count = useRef(0);
    const previousInputValue = useRef("");

    const inputElement = useRef();

    const focusInput = () => {
        inputElement.current.focus();
    };


    useEffect(() => {
        count.current = count.current + 1;
        previousInputValue.current = inputValue;
    }, [inputValue]);

    //useRef is used to store the reference of the element
    const [todocount, setTodoCount] = useState(0);
    const [todos, setTodos] = useState([]);

    const increment = () => {
        setTodoCount((c) => c + 1);
    };
    const addTodo = useCallback(() => {
        setTodos((t) => [...t, "New Todo"]);
    }, [todos]);
    //useRef is used to store the reference of the element
    return (
        <Container>
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <input type="text" ref={inputElement} />
                <button onClick={focusInput}>Focus Input</button>
                <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                    __________________________________________
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <h1>Render Count: {count.current}</h1>
                <h2>Current Value: {inputValue}</h2>
                <h2>Previous Value: {previousInputValue.current}</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                __________________________________________
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <h2>My Todos</h2>
                {todos.map((todo, index) => {
                    return <p key={index}>{todo}</p>;
                })}
                <button onClick={addTodo}>Add Todo</button>
                <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                    __________________________________________
                </div>
                <div>
                    Count: {todocount}
                    <button onClick={increment}>+</button>
                </div>
            </div>
        </Container>
    )
}

export default UseRefHook
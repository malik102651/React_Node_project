import React, { useState, createContext } from 'react'
import Login from './Login';
import User from './User';

export const Context = createContext(null);

function ContextTutorial() {
    const [userName, setUserName] = useState('')
    return (
        <Context.Provider value={{ userName, setUserName }} >
            <Login/><User/>
        </Context.Provider>
    )
}

export default ContextTutorial
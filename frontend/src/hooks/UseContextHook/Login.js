import React, { useContext } from 'react'
import { Context } from './ContextTutorial'

function Login() {
    const { setUserName } = useContext(Context)
    return (
        <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center"}}><input onChange={(e) => { setUserName(e.target.value) }}/></div>
    )
}

export default Login
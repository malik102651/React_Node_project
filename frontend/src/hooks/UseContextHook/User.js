import React, { useContext } from 'react'
import { Context } from './ContextTutorial'

function User() {
    const { userName } = useContext(Context)
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h1>User:{userName}</h1>
        </div>
    )
}

export default User
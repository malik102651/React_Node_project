import React, { memo } from 'react'

function Todo({todo, addnewtodo}) {
    console.log("todo list render")
    console.log(todo)
  return (
    <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center"}}><h2>Todo</h2>
    <button onClick={addnewtodo}>add todo</button></div>
  )
}

export default memo(Todo)
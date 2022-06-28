import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'

function FunctionClick() {
  const [bgclr, setbgclr] = useState("#8e44ad")
  const [text, settext] = useState("Click Me")
  const chngclr = () => {
    //console.log("clicked")
    setbgclr("#2e7d32")
    settext("Single Click !!")
  }
  const dbclick = () => {
    //console.log("clicked")
    setbgclr("#8e44ad")
    settext("Double Click !!")
  }


  return (
    <>
      <Container
        style={{
          width: '100%',
          height: "93vh",
          backgroundColor: bgclr,
          display: "flex",
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Button
          style={{
            padding: "20px 40px",
            background: "#9b59b6",
            color: "white",
            border: "2px solid #ecf0f1",
            outline: 'none',
            borderRadius: "5px",
            cursor: 'pointer',
            fontSize: "40px"
          }}
          onClick={chngclr}
          onDoubleClick={dbclick}
        >
          {text}
        </Button>
      </Container>

    </>
  )
}

export default FunctionClick
import React, { useCallback, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';

function UserRightClickMenu() {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false); // hide menu

    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setShow(true);
        },
        [setAnchorPoint]
    );
    const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });
    const handleDrag = (e) => {
        console.log("Dragging...")
        console.log("X: " + e.clientX + " | Y: " + e.clientY)
        console.log(e)
    }
    //onDrop onDragLeave onDragEnter onDragOver
    const handleOnDragStart = (event) => {
        event.dataTransfer.setData("Text", event.target.id);
        console.log("draged start");
    };
    const handleOnDropOver = (event) => {

        console.log("droped over");
    };
    const handleOnDragEnter = (event) => {


        if (event.target.className === "destination") {
            event.target.style.backgroundColor = "lightblue";
        }

        console.log("draged enter");
    };

    const handleOnDragExit = (event) => {
        console.log(event.target)

        if (event.target.class === "destination") {
            event.target.style.backgroundColor = " ";
        }

        console.log("drag exit");
    };

    const handleOnDrop = (event) => {
        event.preventDefault();
        // console.log(event.target.className)
        // if ( event.target.className === "destination" ) {
        //     event.target.style.backgroundColor = "";
        //     var data = event.dataTransfer.getData("Text");
        //     console.log(data);
        //     event.target.appendChild(data);
        //   }

        console.log("droped");
    };
    //onDrop onDragLeave onDragEnter onDragOver

    //keyboard event
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);

    // onKeyDown handler function
    const keyDownHandler = (event) => {
        console.log(event.code);
        if (event.code === "ArrowUp") {

            setTop((top) => top - 10);

        }

        if (event.code === "ArrowDown") {
            setTop((top) => top + 10);
        }

        if (event.code === "ArrowLeft") {
            setLeft((left) => left - 10);
        }

        if (event.code === "ArrowRight") {
            setLeft((left) => left + 10);
        }
    };
    //keyboard event

    //Key Pressed Event
    const [state, setState] = useState('');

    const handler = (event) => {
        // changing the state to the name of the key
        // which is pressed
        setState(event.key);
    };
    //Key Pressed Event
    return (
        <Container style={{ width: "100%", height: "93vh", display: "flex", justifyContent: "center", backgroundColor: "purple", flexDirection: 'column' }}>
            <h1 style={{ color: "white", display: "flex", justifyContent: "center" }}>Right click somewhere on the page..</h1>
            {show ? (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x,
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        borderRadius: "2px",
                        padding: "5px 0 5px 0",
                        width: "150px",
                        height: "auto",
                        margin: "0",
                        /* use absolute positioning  */
                        position: "absolute",
                        listStyle: "none",
                        boxShadow: "0 0 20px 0 #ccc",
                        opacity: "1",
                        transition: "opacity 0.5s linear",
                    }}
                >
                    <li>Share to..</li>
                    <li>Cut</li>
                    <li>Copy</li>
                    <li>Paste</li>
                    <hr className="divider" />
                    <li>Refresh</li>
                    <li>Exit</li>
                </ul>
            ) : (
                <> </>
            )}
            <div
                draggable
                onDrag={handleDrag}
                style={{ color: "white", display: "flex", justifyContent: "center", fontSize: "30px" }}>
                ON DRAG
            </div>
            <div>

            </div>
            <div
                className="destination"
                style={{ height: "100px", backgroundColor: "red" }}
                onDragOver={handleOnDropOver}
                onDrop={handleOnDrop}
                onDragEnter={handleOnDragEnter}
                onDragLeave={handleOnDragExit}
                onDragStart={handleOnDragStart}

            >
                <h1 id="source">Drag File And Drop</h1>
            </div>
            <div className="destination" style={{ height: "100px", backgroundColor: "green" }}></div>
            <div className="container" tabIndex={0} onKeyDown={keyDownHandler}
                style={{
                    width: "100%",
                    height: "100vh",
                    background: "orange",
                }}
            >
                <div className="box"
                    style={{
                        top: top,
                        left: left,
                        width: "100px",
                        height: "100px",
                        background: "yellow",
                        border: "3px solid #333",
                        position: "fixed",
                    }}>

                </div>
            </div>
            <div style={{  backgroundColor: "lightblue",display: "flex",flexDirection: 'column',justifyContent: "center",textAlign:"center", }}>
                <h1>Kye Pressed Event!</h1>

                <p>Key pressed is: {state}</p>


                {/* Passing the key pressed to the handler function */}
                <div style={{display: "flex",justifyContent: "center"}}>
                <input type="text" style={{width: "20%",border: "2px solid black",borderRadius: '10px'}}placeholder="Enter a Key" onKeyPress={(e) => handler(e)} />
                </div>

            </div>
        </Container>


    )
}

export default UserRightClickMenu
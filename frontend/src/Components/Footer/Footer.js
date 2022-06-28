import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
    return (
        <footer
            style={{
                width: "100%",
                position: "relative",
                bottom: "0",
                display: "flex",
                justifyContent: "center"
            }}>
                <Container>
                    <Row>
                        <Col style={{textAlign: "center",paddingTop: "10px",paddingBottom: "10px"}}>Copyright &copy; Notes</Col>
                    </Row>
                </Container>

        </footer>
    )
}

export default Footer
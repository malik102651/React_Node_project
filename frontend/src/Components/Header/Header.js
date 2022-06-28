import React, { useEffect, useState } from 'react'
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import {
    useDispatch, useSelector,
    // useSelector 
} from 'react-redux'
import { logout } from '../../actions/userAction';
import Loading from '../Loading';
function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.userLogin);
    const [dataloading, setDataLoading] = useState(false)
    const [getdata, setGetData] = useState({});


    const logoutHandler = () => {
        dispatch(logout);
        navigate('/');
    }
    const fetchData = () => {
        setGetData(userdata.userInfo)
    }
    useEffect(() => {
        if (userdata) {
            setDataLoading(true)
            fetchData();
            setDataLoading(false)
        }
    }, [userdata])

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        React-Node
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='m-auto'>
                        <Form inline>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-sm-2"
                            />
                        </Form>
                    </Nav>

                    <Nav >
                        <Nav.Link href="/mynotes">
                            <Link to='/mynotes'>My Notes</Link>
                        </Nav.Link>
                        {dataloading && <Loading />}
                        <NavDropdown title={getdata?.name} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>


                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default Header
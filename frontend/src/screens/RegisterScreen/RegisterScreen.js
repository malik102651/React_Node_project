// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../actions/userAction';
import ErrorMessage from '../../Components/ErrorMessage';
import Loading from '../../Components/Loading';
import MainScreen from '../../Components/MainScreen'

function RegisterScreen() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    // const [successmessage, setSuccessMessage] = useState(null);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {

        if (userInfo) {
            navigate('/mynotes')
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setMessage("Password Do Not Match")
        } else {
            dispatch(register(name, email, password))
            // setMessage(null)

            // try {
            //     const config = {
            //         headers: {
            //             "Content-type": "application/json"
            //         },
            //     };
            //     setLoading(true)

            //     const { data } = await axios.post(
            //         "/api/users",
            //         { name, email, password },
            //         config
            //     );
            //     setSuccessMessage("REGISTERED SUCCESSFULLY!")
            //     console.log(data)
            //     setLoading(false)
            //     localStorage.setItem("userInfo", JSON.stringify(data));
            // } catch (error) {
            //     setError(error.response.data.message)
            //     setLoading(false)
            // }
        }

    }

    return (
        <MainScreen title='REGISTER'>
            <div className='logincontainer'>
                {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                {/* {successmessage && <ErrorMessage variant='success'>{successmessage}</ErrorMessage>} */}
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form
                    onSubmit={submitHandler}
                >
                    <Form.Group className="mb-3" controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="pic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.File
                            type="image/png"
                            label="Upload Profile Picture"
                            custom
                            
                            // onChange={(e) => postDetails(e.target.files[0])}
                        />
                    </Form.Group> */}
                    {/* <div className="mb-3">
                        <div className="custom-file smaller-input">
                        <label className="custom-file-label" for="inputGroupFile01">
                                Choose your image
                            </label>
                            <input
                                type="image/png"
                                className="custom-file-input"
                                
                              
                                // onChange={(e) => postDetails(e.target.files[0])}
                               
                            />
                           
                        </div>
                    </div> */}

                    <Button variant="primary" type="submit">
                        REGISTER
                    </Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        Have an Account ? <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen
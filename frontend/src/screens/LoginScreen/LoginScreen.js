import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MainScreen from '../../Components/MainScreen'
import './LoginScreen.css'
// import axios from 'axios'
// import Loading from '../../Components/Loading'
// import ErrorMessage from '../../Components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userAction'
import axios from 'axios'

function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dsipatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const {
        loading,
        error,
        userInfo } = userLogin;
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [successmessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    if (userInfo) {
        navigate('/mynotes')
    }

    //    const {userInfo}=userLogin;

    //  console.log(userInfo)
    // const usertoken = localStorage.getItem("UserToken")
    // console.log(usertoken)
    // const getUser = async() => {

    //     const data= await axios.get( `http://localhost:3001/api/users/data${usertoken}`);

    //     console.log(data)

    // }


    // useEffect(() => {

    //     if (usertoken) {
    //         getUser()
    //         // dsipatch(login(email, password));
    //     }
    // }, [usertoken]);

    const submitHandler = async (e) => {
        e.preventDefault();
        // if(usertoken){

        //     const data= await axios.get( `http://localhost:3001/api/users/data${usertoken}`);
        //     console.log(data)
            
        // }
        dsipatch(login(email, password));




        // try {
        //     const config = {
        //         headers: {
        //             "Content-type": "application/json"
        //         }
        //     }

        //     setLoading(true)

        //     const {data} = await axios.post(
        //         "/api/users/login",
        //         {
        //             email,
        //             password,
        //         },
        //         config
        //     );
        //     setSuccessMessage("LOGIN SUCCESSFULLY!")
        //     console.log(data)
        //     localStorage.setItem("UserInfo", JSON.stringify(data));
        //     setLoading(false)
        // } catch (error) {
        //     // setLoading(false)
        //     setError(error.response.data.message)
        // }
    }



    return (
        <MainScreen title='LOGIN'>
            <div className='logincontainer'>
                {/* {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>} */}
                {/* {loading && <Loading />}
                {successmessage && <ErrorMessage variant='success'>{successmessage}</ErrorMessage>} */}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        New Customer ? <Link to='/register'>Register Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default LoginScreen


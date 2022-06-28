import axios from 'axios';
//import { parse } from 'path';
import React, { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../../actions/userAction';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import './LandingPage.css'

function LandginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const noteList = useSelector((state) => state.noteList);
    // const { loading, notes, error } = noteList;
   
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [successmessage, setSuccessMessage] = useState(null);

    

    // if (userInfo) {
    //     navigate('/mynotes')
    // }
    // const registerHandler = async() => {
    //     localStorage.removeItem("UserToken");
    //     navigate('/register')
    // }
    const CheckUser = async () => {
        const userToken=localStorage.getItem("UserToken")

        if(userToken){
            try {
                const userToken=localStorage.getItem("UserToken")
                //console.log(userToken)
              let result = await axios.post(          // any call like get
                  "http://localhost:3001/api/users/userData",         // your URL
                  {                                     // data if post, put
                      usertoken: userToken,
                  }
              );
              console.log();
              
              dispatch({ type: USER_LOGIN_SUCCESS, payload: result.data })
              // const {
              //     userLogin: {userInfo},
              // }=getState();
              // console.log(userInfo)
              navigate('/mynotes')
              
          } catch (error) {
              return error;     // NOTE - use "error.response.data` (not "error")
          }
        }else{
            navigate('/login')
        }


        // navigate('/login')
        


        // const userToken=localStorage.getItem("UserToken")
        // console.log(userToken)
        // if(userToken){
        //     const data= await axios.get(`http://localhost:3001/api/users/${userToken}`);
        //     // const {userData}=await JSON.parse(data);

        //     console.log(data);
        // }

    }

    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to Note Zipper</h1>
                            <p className='subtitle'>One Safe Place for all yours notes.</p>
                        </div>
                        <div className='buttoncontainer'>

                            <Button
                                size='lg'
                                className='landingutton'
                                onClick={() => CheckUser()}

                            >
                                Login
                            </Button>


                            <Button
                                size='lg'
                                className='landingutton'
                                variant='outline-primary'
                                onClick={()=>navigate('/register')}
                            >
                                SignUp
                            </Button>

                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandginPage
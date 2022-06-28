import axios from "axios";
import { useSelector } from "react-redux";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

export const login = (email, password) => async (dispatch,getState) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(
            "http://localhost:3001/api/users/login",
            {
                email,
                password,
            },
            config
        );
        //console.log(data)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        const {
            userLogin: {userInfo},
        }=getState();

        //console.log(userInfo)

        //console.log(userInfo.token)
        
        
        localStorage.setItem("UserToken", JSON.stringify(userInfo.token));
        sessionStorage.setItem("UserToken", JSON.stringify(userInfo.token));
        const token=localStorage.getItem("UserToken")
        //console.log(token)
        //localStorage.setItem("UserId", JSON.stringify(userInfo._id));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
            // error.response && error.response.data.message
            //     ? error.response.data.message
            //     : error.message
        });
    }

}

export const logout = async (dsipatch) => {
    localStorage.removeItem("UserToken");
    dsipatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                "Content-type": "application/json"
            },
        };


        const { data } = await axios.post(
            "http://localhost:3001/api/users",
            { name, email, password },
            config
        );
        //console.log(data)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("UserToken", JSON.stringify(data.token));
        //console.log(JSON.stringify(data))
        //localStorage.setItem("UserInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error
            //  error.response && error.response.data.message
            //     ? error.response.data.message
            //     : error.message
        })

    }
}
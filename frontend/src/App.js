
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LandingPage from './screens/LandingPage/LandginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNotes from './screens/MYNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote'
import SingleNote from './screens/SingleNote/SingleNote';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_LOGIN_SUCCESS } from './constants/userConstants';
import { useDispatch } from 'react-redux';
import { PrivateRoute, PublicRoute } from './Routes/routes';
import { logout } from './actions/userAction';
import FunctionClick from './MouseEventListener/ClickListener';
import UserRightClickMenu from './MouseEventListener/UserRightClickMenu';
import UseRefHook from './hooks/UseRefHook';
import UseEffectHook from './hooks/UseEffectHook';
import UseRefHookTutorial from './hooks/UseRefHookTutorial';
import UserefParent from './hooks/UserefParent';
import ContextTutorial from './hooks/UseContextHook/ContextTutorial';
import UseMemoHook from './hooks/UseMemoHook';
import UseCallBack from './hooks/UseCallBack/UseCallBack';


function App() {
  const dispatch = useDispatch()



  const [authentication, setAuthState] = useState(false);

  const usertoken = localStorage.getItem("UserToken")
  const token = sessionStorage.getItem("UserToken")
  //console.log("the session storage is",token)
  //console.log(usertoken)
  const checkUser = async () => {
    try {
      const userToken = localStorage.getItem("UserToken")

      let result = await axios.post(          // any call like get
        "http://localhost:3001/api/users/userData",         // your URL
        {                                     // data if post, put
          usertoken: userToken,
        }
      );
      //console.log(result.data);
      setAuthState(true);

      dispatch({ type: USER_LOGIN_SUCCESS, payload: result.data })


      // SetUserlogin(true);


    } catch (error) {
      console.error(error);
   
      
    }
  }
  //console.log(authentication)

  useEffect(() => {

    if (usertoken) {
      checkUser();
    }



  }, [usertoken])

  return (
    <BrowserRouter>

    

      <Header />
      <main >
        <Routes>
          {/* {userlogin && <Route path='/mynotes' element={<MyNotes />} />} */}
          <Route path='/' element={<LandingPage />} />

          {/* <Route path='/login' element={<PublicRoute authentication><LoginScreen /></PublicRoute>} /> */}
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/mynotes' element={<PrivateRoute authentication><MyNotes /></PrivateRoute>} />
          <Route path='/mynotes/:token' element={<MyNotes />} />
          <Route path='/createnote' element={<CreateNote />} />
          <Route path='/note/:id' element={<SingleNote />} />
          <Route path='/click' element={<FunctionClick />} />
          <Route path='/contextmenu' element={<UserRightClickMenu />} />
          <Route path='/userefhook' element={<UseRefHook/>} />
          <Route path='/useEffecthook' element={<UseEffectHook/>} />
          <Route path='/userefhooktutorial' element={<UseRefHookTutorial/>} />
          <Route path='/UserefParent' element={<UserefParent/>} />
          <Route path='/ContextTutorial' element={<ContextTutorial/>} />
          <Route path='/UseMemoHook' element={<UseMemoHook/>} />
          <Route path='/UseCallBack' element={<UseCallBack/>} />



        </Routes>
      </main>
      <Footer />

    </BrowserRouter >
  );
}

export default App;

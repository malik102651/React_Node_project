import React, { useEffect, useState } from 'react'
import MainScreen from '../../Components/MainScreen'
import { useNavigate } from 'react-router-dom'
import { Accordion, Badge, Button, Card, } from 'react-bootstrap'
// import notesdata from '../../data/notes'
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction, listNotes } from '../../actions/notesActions'
import Loading from '../../Components/Loading'
import ErrorMessage from '../../Components/ErrorMessage'
import store from '../../store'


function MyNotes({ match }) {

    const dispatch = useDispatch();
    const noteList = useSelector((state) => state.noteList);
    const { loading, notes, error } = noteList;
    const userdata = useSelector((state) => state.userLogin);
    const navigate = useNavigate();
    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;
    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;
    const noteDelete = useSelector((state) => state.noteDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;
    const [dataloading, setDataLoading] = useState(false)
    const [getdata, setGetData] = useState({});
    const [tokenerror,setTokenError]=useState(false)



    //console.log(match)

    //console.log(userdata)
    const deleteHandler = (id) => {
        if (window.confirm("Are You Sure")) {
            dispatch(deleteNoteAction(id));
        }

    }
   
    const fetchData = () => {

        //console.log("helo")

        setGetData(userdata.userInfo)
        setTokenError(false)
    }
    //console.log(getdata)
    


    useEffect(() => {
        dispatch(listNotes())
        
        if (!userdata) {
            navigate('/')
        }
        else {
            setDataLoading(true)
            fetchData();
            if(!getdata){
                setTokenError(true)
            }       
            setDataLoading(false)
        }
    }, [dispatch, successCreate, navigate,userdata, successUpdate, successDelete,getdata])
    
     // const usertoken=localStorage.getItem("UserToken")




    // const fetchNotes = async () => {

    //     const { data } = await axios.get("/api/notes")

    //     setNotes(data);


    // }

    // const getNotesData = () => {

    //     const UserNotes = localStorage.getItem("UserNotes")
    //    console.log(UserNotes)
    //    let result = UserNotes.map(res => res.category);
    //    console.log(result)

    // }



    //console.log(usernotes)
  



    return (
        <>
             
             {dataloading && <Loading />}
            <MainScreen

                title={`Welcome Back ${getdata?.name}`}
            >
                {tokenerror && <ErrorMessage variant='danger'>{"Not Authorized Token"}</ErrorMessage>}
                
                {/* <Link to='/createnote'> */}
                <Button style={{ marginLeft: 10, marginBottom: 6, }} size="lg" onClick={() => navigate('/createnote')}>
                    Create New Note
                </Button>
                {/* </Link> */}
                {/* 
                {loadingDelete && <Loading />}
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}*/}
                
                {loading && <Loading />}
                
                {
                    notes?.map(note => (
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Card style={{ margin: 10 }}>
                                    <Card.Header style={{ display: "flex" }}>
                                        <span
                                            style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                                flex: 1,
                                                cursor: 'pointer',
                                                alignSelf: 'center',
                                                fontSize: 18,



                                            }}>
                                            <Accordion.Header style={{ textDecoration: 'none' }}> {note.title} </Accordion.Header>
                                        </span>
                                        <div>
                                            <Button href={`/note/${note._id}`}>Edit</Button>
                                            <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>Delete</Button>
                                        </div>
                                    </Card.Header>
                                    <Accordion.Body>

                                        <Card.Body>
                                            <h4>
                                                <Badge bg="success" style={{ color: 'white' }}>category - {note.category}</Badge>
                                            </h4>
                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                    {note.content}
                                                </p>
                                                <footer className="blockquote-footer">
                                                    Created on {' '}
                                                    <cite title='Source Title'>
                                                        {note.createdAt.substring(0, 10)}
                                                    </cite>
                                                </footer>
                                            </blockquote>
                                        </Card.Body>
                                    </Accordion.Body>

                                </Card>
                            </Accordion.Item>
                        </Accordion>
                    ))

                }

            </MainScreen>
        </>

    )
}

export default MyNotes
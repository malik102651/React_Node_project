import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate,useParams } from 'react-router-dom'
import MainScreen from '../../Components/MainScreen'
import Loading from '../../Components/Loading'
import ErrorMessage from '../../Components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { createNoteAction, deleteNoteAction, updateNoteAction } from '../../actions/notesActions'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
// import { contentType } from 'express/lib/response'

function SingleNote( ) {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [category, setCategory] = useState()
    const [date, setDate] = useState()
    
    const params = useParams();
   // console.log(params.id)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const noteUpdate = useSelector((state) => state.noteUpdate);

    const { loading, error, } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

    //const [usernotes, setUserNotes] = useState([])


    const deleteHandler = (id) => {
        if (window.confirm("Are You Sure")) {
            dispatch(deleteNoteAction(id));
        }
        navigate('/mynotes')
    }

    const resetHandler = () => {
        setTitle('');
        setContent('');
        setCategory('');
    }

    const updateHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateNoteAction(params.id, title, category, content));
        if (!title || !content || !category) return;

        resetHandler();
        navigate('/mynotes')

    }

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`http://localhost:3001/api/notes/${params.id}`);
            //console.log(params.id)
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };
        fetching();

    }, [date])


    return (
        <MainScreen title='Edit Note'>
            <Card>
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {errorDelete && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        {loadingDelete && <Loading />}
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter the Content"
                                row={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="category"
                                placeholder="Enter the Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>

                        {loading && <Loading size={50} />}

                        <Button type='submit' variant='primary'>
                            Update Note
                        </Button>

                        <Button className='mx-2' onClick={() => { deleteHandler(params.id) }} variant='danger'>
                            Delete Note
                        </Button>

                    </Form>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    Updating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>

    )
}

export default SingleNote
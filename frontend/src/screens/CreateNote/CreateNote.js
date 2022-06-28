import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import MainScreen from '../../Components/MainScreen'
import Loading from '../../Components/Loading'
import ErrorMessage from '../../Components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { createNoteAction } from '../../actions/notesActions'
import ReactMarkdown from 'react-markdown'
// import { contentType } from 'express/lib/response'

function CreateNote() {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [category, setCategory] = useState()

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const noteCreate = useSelector((state) => state.noteCreate);

    const { 
        loading, 
        error, 
        // note 
    } = noteCreate;

    const resetHandler = () => {
        setTitle('');
        setContent('');
        setCategory('');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if(!title || !content || !category) return;
        dispatch(createNoteAction(title,content,category));
    
        resetHandler();
        navigate('/mynotes');
    };


    return (
        <MainScreen title='Create Note'>
            <Card>
                <Card.Header>Create a New Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
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
                            Create Note
                        </Button>

                        <Button className='mx-2' onClick={resetHandler} variant='danger'>
                            Reset Fields
                        </Button>

                    </Form>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>

    )
}

export default CreateNote
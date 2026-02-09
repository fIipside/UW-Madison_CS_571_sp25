import React, { useEffect, useState, useContext } from "react"
import { Container, Col, Row, Pagination, Form, Button } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    // Task 3
    const [currentPage, setCurrentPage] = useState(1);
    // Task 8
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loginStatus] = useContext(BadgerLoginStatusContext);

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${currentPage}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages);
        })
    };

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, currentPage]);

    // Task 8
    const handlePost = () => {
        if (!title || !content) {
            alert("You must provide both a title and content!");
            return;
        }

        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully posted!");
                setTitle("");
                setContent("");
                loadMessages();
            }
        })
    }

    // Task 9
    const handleDelete = (id) => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?id=${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully deleted the post!");
                loadMessages();
            }
        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
        }
        <hr/>
        <Container fluid>
            <Row>
                <Col xs={12} md={3}>
                    {/* Task 8 */}
                    {!loginStatus && (<p>You must be logged in to post!</p>)}
                    {loginStatus && (
                        <>
                            <Form.Label htmlFor="title">Post Title</Form.Label>
                            <Form.Control id="title" value={title} onChange={e => setTitle(e.target.value)}></Form.Control>
                            <br/>
                            <Form.Label htmlFor="content">Post Content</Form.Label>
                            <Form.Control id="content" value={content} onChange={e => setContent(e.target.value)}></Form.Control>
                            <br/>
                            <Button onClick={handlePost}>Create Post</Button>
                        </>            
                    )}
                </Col>
                <Col xs={12} md={9}>
                    {
                        messages.length > 0 ?
                            <Container fluid>
                                <Row>
                                    {
                                        /* TODO: Complete displaying of messages. */
                                        // Task 2
                                        messages.map(m => (<Col xs={12} sm={12} md={6} lg={4} xl={4} key={m.id}> 
                                            <BadgerMessage {...m} currentUser={loginStatus?.username} onDelete={handleDelete} />
                                        </Col>))
                                    }
                                </Row>
                            </Container>
                            :
                            <>
                                <p>There are no messages on this page yet!</p>
                            </>
                    }
                    {/* Task 3 */}
                    <Pagination>
                        <Pagination.Item key={1} active={currentPage === 1} onClick={() => setCurrentPage(1)}>1</Pagination.Item>
                        <Pagination.Item key={2} active={currentPage === 2} onClick={() => setCurrentPage(2)}>2</Pagination.Item>
                        <Pagination.Item key={3} active={currentPage === 3} onClick={() => setCurrentPage(3)}>3</Pagination.Item>
                        <Pagination.Item key={4} active={currentPage === 4} onClick={() => setCurrentPage(4)}>4</Pagination.Item>
                    </Pagination>
                </Col>
            </Row>
        </Container>
    </>
}

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";

export function AddPanel({user, onAddActivity}) {
    const [title, setTitle] = useState("")
    const [errorTitle, setErrorTitle] = useState(null)
    const [description, setDescription] = useState("")
    const [errorDesc, setErrorDesc] = useState(null)
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString('en-CA'))
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString('en-CA'))
    const [errorDate, setErrorDate] = useState(null)

    const onSubmit = () => {
        let clear = true
        if (title === "") {
            setErrorTitle("Title cannot be empty")
            clear = false
        }
        if (description === "") {
            setErrorDesc("Description cannot be empty")
            clear = false
        }
        if (new Date(endDate) < new Date(startDate)) {
            setErrorDate("End Date have to be after Start Date")
            clear = false
        }
        if (clear) {
            onAddActivity(title, description, startDate, endDate)
        }
    }

    return (
        <Container fluid className={"no-scroll-bar overflow-scroll"}>
            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Event Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => {
                        setTitle(e.target.value)
                        setErrorTitle(null)
                    }} disabled={!user}
                    isInvalid={!!errorTitle}/>
                    <Form.Control.Feedback type="invalid">
                        {errorTitle}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" value={description} onChange={(e) => {
                        setDescription(e.target.value)
                        setErrorDesc(null)
                    }} disabled={!user}
                    isInvalid={!!errorDesc}/>
                    <Form.Control.Feedback type="invalid">
                        {errorDesc}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="start">
                    <Form.Label>Date</Form.Label>
                </Form.Group>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-3" controlId="start">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" value={startDate} onChange={(e) => {
                                setStartDate(e.target.value)
                                setEndDate(null)
                            }} disabled={!user}/>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3" controlId="end">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" value={endDate} onChange={(e) => {
                                setEndDate(e.target.value)
                                setErrorDate(null)
                            }} disabled={!user}
                            isInvalid={!!errorDate}/>
                            <Form.Control.Feedback type="invalid">
                                {errorDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="button" className="purple-btn" disabled={!user} onClick={onSubmit}>Submit</Button>
            </Form>
        </Container>
    )
}

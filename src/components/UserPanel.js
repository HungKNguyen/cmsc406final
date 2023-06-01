import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {Avatar} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useState} from "react";

export function UserPanel({user, onSignUpBtn, onLogInBtn, onLogOutBtn}) {
    const [showModalSU, setShowModalSU] = useState(false)
    const [showModalLI, setShowModalLI] = useState(false)

    return (
        <Container fluid>
            <Row className="px-3 py-2">
                <Col xs={4} className="d-flex flex-column align-items-center text-center">
                    <Avatar sx={{ bgcolor: '#6C2AD4', height: "4rem", width: "4rem", '&:active': {bgcolor: "#5B21B6"}}}
                            className={`${user ? "purple-fill disabled" : ""}`}
                            variant="rounded" onClick={() => {
                                if (!user) {
                                    setShowModalSU(true)
                                }
                            }}>
                        <LoginIcon style={{ fontSize: 36 }}/>
                    </Avatar>
                    <p className="mt-1" style={{fontWeight: 600, color: '#6C2AD4'}}>
                        Sign Up
                    </p>
                </Col>
                <Col xs={4} className="d-flex flex-column align-items-center text-center">
                    <Avatar sx={{ bgcolor: '#6C2AD4', height: "4rem", width: "4rem", '&:active': {bgcolor: "#5B21B6"} }}
                            className={`${user ? "purple-fill disabled" : ""}`}
                            variant="rounded" onClick={() => {
                                if (!user) {
                                    setShowModalLI(true)
                                }
                            }}>
                        <VpnKeyIcon style={{ fontSize: 36 }}/>
                    </Avatar>
                    <p className="mt-1" style={{fontWeight: 600, color: '#6C2AD4'}}>
                        Log In
                    </p>
                </Col>
                <Col xs={4} className="d-flex flex-column align-items-center text-center">
                    <Avatar sx={{ bgcolor: '#6C2AD4', height: "4rem", width: "4rem", '&:active': {bgcolor: "#5B21B6"} }}
                            className={`${user ? "" : "purple-fill disabled"}`}
                            variant="rounded" onClick={() => {
                                if (user) {
                                    onLogOutBtn()
                                }
                            }}>
                        <LogoutIcon style={{ fontSize: 36 }}/>
                    </Avatar>
                    <p className="mt-1" style={{ fontWeight: 600, color: '#6C2AD4'}}>
                        Log Out
                    </p>
                </Col>
            </Row>
            <Row className="px-3 py-2 d-flex justify-content-center">
                <Col xs={9} className={`${!!user ? 'purple-border' : 'gray-border'} p-3 mb-2`}>
                    <Typography style={{fontSize: "1.125rem", color: !!user ? "#6C2AD4" : "#6B7280"}}>
                        {!!user ? `User ${user} logged in` : 'User not logged in'}
                    </Typography>
                </Col>
            </Row>
            <LogInModal show={showModalLI} setShow={setShowModalLI} onSubmit={onLogInBtn}/>
            <SignUpModal show={showModalSU} setShow={setShowModalSU} onSubmit={onSignUpBtn}/>
        </Container>
    )
}

function LogInModal({show, setShow, onSubmit}) {
    const [logIn, setLogIn] = useState("")
    const [logInError, setLIError] = useState(null)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(null)

    const handleSubmit = () => {
        let clear = true
        if (logIn === "") {
            setLIError("Log In cannot be empty")
            clear = false
        }
        if (password === "") {
            setPasswordError("Password cannot be empty")
            clear = false
        }
        if (clear) {
            onSubmit(logIn, password)
        }
    }

    return (
        <Modal show={show} onHide={()=> setShow(false)} size="lg" scrollable className={"custom-modal"}>
            <Modal.Header closeButton closeVariant={"white"}>
                <Modal.Title>Log in Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Login username" value={logIn} onChange={(e) => {
                            setLogIn(e.target.value)
                            setLIError(null)
                        }} isInvalid={!!logInError}/>
                        <Form.Control.Feedback type="invalid">
                            {logInError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordError(null)
                        }} isInvalid={!!passwordError}/>
                        <Form.Control.Feedback type="invalid">
                            {passwordError}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"purple-btn"} onClick={() => { handleSubmit(); setShow(false)}}>
                    Log In
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

function SignUpModal({show, setShow, onSubmit}) {
    const [logIn, setLogIn] = useState("")
    const [logInError, setLIError] = useState(null)
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(null)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(null)

    const handleSubmit = () => {
        let clear = true
        if (logIn === "") {
            setLIError("Log In cannot be empty")
            clear = false
        }
        if (name === "") {
            setNameError("Name cannot be empty")
            clear = false
        }
        if (password === "") {
            setPasswordError("Password cannot be empty")
            clear = false
        }
        if (clear) {
            onSubmit(logIn, password)
        }
    }

    return (
        <Modal show={show} onHide={()=> setShow(false)} size="lg" scrollable className={"custom-modal"}>
            <Modal.Header closeButton closeVariant={"white"}>
                <Modal.Title>Sign Up Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Login username" value={logIn} onChange={(e) => {
                            setLogIn(e.target.value)
                            setLIError(null)
                        }} isInvalid={!!logInError}/>
                        <Form.Control.Feedback type="invalid">
                            {logInError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Public name" value={name} onChange={(e) => {
                            setName(e.target.value)
                            setNameError(null)
                        }} isInvalid={!!nameError}/>
                        <Form.Control.Feedback type="invalid">
                            {nameError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordError(null)
                        }} isInvalid={!!passwordError}/>
                        <Form.Control.Feedback type="invalid">
                            {passwordError}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"purple-btn"} onClick={() => { handleSubmit(); setShow(false)}}>
                    Sign Up
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

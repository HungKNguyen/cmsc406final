import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useCallback, useEffect, useState} from "react";
import './App.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {ControlPanel} from "./components/ControlPanel";
import {TerminalPanel} from "./components/TerminalPanel";
import {
    API_CREATE_ACTIVITIES, API_DELETE_ACTIVITIES,
    API_GET_ALL_ACTIVITIES,
    API_GET_YOUR_ACTIVITIES,
    API_LOG_OUT,
    API_SIGN_IN,
    API_SIGN_UP
} from "./api/api";

function App() {
    const [lg, setLg] = useState(false)
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    },[])

    const handleResize = () => {
        setLg(window.innerWidth >= 992)
    }

    // List of activity objects
    const [user, setUser] = useState(null) // null vs string
    // Two date object
    const [dateRange, setDateRange] = useState([new Date(),
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)])
    const [mode, setMode] = useState("public") // public vs private
    const [activities, setActivities] = useState([])

    const handleDateRangeChange = (startDate, endDate) => {
        setDateRange([startDate, endDate])
    }

    const handleModeChange = (new_mode) => {
        setMode(new_mode)
    }

    const getActivities = useCallback(() => {
        if (mode === "public") {
            const start = dateRange[0]
            const end = dateRange[1]
            API_GET_ALL_ACTIVITIES(start.toLocaleDateString('en-CA'), end.toLocaleDateString('en-CA')).then(result => {
                if (result[1]) {
                    alert(`Status ${result[1].status}: ${result[1].statusText}`)
                    setActivities([])
                } else {
                    setActivities(result[0].map((o, index) => {
                        const source = index % 2 === 0 ? "purple" : "gray"
                        const content = o.title
                        const extra = [
                            `ID: ${o.idactivity}`,
                            `Description: ${o.description}`,
                            `Start Date: ${o.start}`,
                            `End Date: ${o.end}`
                        ]
                        return {
                            idactivity: o.idactivity,
                            source: source,
                            content: content,
                            extra: extra
                        }
                    }))
                }
            })
        } else {
            API_GET_YOUR_ACTIVITIES().then(result => {
                if (result[1]) {
                    alert(`Status ${result[1].status}: ${result[1].statusText}`)
                    setActivities([])
                } else {
                    setActivities(result[0].map((o, index) => {
                        const source = index % 2 === 0 ? "purple" : "gray"
                        const content = o.title
                        const extra = [
                            o.id,
                            o.description,
                            o.start,
                            o.end
                        ]
                        return {
                            idactivity: o.idactivity,
                            source: source,
                            content: content,
                            extra: extra
                        }
                    }))
                }
            })
        }
    }, [dateRange, mode])

    useEffect(getActivities,[])

    useEffect(getActivities,[dateRange, mode])

    const handleSignUp = (login, password, name) => {
        API_SIGN_UP(login, password, name).then((result) => {
            if (result[1]) {
                alert(`Status ${result[1].status}: ${result[1].statusText}`)
                setUser(null)
            } else {
                setUser(login)
            }
        })
    }

    const handleLogIn = (login, password) => {
        API_SIGN_IN(login, password).then((result) => {
            if (result[1]) {
                alert(`Status ${result[1].status}: ${result[1].statusText}`)
                setUser(null)
            } else {
                setUser(login)
            }
        })
    }

    const handleLogOut = () => {
        API_LOG_OUT()
        setMode("public")
        setUser(null)
    }

    const handleAddActivity = (title, description, start, end) => {
        API_CREATE_ACTIVITIES(title, description, start, end).then((result) => {
            if (result[1]) {
                alert(`Status ${result[1].status}: ${result[1].statusText}`)
            } else {
                alert(`Successfully added activity`)
                getActivities()
            }
        })
    }

    const handleDeleteActivity = (id) => {
        API_DELETE_ACTIVITIES(id).then((result) => {
            if (result[1]) {
                alert(`Status ${result[1].status}: ${result[1].statusText}`)
            } else {
                alert(`Successfully deleted activity`)
                getActivities()
            }
        })
    }

    return (
        <Container fluid className="d-flex flex-column" style={{height: "100vh", margin: 0}}>
            <Row className={lg ? "h-100" : ""} style={{margin: 0}}>
                <Col lg="4" className={lg ? "h-100" : ""} style={{padding: 0}}>
                    <Container fluid className="h-100 p-lg-3 pe-lg-2 p-2">
                        <Container fluid className="h-100 d-flex flex-column">
                            <Row>
                                <Col className="d-flex align-items-center mb-2">
                                    <CalendarMonthIcon style={{ fontSize: 48, color: "#6C2AD4"}}/>
                                    <p className="display-5 m-0" style={{fontWeight: 500}}>Weekly&nbsp;
                                        <span style={{color: "#6C2AD4"}}>Activities</span></p>
                                </Col>
                            </Row>
                            <Row className="flex-grow-1">
                                <ControlPanel user={user} mode={mode} onSignUp={handleSignUp} onLogIn={handleLogIn} onLogOut={handleLogOut}
                                    onModeChange={handleModeChange} onAddActivity={handleAddActivity}/>
                            </Row>
                        </Container>
                    </Container>
                </Col>
                <Col lg="8" className={lg ? "h-100" : ""} style={{padding: 0}}>
                    <Container fluid className="h-100 p-lg-3 ps-lg-2 p-2">
                        <Container fluid className="d-flex h-100">
                            <Row className="flex-grow-1 purple-border">
                                <TerminalPanel mode={mode} list={activities} onDateRangeChange={handleDateRangeChange} dateRange={dateRange}
                                               onDeleteActivity={handleDeleteActivity}/>
                            </Row>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default App;

import Typography from "@mui/material/Typography";
import {Avatar} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useEffect, useRef, useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export function TerminalPanel({mode, list, onDateRangeChange, dateRange, onDeleteActivity}) {
    const [startDate, setStartDate] = useState(dateRange[0])
    const [endDate, setEndDate] = useState(dateRange[1])

    useEffect(() => {
        onDateRangeChange(startDate,endDate)
    },[startDate, endDate])

    return (
        <div className="h-100 py-4 px-5 d-flex flex-column">
            <div className="flex-grow-1 no-scroll-bar overflow-scroll">
                <div className="fs-5 mb-2">{mode === "public" ? "Public List" : "Your List"}</div>
                {list.length === 0 ? <div className="d-flex h-100 align-items-center justify-content-center mb-3">
                        <span className="text-center">No Activity Listed</span>
                </div> :
                    list.map((data, index) => (
                        <ActivityPanel key={`activity-${index}`} activity={data} onDelete={onDeleteActivity}/>
                    ))
                }
            </div>
            <Container fluid>
                <Row>
                    <Col xs={{span: 10, offset: 1}}>
                        <div className="d-flex justify-content-center gap-3">
                            <DatePicker className={"purple-border p-2 w-100"} selected={dateRange[0]} onChange={(date) => {
                                if (date > endDate) {
                                    setEndDate(date)
                                }
                                setStartDate(date)
                            }}/>
                            <div className="p-2 flex-grow-0 purple-border" style={{backgroundColor: "#EDE9FE"}}>
                                <ArrowForwardIcon style={{fontSize: 20}}/>
                            </div>
                            <DatePicker className={"purple-border p-2 w-100"} selected={dateRange[1]} onChange={(date) => setEndDate(date)}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function ActivityPanel({activity, onDelete}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="mb-3" onDoubleClick={() => setShowModal(true)}>
                <div className={`d-flex ${activity.source}-border p-2`}>
                    <Avatar variant="rounded" className={`${activity.source}-avatar me-3`}>
                        <CalendarMonthIcon />
                    </Avatar>
                    <div>
                        {activity.content}
                    </div>
                </div>
                <Typography variant="caption" className="px-2" style={{color: "#4b5563", fontWeight: 600}}>
                    Double click for more info
                </Typography>
            </div>
            <Modal show={showModal} onHide={()=> setShowModal(false)} size="lg" scrollable className={"custom-modal"}>
                <Modal.Header closeButton closeVariant={"white"}>
                    <Modal.Title>Activity Extra Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {activity.extra.map((extra, index) =>
                        <div key={`extra-${index}`} className="p-2 mb-3 purple-border">
                            {extra}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"purple-btn"} onClick={() => {onDelete(activity.idactivity); setShowModal(false)}}>
                        Delete Activity
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

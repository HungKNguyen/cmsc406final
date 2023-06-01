import {Col, Container, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function ActivityPanel({user, mode, onModeChange}) {
    return (
        <Container fluid>
            <Row className="px-3 py-2 d-flex justify-content-center">
                <Col xs={9} className={`${mode === "public" ? "purple-fill" : "gray-fill"} p-3 mb-3`} onClick={() => onModeChange("public")}>
                    <Typography style={{fontSize: "1.125rem"}}>
                        View all public activities
                    </Typography>
                </Col>
                <Col xs={9} className={`${mode === "private" ? "purple-fill" : "gray-fill"} ${user ? "" : "disabled"} p-3`} onClick={() => {
                    if (user) {
                        onModeChange("private")
                    }
                }}>
                    <Typography style={{fontSize: "1.125rem"}}>
                        View all your activies
                    </Typography>
                </Col>
            </Row>
        </Container>
    )
}

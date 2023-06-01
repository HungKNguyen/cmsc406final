import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useEffect, useState} from "react";
import {UserPanel} from "./UserPanel";
import {ActivityPanel} from "./ActivityPanel";
import {AddPanel} from "./AddPanel";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
    '&' : {
        padding: 0,
    },
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '& .MuiAccordionDetails-root': {
        borderTop: 0,
    },
    '& .MuiAccordionSummary-root': {
        color: '#6B7280'
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
        background: "#6C2AD4",
        color: "#ffffff"
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        color: "#ffffff"
    },
    '&.Mui-expanded': {
        flex: '1',
    }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        {...props}
    />
))(() => ({
    '&.Mui-expanded .MuiTypography-root': {
        fontWeight: 700,
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function ControlPanel({user, mode, onSignUp, onLogIn, onLogOut, onModeChange, onAddActivity}) {
    const [expanded, setExpanded] = React.useState("panel1");
    const [lg, setLg] = useState(false)

    const handleChange = (panel) =>  {
        if (lg) {
            if (expanded !== panel) {
                setExpanded(panel);
            }
        } else {
            if (expanded === panel) {
                setExpanded(null)
            } else {
                setExpanded(panel);
            }
        }
    };


    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    },[])

    useEffect(() => {
        if (lg) {
            setExpanded("panel1")

        } else {
            setExpanded(null)
        }
    }, [lg])

    const handleResize = () => {
        setLg(window.innerWidth >= 992)
    }

    return (
        <div className="h-100 px-0 d-flex flex-column purple-border">
            <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography style={{fontSize: "1.125rem"}}>User Control</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UserPanel user={user} onSignUpBtn={onSignUp} onLogInBtn={onLogIn} onLogOutBtn={onLogOut}/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography style={{fontSize: "1.125rem"}}>Activities View</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ActivityPanel user={user} mode={mode} onModeChange={onModeChange}/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography style={{fontSize: "1.125rem"}}>Add new Activity</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddPanel user={user} onAddActivity={onAddActivity}/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

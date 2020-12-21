import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react'
import './InfoBox.css';

function InfoBox(props) {
    const {title, newcases, total, isRed, active} = props;
    
    return (
        <Card>
            <CardContent className={`infoBox ${active && 'InfoBox__selected'} ${!isRed && 'InfoBox__selected__Green'}` } >
                <Typography color='textSecondary'>
                    <h4>{title}</h4>
                </Typography>
                <h2 className={`InfoBox__NewCases ${!isRed && 'InfoBox__NewCases__Green'} `}> {`+ ${newcases}`} </h2>
                <Typography color='textSecondary'>
                   <h2>{total}</h2> 
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

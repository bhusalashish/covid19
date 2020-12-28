import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox(props) {
    const { title, newcases, total, isRed, active } = props;
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox__selected"}  ${
                active && !isRed && "infoBox__selected__recovered"
            } ${!isRed && "infoBox__recovered"}`}
        >
            <CardContent>
                <Typography
                    className={`infoBox__title ${
                        isRed ? "infoBox__title__red" : "infoBox__title__green"
                    } `}
                >
                    <b>{title}</b>
                </Typography>
                <h1
                    className={`infoBox__cases ${
                        !isRed && "infoBox__recovered__new"
                    }`}
                >
                    +{newcases}
                </h1>
                <Typography
                    className={`infoBox__total ${
                        isRed ? "infoBox__total__red" : "infoBox__total__green"
                    } `}
                >
                    Total : {total}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;

import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";
import numeral from "numeral";

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
                <div
                    className={`infoBox__cases ${
                        !isRed && "infoBox__recovered__new"
                    }`}
                >
                    {newcases < 1000
                        ? numeral(newcases).format("+0a")
                        : numeral(newcases).format("+0a.0")}
                </div>
                <Typography
                    className={`infoBox__total ${
                        isRed ? "infoBox__total__red" : "infoBox__total__green"
                    } `}
                >
                    Total -{" "}
                    {total < 1000
                        ? numeral(total).format("0a")
                        : numeral(total).format("0a.00")}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;

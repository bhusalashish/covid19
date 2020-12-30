import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";
import numeral from "numeral";

function InfoBox(props) {
    const { title, newcases, total, active } = props;
    const type =
        title === "Recovered"
            ? "recovered"
            : title === "Confirmed"
            ? "confirmed"
            : "deaths";
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox infoBox__${type}  ${
                active && `infoBox__selected__${type}`
            }`}
        >
            <CardContent>
                <Typography className={`infoBox__title`}>
                    <b>{title === "Deaths" ? "Deceased" : title}</b>
                </Typography>
                <div className={`infoBox__new`}>
                    {newcases < 1000
                        ? numeral(newcases).format("+0a")
                        : numeral(newcases).format("+0a.0")}
                </div>
                <Typography className={`infoBox__total`}>
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

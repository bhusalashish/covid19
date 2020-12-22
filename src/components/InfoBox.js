import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox(props) {
    const { title, newcases, total, isRed, active } = props;

    // return (
    //     <Card>
    //         <CardContent
    //             className={`infoBox ${active && "InfoBox__selected"} ${
    //                 !isRed && "InfoBox__selected__Green"
    //             }`}
    //         >
    //             <Typography color="textSecondary">{title}</Typography>
    //             <h2
    //                 className={`InfoBox__NewCases ${
    //                     !isRed && "InfoBox__NewCases__Green"
    //                 } `}
    //             >
    //                 {" "}
    //                 {`+ ${newcases}`}{" "}
    //             </h2>
    //             <Typography color="textSecondary">Total : {total}</Typography>
    //         </CardContent>
    //     </Card>
    // );
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox && ${
                title === "Recovered"
                    ? "infoBox__recovered"
                    : title === "Deaths"
                    ? "infoBox__deaths"
                    : ""
            }`}
        >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h1 className="infoBox__cases">+{newcases}</h1>
                <Typography className="infoBox__total" color="textSecondary">
                    Total : {total}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;

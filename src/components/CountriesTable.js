import React, { useState } from "react";
import {
    TableContainer,
    Table,
    withStyles,
    makeStyles,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TablePagination,
} from "@material-ui/core";
import numeral from "numeral";
import "./CountriesTable.css";

//component={Paper}
//***************************************************************************

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        // maxHeight: 765,
        maxHeight: 540,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function CountriesTable({ countries }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Country</StyledTableCell>
                            <StyledTableCell align="right">
                                Total Cases
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(({ country, cases, countryInfo }) => {
                                return (
                                    <StyledTableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={country}
                                    >
                                        <StyledTableCell>
                                            <img
                                                className="countriestable__flag"
                                                src={countryInfo.flag}
                                                alt=""
                                            ></img>
                                            {country}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {numeral(cases).format("0,0")}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 15, 20, 50, 100]}
                component="div"
                count={countries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default React.memo(CountriesTable);

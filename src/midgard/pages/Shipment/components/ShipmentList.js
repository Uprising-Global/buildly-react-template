import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import SearchInput from "../../../components/SearchComponent/SearchInput";
import theme from "../../../../styles/theme";
import { Divider } from "@material-ui/core";
import ShipmentFilterAndSort from "./ShipmentFilterAndSort";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#BEBABA",
    },
    "&:nth-of-type(odd):hover": {
      backgroundColor: "#DCD9D8",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  searchSection: {
    background: "#383636",
    width: "100%",
    display: "flex",
    minHeight: "40px",
    alignItems: "center",
  },
  nodata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BEBABA",
  },
  tableCell: {
    padding: theme.spacing(0, 1),
    borderBottom: 0,
  },
});

export default function ShipmentList({ ...props }) {
  let {
    rows,
    columns,
    actionsColumns,
    hasSearch,
    searchValue,
    searchAction,
    hasSort,
  } = props;
  const classes = useStyles();
  const [allCheck, setAllCheck] = useState(false);
  const [recallCheck, setRecallCheck] = useState(false);
  const [temepratureCheck, setTemperatureCheck] = useState(false);
  const [humidityCheck, setHumidityCheck] = useState(false);
  const [lateShipment, setLateShipmentCheck] = useState(false);
  const [sortValue, setSortValue] = useState("");

  const handleAllCheck = (e) => {
    setAllCheck(e.target.checked);
    if (e.target.checked) {
      setRecallCheck(true);
      setTemperatureCheck(true);
      setHumidityCheck(true);
      setLateShipmentCheck(true);
    } else {
      setRecallCheck(false);
      setTemperatureCheck(false);
      setHumidityCheck(false);
      setLateShipmentCheck(false);
    }
  };

  const handleRecallCheck = (e) => {
    setRecallCheck(e.target.checked);
  };

  const handleTemperatureCheck = (e) => {
    setTemperatureCheck(e.target.checked);
  };
  const handleHumidityCheck = (e) => {
    setHumidityCheck(e.target.checked);
  };
  const handleLateCheck = (e) => {
    setLateShipmentCheck(e.target.checked);
  };
  const handleSort = (sortValue) => {
    setSortValue(sortValue);
    console.log("sortVal", sortValue);
  };
  return (
    <Paper className={classes.root}>
      {hasSearch && (
        <div className={classes.searchSection}>
          <SearchInput searchValue={searchValue} searchAction={searchAction} />
        </div>
      )}
      {hasSort && (
        <ShipmentFilterAndSort
          allCheck={allCheck}
          handleAllCheck={handleAllCheck}
          recallCheck={recallCheck}
          handleRecallCheck={handleRecallCheck}
          temepratureCheck={temepratureCheck}
          handleTemperatureCheck={handleTemperatureCheck}
          humidityCheck={humidityCheck}
          handleHumidityCheck={handleHumidityCheck}
          lateShipment={lateShipment}
          handleLateCheck={handleLateCheck}
          sortValue={sortValue}
          handleSort={handleSort}
        />
      )}
      <TableContainer className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="sticky table">
          <TableBody>
            {rows.length > 0 &&
              rows
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <React.Fragment key={`tableRow${idx}`}>
                      <StyledTableRow hover tabIndex={-1}>
                        <TableCell key={row.id} colSpan={3}>
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  className={classes.tableCell}
                                  colSpan={columns.length + 2}
                                >
                                  {`Shipment#: ${row.id}`}
                                  <Divider />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                {columns &&
                                  columns.map((column) => {
                                    if (column.id !== "id") {
                                      const value = row[column.id] || "-";
                                      return (
                                        <TableCell
                                          style={{ width: column.width }}
                                          className={classes.tableCell}
                                          key={column.id}
                                          align={column.align}
                                        >
                                          {column.format
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                      );
                                    }
                                  })}
                                <TableCell className={classes.tableCell}>
                                  <IconButton
                                    className={classes.menuButton}
                                    onClick={() => {}}
                                    color="secondary"
                                    aria-label="menu"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  <IconButton
                                    className={classes.menuButton}
                                    onClick={() => {}}
                                    color="secondary"
                                    aria-label="menu"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </StyledTableRow>
                    </React.Fragment>
                  );
                })}
            {rows.length === 0 && (
              <StyledTableRow>
                <TableCell align="center" colSpan={columns.length + 2}>
                  No Data To Display
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 6, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}

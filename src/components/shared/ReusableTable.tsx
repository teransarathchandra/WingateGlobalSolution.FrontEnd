import React from "react";
// import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
//   Typography,
  TableSortLabel,
  Autocomplete,
  TextField,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import SwitchBtn from "./SwitchBtn";
import { FlexRow } from "../../styles/signForm.styles";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const ReusableTable = ({ columns, rows, title, rowKey, onRowSelect }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n[rowKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <div
        style={{
          backgroundColor: "#e1bd05",
          margin: "0 0 2rem",
          padding: "0 10rem",
        }}
      >
        <h1
          style={{
            color: "#fff",
            padding: "3rem 0rem",
            fontSize: "3rem",
            fontWeight: 600,
          }}
        >
          {title}
        </h1>
      </div>
      <div style={{ padding: "0 10rem" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* <Typography variant="h6" id="tableTitle" component="div">
          {title}
        </Typography> */}
          <FlexRow
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              margin: "0 2rem 0 0",
            }}
          >
            <Autocomplete
              style={{ width: "400px", padding: "1rem 0 2rem 1rem" }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={rows.map((row) => row.orderID)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            <SwitchBtn />
          </FlexRow>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selected.length === rows.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all items" }}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.numeric ? "right" : "left"}
                      padding={column.disablePadding ? "none" : "normal"}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={(event) => handleRequestSort(event, column.id)}
                      >
                        {column.label}
                        {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const isItemSelected = isSelected(row[rowKey]);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row[rowKey])}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[rowKey]}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.numeric ? "right" : "left"}
                          >
                            {row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Box>
  );
};

export default ReusableTable;

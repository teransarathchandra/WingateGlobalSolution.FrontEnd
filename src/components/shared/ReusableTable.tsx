import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import SwitchBtn from "./SwitchBtn";
import { FlexRow } from "@app_styles/signForm.styles";
import { IColumn, IRow } from "@app_interfaces/ITable";

interface ReusableTableProps {
  columns: IColumn[];
  rows: IRow[];
  title: string;
  rowKey: string;
  searchTerm?: string;
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, rows, title, rowKey, searchTerm, handleSearch }) => {
  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm?.toLowerCase() || '')
    )
  );
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
          <FlexRow
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              margin: "0 2rem 0 0",
            }}
          >
            <TextField
              style={{ width: "300px", margin: "1rem 0 2rem 1rem" }}
              label="Search"
              id="outlined-size-small"
              size="small"
              value={searchTerm}
              onChange={handleSearch || (() => {})}
            />
            <SwitchBtn />
          </FlexRow>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  {columns.map((column: IColumn) => {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.numeric ? "right" : (column.id == 'edit' || column.id == 'delete' ? "center" : "left")}
                        padding={column.disablePadding ? "none" : "normal"}
                      >
                        {column.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row: IRow) => {
                  return (
                    <TableRow key={row[rowKey]}>
                      {columns.map((column: IColumn) => (
                        <TableCell key={column.id} align={column.numeric ? "right" : (column.id === 'edit' || column.id === 'delete' ? "center" : "left")}>{row[column.id]}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Box>
  );
};

export default ReusableTable;

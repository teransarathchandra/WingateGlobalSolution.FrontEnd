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
import AddButton from "./AddButton";
import SearchBar from "./SearchBar";

interface ReusableTableProps {
  columns;
  rows;
  title;
  rowKey;
  onAdd?: () => void;
  onSearch?: () => void;
  showSearchBar?: boolean;
  showAddButton?: boolean;
  showActiveSwitch?: boolean;
  label?: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, rows, title, rowKey, onAdd, showSearchBar, onSearch , label,  showAddButton, showActiveSwitch }) => {
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
            {showSearchBar && <SearchBar label={label} onEnter={() => onSearch} />}
            {showActiveSwitch && <SwitchBtn />}
            {showAddButton && onAdd && <AddButton onClick={onAdd} />}
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
                {rows.map((row: IRow) => {
                  return (
                    <TableRow key={row[rowKey]}>
                      {columns.map((column: IColumn) => (
                        <TableCell key={column.id} align={column.numeric ? "right" : (column.id == 'edit' || column.id == 'delete' ? "center" : "left")}>{row[column.id]}</TableCell>
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

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
  Chip,
  styled
} from "@mui/material";
import SwitchBtn from "./SwitchBtn";
import { FlexRow } from "@app_styles/signForm.styles";
import { IColumn, IRow } from "@app_interfaces/ITable";
import AddButton from "./AddButton";

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  display: 'inline-block',
  margin: theme.spacing(0.5),
}));

interface AccessReusableTableProps {
  columns;
  rows;
  title;
  rowKey;
  onAdd?: () => void;
  showAddButton?: boolean;
  showActiveSwitch?: boolean;
  searchTerm?: string;
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccessReusableTable: React.FC<AccessReusableTableProps> = ({ columns, rows, title, rowKey, onAdd, showAddButton, showActiveSwitch, searchTerm, handleSearch }) => {

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm?.toLowerCase() || '')
    )
  );

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const getChips = (string: String) => {
    return string.split(';')
  };

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
              display: 'flex',
              alignItems: "center",
              padding: "1rem 0",
              justifyContent: "space-between"
            }}
          >
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
              <TextField
                style={{ width: "300px", margin: "1rem 0 2rem 1rem" }}
                label="Search"
                id="outlined-size-small"
                size="small"
                value={searchTerm}
                onChange={handleSearch || (() => { })}
              />
            </div>
            <div>
              {showActiveSwitch && <SwitchBtn />}
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: "55px" }}>
              {showAddButton && onAdd && <AddButton onClick={onAdd} />}
            </div>
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
                        column.type == "chips" ? (
                          <TableCell>
                            {getChips(row[column.id]).map((chipName, index) => (

                              <ListItem key={chipName}>
                                <Chip
                                  label={chipName}
                                />
                              </ListItem>
                            ))
                            }
                          </TableCell>

                        ) : (
                          <TableCell key={column.id} align={column.numeric ? "right" : (column.id === 'edit' || column.id === 'delete' ? "center" : "left")}>
                            {getNestedValue(row, column.id)}
                          </TableCell>)
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

export default AccessReusableTable;

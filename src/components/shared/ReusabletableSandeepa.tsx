import React, { useState } from 'react';
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
  Button,
  Typography,
  useTheme,
  InputAdornment,
  SvgIcon
} from "@mui/material";
import SwitchBtn from "./SwitchBtn";
import { FlexRow } from "@app_styles/signForm.styles";
import { IColumn, IRow } from "@app_interfaces/ITable";
import { Search as SearchIcon, Sort } from "@mui/icons-material";


interface ReusableTableProps {
  columns: IColumn[];
  rows: IRow[];
  title: string;
  rowKey: string;
  onAdd?: () => void;
  showAddButton?: boolean;
  showActiveSwitch?: boolean;
  searchTerm?: string;
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReusabletableSandeepa: React.FC<ReusableTableProps> = ({
  columns,
  rows,
  title,
  rowKey,
  onAdd,
  showAddButton,
  showActiveSwitch,
  searchTerm,
  handleSearch,
}) => {
  const theme = useTheme();
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null);

  const handleSort = (columnId: string) => {
    if (columnId === columns[0].id) { // Sorting only for the first column
      let direction = 'asc';
      if (sortConfig && sortConfig.key === columnId && sortConfig.direction === 'asc') {
        direction = 'desc';
      } else {
        direction = 'asc';
      }
      setSortConfig({ key: columnId, direction });
    }
  };

  const sortedRows = React.useMemo(() => {
    let sortableItems = [...rows];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [rows, sortConfig]);

  const filteredRows = sortedRows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm?.toLowerCase() || "")
    )
  );

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{
        backgroundColor: "#e1bd05", 
        margin: "0 0 2rem",
        padding: "0 2rem",
        borderRadius: "10px"
      }}>
        <Typography
          style={{
            color: "#fff",
            padding: "2rem 4rem",
            fontSize: "2.5rem",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {title}
        </Typography>
      </div>
      <div style={{ padding: "0 3rem" }}>
        <Paper
          sx={{
            width: "100%", mb: 2, borderRadius: "20px", overflow: "hidden",
            '&:hover': {
              boxShadow: theme.shadows[8]
            },
            transition: "box-shadow 0.3s"
          }}
        >
          <FlexRow
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1rem 0",
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc",
            }}
          >
            <TextField
              style={{ width: "300px", margin: "1rem 0 2rem 1rem" }}
              label="Search"
              id="outlined-size-small"
              size="small"
              value={searchTerm}
              onChange={handleSearch || (() => {})}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon component={SearchIcon} />
                  </InputAdornment>
                )
              }}
            />
            {showActiveSwitch && <SwitchBtn />}
            {showAddButton && onAdd && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onAdd}
                style={{ borderRadius: "20px" }}
              >
                Add
              </Button>
            )}
          </FlexRow>
          <TableContainer>
            <Table sx={{ minWidth: "100%" }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f1f8ff' }}>
                  {columns.map((column, index) => (
                    <TableCell
                      key={column.id}
                      align={column.numeric ? "right" : "left"}
                      padding={column.disablePadding ? "none" : "normal"}
                      style={{ fontWeight: 'bold', cursor: index === 0 ? 'pointer' : 'default' }}
                      onClick={() => index === 0 && handleSort(column.id)}
                    >
                      {column.label}
                      {index === 0 && <SvgIcon component={Sort} />} 
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row: IRow) => (
                  <TableRow
                    key={row[rowKey]}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        backgroundColor: 'action.hover'
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => console.log("Row details: ", row)}
                  >
                    {columns.map((column: IColumn) => (
                      <TableCell key={column.id} align={column.numeric ? "right" : "left"}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Box>
  );
};

export default ReusabletableSandeepa;

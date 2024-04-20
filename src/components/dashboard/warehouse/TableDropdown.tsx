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
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import SwitchBtn from "@app_components/shared/SwitchBtn";
import { FlexRow } from "@app_styles/signForm.styles";
import { IColumn, IRow } from "@app_interfaces/ITable";

const ReusableTable = ({ columns, rows, title, rowKey }) => {
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
                        />
                        <SwitchBtn />
                    </FlexRow>
                    <FlexRow>
                        
                            <InputLabel
                                style={{
                                    marginLeft: "20px",
                                    marginBottom: "10px",
                                    marginRight: "145px",
                                }}>
                                Warehouse ID:{" "}
                            </InputLabel>
                           
                        
                            <InputLabel
                                style={{
                                    marginLeft: "65px",
                                    marginBottom: "10px",
                                    marginRight: "68px",
                                }}>
                                Status:{" "}
                            </InputLabel>
                           
                        
                        
                            <InputLabel
                                style={{
                                    marginLeft: "200px",
                                    marginBottom: "10px",
                                    marginRight: "50px",
                                }}>
                                Priority:{" "}
                            </InputLabel>
                           
                        
                    </FlexRow>
                    <FlexRow>
                        <Select
                            defaultValue=""
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "5px",
                                width: "250px",
                                marginLeft: "20px",
                                marginBottom: "10px",
                                marginRight: "50px",
                            }}
                        >
                            <MenuItem value="">Select Warehouse ID</MenuItem>
                            <MenuItem value="65d37513fc6eb97d3334bc24">WHS1</MenuItem>
                            <MenuItem value="65d4504a9025c890b832a9b1">WHS2</MenuItem>
                            <MenuItem value="65d4515cd58103be02bbbda2">WHS3</MenuItem>
                        </Select>
                        <Select
                            defaultValue=""
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "5px",
                                width: "250px",
                                marginLeft: "20px",
                                marginBottom: "10px",
                                marginRight: "50px",
                            }}
                        >
                            <MenuItem value="">Select Status</MenuItem>
                            <MenuItem value="6608e3cd3f01685b847abe04">Available</MenuItem>
                            <MenuItem value="66094259a85978a562cc526b">Unavailable</MenuItem>
                        </Select>
                        <Select
                            defaultValue=""
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "5px",
                                width: "250px",
                                marginLeft: "20px",
                                marginBottom: "10px",
                                marginRight: "50px",
                            }}
                        >
                            <MenuItem value="">Select Priority</MenuItem>
                            <MenuItem value="6608e3cd3f01685b847abe05">Standard</MenuItem>
                            <MenuItem value="66094259a85978a562cc526c">Express</MenuItem>
                        </Select>
                    </FlexRow>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column: IColumn) => {
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={
                                                    column.numeric
                                                        ? "right"
                                                        : column.id == "edit" || column.id == "delete"
                                                            ? "center"
                                                            : "left"
                                                }
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
                                                <TableCell
                                                    key={column.id}
                                                    align={
                                                        column.numeric
                                                            ? "right"
                                                            : column.id == "edit" || column.id == "delete"
                                                                ? "center"
                                                                : "left"
                                                    }
                                                >
                                                    {row[column.id]}
                                                </TableCell>
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

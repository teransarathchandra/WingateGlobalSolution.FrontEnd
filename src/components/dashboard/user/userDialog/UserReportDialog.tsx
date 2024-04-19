import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IOrder } from '@app_interfaces/IOrder';
import { getAllOrders } from "@app_services/orderService";

interface UserReportDialogProps {
    isOpen: boolean;
    handleClose: () => void;
}

const UserReportDialog: React.FC<UserReportDialogProps> = ({ isOpen, handleClose }) => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedDateFrom, setSelectedDateFrom] = useState("");
    const [selectedDateTo, setSelectedDateTo] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

 useEffect(() => {
        const fetchOrders = async () => {
            if (isOpen) {
                try {
                    const { data } = await getAllOrders();
                    setOrders(data);
                } catch (error) {
                    console.error('Error fetching all orders:', error);
                }
            }
        };

        fetchOrders();
    }, [isOpen]);

    useEffect(() => {
        const filterOrders = () => {
            const filtered = orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                const fromDate = selectedDateFrom ? new Date(selectedDateFrom) : null;
                const toDate = selectedDateTo ? new Date(selectedDateTo) : null;

                return (
                    // (selectedUserName ? order.userId.includes(selectedUserName) : true) &&
                    (selectedStatus ? order.status === selectedStatus : true) &&
                    (!fromDate || orderDate >= fromDate) &&
                    (!toDate || orderDate <= toDate)
                );
            });
            setFilteredOrders(filtered);
        };

        filterOrders();
    }, [selectedUserName, selectedDateFrom, selectedDateTo, selectedStatus, orders]);

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent>
                <Typography variant="h6" component="h2" style={{ marginBottom: 20 }}>
                    All Orders Report
                </Typography>
                {/* Filter Controls */}
                {/* <input type="text" placeholder="Search by User Name" value={selectedUserName} onChange={e => setSelectedUserName(e.target.value)} /> */}
                <input type="date" value={selectedDateFrom} onChange={e => setSelectedDateFrom(e.target.value)} />
                <input type="date" value={selectedDateTo} onChange={e => setSelectedDateTo(e.target.value)} />
                <select onChange={e => setSelectedStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                {/* Orders Table */}
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>User ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.userId}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserReportDialog;

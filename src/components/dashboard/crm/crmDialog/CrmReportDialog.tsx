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
import IUser from '@app_interfaces/IUser';
import { getAllOrders } from "@app_services/orderService";
import { getAllUser } from "@app_services/userService";
import PDFDownloadButton from '@app_components/shared/PDFDownloadButton';
import { getAllCustomer } from '@app_services/crmService';

interface UserReportDialogProps {
    isOpen: boolean;
    handleClose: () => void;
}

const CrmReportDialog: React.FC<UserReportDialogProps> = ({ isOpen, handleClose }) => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedDateFrom, setSelectedDateFrom] = useState("");
    const [selectedDateTo, setSelectedDateTo] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchUsersAndOrders = async () => {
            if (isOpen) {
                try {
                    const usersData = await getAllUser();
                    const ordersData = await getAllOrders();
                    setUsers(usersData.data);
                    setOrders(ordersData.data);
                    setFilteredOrders(ordersData.data);
                } catch (error) {
                    console.error('Error fetching users and orders:', error);
                }
            }
        };

        fetchUsersAndOrders();
    }, [isOpen]);

    useEffect(() => {
        const filterOrders = () => {
            const filtered = orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                const fromDate = selectedDateFrom ? new Date(selectedDateFrom) : null;
                const toDate = selectedDateTo ? new Date(selectedDateTo) : null;
                const user = users.find(user => user._id === order.userId)

                return (
                    (selectedUserName ? user?.name.firstName.includes(selectedUserName) : true) &&
                    (selectedStatus ? order.status === selectedStatus : true) &&
                    (!fromDate || orderDate >= fromDate) &&
                    (!toDate || orderDate <= toDate)
                );
            });
            setFilteredOrders(filtered);
        };

        filterOrders();
    }, [selectedUserName, selectedDateFrom, selectedDateTo, selectedStatus, orders, users]);

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent style={{
        backgroundColor: '#FFFFE0', // light yellow background
        borderRadius: '16px', // rounded corners
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // slight shadow for emphasis
      }}>
                <Typography variant="h6" component="h2" style={{ marginBottom: 20 }}>
                    Customer Deals Report
                </Typography>
                <input type="text" placeholder="Search by Customer Name" value={selectedUserName} onChange={e => setSelectedUserName(e.target.value)} />
                <input type="date" value={selectedDateFrom} onChange={e => setSelectedDateFrom(e.target.value)} />
                <input type="date" value={selectedDateTo} onChange={e => setSelectedDateTo(e.target.value)} />
                <select onChange={e => setSelectedStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Pending">Pending Deals</option>
                    <option value="Processing">Processing Deals</option>
                    <option value="In Progress">Deals In Progress</option>
                    <option value="Approved">Closed Deals</option>
                </select>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell>User Name</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell>{users.find(user => user._id === order.userId)?.name.firstName}</TableCell>
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions style={{
        backgroundColor: '#FFFFE0', // light yellow background
        padding: '20px',
        borderBottomLeftRadius: '16px', // bottom-left rounded corner
        borderBottomRightRadius: '16px', // bottom-right rounded corner
      }}>
        <Button onClick={handleClose} color="primary" variant="contained" style={{ 
          borderRadius: '20px', 
          backgroundColor: 'rgb(225, 189, 5)', 
          color: '#fff'
        }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrmReportDialog;
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
import PDFLayout from '@app_components/pdf/PDFLayout';
import OrdersReport from '@app_components/pdf/pdfTemplates/UserReport';
import ReactDOMServer from 'react-dom/server';
import PDFExportDialog from '@app_components/pdf/PDFPreviewDialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import  { ReactElement } from 'react';



const Transition = React.forwardRef<HTMLDivElement, TransitionProps & { children: ReactElement }>(({ children, ...props }, ref) => {
    return <Slide direction="up" ref={ref} {...props}>
      {children}
    </Slide>;
  });


interface UserReportDialogProps {
    isOpen: boolean;
    handleClose: () => void;
}

const UserReportDialog: React.FC<UserReportDialogProps> = ({ isOpen, handleClose }) => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedDateFrom, setSelectedDateFrom] = useState("");
    const [selectedDateTo, setSelectedDateTo] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showPDFDialog, setShowPDFDialog] = useState(false);
    const [pdfHtmlContent, setPdfHtmlContent] = useState('');

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
                const orderDate = new Date(order.createdAt as Date);
                const fromDate = selectedDateFrom ? new Date(selectedDateFrom) : null;
                const toDate = selectedDateTo ? new Date(selectedDateTo) : null;
                const user = users.find(user => user._id === order.userId)

                const selectedUserNameLower = selectedUserName.toLowerCase();
                const userNameLower = user?.name.firstName.toLowerCase();

                return (
                    (selectedUserName ? userNameLower?.includes(selectedUserNameLower) : true) &&
                    (selectedStatus ? order.status === selectedStatus : true) &&
                    (!fromDate || orderDate >= fromDate) &&
                    (!toDate || orderDate <= toDate)
                );
            });
            setFilteredOrders(filtered);
        };

        filterOrders();
    }, [selectedUserName, selectedDateFrom, selectedDateTo, selectedStatus, orders, users]);

    useEffect(() => {
        if (filteredOrders.length > 0) {
            const htmlContent = ReactDOMServer.renderToString(
                <PDFLayout content={<OrdersReport orders={filteredOrders} users={users}/>} />
            );
            setPdfHtmlContent(htmlContent);
        }
    }, [filteredOrders]);

    return (
        <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition} // Apply the transition here
      >
            <DialogContent>
                <Typography variant="h6" component="h2" style={{ marginBottom: 20 }}>
                    All Orders Report
                </Typography>
                <input type="text" placeholder="Search by User Name" value={selectedUserName} onChange={e => setSelectedUserName(e.target.value)} />
                <input type="date" value={selectedDateFrom} onChange={e => setSelectedDateFrom(e.target.value)} />
                <input type="date" value={selectedDateTo} onChange={e => setSelectedDateTo(e.target.value)} />
                <select onChange={e => setSelectedStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell>User Name</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>E mail</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell>{users.find(user => user._id === order.userId)?.name.firstName}</TableCell>
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{users.find(user => user._id === order.userId)?.email}</TableCell>
                                    <TableCell>{new Date(order.createdAt as Date).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                {/* <PDFLayout content={<OrdersReport orders={orders} />} /> */}
                {/* <PDFDownloadButton content={<OrdersReport orders={orders} />} typeName={'Order'} id="report" />
                           <Button onClick={handleClose} color="primary">Close</Button> */}
                <Button onClick={() => setShowPDFDialog(true)} color="secondary">
                    Preview & Export PDF
                </Button>
            </DialogActions>
            {showPDFDialog && (
                <PDFExportDialog
                    open={showPDFDialog}
                    onClose={() => setShowPDFDialog(false)}
                    htmlContent={pdfHtmlContent}
                    filename="OrdersReport.pdf"
                />
            )}
        </Dialog>
    );
};

export default UserReportDialog;

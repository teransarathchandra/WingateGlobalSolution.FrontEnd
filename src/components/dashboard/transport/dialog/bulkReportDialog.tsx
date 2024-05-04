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
import { getAllOrderInfo} from "@app_services/orderService";
import { IRow } from '@app_interfaces/ITable';
import PDFExportDialog from '@app_components/pdf/PDFPreviewDialog';
import ReactDOMServer from 'react-dom/server';
import PDFLayout from '@app_components/pdf/PDFLayout';
import OrderDetailsReport from '@app_components/pdf/pdfTemplates/OrderDetailsReport';

interface BulkReportDialogProps {
    isOpen: boolean;
    handleClose: () => void;
}

const BulkReportDialog: React.FC<BulkReportDialogProps> = ({ isOpen, handleClose }) => {
    const [orders, setOrders] = useState<IRow[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPDFDialog, setShowPDFDialog] = useState(false);
    const [pdfHtmlContent, setPdfHtmlContent] = useState('');

    useEffect(() => {
        const fetchAndPrepareOrders = async () => {
            try {
              const aggType = 'orderInfoIds';
              const response = await getAllOrderInfo(aggType);
              console.log("response", response);
              const preparedOrders: IRow[] = response.data.map((order: IOrder) => ({
                ...order,
                _id: order._id,
              }));
              setOrders(preparedOrders);
            } catch (error) {
              console.error('Failed to fetch orders', error);
            }
          };

          fetchAndPrepareOrders();
    }, [isOpen]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };

      
    const filteredOrders = orders.filter(order => 
        order.bulkId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    useEffect(() => {
        if (filteredOrders.length > 0) {
            const htmlContent = ReactDOMServer.renderToString(
                <PDFLayout content={<OrderDetailsReport orders={filteredOrders}/>} />
            );
            setPdfHtmlContent(htmlContent);
        }
    }, [filteredOrders]);

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
      }}>
                <Typography variant="h6" component="h2" style={{ marginBottom: 20 }}>
                    Order Details Report
                </Typography>
                <input type="text" placeholder="Search by Bulk ID" value={searchTerm} onChange={handleSearch} style={{
                     width: "300px", margin: "1rem 0 2rem 1rem", height:"50px", borderRadius: "5px",  borderColor: "#36454F"
                }} />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Package Count</TableCell>
                                <TableCell>Package Type </TableCell>
                                <TableCell>Bulk ID</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredOrders.map((order) => (
        <TableRow key={order._id}>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.packageCount}</TableCell>
            <TableCell>{order.packageType}</TableCell> 
            <TableCell>{order.bulkId}</TableCell>
        </TableRow>
    ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions style={{
        backgroundColor: '#FFFFFF', 
        padding: '20px',
        borderBottomLeftRadius: '16px', 
        borderBottomRightRadius: '16px', 
      }}>
        <Button onClick={handleClose} color="primary" variant="contained" style={{ 
          borderRadius: '20px', 
          backgroundColor: 'rgb(225, 189, 5)', 
          color: '#fff'
        }}>
          Close
        </Button>
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
                    filename="OrderDetailsReport.pdf"
                />
            )}
    </Dialog>
  );
};

export default BulkReportDialog;
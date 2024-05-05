import React, { useEffect, useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, Button, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { getOrderById } from '@app_services/orderService';
import { getSenderById } from "@app_services/senderService";
import { getReceiverById } from "@app_services/receiverService";
import { getItemById } from "@app_services/itemService";
import { getCategoryById } from "@app_services/categoryService";
import { getAllSubmittedDocumentByItemId, getSubmittedDocumentAccessibleURL } from "@app_services/submittedDocumentService";
import { sendApprovalEmail } from "@app_services/orderService";
import { IOrder } from '@app_interfaces/IOrder';
import { IItem } from '@app_interfaces/IItem';
import { ISubmittedDocuments } from '@app_interfaces/ISubmittedDocuments';
import ReactDOMServer from 'react-dom/server';
import PDFLayout from '@app_components/pdf/PDFLayout';
import PDFExportDialog from '@app_components/pdf/PDFPreviewDialog';
import { RestrictedOrderDetailsReport } from "@app_components/pdf/pdfTemplates/RestrictedOrderTypeReport";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Fade in={true} ref={ref} {...props} />;
  });

interface RestrictedOrderViewDialogProps {
    isViewClicked: boolean;
    currentResOrderId: string;
    handleViewClose: () => void;
    onApprove: (id, isApproved) => void;
    onReject: (id, isApproved) => void;
    //   onEmail: (restrictedOrder: IRestrictedOrder) => void;
    //   onReport: (restrictedOrder: IRestrictedOrder) => void;
}
const RestrictedOrderViewDialog: React.FC<RestrictedOrderViewDialogProps> = ({ isViewClicked, currentResOrderId, handleViewClose, onApprove, onReject }) => {

    const [orderDetails, setOrder] = useState<IOrder>();
    const [itemDetails, setItem] = useState<IItem>();
    const [senderDetails, setSenderDetails] = useState<any>(null);
    const [receiverDetails, setReceiverDetails] = useState<any>(null);
    const [category, setCategory] = useState<any>(null);
    const [documentDetails, setDocumentDetails] = useState<ISubmittedDocuments[] | null>(null);
    const [showPDFDialog, setShowPDFDialog] = useState(false);
    const [pdfHtmlContent, setPdfHtmlContent] = useState('');

    useEffect(() => {
        if (isViewClicked && currentResOrderId) {
            fetchOrder();
        }
    }, [isViewClicked, currentResOrderId]);

    useEffect(() => {

        if (orderDetails) {
            fetchSenderDetails(orderDetails.senderId);
            fetchReceiverDetails(orderDetails.receiverId);
            fetchItemDetails(orderDetails.itemId);
        }

    }, [orderDetails]);

    useEffect(() => {
        if (itemDetails) {
            fetchDocuments(itemDetails.itemId);
            fetchCategory(itemDetails.categoryId)
        }
    }, [itemDetails]);

    useEffect(() => {
        const htmlContent = ReactDOMServer.renderToString(
            <PDFLayout content={<RestrictedOrderDetailsReport orderDetails={orderDetails} itemDetails={itemDetails} senderDetails={senderDetails} receiverDetails={receiverDetails} category={category} documentDetails={documentDetails} />} />
        );
        setPdfHtmlContent(htmlContent);
    }, [orderDetails, itemDetails, receiverDetails,category, documentDetails]);


    const fetchOrder = async () => {
        try {
            const orderResponse = await getOrderById(currentResOrderId);
            setOrder(orderResponse.data);

        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const fetchSenderDetails = async (senderId) => {
        try {
            const senderResponse = await getSenderById(senderId);
            setSenderDetails(senderResponse.data);
        } catch (error) {
            console.error("Error fetching sender details:", error);
        }
    };

    const fetchReceiverDetails = async (receiverId) => {
        try {
            const receiverResponse = await getReceiverById(receiverId);
            setReceiverDetails(receiverResponse.data);
        } catch (error) {
            console.error("Error fetching receiver details:", error);
        }
    };

    const fetchItemDetails = async (itemId) => {
        try {
            const itemResponse = await getItemById(itemId);
            setItem(itemResponse.data);
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };
    const fetchCategory = async (categoryId) => {
        try {
            const categoryResponse = await getCategoryById(categoryId);
            setCategory(categoryResponse.data.data.name);
        } catch (error) {
            console.error("Error fetching category", error);
        }
    };

    const fetchDocuments = async (itemId) => {
        try {
            const response = await getAllSubmittedDocumentByItemId(itemId)
            setDocumentDetails(response.data);
        } catch (error) {
            console.error("Error fetching documents details:", error);
        }

    };
    const fetchAccessibleURL = async (folderName, documentName, itemId) => {
        const containerName = "wingatecontainer";
        const blobName = folderName + "/" + insertItemIdBeforeExtension(documentName, itemId);
        try {
            const response = await getSubmittedDocumentAccessibleURL(containerName, blobName);
            return response.url;
        } catch (error) {
            console.error("Error fetching URL:", error);
        }
    };

    function insertItemIdBeforeExtension(documentName, itemId) {
        const parts = documentName.split('.');
        if (parts.length > 1) {
            // Assumes there is at least one dot in the filename
            const extension = parts.pop();  // Remove and capture the extension
            return parts.join('.') + '_' + itemId + '.' + extension;  // Reassemble with itemId before the extension
        } else {
            // No extension found, fallback to original method
            return documentName + '_' + itemId;
        }
    }

    const handleClose = () => {
        handleViewClose();
    };

    const handleApprove = (id) => {
        onApprove(id, true);
    };

    const handleReject = (id) => {
        onReject(id, false);
    };

    const handleEmail = async () => {
        try {
            if (orderDetails) {
                const emailData = {
                    email: senderDetails.email,
                    name: senderDetails.name.firstName,
                    orderID: orderDetails.orderId,
                    status: orderDetails.status,
                    reason: "security policy"
                };
                sendApprovalEmail(emailData);
                console.log("emailData", emailData);
                console.log("emailData orderID", emailData.orderID);
            }
        } catch {
            console.log("error in email sending ")
        }
        handleClose;
    };

    const handleDocumentClick = async (folderName, documentName, e) => {
        e.preventDefault();  // Prevent the link from navigating
        const url = await fetchAccessibleURL(folderName, documentName, itemDetails?.itemId);
        if (url !== "#") {
            window.open(url, "_blank");
        }
        console.log("url", url)
    };

    return (
        <Dialog open={isViewClicked} onClose={handleViewClose} TransitionComponent={Transition} >

            <><AppBar sx={{ position: 'relative', width: "1600px" }} >
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleViewClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Restricted Order - {orderDetails?.orderId}
                    </Typography>
                </Toolbar>
            </AppBar>
                <List>
                    <ListItem>
                        <ListItemText primary="Order ID" secondary={orderDetails?.orderId} />
                        <ListItemText primary="Order ID" secondary={orderDetails?.status} />
                    </ListItem>
                    <Divider />

                    <h3 style={{ marginLeft: "10px" }}>Item Details</h3>
                    <ListItem>
                        <ListItemText primary="Item ID" secondary={itemDetails?.itemId} />
                        <ListItemText primary="Item Name" secondary={itemDetails?.itemName} />
                        <ListItemText primary="Weight" secondary={itemDetails?.weight + 'kg'} />
                        <ListItemText primary="Category" secondary={category} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Item Description" secondary={itemDetails?.description} />
                    </ListItem>
                    <Divider />

                    <h3 style={{ marginLeft: "10px" }}>Sender Details</h3>
                    <ListItem>
                        <ListItemText primary="Sender Name" secondary={senderDetails?.name.firstName + " " + senderDetails?.name.lastName} />
                        <ListItemText primary="Contact Number" secondary={senderDetails?.contactNumber} />
                        <ListItemText primary="Email" secondary={senderDetails?.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Address" secondary={senderDetails?.address.street + " , " + senderDetails?.address.city + " , " + senderDetails?.address.state} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Country Code" secondary={senderDetails?.address.countryId} />
                    </ListItem>
                    <Divider />


                    <h3 style={{ marginLeft: "10px" }}>Receiver Details</h3>
                    <ListItem>
                        <ListItemText primary="Receiver Name" secondary={receiverDetails?.name.firstName + " " + receiverDetails?.name.lastName} />
                        <ListItemText primary="Contact Number" secondary={receiverDetails?.contactNumber} />
                        <ListItemText primary="Email" secondary={receiverDetails?.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Address" secondary={receiverDetails?.address.street + " , " + receiverDetails?.address.city + " , " + receiverDetails?.address.state} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Country Code" secondary={receiverDetails?.address.countryId} />
                    </ListItem>
                    <Divider />

                </List>

                <h3 style={{ marginLeft: "10px" }}>Submitted Documents</h3>
                {documentDetails?.map((document) => (
                    <ListItem key={document.submittedDocumentId}>
                        <ListItemText primary={document.documentType} />
                        <a href="#" onClick={(e) => handleDocumentClick(document.folderName, document.documentName, e)} target="_blank" rel="noopener noreferrer">View Document</a>
                    </ListItem>
                ))}

                <div style={{ display: 'flex', paddingTop: '40px', justifyContent: "flex-end", gap: '25px', paddingRight: '30px', paddingBottom: '60px' }}>
                    <Button onClick={() => handleEmail()} color="primary">Email</Button>
                    <Button onClick={() => setShowPDFDialog(true)} color="primary" style={{ paddingRight: '80px' }}>Report</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={() => handleApprove(orderDetails?._id)} color="secondary">Approve</Button>
                    <Button onClick={() => handleReject(orderDetails?._id)} color="error">Reject</Button>
                </div>

                {showPDFDialog && (
                    <PDFExportDialog
                        open={showPDFDialog}
                        onClose={() => setShowPDFDialog(false)}
                        htmlContent={pdfHtmlContent}
                        filename="RestrictedOrderDetailReport.pdf"
                    />
                )}

            </>

        </Dialog>
    );
};
export default RestrictedOrderViewDialog;

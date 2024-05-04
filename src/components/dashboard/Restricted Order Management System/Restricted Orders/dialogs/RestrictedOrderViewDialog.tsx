import React, { useEffect, useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, Button, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { getOrderById } from '@app_services/orderService';
import { getSenderById } from "@app_services/senderService";
import { getReceiverById } from "@app_services/receiverService";
import { getItemById } from "@app_services/itemService";
import { getAllSubmittedDocumentByItemId, getSubmittedDocumentAccessibleURL } from "@app_services/submittedDocumentService";
import { sendApprovalEmail } from "@app_services/orderService";
import { IOrder } from '@app_interfaces/IOrder';
import { IItem } from '@app_interfaces/IItem';
import { ISubmittedDocuments } from '@app_interfaces/ISubmittedDocuments';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement; },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
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
    const [documentDetails, setDocumentDetails] = useState<ISubmittedDocuments[] | null>(null);
    const [senderDetails, setSenderDetails] = useState<any>(null);
    const [receiverDetails, setReceiverDetails] = useState<any>(null);

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
        // if (itemDetails) {
        //     fetchDocuments(itemDetails.itemId);
        // }


    }, [orderDetails]);

    useEffect(() => {
        if (itemDetails) {
            fetchDocuments(itemDetails.itemId);
        }
    }, [itemDetails]);
    

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
    
    const fetchDocuments = async (itemId) => {
        try {
            const response = await getAllSubmittedDocumentByItemId(itemId)
            setDocumentDetails(response.data);
        } catch (error) {
            console.error("Error fetching documents details:", error);
        }

    };
    const fetchAccessibleURL = async (folderName, documentName , itemId ) => {
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



    const handleReport = () => {
        // onSave(ViewData);
        // console.log("view data ", ViewData)
    };

    const handleDocumentClick = async (folderName, documentName, e) => {
        e.preventDefault();  // Prevent the link from navigating
        const url = await fetchAccessibleURL(folderName, documentName , itemDetails?.itemId);
        if (url !== "#") {
            window.open(url, "_blank");
        }
        console.log("url" , url)
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
                    </ListItem>
                    <Divider />

                    <h3 style={{ marginLeft: "10px" }}>Item Details</h3>
                    <ListItem>
                        <ListItemText primary="Item ID" secondary={itemDetails?.itemId} />
                        <ListItemText primary="Item Name" secondary={itemDetails?.itemName} />
                        <ListItemText primary="Weight" secondary={itemDetails?.weight + 'kg'} />
                        <ListItemText primary="Category" secondary={itemDetails?.categoryId} />
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

                <div style={{ display: 'flex', justifyContent: "flex-end", gap: '25px', paddingRight: '30px', paddingBottom: '60px' }}>
                    <Button onClick={() => handleEmail()} color="primary">Email</Button>
                    <Button onClick={() => handleReport()} color="primary" style={{ paddingRight: '80px' }}>Report</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={() => handleApprove(orderDetails?._id)} color="secondary">Approve</Button>
                    <Button onClick={() => handleReject(orderDetails?._id)} color="error">Reject</Button>
                </div>
            </>

        </Dialog>
    );
};
export default RestrictedOrderViewDialog;

{/* {isEditDialogOpen == true &&
        <RestrictedOrderTypeEditDialog
          isOpen={isEditDialogOpen}
          handleClose={handleClose}
          entity={currentResOrder}
          fields={fields}
          onSave={handleUpdatedRestrictedOrderType}
          onDelete={handleDeleteRestrictedOrderType} />
      } */}

// <Dialog open={isOpen} onClose={handleClose} fullScreen TransitionComponent={Transition}>

//     <List>
//         <ListItem>
//             <ListItemText primary="Order ID" secondary={currentResOrder?.orderId} />
//             {/* <ListItemText primary="Package Count" secondary={currentResOrder?.packageCount} /> */}
//         </ListItem>
//         <Divider />
//         <ListItem>
//             <ListItemText primary="Item ID" secondary={item?.itemId} />
//             <ListItemText primary="Item Name" secondary={item?.itemName} />
//             <ListItemText primary="Weight" secondary={item?.weight + 'kg'} />
//             <ListItemText primary="Category" secondary={item?.categoryId} />
//         </ListItem>
//         <Divider />
//         <ListItem>
//             <ListItemText primary="Item Description" secondary={item?.description} />
//         </ListItem>
//         {/* ... Similar structure for receiver details, sender details, etc. */}
//     </List>
//     {/* Sender Notes Section */}
//     <ListItem>
//         {/* <ListItemText primary="Sender Notes" secondary={} /> */}
//     </ListItem>
//     {/* Restricted Order Details Section */}
//     <ListItem>
//         <ListItemText primary="Category" secondary={item?.description} />
//         {/* <ListItemText primary="Required Documents" secondary={documentDetails} /> */}
//     </ListItem>
//     {/* Uploaded Documents Section */}
//     {/* Iterate over the documents and display them */}
//     {documentDetails?.map((document, index) => (
//         <ListItem key={document.submittedDocumentId}>
//             {/* Display document information */}
//             <ListItemText primary={document.documentName} />
//         </ListItem>
//     ))}
//     {/* Footer buttons */}
//     <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
//         <Button onClick={handleClose} color="primary">Cancel</Button>
//         <Button onClick={() => handleApprove(currentResOrder?._id)} color="secondary">Approve</Button>
//         <Button onClick={() => handleReject(currentResOrder?._id)} color="error">Reject</Button>
//     </div>
// </Dialog>




//   const handleEditClick = async (id) => {
//     const { data } = await getRestrictedOrderById(id)
//     console.log(data);
//     setCurrentResOrder(data);
//     setIsEditDialogOpen(true);
//     handleClose;
//   };

//   const handleDeleteRestrictedOrderType = async (ResOrderID) => {
//     const ResOrderId = currentResOrder?._id || ResOrderID;
//     if (!ResOrderId) {
//       console.error('No ID available for deleting the restricted order type');
//       return;
//     }
//     try {
//       const response = await deleteRestrictedOrder(ResOrderId);
//       console.log('Order deleted successfully:', response);
//       handleViewClose();
//       // setIsEditDialogOpen(false);
//       // isOpen = false;
//     } catch (error) {
//       console.error('Failed to update order', error);
//     }
//    };


//   const handleUpdatedRestrictedOrderType = async (updatedData: IRestrictedOrder) => {
//     if (!updatedData?._id) {
//       console.error('No ID available for updating the order');
//       return;
//     }
//     try {
//       const id = currentResOrder?._id
//       const dataToUpdate = { ...updatedData };
//       delete dataToUpdate._id;
//       delete dataToUpdate.restrictedOrderId;
//       delete (dataToUpdate as any).createdAt;
//       delete (dataToUpdate as any).updatedAt;
//       delete (dataToUpdate as any).__v;

//       console.log(dataToUpdate)

//       if (id) {
//         const aggType = 'restrictedOrderTypes';
//         const response = await updateRestrictedOrder(id, aggType, dataToUpdate);
//         console.log("edited ", response.data.data[0]);
//         setViewData(response.data.data[0]);
//         handleClose();
//       }

//     } catch (error) {
//       console.error('Failed to update order', error);
//     }
//   };








// console.log(response.data);
// console.log("senderId" ,orderResponse.data.senderId)

// if (!response.data || !Array.isArray(response.data)) {
//     console.log("order data is not in expected format");
// }
// const order = orderResponse.data.map((order: IOrder) => ({
//     ...order,
// }));
// if (!response.data) {
//     console.log("No order data available.");
//     return;
// }

// let order: IOrder;
// if (Array.isArray(response.data)) {
//     // If data is an array, process it as an array
//     order = response.data.map((orderData) => ({
//         ...orderData,
//     }));
// } else {
//     // If data is not an array, process it as a single object





// const fetchDetails = async () => {
//     if (orderDetails) {
//         try {
//             console.log("Sender Id:", orderDetails.senderId);
//             const sender = await getSenderById(orderDetails.senderId);
//             console.log("Sender details:", sender);
//             setSenderDetails(sender);


//             const receiver = await getReceiverById(orderDetails.receiverId); // Accessing receiverId directly
//             setReceiverDetails(receiver.data);
//             console.log("Receiver details:", receiver.data);

//             const item = await getItemById(orderDetails.itemId); // Accessing itemId directly
//             setItem(item.data);
//             console.log("Item details:", item.data);

//             if (orderDetails && itemDetails && senderDetails && receiverDetails && isViewClicked) {
//                 setLoading(false); // End loading regardless of outcome
//             } else {
//                 console.log("errror")
//             }
//             // const documents = await getAllSubmittedDocumentByItemId(orderDetails.itemId, "itemId"); // Using itemId to fetch documents
//             // setDocumentDetails(documents);
//             // console.log("Document details:", documents);
//         } catch (error) {
//             console.error("Error fetching related details:", error);
//         }
//     }
// };

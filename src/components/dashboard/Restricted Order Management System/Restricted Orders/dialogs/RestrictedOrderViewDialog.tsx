import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { getSenderById } from "@app_services/senderService";
import { getReceiverById } from "@app_services/receiverService";
import { getItemById } from "@app_services/itemService";
import { getAllSubmittedDocumentByItemId } from "@app_services/submittedDocumentService";
//import { getRestrictedOrderById, deleteRestrictedOrder, updateRestrictedOrder } from@"../../../../../services/restrictedOrderService";
import { Button } from '@mui/material';
import { IOrder } from '@app_interfaces/IOrder';
import { IItem } from '@app_interfaces/IItem';
import { ISubmittedDocuments } from '@app_interfaces/ISubmittedDocuments';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface FieldConfig {
    name: string;
    label: string;
    type: any;
    disabled?: boolean;
}

interface RestrictedOrderViewDialogProps {
    isOpen: boolean;
    onApprove: (id, isApproved) => void;
    onReject: (id, isApproved) => void;
    //   onEmail: (restrictedOrder: IRestrictedOrder) => void;
    //   onReport: (restrictedOrder: IRestrictedOrder) => void;
    entity: any;
    handleViewClose: () => void;
    fields: FieldConfig[];
}
const RestrictedOrderViewDialog: React.FC<RestrictedOrderViewDialogProps> = ({ isOpen, entity, onApprove, onReject, handleViewClose, fields }) => {


    const [currentResOrder, setCurrentResOrder] = useState<IOrder | null>(entity);
    const [item, setItem] = useState<IItem | null>(null);
    const [documentDetails, setDocumentDetails] = useState<ISubmittedDocuments[] | null>(null);
    const [senderDetails, setSenderDetails] = useState<any>(null);  // Type should be replaced with correct interface
    const [receiverDetails, setReceiverDetails] = useState<any>(null); // Type should be replaced with correct interface
    
    useEffect(() => {
        setCurrentResOrder(entity);
    }, [entity]);

    useEffect(() => {

        if (currentResOrder) {
            const fetchDetails = async () => {
                const sender = await getSenderById(currentResOrder.senderId);
                const receiver = await getReceiverById(currentResOrder.receiverId);
                const fetchedItem = await getItemById(currentResOrder.itemId);
                const documents = await getAllSubmittedDocumentByItemId(fetchedItem?._id, "itemId");

                setSenderDetails(sender);
                setReceiverDetails(receiver);
                setItem(fetchedItem);
                setDocumentDetails(documents);

                console.log(sender , receiver )

            };

            fetchDetails().catch(console.error);
        }
    }, [currentResOrder]);

    const handleClose = () => {
        handleViewClose();
        // console.log("view data " , ViewData)
    };
    const handleApprove = (id) => {
        onApprove(id, true);
        //console.log("view data " , ViewData)
    };
    const handleReject = (id) => {
        onReject(id, false);
        // console.log("view data ", ViewData)
    };
    const handleEmail = () => {
        // onSave(ViewData);
        // console.log("view data ", ViewData)
    };
    const handleReport = () => {
        // onSave(ViewData);
        // console.log("view data ", ViewData)
    };

    // useEffect(() => {
    //     setViewData(entity || {});
    // }, [entity]);


    return (
        <Dialog open={isOpen} onClose={handleViewClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' , width:"500px" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleViewClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Restricted Order - {currentResOrder?.orderId}
                    </Typography>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem>
                    <ListItemText primary="Order ID" secondary={currentResOrder?.orderId} />
                    {/* <ListItemText primary="Package Count" secondary={currentResOrder?.packageCount} /> */}
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Item ID" secondary={item?.itemId} />
                    <ListItemText primary="Item Name" secondary={item?.itemName} />
                    <ListItemText primary="Weight" secondary={item?.weight + 'kg'} />
                    <ListItemText primary="Category" secondary={item?.categoryId} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Item Description" secondary={item?.description} />
                </ListItem>
                {/* ... Similar structure for receiver details, sender details, etc. */}
            </List>
            {/* Sender Notes Section */}
            <ListItem>
                {/* <ListItemText primary="Sender Notes" secondary={} /> */}
            </ListItem>
            {/* Restricted Order Details Section */}
            <ListItem>
                <ListItemText primary="Category" secondary={item?.description} />
                {/* <ListItemText primary="Required Documents" secondary={documentDetails} /> */}
            </ListItem>
            {/* Uploaded Documents Section */}
            {/* Iterate over the documents and display them */}
            {documentDetails?.map((document) => (
                <ListItem key={document.submittedDocumentId}>
                    {/* Display document information */}
                    <ListItemText primary={document.documentName} />
                </ListItem>
            ))}
            {/* Footer buttons */}
            <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={() => handleApprove(currentResOrder?._id)} color="secondary">Approve</Button>
                <Button onClick={() => handleReject(currentResOrder?._id)} color="error">Reject</Button>
            </div>

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

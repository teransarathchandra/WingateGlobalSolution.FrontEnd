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
import Grid from '@mui/material/Grid';
import { TransitionProps } from '@mui/material/transitions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IRestrictedOrder } from "../../../../../interfaces/IRestrictedOrder";
import RestrictedOrderTypeEditDialog from './RestrictedOrderTypeEditDialog';
import { getRestrictedOrderById, deleteRestrictedOrder, updateRestrictedOrder } from "../../../../../services/restrictedOrderService";

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

interface FullScreenDialogProps {
  isOpen: boolean;
  entity: any;
  handleViewClose: () => void;
  fields: FieldConfig[];
}
const FullScreenDialog: React.FC<FullScreenDialogProps> = ({ isOpen, entity, handleViewClose, fields }) => {

  const [ViewData, setViewData] = useState(entity || {});

  useEffect(() => {
    setViewData(entity || {});
  }, [entity]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentResOrder, setCurrentResOrder] = useState<IRestrictedOrder | null>(null);

  const handleClose = () => {
    setIsEditDialogOpen(false);
    window.location.reload();
  };


  const handleEditClick = async (id) => {
    const { data } = await getRestrictedOrderById(id)
    console.log(data);
    setCurrentResOrder(data);
    setIsEditDialogOpen(true);
    handleClose;
  };

  const handleDeleteRestrictedOrderType = async (ResOrderID) => {
    const ResOrderId = currentResOrder?._id || ResOrderID;
    if (!ResOrderId) {
      console.error('No ID available for deleting the restricted order type');
      return;
    }
    try {
      const response = await deleteRestrictedOrder(ResOrderId);
      console.log('Order deleted successfully:', response);
      setIsEditDialogOpen(false);
      isOpen = false;
      handleClose
    } catch (error) {
      console.error('Failed to update order', error);
    }
    window.location.reload();
  };


  const handleUpdatedRestrictedOrderType = async (updatedData: IRestrictedOrder) => {
    if (!updatedData?._id) {
      console.error('No ID available for updating the order');
      return;
    }
    try {
      const id = currentResOrder?._id
      const dataToUpdate = { ...updatedData };
      delete dataToUpdate._id;
      delete dataToUpdate.restrictedOrderId;
      delete (dataToUpdate as any).createdAt;   
      delete (dataToUpdate as any).updatedAt;
      delete (dataToUpdate as any).__v;
   
      console.log(dataToUpdate)

      

      if (id) {
        const response = await updateRestrictedOrder(id, dataToUpdate);
        console.log('dataToUpdate', dataToUpdate);
        console.log('Order updated successfully:', response);

      }
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleViewClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleViewClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Restricted Order Details - {ViewData?.restrictedOrderId}
          </Typography>
        </Toolbar>
      </AppBar>
      <List style={{ width: '500px' }}>
        {fields.map((field, index) => (
          field.type !== Boolean && field.name !== "_id" && ViewData[field.name] && (
            <React.Fragment key={field.name}>
              <ListItem>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ListItemText primary={field.label} />
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemText secondary={ViewData[field.name]} />
                  </Grid>
                </Grid>
              </ListItem>
              {index < fields.length - 1 && <Divider />}
            </React.Fragment>
          )
        ))}
        <List>
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ListItemText primary="Documents" />
              </Grid>
              <Grid item xs={6}>
                {fields.filter(field => field.type == Boolean && ViewData[field.name] == true).map((field) => (
                  <ListItemText key={`doc-${field.name}`} secondary={field.label} />
                ))}
              </Grid>
            </Grid>
          </ListItem>

        </List>
      </List>
      <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
        <button onClick={() => handleEditClick(ViewData._id)} style={{ all: 'unset', display: 'inline-flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} />
        </button>
        <button onClick={() => handleDeleteRestrictedOrderType(ViewData?._id)} style={{ all: 'unset', display: 'inline-flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#0c1821" }} />
        </button>
      </div>
      {isEditDialogOpen &&
        <RestrictedOrderTypeEditDialog
          isOpen={isEditDialogOpen}
          handleClose={() => setIsEditDialogOpen(false)}
          entity={currentResOrder}
          fields={fields}
          onSave={handleUpdatedRestrictedOrderType}
          onDelete={handleDeleteRestrictedOrderType} />
      }
    </Dialog>
  );
};
export default FullScreenDialog;


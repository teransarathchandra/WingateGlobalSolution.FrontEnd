import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { IOrder } from '@app_interfaces/IOrder';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface UserDetailsDialogProps {
  isOpen: boolean;
  user: any; // Replace 'any' with a specific type for your user data
  orders: IOrder[];
  handleClose: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  isOpen,
  user,
  orders,
  handleClose,
}) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (user && user.createdAt) {
      // Replace with your date formatting function
      const date = new Date(user.createdAt).toLocaleDateString();
      setFormattedDate(date);
    }
  }, [user]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          background: '#FFFFE0', // light yellow background
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: '100%', // Full width of the viewport
          maxWidth: '600px', // Max dialog width
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          overflowY: 'auto',
        },
      }}
    >
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#FFFFE0', // light yellow background for header
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div>
          <p>Created On: {formattedDate}</p>
        </div>
        <div>
          <p>Status: Active</p>
        </div>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: '#fff', // white background for details
        borderBottom: '1px solid #ccc',
        borderRadius: '16px', // rounded corners for the details box
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // slight shadow for emphasis
        margin: '20px', // margin around the details box
      }}>
        <h3 style={{ marginBottom: '20px' }}>Customer Details</h3>
        <div style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '10px' }}> {/* Highlight each detail */}
          <p>First Name: {user?.name?.firstName}</p>
          <p>Last Name: {user?.name?.lastName}</p>
          <p>Email: {user?.email}</p>
          <p>Phone Number: {user?.contactNumber}</p>
          <p>Priority: {user?.priorityLevel}</p>
         
        </div>
      </div>

      <DialogActions style={{ padding: '20px', borderTop: '1px solid #ccc', backgroundColor: '#FFFFE0' }}>
        <Button 
          onClick={handleClose}
          variant="contained"
          style={{ 
            backgroundColor: 'rgb(225, 189, 5)', 
            color: 'white',
            borderRadius: '20px'
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;
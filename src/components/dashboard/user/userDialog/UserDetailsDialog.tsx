import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { DialogHeaderContainer, DialogUserContainer } from '@app_styles/userDetailsDialog.styles';

interface UserDetailsDialogProps {
    isOpen: boolean;
    user: any; // You can replace 'any' with a more specific type/interface that represents your user
    handleClose: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ isOpen, user, handleClose }) => {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogHeaderContainer>
                <p>UserID:{user?.userId}</p>
                <p>Status:Active</p>
            </DialogHeaderContainer>

            <p>User Details</p>

            <DialogUserContainer>
                {/* Display user details here */}
                <p>User ID: {user?.userId}</p>
                <p>First Name: {user?.name?.firstName}</p>
                <p>Last Name: {user?.name?.lastName}</p>
                <p>Email: {user?.email}</p>
                <p>Phone Number: {user?.contactNumber}</p>
            </DialogUserContainer>

            <DialogContent>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;

import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { DialogHeaderContainer, DialogHeaderLeft, DialogHeaderRight, DialogOrderDetails, DialogOrdersContainer, DialogUserContainer, DialogUserDetails, StyledDialogContainer } from '@app_styles/userDetailsDialog.styles';
import { separateDateTime } from "@app_utils/separateDateTime";
import { IOrder } from '@app_interfaces/IOrder';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import  { ReactElement } from 'react';


const Transition = React.forwardRef<HTMLDivElement, TransitionProps & { children: ReactElement }>(({ children, ...props }, ref) => {
    return <Slide direction="right" ref={ref} {...props}>
      {children}
    </Slide>;
  });

interface UserDetailsDialogProps {
    isOpen: boolean;
    user: any; // You can replace 'any' with a more specific type/interface that represents your user
    orders: IOrder[];
    handleClose: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ isOpen, user, orders, handleClose }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const formatUserDate = async () => {
            if (user && user.createdAt) {
                const result = await separateDateTime(user.createdAt, "YYYY-MM-DD");
                setFormattedDate(result.date); // Assuming you only want to display the date
            }
        };

        formatUserDate();
    }, [user]); // This effect depends on the `user` prop

    return (
        <>
        <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition} // Apply the transition here
      >                <StyledDialogContainer>
                <DialogHeaderContainer>
                    <DialogHeaderLeft>
                        <p>User ID: {user?.userId}</p> {/* User ID on its own line */}
                        <p>Created On: {formattedDate}</p> {/* Date on the next line */}
                    </DialogHeaderLeft>
                    <DialogHeaderRight>
                        <p>Status: Active</p> {/* Status in the top right corner */}
                    </DialogHeaderRight>
                </DialogHeaderContainer>



                <DialogUserContainer>
                    <h3>User Details</h3>
                    <DialogUserDetails>
                        {/* Display user details here */}
                        <p>User ID: {user?.userId}</p>
                        <p>First Name: {user?.name?.firstName}</p>
                        <p>Last Name: {user?.name?.lastName}</p>
                        <p>Email: {user?.email}</p>
                        <p>Phone Number: {user?.contactNumber}</p>
                    </DialogUserDetails>
                </DialogUserContainer>

                <DialogOrdersContainer>
                    <h3>Active Orders</h3>
                    <DialogOrderDetails>
                        {orders.map((order, index) => (
                            <div key={index}>
                                <p>Order ID: {order.orderId}</p>
                                {/* <p>Amount: {order.amount}</p> */}
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p> {/* Consider formatting this date */}
                                <p>Status: {order.status}</p>
                            </div>
                        ))}
                    </DialogOrderDetails>
                </DialogOrdersContainer>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
                </StyledDialogContainer>
            </Dialog>
        </>
    );
};

export default UserDetailsDialog;

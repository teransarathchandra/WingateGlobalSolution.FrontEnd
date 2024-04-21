import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { IOrder } from '@app_interfaces/IOrder';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

interface UserDetailsDialogProps {
    isOpen: boolean;
    user: any;
    orders: IOrder[];
    handleClose: () => void;
}

const userDetailsStyle = {
    backgroundColor: 'lightyellow',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    maxWidth: '500px',
    margin: 'auto',
    marginBottom: '20px'
};

const detailItemStyle = {
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '1px solid #ccc'
};

const sectionTitleStyle = {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '18px',
    marginBottom: '10px'
};

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
    isOpen,
    user,
    orders,
    handleClose,
}) => {
    const [formattedDate, setFormattedDate] = useState('');
    const [reminder, setReminder] = useState('');

    useEffect(() => {
        if (user && user.createdAt) {
            const date = new Date(user.createdAt).toLocaleDateString();
            setFormattedDate(date);
        }
    }, [user]);

    const sendBirthdayEmail = () => {
        const email = user?.email;
        const subject = encodeURIComponent('Happy Birthday!');
        const body = encodeURIComponent('Wishing you a wonderful birthday filled with joy and happiness.Best wishes from WinGate Global Solutions.');
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    const sendReminderEmail = (reminderTime) => {
        const email = user?.email;
        const subject = encodeURIComponent('Meeting Reminder');
        const body = encodeURIComponent(`This is a reminder for your upcoming meeting. Please be ready ${reminderTime}.\n Wingate Global Solutiuons.`);
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    const handleReminderChange = (event) => {
        const reminderValue = event.target.value;
        setReminder(reminderValue);
        sendReminderEmail(reminderValue);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            TransitionComponent={Transition}
            PaperProps={{
                style: {
                    background: '#FFFFE0',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '100%',
                    maxWidth: '600px',
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
                    overflowY: 'auto',
                },
            }}
        >
            <div style={{
                padding: '20px',
                borderBottom: '1px solid #ccc',
                backgroundColor: '#FFFFE0',
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
                backgroundColor: '#fff',
                borderBottom: '1px solid #ccc',
                borderRadius: '16px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                margin: '20px',
            }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Customer Details</h2>
                <div style={userDetailsStyle}>
                    <div style={sectionTitleStyle}>Basic Info</div>
                    <div style={detailItemStyle}>First Name: {user?.name?.firstName || 'N/A'}</div>
                    <div style={detailItemStyle}>Last Name: {user?.name?.lastName || 'N/A'}</div>
                    <div style={detailItemStyle}>Email: {user?.email || 'N/A'}</div>
                    <div style={detailItemStyle}>Phone Number: {user?.contactNumber || 'N/A'}</div>

                    <div style={sectionTitleStyle}>Other Details</div>
                    <div style={detailItemStyle}>Priority: {user?.priorityLevel || 'N/A'}</div>

                    <div style={detailItemStyle}>
                        <Button 
                            variant="contained"
                            style={{ 
                                backgroundColor: '#4CAF50', 
                                color: 'white',
                                marginBottom: '10px',
                                textTransform: 'none',
                            }}
                            onClick={sendBirthdayEmail}
                        >
                            Send Birthday Email
                        </Button>
                        <Select
                            value={reminder}
                            onChange={handleReminderChange}
                            displayEmpty
                            style={{ 
                                backgroundColor: 'white',
                                width: '100%',
                            }}
                        >
                            <MenuItem value="" disabled>
                                Set Meeting Reminder
                            </MenuItem>
                            <MenuItem value={'15min'}>15 Minutes Before</MenuItem>
                            <MenuItem value={'30min'}>30 Minutes Before</MenuItem>
                            <MenuItem value={'1hour'}>1 Hour Before</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>

            <DialogActions style={{ padding: '20px', borderTop: '1px solid #ccc', backgroundColor: '#FFFFE0' }}>
                <Button 
                    onClick={handleClose}
                    variant="contained"
                    style={{ 
                        backgroundColor: 'rgb(225, 189, 5)', 
                        color: 'white',
                        textTransform: 'none',
                        borderRadius: '20px',
                    }}
                >
                    Close     
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;

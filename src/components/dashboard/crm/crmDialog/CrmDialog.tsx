import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grow } from '@mui/material';
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

const dialogStyle = {
    background: '#f4f4f4',
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    maxWidth: '600px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    overflowY: 'auto',
    transition: 'transform 0.3s ease-in-out'
};

const contentContainerStyle = {
    padding: '20px',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#FFFFE0',
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'opacity 0.3s ease-in-out',
    color: '#575757'
};

const detailsContainerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
    borderRadius: '16px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    margin: '20px',
    opacity: 1,
    transition: 'all 0.3s ease',
    color: '#575757'
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
        const subject = encodeURIComponent('🎉 Happy Birthday from WinGate Global Solutions! 🎉');
        const body = encodeURIComponent(
            `Dear ${user?.name?.firstName || 'Valued Customer'},\n\n` +
            `We at WinGate Global Solutions wish you a joyous and splendid birthday! 🎂🎈\n\n` +
            `May your day be filled with laughter, happiness, and all things bright and beautiful. We are so glad to have you with us and look forward to celebrating many more milestones together.\n\n` +
            `As a token of our appreciation, we've attached a special gift just for you in this email. Please check the attachments for a surprise!\n\n` +
            `Wishing you all the best today and always,\n` +
            `Your friends at WinGate Global Solutions 🌟\n\n` +
            `P.S. Don't forget to treat yourself to something special—you deserve it!`
        );
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };
    

    const sendReminderEmail = (reminderTime) => {
        const email = user?.email;
        const subject = encodeURIComponent('Meeting Reminder from WinGate Global Solutions');
        const body = encodeURIComponent(
            `Dear ${user?.name?.firstName || 'Participant'},\n\n` +
            `Just a friendly reminder from WinGate Global Solutions about your upcoming meeting.\n\n` +
            `**Meeting Details:**\n` +
            `- **Time:** Please be ready ${reminderTime}.\n` +
            `- **Date:** [Insert Date Here]\n` +
            `- **Location:** [Insert Location Here] or [Virtual Meeting Link]\n\n` +
            `Here are a few tips to ensure a smooth and productive session:\n` +
            `- Ensure your meeting software is updated and running prior to the meeting.\n` +
            `- Have a list of topics you'd like to discuss or any questions prepared.\n` +
            `- If it's a virtual meeting, find a quiet space to avoid background noise.\n\n` +
            `We value your time and input, and look forward to a great meeting. Should you have any questions or need to reschedule, please do not hesitate to contact us.\n\n` +
            `Thank you and see you soon,\n` +
            `The Team at WinGate Global Solutions\n`
        );
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
            PaperProps={{ style: dialogStyle }}
        >
            <Grow in={isOpen} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
                <div style={contentContainerStyle}>
                    <div>
                        <p>Created On: {formattedDate}</p>
                    </div>
                    <div>
                        <p>Status: Active</p>
                    </div>
                </div>
            </Grow>

            <Grow in={isOpen} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
                <div style={detailsContainerStyle}>
                    <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#4CAF50' }}>Customer Details</h2>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>First Name: {user?.name?.firstName || 'N/A'}</div>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>Last Name: {user?.name?.lastName || 'N/A'}</div>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>Email: {user?.email || 'N/A'}</div>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>Phone Number: {user?.contactNumber || 'N/A'}</div>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>Priority: {user?.priorityLevel || 'N/A'}</div>
                    <Button onClick={sendBirthdayEmail} variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white', marginBottom: '10px', textTransform: 'none', borderRadius: '20px' }}>Send Birthday Email</Button>
                    <Select
                        value={reminder}
                        onChange={handleReminderChange}
                        displayEmpty
                        style={{ backgroundColor: 'white', width: '100%', borderRadius: '20px' }}
                   >
                        <MenuItem value="" disabled>Set Meeting Reminder</MenuItem>
                        <MenuItem value={'15min'}>15 Minutes Before</MenuItem>
                        <MenuItem value={'30min'}>30 Minutes Before</MenuItem>
                        <MenuItem value={'1hour'}>1 Hour Before</MenuItem>
                    </Select>
                </div>
            </Grow>

            <DialogActions style={{ padding: '20px', borderTop: '1px solid #ccc', backgroundColor: '#FFFFE0' }}>
                <Button 
                    onClick={handleClose}
                    variant="contained"
                    style={{ backgroundColor: 'rgb(225, 189, 5)', color: 'white', textTransform: 'none', borderRadius: '20px' }}
                >
                    Close     
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;
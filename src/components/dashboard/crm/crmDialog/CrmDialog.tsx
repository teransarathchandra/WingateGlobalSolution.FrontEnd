import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grow } from '@mui/material';


const Transition = React.forwardRef(function Transition(
    props: React.ComponentProps<typeof Slide>,
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

interface UserDetailsDialogProps {
    isOpen: boolean;
    user: any;
    handleClose: () => void;
}

const dialogStyle = {
    background: '#f4f4f4',
    position: 'absolute' as const,  
    top: '0',  
    right: '0',  
    height: '100%',  
    width: '100%',  
    maxWidth: '600px', 
    borderTopLeftRadius: '0px',  
    borderBottomLeftRadius: '0px',  
    overflowY: 'auto' as const,  
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

    const sendEmail = (emailType: 'birthday' | 'reminder') => {
        const email = user?.email;
        let subject = '';
        let body = '';

        if (emailType === 'birthday') {
            subject = encodeURIComponent('🎉 Happy Birthday from WinGate Global Solutions! 🎉');
            body = encodeURIComponent(
                `Dear ${user?.name?.firstName || 'Valued Customer'},\n\n` +
                `We at WinGate Global Solutions wish you a joyous and splendid birthday! 🎂🎈\n\n` +
                `May your day be filled with laughter, happiness, and all things bright and beautiful. We are so glad to have you with us and look forward to celebrating many more milestones together.\n\n` +
                `\n\n` +
                `Wishing you all the best today and always,\n` +
                `Your friends at WinGate Global Solutions 🌟\n\n` +
                `P.S. Don't forget to treat yourself to something special—you deserve it!`
            );
        } else if (emailType === 'reminder' && reminder) {
            subject = encodeURIComponent('Meeting Reminder from WinGate Global Solutions');
            const reminderTimeText = {
                '15min': '15 minutes',
                '30min': '30 minutes',
                '1hour': '1 hour'
            }[reminder] || 'soon';
            body = encodeURIComponent(
                `Dear ${user?.name?.firstName || 'Valued Customer'},\n\n` +
                `This is a friendly reminder that our scheduled meeting is due to start in ${reminderTimeText}. Please ensure that you are prepared and join the meeting on time.\n\n` +
                `We look forward to our discussion and are eager to explore further opportunities together.\n\n` +
                `Warm regards,\n` +
                `Your team at WinGate Global Solutions 🌟`
            );
        }

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
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
                        <p>Status: Active</p>
                    </div>
                    <div>
                        <Button onClick={() => sendEmail('birthday')} variant="contained" style={{ backgroundColor: '#e1bd05', color: 'white', textTransform: 'none', borderRadius: '20px' }}>
                            Send Birthday Email
                        </Button>
                    </div>
                </div>
            </Grow>

            <Grow in={isOpen} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
                <div style={detailsContainerStyle}>
                    <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#e1bd05' }}>Customer Details</h2>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>First Name: {user?.name?.firstName || 'N/A'}</div>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>Last Name: {user?.name?.lastName || 'N/A'}</div>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>Email: {user?.email || 'N/A'}</div>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>Phone Number: {user?.contactNumber || 'N/A'}</div>
                    <div style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>Priority: {user?.priorityLevel || 'N/A'}</div>
                    <Select
                        value={reminder}
                        onChange={(event) => setReminder(event.target.value)}
                        displayEmpty
                        style={{ backgroundColor: 'white', width: '100%', borderRadius: '20px', marginTop: '10px' }}
                   >
                        <MenuItem value="" disabled>Set Meeting Reminder</MenuItem>
                        <MenuItem value={'15min'}>15 Minutes Before</MenuItem>
                        <MenuItem value={'30min'}>30 Minutes Before</MenuItem>
                        <MenuItem value={'1hour'}>1 Hour Before</MenuItem>
                    </Select>
                    <Button onClick={() => sendEmail('reminder')} variant="contained" style={{ backgroundColor: '#e1bd05', color: 'white', textTransform: 'none', borderRadius: '20px', marginTop: '10px' }}>
                        Send Reminder Email
                    </Button>
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

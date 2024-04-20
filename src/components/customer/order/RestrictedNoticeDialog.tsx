import { DialogContent, Button, Dialog, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import useSessionStorage from '@app_hooks/useSessionStorage';

interface RestrictedNoticeDialog {
    isOpen: boolean;
    handleBack: () => void;
    handleProceed: () => void;
    trueDocumentList: string[];
    maxQuantity: number;
}

const RestrictedNoticeDialog: React.FC<RestrictedNoticeDialog> = ({ isOpen, handleBack, handleProceed, trueDocumentList, maxQuantity }) => {
    const [itemId,] = useSessionStorage('order-item-id');

    return (
        <Dialog open={isOpen} onClose={handleBack}>
            <DialogTitle sx={{ textAlign: 'center', color: '#0b0670', fontSize: '2rem', fontWeight: 'bold' }}>
                Restricted Order!
                <DialogContentText sx={{ textAlign: 'center', color: '#110d5e', fontSize: '1rem', fontWeight: 'bold' }}>
                    Item Id : {itemId}
                </DialogContentText>
            </DialogTitle>

            <DialogContent sx={{ paddingLeft: '50px', color: '#021549', fontWeight: 'bold' }}>
                <DialogContentText style={{color: '#000000'}}>
                    You are attempting to place a restricted order.
                    <br />  
                    To proceed, you must submit the following documents:
                </DialogContentText>
                {trueDocumentList.map((name) => (
                    <ul>    
                        <li>{name}</li>
                    </ul>
                ))}
                <DialogContentText style={{color: '#000000'}}>
                    Please note that the maximum weight limit for this order is {maxQuantity} kg. Ensure your order complies with this requirement.
                </DialogContentText>

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', padding: '16px 156px' }}>
                <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
                    <Button onClick={() => handleBack()} color="secondary">Back</Button>
                    <Button onClick={() => handleProceed()} color="secondary">Proceed</Button>
                </div>
            </DialogActions>

        </Dialog>

    );
};

export default RestrictedNoticeDialog;

{/* <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Add new Restricted Order Type
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(handleAdd, handleClose)}> */}

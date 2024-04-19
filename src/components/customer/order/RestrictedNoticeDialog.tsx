import { DialogContent, Button, Dialog, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import useSessionStorage from '@app_hooks/useSessionStorage';

interface RestrictedNoticeDialog {
    isOpen: boolean;
    handleBack: () => void;
    handleProceed: () => void;
    trueDocumentList: string[];
    maxQuantity: number;
}
// interface RestrictedOrderFormat {
//     key;
//     label: string;
//     type: 'string' | 'number' | 'boolean';
//     value: '' | null | false | true;
// }

const RestrictedNoticeDialog: React.FC<RestrictedNoticeDialog> = ({ isOpen, handleBack, handleProceed, trueDocumentList, maxQuantity }) => {
    // const [restrictedOrderType,] = useSessionStorage('restricted-order-order-type');
    const [itemId,] = useSessionStorage('order-item-id');

    // const restrictedOrder: RestrictedOrderFormat[] = [
    //     { key: 'sendingCountryId', label: 'Sending Country', type: 'string', value: restrictedOrderType.sendingCountryId },
    //     { key: 'receivingCountryId', label: 'Receiving Country', type: 'string', value: restrictedOrderType.receivingCountryId },
    //     { key: 'categoryId', label: 'Category', type: 'string', value: restrictedOrderType.categoryId },
    //     { key: 'exportLicense', label: 'Export License', type: 'boolean', value: restrictedOrderType.exportLicense },
    //     { key: 'importPermit', label: 'Import Permit', type: 'boolean', value: restrictedOrderType.importPermit },
    //     { key: 'safetyDataSheets', label: 'Safety Data Sheets', type: 'boolean', value: restrictedOrderType.safetyDataSheets },
    //     { key: 'phytosanitaryCertificate', label: 'Phytosanitary Certificate', type: 'boolean', value: restrictedOrderType.phytosanitaryCertificate },
    //     { key: 'dangerousGoodsDeclaration', label: 'Dangerous Goods Declaration', type: 'boolean', value: restrictedOrderType.dangerousGoodsDeclaration },
    //     { key: 'maxQuantity', label: 'Maximum Quantity', type: 'number', value: restrictedOrderType.maxQuantity }
    // ];

    return (
        <Dialog open={isOpen} onClose={handleBack}>
            <DialogTitle>Restricted Order!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Item Id : {itemId}
                </DialogContentText>
                <DialogContentText style={{}}>
                    You are attempting to place a restricted order.
                </DialogContentText>
                <DialogContentText>
                    To proceed, you must submit the following documents:
                </DialogContentText>
                {trueDocumentList.map((name) => (
                    <ul>
                        <li>{name}</li>
                    </ul>
                ))}
                <DialogContentText>
                    Please note that the maximum weight limit for this order is {maxQuantity} kg. Ensure your order complies with this requirement.
                </DialogContentText>

            </DialogContent>
            <DialogActions>
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

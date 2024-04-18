import { useEffect, useState } from 'react';
import { DialogContent, Button, Dialog, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import useSessionStorage from '@app_hooks/useSessionStorage';
//import { IRestrictedOrder } from "@app_interfaces/IRestrictedOrder";

interface RestrictedNoticeDialog {
    isOpen: boolean;
    handleBack: () => void;
    handleProceed: () => void;
}

const RestrictedNoticeDialog: React.FC<RestrictedNoticeDialog> = ({ isOpen, handleBack, handleProceed }) => {
    const [restrictedOrderType,] = useSessionStorage('restricted-order-order-type');
    const [itemId] = useSessionStorage('order-item-id');

    console.log(restrictedOrderType, itemId);

    useEffect(() => {
        // setFormData(formData);
        // fetchCategories();
        // fetchCountries();
    }, []);
    function handleClose(): void {

    }
    return (
        <Dialog open={isOpen} onClose={handleBack}>
            <DialogTitle>Restricted Order!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Item Id : {itemId}
                </DialogContentText>
                <DialogContentText>
                    You are attempting to place a restricted order.
                </DialogContentText>
                <DialogContentText>
                    To proceed, you must submit the following documents:
                </DialogContentText>

                <ul>
                    <li>Import Permit</li>
                    <li>Export License</li>
                    <li>Safety Data Sheets</li>
                </ul>
                <DialogContentText>
                    Please note that the maximum weight limit for this order is 200 kg. Ensure your order complies with this requirement.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>


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
            <DialogContent>
                {/* {Object.keys(formData).map((key) => (
                        typeof formData[key] === 'boolean' ? (
                            <FormControlLabel
                                key={key}
                                style={{ display: 'block' }}
                                control={
                                    <Checkbox
                                        checked={formData[key]}
                                        onChange={handleChange}
                                        name={key}
                                    />
                                }
                                label={key}
                            />
                        ) : key === "maxQuantity" ? (

                            <TextField
                                key={key}
                                autoFocus
                                margin="dense"
                                id={key}
                                label={key}
                                type="number"
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                            />

                        ) : key === "categoryId" ? (
                            <>
                                <div>
                                    <InputLabel id={key}>Category</InputLabel>
                                    <Select
                                        // placeholder={key}
                                        // style={{
                                        //     marginBottom: "10px",
                                        //     height: "50px",
                                        // }}
                                        key={key}
                                        autoFocus
                                        id={key}
                                        fullWidth
                                        type="String"
                                        variant="outlined"
                                        value={formData[key]}
                                        {...register(key)}
                                        onChange={handleChange}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <InputLabel id={key}>
                                        {key === 'sendingCountryId' ? 'Sending From:' :
                                            key === 'receivingCountryId' ? 'Receiving To:' : ''}
                                    </InputLabel>
                                    <Select
                                        defaultValue={formData[key]}
                                        // placeholder={key}
                                        // style={{
                                        //     marginBottom: "10px",
                                        //     height: "50px",
                                        // }}
                                        key={key}
                                        autoFocus
                                        id={key}
                                        fullWidth
                                        type="String"
                                        variant="outlined"
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country._id} value={country._id}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </>
                        )
                    ))} */}
            </DialogContent>
            <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
                <Button onClick={() => handleBack()} color="secondary">Back</Button>
                <Button onClick={() => handleProceed()} color="secondary">Proceed</Button>
            </div>
            {/* </form> */}
        </Dialog>
    );
};

export default RestrictedNoticeDialog;

import React, { useState } from 'react';
import { DialogContent, TextField, Checkbox, IconButton, FormControlLabel, Button, Dialog, AppBar, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddRestrictedOrderForm  = ({isOpen, handleClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        sendingCountryId: '',
        receivingCountryId: '',
        categoryId: '',
        maxQuantity: '',
        exportLicense: false,
        importPermit: false,
        safetyDataSheets: false,
        phytosanitaryCertificate: false,
        dangerousGoodsDeclaration: false
        
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Add new Restricted Order Type
                    </Typography>
                </Toolbar>
            </AppBar>
        <form onSubmit={handleSubmit}>
            <DialogContent>
                {Object.keys(formData).map((key) => (
                    typeof formData[key] === 'boolean' ? (
                        <FormControlLabel
                            key={key}
                            control={
                                <Checkbox
                                    checked={formData[key]}
                                    onChange={handleChange}
                                    name={key}
                                />
                            }
                            label={key}
                        />
                    ) : (
                        <TextField
                            key={key}
                            autoFocus
                            margin="dense"
                            id={key}
                            label={key}
                            type="text"
                            fullWidth
                            variant="outlined"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    )
                ))}
            </DialogContent>
            <Button type="submit" color="primary">Create Restricted Order</Button>
         {/* <button onClick={() => handleDeleteRestrictedOrderType(formData)} style={{ all: 'unset', display: 'inline-flex', alignItems: 'center' }}> Create Restricted Order </button> */}
        </form>
        </Dialog>
    );
};

export default AddRestrictedOrderForm;

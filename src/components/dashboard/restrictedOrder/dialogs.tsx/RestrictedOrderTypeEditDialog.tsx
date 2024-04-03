import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { AppBar, Checkbox, FormControlLabel, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FieldConfig {
    name: string;
    label: string;
    type?: any;
    disabled?: boolean;
}

interface EditDialogProps {
    isOpen: boolean;
    entity: any;
    handleClose: () => void;
    fields: FieldConfig[];
    onSave: (data: any) => void;
    onDelete: (data: any) => void;
}

const RestrictedOrderTypeEditDialog: React.FC<EditDialogProps> = ({ isOpen, entity, fields, handleClose, onSave, onDelete }) => {

    const [formData, setFormData] = useState(entity || {});
    fields && fields.map((field) => (              
    console.log(formData[field.name] )));

    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Restricted Order Details - {entity.restrictedOrderId}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent>
                {fields && fields.map((field) =>
                    field.type !== Boolean && (
                        <TextField
                            key={field.name}
                            autoFocus
                            margin="dense"
                            id={field.name}
                            label={field.label}
                            type={field.type === Number ? 'number' : 'text'}
                            fullWidth
                            variant="outlined"
                            name={field.name}
                            value={formData[field.name] || ''}
                            disabled={field.disabled}
                            onChange={handleChange}
                            
                        />
                    ))}
                    
                {/* {fields && fields.map((field) =>
                    field.type == Boolean &&  (
                        <FormControlLabel
                            key={field.name}
                            label={field.label}
                            control={
                                <Checkbox
                                    autoFocus
                                    id={field.name}
                                    name={field.name}
                                    checked={Boolean(formData[field.name])}
                                    disabled={field.disabled}
                                    onChange={handleChange}
                                    value={formData[field.name]} />
                            } />
                    ))} */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={() => onSave(formData)} color="secondary">Save</Button>
                {onDelete && <Button onClick={() => onDelete(entity._id)} color="error">Delete</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default RestrictedOrderTypeEditDialog;
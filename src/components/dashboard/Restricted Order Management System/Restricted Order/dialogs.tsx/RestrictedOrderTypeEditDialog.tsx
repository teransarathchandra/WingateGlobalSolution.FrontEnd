import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { AppBar, Checkbox, FormControlLabel, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//import { IRestrictedOrder } from "../../../../interfaces/IRestrictedOrder";

interface FieldConfig {
    name: string;
    label: string;
    type: any;
    disabled?: boolean;
}

interface EditDialogProps {
    isOpen: boolean;
    entity: any;
    fields: FieldConfig[];
    handleClose: () => void;
    onSave: (data: any) => void;
    onDelete: (data: any) => void;
}

const RestrictedOrderTypeEditDialog: React.FC<EditDialogProps> = ({ isOpen, entity, fields, handleClose, onSave, onDelete }) => {

    const [formData, setFormData] = useState(entity);
    // fields && fields.map((field) => (              
    // console.log(formData[field.name] )));

    useEffect(() => {
        const entityWithoutId = Object.fromEntries(
            Object.entries(entity).filter(([key]) => key !== '_id')
        );
        setFormData(entityWithoutId);
    }, [entity]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        onSave(formData);
        handleClose
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
            <form onSubmit={handleSave}>
                <DialogContent>
                    {fields
                        .filter(field => field.name !== "_id" && field.name !== "restrictedOrderId")
                        .map((field) => (
                            field.type === Boolean ? (
                                <FormControlLabel
                                    key={field.name}
                                    control={
                                        <Checkbox
                                            checked={formData[field.name]}
                                            onChange={handleChange}
                                            name={field.name}
                                        />
                                    }
                                    label={field.name}
                                />

                            ) : (
                                <TextField
                                    key={field.name}
                                    autoFocus
                                    margin="dense"
                                    id={field.name}
                                    label={field.label}
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                />
                            )

                        ))}
                </DialogContent>
                <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button type="submit" onClick={() => onSave(formData)} color="secondary">Save</Button>
                    <Button onClick={() => onDelete(entity._id)} color="error">Delete</Button>
                </div>
            </form>
        </Dialog>
    );
};

export default RestrictedOrderTypeEditDialog;


{/* <Button type="submit" color="primary">Save</Button> */ }
{/* <button onClick={() => handleDeleteRestrictedOrderType(formData)} style={{ all: 'unset', display: 'inline-flex', alignItems: 'center' }}> Create Restricted Order </button> */ }

{/* <DialogContent>
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
                    ))} */}

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
{/* </DialogContent> */ }

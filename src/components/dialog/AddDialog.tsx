import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import React, { useEffect, useState } from 'react';
import { DialogHeaderContainer, DialogHeaderImage } from '../../styles/shared/editDialog.styles';
import logo from "../../assets/images/logo.png";

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    options?: { value: string | number, label: string }[];
}

interface AddDialogProps {
    isOpen: boolean;
    entity: any;
    handleClose: () => void;
    fields: FieldConfig[];
    onSave: (data: any) => void;
}

const AddDialog: React.FC<AddDialogProps> = ({ isOpen, handleClose, entity, fields, onSave }) => {
    const [formData, setFormData] = useState(entity || {});

    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Add/Edit Item</DialogTitle>
            <DialogHeaderContainer>
                <DialogHeaderImage src={logo}></DialogHeaderImage>
            </DialogHeaderContainer>
            <DialogContent>
                {fields.map((field) => (
                    field.type === 'dropdown' ? (
                        <div key={field.name}>
                            <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                            <Select
                                labelId={`${field.name}-label`}
                                margin="dense"
                                id={field.name}
                                fullWidth
                                variant="outlined"
                                name={field.name}
                                value={formData[field.name] || ''}
                                disabled={field.disabled}
                                onChange={handleChange}
                            >
                                {field.options && field.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    ) : (
                        <TextField
                            key={field.name}
                            autoFocus
                            margin="dense"
                            id={field.name}
                            label={field.label}
                            type={field.type}
                            fullWidth
                            variant="outlined"
                            name={field.name}
                            value={formData[field.name] || ''}
                            disabled={field.disabled}
                            onChange={(e) => handleChange(e as SelectChangeEvent)}
                        />
                    )
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={() => onSave(formData)} color="secondary">Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialog;



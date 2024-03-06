import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
import logo from "../../assets/images/logo.png"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { DialogHeaderContainer, DialogHeaderImage } from '../../styles/shared/editDialog.styles';

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
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

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, handleClose, entity, fields, onSave, onDelete }) => {

    // State to manage local form data, initialized with entity or empty object
    const [formData, setFormData] = useState(entity || {});

    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogHeaderContainer>
                <DialogHeaderImage src={logo}></DialogHeaderImage>
            </DialogHeaderContainer>
            <DialogContent>
                {fields && fields.map((field) => (
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
                        onChange={handleChange}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={() => onSave(formData)} color="secondary">Save</Button>
                {onDelete && <Button onClick={() => onDelete(entity)} color="error">Delete</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
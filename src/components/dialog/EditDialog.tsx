import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
import logo from "@app_assets/images/logo.png"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { DialogHeaderContainer, DialogHeaderImage } from '@app_styles/shared/editDialog.styles';

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
    onSave:  any;
    onDelete: (data: any) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, handleClose, entity, fields, onSave, onDelete }) => {

    // State to manage local form data, initialized with entity or empty object
    const [formData, setFormData] = useState(entity || {});
    console.log(formData.name?.firstName)
    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.'); // Split the name by dots to get the path

        setFormData(prev => {
            let updated = { ...prev }; // Create a shallow copy of the current state
            let temp = updated; // Temporary reference to navigate the structure

            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    temp[key] = value; // Set the value at the final key
                } else {
                    if (!temp[key]) temp[key] = {}; // If the key does not exist, create an object
                    temp = temp[key]; // Update the reference to point to the next level
                }
            });

            return updated;
        });
    };

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

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
                        value={getNestedValue(formData, field.name) || ''}
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
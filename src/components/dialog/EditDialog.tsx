import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
import logo from "@app_assets/images/logo.png"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { DialogHeaderContainer, DialogHeaderImage } from '@app_styles/shared/editDialog.styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    options?: { value: string | number, label: string }[];
}

interface EditDialogProps {
    isOpen: boolean;
    entity: any;
    handleClose: () => void;
    fields: FieldConfig[];
    onSave: any;
    onDelete: (data: any) => void;
    schema?: any;
}

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, handleClose, entity, fields, onSave, onDelete, schema }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: schema ? yupResolver(schema) : undefined,
        // defaultValues: entity || {},
    });

    const [formData, setFormData] = useState(entity || {});
    console.log(formData.name?.firstName)
    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const onSubmit = data => {
        onSave(data);
        handleClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.'); // Split the name by dots to get the path

        setFormData(prev => {
            const updated = { ...prev }; // Create a shallow copy of the current state
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
            <form onSubmit={schema ? handleSubmit(onSubmit) : onSubmit}>
                <DialogHeaderContainer>
                    <DialogHeaderImage src={logo}></DialogHeaderImage>
                </DialogHeaderContainer>
                <DialogContent>
                    {fields && fields.map((field) => (
                        field.type === 'dropdown' ? (
                            <div key={field.name}>
                                <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                                <Select
                                    labelId={`${field.name}-label`}
                                    margin="dense"
                                    id={field.name}
                                    fullWidth
                                    variant="outlined"
                                    {...register(field.name)}
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
                        ) : (<TextField
                            key={field.name}
                            autoFocus
                            margin="dense"
                            id={field.name}
                            label={field.label}
                            type={field.type}
                            fullWidth
                            variant="outlined"
                            value={getNestedValue(formData, field.name) || ''}
                            disabled={field.disabled}
                            {...register(field.name)}
                            name={field.name}
                            onChange={(e) => handleChange(e as SelectChangeEvent)}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]?.message as string}
                        />
                        )
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button type="submit" color="secondary">Save</Button>
                    {onDelete && <Button onClick={() => onDelete(entity)} color="error">Delete</Button>}
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditDialog;
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
import { DialogHeaderContainer, DialogHeaderImage } from '@app_styles/shared/editDialog.styles';
import logo from "@app_assets/images/logo.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    options?: { value: string | number, label: string }[];
}
interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    options?: { value: string | number, label: string }[];
}
interface AddDialogProps {
    isOpen: boolean;
    entity?: any;
    handleClose: () => void;
    fields: FieldConfig[];
    onSave: (data: any) => void;
    title?: string;
    schema?: any;
}

const AddDialog: React.FC<AddDialogProps> = ({ isOpen, handleClose, entity, fields, onSave, title, schema }) => {
    const [formData, setFormData] = useState(entity || {});

    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: schema ? yupResolver(schema) : undefined,
    });

    const onSubmit = data => {
        console.log("asdasd");
        onSave(data);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>{title || "Add Item"}</DialogTitle>
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
                                    defaultValue='66249f563706e28304ffac91'
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
                                {...register(field.name)}
                                value={formData[field.name] || ''}
                                disabled={field.disabled}
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
                </DialogActions>
            </form>
        </Dialog >
    );
};

export default AddDialog;
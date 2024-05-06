import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import logo from "../../assets/images/logo.png"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { DialogHeaderContainer, DialogHeaderImage } from '../../styles/shared/editDialog.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    options?: any[];
}

interface EditDialogProps {
    isOpen: boolean;
    entity: any;
    handleClose: () => void;
    fields: FieldConfig[];
    onSave: (data: any) => void;
    onDelete: (data: any) => void;
    schema?: any;
}

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, handleClose, entity, fields, onSave, onDelete, schema }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: schema ? yupResolver(schema) : undefined,
        // defaultValues: entity || {},
    });

    const [formData, setFormData] = useState(entity || {});

    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field: ${name}, Value: ${value}`);
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = data => {
        onSave(data);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeaderContainer>
                    <DialogHeaderImage src={logo}></DialogHeaderImage>
                </DialogHeaderContainer>
                <DialogContent>
                    {fields && fields.map((field) => (
                        field.type === 'dropdown' ? (
                            <Select
                                {...register(field.name)}
                                key={field.name}
                                margin="dense"
                                id={field.name}
                                label={field.label}
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
                                value={formData[field.name] || ''}
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

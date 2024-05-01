import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import styled, { keyframes } from 'styled-components';
import logo from "../../assets/images/logo.png";
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material'; // Import icons

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
}

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const DialogHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const DialogHeaderImage = styled.img`
  width: 100px;
  height: auto;
`;

const AddDialogModified = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 20px;
    background-color: #f5f5f5;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    animation: ${slideIn} 0.5s ease forwards; /* Apply animation */
  }

  &:hover {
    transform: scale(1.02);
  }
`;

const AddDialog: React.FC<AddDialogProps> = ({ isOpen, handleClose, entity, fields, onSave, title }) => {
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
        <AddDialogModified open={isOpen} onClose={handleClose}>
            <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>{title || "Add Details"}</DialogTitle>
            <DialogHeaderContainer>
                <DialogHeaderImage src={logo} alt="Logo" />
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
            <Button onClick={handleClose} color="primary" startIcon={<CloseIcon />}>Cancel</Button>
                <Button onClick={() => onSave(formData)} color="secondary" endIcon={<SaveIcon />}>Add</Button>
            </DialogActions>
        </AddDialogModified>
    );
};

export default AddDialog;

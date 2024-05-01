import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled, { keyframes } from 'styled-components';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material'; // Import icons
import logo from "../../assets/images/logo.png";

interface FieldOption {
    value: string;
    label: string;
}

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    options?: FieldOption[];
}

interface EditDialogProps {
    isOpen: boolean;
    entity: any;
    handleClose: () => void;
    fields: FieldConfig[];
    onSave: (data: any) => void;
    onDelete?: (data: any) => void; // onDelete is optional
}

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const DialogHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const DialogHeaderImage = styled.img`
  width: 100px;
  height: auto;
`;

const DialogContentWrapper = styled(DialogContent)`
  padding: 20px;
`;

const DialogActionsWrapper = styled(DialogActions)`
  justify-content: center;
`;

const EditDialogModified = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 20px;
    background-color: #fff;
    transition: all 0.3s ease;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    animation: ${slideInFromBottom} 0.5s ease forwards; /* Apply animation */
  }

  &:hover {
    transform: scale(1.02);
  }
`;

const HeaderText = styled.h2`
  font-size: 18px;
  margin: 10px 0;
`;

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, handleClose, entity, fields, onSave, onDelete }) => {
    const [formData, setFormData] = useState(entity || {});

    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name as string]: value }));
    };

    return (
        <EditDialogModified open={isOpen} onClose={handleClose}>
            <DialogHeaderContainer>
                <HeaderText>Update Details</HeaderText>
                <DialogHeaderImage src={logo} alt="Logo" />
            </DialogHeaderContainer>
            <DialogContentWrapper>
                {fields && fields.map((field) => (
                    field.type === 'dropdown' ? (
                        <Select
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
                            name={field.name}
                            value={formData[field.name] || ''}
                            disabled={field.disabled}
                            onChange={handleChange}
                        />
                    )
                ))}
            </DialogContentWrapper>
            <DialogActionsWrapper>
                <Button onClick={handleClose} color="primary" startIcon={<CloseIcon />}>Cancel</Button>
                <Button onClick={() => onSave(formData)} color="secondary" endIcon={<SaveIcon />}>Save</Button>
            </DialogActionsWrapper>
        </EditDialogModified>
    );
};

export default EditDialog;

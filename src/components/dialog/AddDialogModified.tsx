import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import styled, { keyframes } from 'styled-components';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material'; // Import icons
import logo from "../../assets/images/logo.png"; // Import logo image

const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
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
    animation: ${popIn} 0.3s ease-out forwards; // Apply pop animation
  }

  &:hover {
    transform: scale(1.02);
  }
`;

// Define the Yup validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  contactNumber: Yup.string().required('Contact number is required').matches(/^[0-9]+$/, "Only digits are allowed"),
  priorityLevel: Yup.string().required('Priority level is required'),
  
});

const AddDialog = ({ isOpen, handleClose, entity, fields, onSave, title }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: entity || {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      priorityLevel: '',
      birthday: 'null',
    },
    mode:"onSubmit"
  });

  useEffect(() => {
    reset(entity);
  }, [entity, reset]);

  return (
    <AddDialogModified open={isOpen} onClose={handleClose}>
      <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>{title || "Add Details"}</DialogTitle>
      <DialogHeaderContainer>
        <DialogHeaderImage src={logo} alt="Logo" />
      </DialogHeaderContainer>
      <DialogContent>
        {fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              field.type === 'dropdown' ? (
                <div>
                  <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                  <Select
                    labelId={`${field.name}-label`}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={value || ''}
                    onChange={onChange}
                    error={!!errors[field.name]}
                    
                  >
                    {field.options?.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              ) : (
                <TextField
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  label={field.label}
                  type={field.type}
                  value={value || ''}
                  onChange={onChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                />
              )
            )}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" startIcon={<CloseIcon />}>Cancel</Button>
        <Button onClick={handleSubmit(onSave)} color="secondary" endIcon={<SaveIcon />}>Save</Button>
      </DialogActions>
    </AddDialogModified>
  );
};

export default AddDialog;

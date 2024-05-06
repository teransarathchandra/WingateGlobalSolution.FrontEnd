import { useEffect, useState } from 'react';
import { DialogContent, TextField, IconButton, Button, Dialog, AppBar, Toolbar, Typography, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import categorySchema from '@app_schemas/categorySchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface AddDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    onAdd: (data: any) => void;
}
interface FormDataConfig {
    key;
    label: string;
    type: 'string' | 'number';
    defaultValue: '' | null | false | true;
}


const AddCategoryForm: React.FC<AddDialogProps> = ({ isOpen, handleClose, onAdd }) => {

    const formFields: FormDataConfig[] = [
        { key: 'name', label: 'Name', type: 'string', defaultValue: '' },
        { key: 'description', label: 'Description', type: 'string', defaultValue: '' },
        { key: 'costPerKilo', label: 'Cost Per Kilo', type: 'number', defaultValue: '' },
    ];
    const defaultFormData = Object.fromEntries(formFields.map(field => [field.key, field.defaultValue]));

    const [formData, setFormData] = useState(defaultFormData);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(categorySchema),
    });

    useEffect(() => {
        setFormData(formData);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAdd = async (formData) => {
        console.log(formData)
        onAdd(formData);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <AppBar sx={{ position: 'relative', width: "400px" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Add new Category    
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(handleAdd, (errors) => {
                console.log('Form data:', formData);
                console.log('Form errors:', errors);
            })}>
                <DialogContent>
                    {formFields.map(field => (

                        <><TextField
                            key={field.key}
                            autoFocus
                            margin="dense"
                            id={field.key}
                            label={field.label}
                            type={field.type === 'number' ? 'number' : 'text'}
                            fullWidth
                            variant="outlined"
                            {...register(field.key)}
                            error={!!errors[field.key]}
                            value={formData[field.key]}
                            onChange={handleChange} />
                            <FormHelperText error={!!errors[field.key]}>{errors[field.key]?.message as string}</FormHelperText>
                        </>
                    ))}
                </DialogContent>
                <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
                    <Button type="submit" color="secondary">Add</Button>
                </div>
            </form>
        </Dialog>
    );
};

export default AddCategoryForm;

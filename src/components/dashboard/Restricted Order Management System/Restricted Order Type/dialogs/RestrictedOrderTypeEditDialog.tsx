import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { AppBar, Checkbox, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAllCategory } from "../../../../../services/categoryService";
import { getAllCountry } from "../../../../../services/countryService";
import { ICategory } from '@app_interfaces/ICategory';
import { ICountry } from '@app_interfaces/ICountry';
import { yupResolver } from '@hookform/resolvers/yup';
import restrictedOrderTypeSchema from '@app_schemas/restrictedOrderTypeSchema';
import { useForm } from 'react-hook-form';


interface FieldConfig {
    name: string;
    label: string;
    type: any;
    disabled?: boolean;
}

interface EditDialogProps {
    isOpen: boolean;
    entity: any;
    fields: FieldConfig[];
    handleClose: () => void;
    onSave: (data: any) => void;
    onDelete: (data: any) => void;
}


const RestrictedOrderTypeEditDialog: React.FC<EditDialogProps> = ({ isOpen, entity, fields, handleClose, onSave, onDelete }) => {

    const [formData, setFormData] = useState(entity);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
  //  const [from, setSendingCountries] = useState("");
   
    const {
        register,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(restrictedOrderTypeSchema),
    });

    useEffect(() => {
        setFormData(formData);
        fetchCategories();
        fetchCountries();
    }, [entity]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        onSave(formData);
        handleClose
    };

    const fetchCategories = async () => {
        try {
            const response = await getAllCategory();
            const preparedCategory = response.data.map((category: ICategory) => ({
                ...category,
            }));
            setCategories(preparedCategory);
        } catch (error) {
            console.error('Failed to fetch category', error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await getAllCountry();
            const preparedCountry = response.data.map((country: ICountry) => ({
                ...country,
            }));
            setCountries(preparedCountry);
        } catch (error) {
            console.error('Failed to fetch country', error);
        }
    };

    console.log('formData', formData)
    console.log('fields', fields)

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Restricted Order Details - {entity.restrictedOrderId}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(handleSave)}>
                <DialogContent>
                    {fields
                        .filter(field => field.name !== "_id" && field.name !== "restrictedOrderId")
                        .map((field) => (
                            field.type === Boolean ? (
                                <FormControlLabel
                                    key={field.name}
                                    style={{ display: 'block' }} 
                                    control={
                                        <Checkbox
                                            checked={formData[field.name]}
                                            onChange={handleChange}
                                            name={field.name}
                                        />
                                    }
                                    label={field.name}
                                />

                            ) : field.type === Number ? (

                                <TextField
                                    key={field.name}
                                    autoFocus
                                    margin="dense"
                                    id={field.name}
                                    label={field.label}
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                />

                            ) : field.name === "categoryId" ? (
                                <>
                                    <div>
                                        <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                                        <Select
                                            placeholder={field.label}
                                            style={{
                                                marginBottom: "10px",
                                                height: "50px",
                                            }}
                                            key={field.name}
                                            autoFocus
                                            id={field.name}
                                            fullWidth
                                            type="number"
                                            variant="outlined"
                                            value={formData[field.name]}
                                            {...register(field.name)}
                                            onChange={handleChange}
                                            >
                                            {categories.map((category) => (
                                                <MenuItem key={category._id} value={category._id}>
                                                    
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                                        <Select
                                            defaultValue={formData[field.name]}
                                            placeholder={field.label}
                                            style={{
                                                marginBottom: "10px",
                                                height: "50px",
                                            }}
                                            key={field.name}
                                            autoFocus
                                            id={field.name}
                                            fullWidth
                                            type="number"
                                            variant="outlined"
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                        >
                                            {countries.map((country) => (
                                                <MenuItem key={country._id} value={country._id}>
                                                    {country.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </>

                            )))}
                </DialogContent >
                <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button type="submit" onClick={() => onSave(formData)} color="secondary">Save</Button>
                    <Button onClick={() => onDelete(entity._id)} color="error">Delete</Button>
                </div>
            </form>
        </Dialog>
    );
};

export default RestrictedOrderTypeEditDialog;

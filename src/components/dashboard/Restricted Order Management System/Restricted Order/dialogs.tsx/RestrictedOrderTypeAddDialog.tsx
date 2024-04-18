import { useEffect, useState } from 'react';
import { DialogContent, TextField, Checkbox, IconButton, FormControlLabel, Button, Dialog, AppBar, Toolbar, Typography, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import restrictedOrderTypeSchema from '@app_schemas/restrictedOrderTypeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { getAllCountry } from '@app_services/countryService';
import { ICountry } from '@app_interfaces/ICountry';
import { getAllCategory } from '@app_services/categoryService';
import { ICategory } from '@app_interfaces/ICategory';

interface AddDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    onAdd: (data: any) => void;
}
interface FormDataConfig {
    key;
    label: string;
    type: 'string' | 'number' | 'boolean';
    defaultValue: '' | null | false | true;
}


const AddRestrictedOrderForm: React.FC<AddDialogProps> = ({ isOpen, handleClose, onAdd }) => {

    const formFields: FormDataConfig[] = [
        { key: 'sendingCountryId', label: 'Sending Country', type: 'string', defaultValue: '' },
        { key: 'receivingCountryId', label: 'Receiving Country', type: 'string', defaultValue: '' },
        { key: 'categoryId', label: 'Category', type: 'string', defaultValue: '' },
        { key: 'maxQuantity', label: 'Maximum Quantity', type: 'number', defaultValue: null },
        { key: 'exportLicense', label: 'Export License', type: 'boolean', defaultValue: false },
        { key: 'importPermit', label: 'Import Permit', type: 'boolean', defaultValue: false },
        { key: 'safetyDataSheets', label: 'Safety Data Sheets', type: 'boolean', defaultValue: false },
        { key: 'phytosanitaryCertificate', label: 'Phytosanitary Certificate', type: 'boolean', defaultValue: false },
        { key: 'dangerousGoodsDeclaration', label: 'Dangerous Goods Declaration', type: 'boolean', defaultValue: false }
    ];
    const defaultFormData = Object.fromEntries(formFields.map(field => [field.key, field.defaultValue]));
    const [formData, setFormData] = useState(defaultFormData);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(restrictedOrderTypeSchema),
    });

    useEffect(() => {
        setFormData(formData);
        //  console.log(formData);
        fetchCategories();
        fetchCountries();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAdd = async (formData) => {
        debugger;
        console.log(formData)
        onAdd(formData);
        handleClose();
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

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Add new Restricted Order Type
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit(handleAdd, (errors) => {
                debugger;
                console.log('Form data:', formData);
                console.log('Form errors:', errors);
            })}>
                <DialogContent>
                    {formFields.map(field => (
                        field.type === 'boolean' ? (
                            <FormControlLabel
                                key={field.key}
                                style={{ display: 'block' }}
                                control={
                                    <Checkbox
                                    {...register(field.key)}
                                        checked={!!formData[field.key]}
                                        onChange={handleChange}
                                        name={field.key}
                                    />
                                }
                                label={field.label}
                            />
                        ) : field.key === "maxQuantity" ? (

                            <><TextField
                                key={field.key}
                                autoFocus
                                margin="dense"
                                id={field.key}
                                label={field.label}
                                type="number"
                                fullWidth
                                variant="outlined"
                                {...register(field.key)}
                                error={!!errors[field.key]}
                                value={formData[field.key]}
                                onChange={handleChange} /><FormHelperText error={!!errors[field.key]}>{errors[field.key]?.message as string}</FormHelperText></>


                        ) : field.key === "categoryId" ? (
                            <>
                                <div>
                                    <InputLabel id={field.key}>Category</InputLabel>
                                    <Select
                                        key={field.key}
                                        autoFocus
                                        id={field.key}
                                        fullWidth
                                        type="String"
                                        variant="outlined"
                                        value={formData[field.key]}
                                        {...register(field.key)}
                                        error={!!errors[field.key]}
                                        onChange={handleChange}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error={!!errors[field.key]}>{errors[field.key]?.message as string}</FormHelperText>
                                </div>
                            </>
                        ) : (field.key === "sendingCountryId" || field.key === "receivingCountryId") && (
                            <>
                                <div>
                                    <InputLabel id={field.key}>
                                        {field.key === 'sendingCountryId' ? 'Sending From:' :
                                            field.key === 'receivingCountryId' ? 'Receiving To:' : ''}
                                    </InputLabel>
                                    <Select
                                        defaultValue={formData[field.key]}
                                        // placeholder={key}
                                        // style={{
                                        //     marginBottom: "10px",
                                        //     height: "50px",
                                        // }}
                                        key={field.key}
                                        autoFocus
                                        id={field.key}
                                        fullWidth
                                        type="String"
                                        variant="outlined"
                                        value={formData[field.key]}
                                        {...register(field.key)}
                                        error={!!errors[field.key]}
                                        onChange={handleChange}
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country._id} value={country._id}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error={!!errors[field.key]}>{errors[field.key]?.message as string}</FormHelperText>

                                </div>
                            </>
                        )
                    ))}
                </DialogContent>
                <div style={{ display: 'flex', justifyContent: "flex-end", gap: '50px', paddingRight: '40px', paddingBottom: '60px' }}>
                    <Button type="submit" color="secondary">Add</Button>
                </div>
            </form>
        </Dialog>
    );
};

export default AddRestrictedOrderForm;

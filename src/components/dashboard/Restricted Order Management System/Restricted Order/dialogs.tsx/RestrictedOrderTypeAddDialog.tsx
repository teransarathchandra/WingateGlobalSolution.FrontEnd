import { useEffect, useState } from 'react';
import { DialogContent, TextField, Checkbox, IconButton, FormControlLabel, Button, Dialog, AppBar, Toolbar, Typography, InputLabel, Select, MenuItem } from '@mui/material';
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

const AddRestrictedOrderForm : React.FC<AddDialogProps>= ({ isOpen, handleClose, onAdd }) => {
    const [formData, setFormData] = useState({
        sendingCountryId: '',
        receivingCountryId: '',
        categoryId: '',
        maxQuantity: null,
        exportLicense: false,
        importPermit: false,
        safetyDataSheets: false,
        phytosanitaryCertificate: false,
        dangerousGoodsDeclaration: false
    });
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);

    const { register, handleSubmit } = useForm({
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
        onAdd(formData);
        handleClose;
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
            <form onSubmit={handleSubmit(handleAdd , handleClose)}>
                <DialogContent>
                    {Object.keys(formData).map((key) => (
                        typeof formData[key] === 'boolean' ? (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={formData[key]}
                                        onChange={handleChange}
                                        name={key}
                                    />
                                }
                                label={key}
                            />
                        ) : key === "maxQuantity" ?(

                            <TextField
                                key={key}
                                autoFocus
                                margin="dense"
                                id={key}
                                label={key}
                                type="number"
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                            />

                        ) : key === "categoryId" ? (
                            <>
                                <div>
                                    <InputLabel id={key}>Category</InputLabel>
                                    <Select
                                        // placeholder={key}
                                        // style={{
                                        //     marginBottom: "10px",
                                        //     height: "50px",
                                        // }}
                                        key={key}
                                        autoFocus
                                        id={key}
                                        fullWidth
                                        type="String"
                                        variant="outlined"
                                        value={formData[key]}
                                        {...register(key)}
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
                                    <InputLabel id={key}>
                                        {key === 'sendingCountryId' ? 'Sending From:' : 
                                        key === 'receivingCountryId' ? 'Receiving To:':''}
                                    </InputLabel>
                                    <Select
                                        defaultValue={formData[key]}
                                        // placeholder={key}
                                        // style={{
                                        //     marginBottom: "10px",
                                        //     height: "50px",
                                        // }}
                                        key={key}
                                        autoFocus
                                        id={key}
                                        fullWidth
                                        type="String"
                                        variant="outlined"
                                        name={key}
                                        value={formData[key]}
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
                        )
                    ))}
                </DialogContent>
                <Button type="submit" onClick={() => handleAdd(formData)} color="primary">Add</Button>
            </form>
        </Dialog>
    );
};

export default AddRestrictedOrderForm;

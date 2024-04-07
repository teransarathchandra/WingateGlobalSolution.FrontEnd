import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { AppBar, Checkbox, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ICategory } from '@app_interfaces/ICategory';
//import { IRestrictedOrder } from "../../../../interfaces/IRestrictedOrder";
import { getAllCategory} from "../../../../../services/categoryService";


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
    const [categories, setCategory] = useState([]);
    // fields && fields.map((field) => (              
    // console.log(formData[field.name] )));

    useEffect(() => {
        const entityWithoutId = Object.fromEntries(
            Object.entries(entity).filter(([key]) => key !== '_id')
        );
        setFormData(entityWithoutId);
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
      const preparedCategory = response.data.data.map((categories: ICategory) => ({
        ...categories,
      }));
      setCategory(preparedCategory);
    } catch (error) {
      console.error('Failed to fetch order types', error);
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
                        Restricted Order Details - {entity.restrictedOrderId}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSave}>
                <DialogContent>
                    {fields
                        .filter(field => field.name !== "_id" && field.name !== "restrictedOrderId")
                        .map((field) => (
                            field.type === Boolean ? (
                                <FormControlLabel
                                    key={field.name}
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

                            ) : (
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
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            
                                            // {categories.map((option) => (
                                            //     <MenuItem key={categories.id} value={categories.id}>
                                            //       {categories.name}
                                            //     </MenuItem>
                                            //   ))}
                                        >
                                        </Select>
                                    </div>
                                </>
                            )

                        ))}
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


{/* <Button type="submit" color="primary">Save</Button> */ }
{/* <button onClick={() => handleDeleteRestrictedOrderType(formData)} style={{ all: 'unset', display: 'inline-flex', alignItems: 'center' }}> Create Restricted Order </button> */ }

{/* <DialogContent>
                {fields && fields.map((field) =>
                    field.type !== Boolean && (
                        <TextField
                            key={field.name}
                            autoFocus
                            margin="dense"
                            id={field.name}
                            label={field.label}
                            type={field.type === Number ? 'number' : 'text'}
                            fullWidth
                            variant="outlined"
                            name={field.name}
                            value={formData[field.name] || ''}
                            disabled={field.disabled}
                            onChange={handleChange}
                            
                        />
                    ))} */}

{/* {fields && fields.map((field) =>
                    field.type == Boolean &&  (
                        <FormControlLabel
                            key={field.name}
                            label={field.label}
                            control={
                                <Checkbox
                                    autoFocus
                                    id={field.name}
                                    name={field.name}
                                    checked={Boolean(formData[field.name])}
                                    disabled={field.disabled}
                                    onChange={handleChange}
                                    value={formData[field.name]} />
                            } />
                    ))} */}
{/* </DialogContent> */ }

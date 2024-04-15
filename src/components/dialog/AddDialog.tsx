import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import React, { useEffect, useState } from "react";
import {
    DialogHeaderContainer,
    DialogHeaderImage,
} from "../../styles/shared/editDialog.styles";
import logo from "../../assets/images/logo.png";

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    options?: any[];
}

interface AddDialogProps {
    isOpen: boolean;
    entity: any;
    handleClose: () => void;
    fields: FieldConfig[];
    onSave: (data: any) => void;
}

const FieldComponent = ({ field, formData, handleChange }) => {
    if (field.type === "dropdown") {
        return (
            <>
                <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                <Select
                    key={field.name}
                    margin="dense"
                    id={field.name}
                    label={field.label}
                    fullWidth
                    variant="outlined"
                    name={field.name}
                    value={formData[field.name] || ""}
                    disabled={field.disabled}
                    onChange={handleChange}
                >
                    {field.options &&
                        field.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                </Select>
            </>
        );
    } else {
        return (
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
                value={formData[field.name] || ""}
                disabled={field.disabled}
                onChange={handleChange}
            />
        );
    }
};

const AddDialog: React.FC<AddDialogProps> = ({
    isOpen,
    handleClose,
    entity,
    fields,
    onSave,
}) => {
    const [formData, setFormData] = useState(entity || {});

    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogHeaderContainer>
                <DialogHeaderImage src={logo}></DialogHeaderImage>
            </DialogHeaderContainer>
            <DialogContent>
                {fields.map((field) => (
                    <FieldComponent
                        key={field.name}
                        field={field}
                        formData={formData}
                        handleChange={handleChange}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onSave(formData)} color="secondary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialog;

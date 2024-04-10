import { Select, MenuItem } from "@mui/material";

const CustomSelect = ({ defaultValue, options, style }) => {
    return (
        <Select defaultValue={defaultValue} style={style}>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomSelect;

import { Select, MenuItem } from "@mui/material";

const CustomSelect = ({ defaultValue, options, style, onChange }) => {
    return (
        <Select defaultValue={defaultValue} style={style} onChange={onChange}>
            {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomSelect;

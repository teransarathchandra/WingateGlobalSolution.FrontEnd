import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface SearchBarProps {
    onEnter: (searchTerm: string) => void;
    label?:string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onEnter , label}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onEnter(searchTerm);
        }
    };

    return (
        <TextField
            placeholder= {label || ""}
            style={{ width: "300px", margin: "1rem 0 2rem 1rem" }}
            label="Search"
            id="outlined-size-small"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
        />
    );
};

export default SearchBar;

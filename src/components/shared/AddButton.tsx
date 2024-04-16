import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

interface AddButtonProps {
    onClick: () => void;
  }
  
const AddButton: React.FC<AddButtonProps> = ({ onClick  }) => {
    return (
    <Fab size="small" color="primary" aria-label="add" onClick={onClick} style={{ backgroundColor: '#FFCC00', color: 'white' }}>
      <AddIcon />
    </Fab>
  );
};

export default AddButton;

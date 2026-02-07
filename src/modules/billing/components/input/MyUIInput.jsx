import * as React from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import { Icon } from './MyUIInput.styles';

const MyUiInput = ({ leftIcon, value, onClear, onChange, placeholder }) => {
  return (
    <Box sx={{ border: '1px solid #D4D8DD', borderRadius: '10px', height: '38px' }}>
      <FormControl variant="standard">
        <Input
          sx={{ fontSize: '12px', width: '100%', height: '38px', minWidth: '220px' }}
          disableUnderline
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id="input-with-icon-adornment"
          startAdornment={
            leftIcon && (
              <InputAdornment position="start">
                <Icon src={leftIcon} alt="icon" />
              </InputAdornment>
            )
          }
        />
      </FormControl>
    </Box>
  );
};

export default MyUiInput;

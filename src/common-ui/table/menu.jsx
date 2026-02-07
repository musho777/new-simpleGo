import React from 'react';

import { Menu, MenuItem } from '@mui/material';

export const CustomMenu = ({ anchorEl, items, open, onClick }) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      container={anchorEl?.ownerDocument?.body}
      disableScrollLock
      PaperProps={{
        sx: {
          boxShadow: '0px 0px 10px 0px #00000026',
          borderRadius: '10px',
        },
      }}
    >
      {items.map((elm, i) => (
        <MenuItem
          sx={{
            height: '33px',
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000',
            '&:hover': {
              backgroundColor: '#2D6CDF1A',
              color: '#2D6CDF',
            },
            '&.Mui-selected': {
              backgroundColor: '#2D6CDF1A',
              color: '#2D6CDF',
            },
            '&.Mui-focusVisible': {
              backgroundColor: '#2D6CDF1A',
              color: '#2D6CDF',
            },
          }}
          onClick={() => {
            onClick(elm);
          }}
          key={i}
        >
          {elm.title}
        </MenuItem>
      ))}
    </Menu>
  );
};

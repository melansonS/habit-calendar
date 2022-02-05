import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ThemeNamesEnum } from '../utils/colorTypes';
import { useTheme } from '../context/themeContext';

export default function ThemeSelect() {
  const {
    themeName,
    dispatchThemeName,
  } = useTheme();
  const handleChange = (event: SelectChangeEvent<ThemeNamesEnum>) => {
    if (Object.keys(ThemeNamesEnum).includes(event.target.value)) {
      dispatchThemeName(event.target.value as ThemeNamesEnum);
    }
  };
  return (
    <Box>
      <FormControl>
        <InputLabel id="theme-selector">Theme</InputLabel>
        <Select
          labelId="theme-selector"
          value={themeName}
          label="Theme"
          onChange={handleChange}
        >
          {Object.keys(ThemeNamesEnum).map((name) => (
            <MenuItem key={`theme-${name}`} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

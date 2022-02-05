import React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import CircleIcon from '@mui/icons-material/Circle';

interface ILabelProps {
 currentColor: string
}

interface IColorPickerProps {
  currentColor: string
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  name: string
}

const StyledLabel = styled.label(({ currentColor }:ILabelProps) => ({
  width: '20px',
  color: currentColor,
  ':hover': {
    cursor: 'pointer',
    opacity: 0.9,
  },
}));

const StyledInput = styled.input`
  visibility: hidden;
  position: absolute;
  width: 0;
  height: 0;
`;

// TODO: smooth out hover transition on opacity

export default function ColorPicker({ currentColor, handleChange, name }: IColorPickerProps) {
  return (
    <Box sx={{ p: 1 }}>
      <StyledLabel currentColor={currentColor} htmlFor={`${name}-colorpicker`}>
        <CircleIcon fontSize="large" />
        <StyledInput value={currentColor} id={`${name}-colorpicker`} type="color" onChange={handleChange} />
      </StyledLabel>
    </Box>
  );
}

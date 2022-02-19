import { styled, Box } from '@mui/material';

export interface ICellProps {
  isToday?: boolean
  isChecked?: boolean
  isDarkMode: boolean
  primary: string
  secondary: string
}

const Cell = styled(Box)`
  align-items: center;
  background-color: ${({ isChecked, primary }:ICellProps) => (isChecked ? primary : 'inherit')};
  border: ${({ isToday, secondary } :ICellProps) => (isToday ? `2px solid ${secondary}` : 'none')};
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  height: 5rem;
  justify-content: center;
  position: relative;
  transition: background-color 0.4s ease-out;
  
  :hover {
    background-color: ${({ isDarkMode }:ICellProps) => (isDarkMode ? '#333' : '#eee')};
  }
`;

export default Cell;

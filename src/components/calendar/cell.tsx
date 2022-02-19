import { styled, Box } from '@mui/material';

export interface ICellProps {
  isToday?: boolean
  isChecked?: boolean
  isDarkMode: boolean
  primary: string
  secondary: string
}

const Cell = styled(Box)`
  height: 5rem;
  height: 5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.4s ease-out;
  background-color: ${({ isChecked, primary }:ICellProps) => (isChecked ? primary : 'inherit')};
  border: ${({ isToday, secondary } :ICellProps) => (isToday ? `2px solid ${secondary}` : 'none')};
  :hover {
    background-color: ${({ isDarkMode }:ICellProps) => (isDarkMode ? '#333' : '#eee')};
  }
`;

export default Cell;

import { styled, Fab } from '@mui/material';
import { transientConfig } from './styledComponentTests';

interface IColoredFabProps {
  $customBackgroundColor: string
  $customHoverColor: string
  $customColor?: string
}

const ColoredFab = styled(Fab, transientConfig)(
  ({ $customBackgroundColor, $customHoverColor, $customColor }: IColoredFabProps) => ({
    backgroundColor: $customBackgroundColor,
    color: $customColor || 'inherit',
    ':hover': {
      backgroundColor: $customHoverColor,
    },
  }),
);

export default ColoredFab;

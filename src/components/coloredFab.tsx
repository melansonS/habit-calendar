import { styled, Fab } from '@mui/material';
import { transientConfig } from './styledComponentTests';

interface IColoredFabProps {
  $customColor: string
  $customHoverColor: string
}

const ColoredFab = styled(Fab, transientConfig)(
  ({ $customColor, $customHoverColor }: IColoredFabProps) => ({
    backgroundColor: $customColor,
    ':hover': {
      backgroundColor: $customHoverColor,
    },
  }),
);

export default ColoredFab;

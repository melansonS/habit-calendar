import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';
import { debounce } from 'lodash';
import {
  Box,
  Button,
  Grid,
  Paper,
  Slider,
  Typography,
  useTheme as useMUITheme,
} from '@mui/material';
import createPalette from '@material-ui/core/styles/createPalette';
import ColorPicker from '../components/colorPicker';
import { useTheme } from '../context/themeContext';
import {
  BLEND_PERCENT, BLEND_STEP, destructurePaletteColor,
} from '../utils/colorUtils';
import ThemeSelect from '../components/ThemeSelector';
import ColorDisplayGridItem from '../components/colorDisplayGridItem';

export default function ThemePage() {
  const {
    palette: {
      primary,
      secondary,
      text,
    },
  } = useMUITheme();
  const {
    setCustomTheme,
    dispatchColorBlendPercent,
  } = useTheme();
  const [customPrimaryColor, setCustomPrimaryColor] = useState(primary.main);
  const [customSecondaryColor, setCustomSecondaryColor] = useState(secondary.main);
  const { primary: cPrimary, secondary: cSecondary } = useMemo(() => createPalette({
    primary: { main: customPrimaryColor },
    secondary: { main: customSecondaryColor },
  }), [customPrimaryColor, customSecondaryColor]);

  useEffect(() => {
    setCustomPrimaryColor(primary.main);
    setCustomSecondaryColor(secondary.main);
  }, [primary, secondary]);

  const debouncedPrimaryColorChange = useRef(
    debounce((value: string) => {
      setCustomPrimaryColor(value);
    }, 100),
  ).current;
  const debouncedSecondaryColorChange = useRef(
    debounce((value: string) => {
      setCustomSecondaryColor(value);
    }, 100),
  ).current;
  const debouncedColorBlendChange = useRef(
    debounce((amount: number) => {
      dispatchColorBlendPercent(amount);
    }, 100),
  ).current;

  useEffect(
    () => () => {
      debouncedPrimaryColorChange.cancel();
      debouncedSecondaryColorChange.cancel();
      debouncedColorBlendChange.cancel();
    },
    [
      debouncedPrimaryColorChange,
      debouncedSecondaryColorChange,
      debouncedColorBlendChange,
    ],
  );

  const handlePrimaryColorchange = (value:string) => {
    debouncedPrimaryColorChange(value);
  };

  const handleSecondaryColorchange = (value:string) => {
    debouncedSecondaryColorChange(value);
  };
  const handleColorBlendChange = (amount: number) => {
    debouncedColorBlendChange(amount);
  };

  const handleSubmitCustomTheme = () => {
    setCustomTheme({ primary: cPrimary, secondary: cSecondary });
  };

  const handleResetCustomColors = () => {
    setCustomPrimaryColor(primary.main);
    setCustomSecondaryColor(secondary.main);
  };

  // TODO: Clean up / organize all of these grids and boxes
  return (
    <div>
      <Typography component="header" variant="h3" sx={{ pt: 6, textAlign: 'center' }}>
        Theme Colors
      </Typography>
      <Paper sx={{ m: 3 }}>
        <Typography variant="h5">Current Theme</Typography>
        <Box p={2}>
          <ThemeSelect />
        </Box>
        <Grid p={2} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Primary</Typography>
          </Grid>
          {destructurePaletteColor(primary).map((color) => (
            <ColorDisplayGridItem
              key={`primary-${color?.name}-${color?.value}`}
              color={color}
              xs={4}
              md={2}
            />
          ))}
          <Grid item xs={12}>
            <Typography variant="h6">Secondary</Typography>
          </Grid>
          {destructurePaletteColor(secondary).map((color) => (
            <ColorDisplayGridItem
              key={`primary-${color?.name}-${color?.value}`}
              color={color}
              xs={4}
              md={2}
            />
          ))}
          <Grid item xs={12}>
            <Typography variant="h6">text</Typography>
          </Grid>
          {destructurePaletteColor(text).map((color) => (
            <ColorDisplayGridItem
              key={`primary-${color?.name}-${color?.value}`}
              color={color}
              xs={4}
              md={2}
            />
          ))}

        </Grid>
      </Paper>
      <Paper sx={{ m: 3 }}>
        <Typography variant="h5">created Theme...</Typography>
        <Box>
          <Box sx={{ pl: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">Primary</Typography>
            <ColorPicker
              name="primary"
              currentColor={customPrimaryColor}
              handleChange={(e) => handlePrimaryColorchange(e.target.value)}
            />
          </Box>
          <Box sx={{ pl: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">Secondary</Typography>
            <ColorPicker
              name="secondary"
              currentColor={customSecondaryColor}
              handleChange={(e) => handleSecondaryColorchange(e.target.value)}
            />
          </Box>
          <Button sx={{ m: 1 }} variant="contained" onClick={handleSubmitCustomTheme}>
            Apply!
          </Button>
          <Button color="secondary" sx={{ m: 1 }} variant="contained" onClick={handleResetCustomColors}>
            Reset!
          </Button>
        </Box>
        <Box sx={{ m: 1, width: '45%' }}>
          <Slider
            aria-label="Color Blend Percentage"
            step={BLEND_STEP}
            marks
            min={BLEND_PERCENT}
            max={BLEND_PERCENT + (BLEND_STEP * 5)}
            onChange={(e, value) => handleColorBlendChange(value as number)}
          />
        </Box>
        <Grid p={2} container spacing={2}>
          {destructurePaletteColor(cPrimary).map((color) => (
            <ColorDisplayGridItem
              key={`primary-${color?.name}-${color?.value}`}
              color={color}
              xs={4}
              md={2}
            />
          ))}
          {destructurePaletteColor(cSecondary).map((color) => (
            <ColorDisplayGridItem
              key={`primary-${color?.name}-${color?.value}`}
              color={color}
              xs={4}
              md={2}
            />
          ))}
        </Grid>
      </Paper>
    </div>
  );
}

import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';
import { debounce } from 'lodash';
import {
  Box,
  Button,
  Grid,
  Grow,
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
import ThemeSelector from '../components/ThemeSelector';
import ColorDisplayGridItem from '../components/colorDisplayGridItem';
import Cell from '../components/calendar/cell';
import { ResizableIcon } from '../components/calendar/cells';
import { makeDarkModeColors } from '../utils/themeContextUtils';

export default function ThemePage() {
  const {
    palette: {
      primary,
      secondary,
      text,
      darkThemeColors,
      lightThemeColors,
    },
  } = useMUITheme();
  const {
    setCustomTheme,
    dispatchColorBlendPercent,
    colorBlendPercent,
  } = useTheme();
  const [customPrimaryColor, setCustomPrimaryColor] = useState(primary.main);
  const [customSecondaryColor, setCustomSecondaryColor] = useState(secondary.main);
  const [customDarkThemeColors, setCustomDarkThemeColors] = useState(darkThemeColors);
  const { primary: cPrimary, secondary: cSecondary } = useMemo(() => createPalette({
    primary: { main: customPrimaryColor },
    secondary: { main: customSecondaryColor },
  }), [customPrimaryColor, customSecondaryColor]);

  useEffect(() => {
    if (lightThemeColors?.primary?.main && lightThemeColors?.secondary?.main) {
      setCustomPrimaryColor(lightThemeColors.primary.main);
      setCustomSecondaryColor(lightThemeColors.secondary.main);
    }
  }, [lightThemeColors]);

  useEffect(() => {
    setCustomDarkThemeColors(darkThemeColors);
  }, [darkThemeColors]);

  const debouncedPrimaryColorChange = useRef(
    debounce((value: string) => {
      setCustomPrimaryColor(value);
      setCustomDarkThemeColors(makeDarkModeColors(value, customSecondaryColor));
    }, 100),
  ).current;
  const debouncedSecondaryColorChange = useRef(
    debounce((value: string) => {
      setCustomSecondaryColor(value);
      setCustomDarkThemeColors(makeDarkModeColors(customPrimaryColor, value));
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

  const handleSwapCustomColors = () => {
    const tempPrimary = customPrimaryColor;
    setCustomPrimaryColor(customSecondaryColor);
    setCustomSecondaryColor(tempPrimary);
    setCustomDarkThemeColors(makeDarkModeColors(customSecondaryColor, tempPrimary));
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
          <ThemeSelector />
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
            Apply
          </Button>
          <Button color="secondary" sx={{ m: 1 }} variant="contained" onClick={handleSwapCustomColors}>
            Swap
          </Button>
          <Button color="secondary" sx={{ m: 1 }} variant="contained" onClick={handleResetCustomColors}>
            Reset
          </Button>
        </Box>
        <Box sx={{ m: 1, width: '45%' }}>
          <Slider
            aria-label="Color Blend Percentage"
            value={colorBlendPercent}
            step={BLEND_STEP}
            marks
            min={BLEND_PERCENT}
            max={BLEND_PERCENT + (BLEND_STEP * 5)}
            onChange={(e, value) => handleColorBlendChange(value as number)}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>

          <Box sx={{ width: '45%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} p={2}>
              Light theme!
            </Typography>
            <Grid p={2} container spacing={2}>
              {destructurePaletteColor(cPrimary).map((color) => (
                <ColorDisplayGridItem
                  key={`primary-${color?.name}-${color?.value}`}
                  color={color}
                  xs={4}
                  md={4}
                  lg={4}
                />
              ))}
              {destructurePaletteColor(cSecondary).map((color) => (
                <ColorDisplayGridItem
                  key={`primary-${color?.name}-${color?.value}`}
                  color={color}
                  xs={4}
                  md={4}
                  lg={4}
                />
              ))}
              <Cell
                primary={cPrimary.main}
                secondary={cSecondary.main}
                isChecked
                isDarkMode={false}
                style={{ width: '5rem', borderRadius: '5px' }}
                m={2}
                contrastText={lightThemeColors?.primary?.contrastText || primary.contrastText}
              >
                <Grow
                  in
                  timeout={1000}
                >
                  <ResizableIcon
                    $color={cSecondary.main}
                    fontSize="large"
                  />
                </Grow>
                <Typography style={{ position: 'absolute', top: '0.5rem', right: '0.75rem' }}>
                  {1}
                </Typography>
              </Cell>
            </Grid>
          </Box>
          {customDarkThemeColors?.primary?.main && customDarkThemeColors?.secondary?.main
          && (
          <Box sx={{ width: '45%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} p={2}>
              Dark theme!
            </Typography>
            <Grid p={2} container spacing={2}>
              {destructurePaletteColor(customDarkThemeColors.primary).map((color) => (
                <ColorDisplayGridItem
                  key={`primary-${color?.name}-${color?.value}`}
                  color={color}
                  xs={4}
                  md={4}
                  lg={4}
                />
              ))}
              {destructurePaletteColor(customDarkThemeColors.secondary).map((color) => (
                <ColorDisplayGridItem
                  key={`primary-${color?.name}-${color?.value}`}
                  color={color}
                  xs={4}
                  md={4}
                  lg={4}
                />
              ))}
              <Cell
                primary={customDarkThemeColors.primary.main}
                secondary={customDarkThemeColors.secondary.main}
                isChecked
                isDarkMode
                style={{ width: '5rem', borderRadius: '5px' }}
                m={2}
                contrastText={customDarkThemeColors.primary.contrastText || primary.contrastText}
              >
                <Grow
                  in
                  timeout={1000}
                >
                  <ResizableIcon
                    $color={customDarkThemeColors.secondary.main}
                    fontSize="large"
                  />
                </Grow>
                <Typography style={{ position: 'absolute', top: '0.5rem', right: '0.75rem' }}>
                  {1}
                </Typography>
              </Cell>
            </Grid>
          </Box>
          )}
        </Box>
      </Paper>
    </div>
  );
}

import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';
import { debounce } from 'lodash';
import {
  Box,
  Button,
  Card,
  Color,
  Grid, PaletteColor,
  Paper, Slider, styled, Typography, useTheme as useMUITheme,
} from '@mui/material';
import { TypeText } from '@mui/material/styles/createPalette';
import createPalette from '@material-ui/core/styles/createPalette';
import ColorPicker from '../components/colorPicker';
import { useTheme } from '../context/themeContext';
import {
  BLEND_PERCENT, BLEND_STEP, ConvertRGBAtoHex, stripRGBA,
} from '../utils/colorUtils';

interface IColoredBox {
  bgColor: string
}

const ColoredBox = styled(Box)((props: IColoredBox) => ({
  backgroundColor: props.bgColor,
  p: {
    fontWeight: 'bold',
  },
}));

export default function ThemePage() {
  const {
    palette: {
      primary,
      secondary,
      grey,
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

  const destructureColors = (colors: PaletteColor | TypeText| Color) => Object.keys(colors).map((color, index) => {
    let colorValue = Object.values(colors)[index];
    if (colorValue.includes('rgb')) {
      const {
        r, g, b, a,
      } = stripRGBA(colorValue);
      colorValue = ConvertRGBAtoHex(r, g, b, a);
    }
    return ({
      name: color,
      value: colorValue,
    });
  });

  // TODO: Clean up / organize all of these grids and boxes
  return (
    <div>
      <Typography component="header" variant="h3" sx={{ pt: 6, textAlign: 'center' }}>
        Theme Colors
      </Typography>
      <Paper sx={{ m: 3 }}>
        <Typography variant="h5">Current Theme</Typography>
        <Grid p={2} container>
          <Grid item xs={12}>
            <Typography variant="h6">Primary</Typography>
          </Grid>
          {destructureColors(primary).map((color) => {
            if (color.name === 'contrastText') {
              return null;
            }
            return (
              <Grid key={`primary-${color?.name}-${color?.value}`} item xs={1}>
                <Card>
                  <ColoredBox sx={{ p: 2 }} bgColor={color?.value}>
                    <Typography>
                      {color?.value}
                    </Typography>
                  </ColoredBox>
                  <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                      {color?.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Typography variant="h6">Secondary</Typography>
          </Grid>
          {destructureColors(secondary).map((color) => {
            if (color.name === 'contrastText') {
              return null;
            }
            return (
              <Grid key={`secondary-${color?.name}-${color?.value}`} item xs={1}>
                <Card>
                  <ColoredBox sx={{ p: 2 }} bgColor={color?.value}>
                    <Typography>
                      {color?.value}
                    </Typography>
                  </ColoredBox>
                  <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                      {color?.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Typography variant="h6">Grey</Typography>
          </Grid>
          {destructureColors(grey).map((color) => (
            <Grid key={`grey-${color?.name}-${color?.value}`} item xs={1}>
              <Card>
                <ColoredBox sx={{ p: 2 }} bgColor={color?.value}>
                  <Typography>
                    {color?.value}
                  </Typography>
                </ColoredBox>
                <Box>
                  <Typography sx={{ textAlign: 'center' }}>
                    {color?.name}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="h6">text</Typography>
          </Grid>
          {destructureColors(text).map((color) => (
            <Grid key={`text-${color?.name}-${color?.value}`} item xs={1}>
              <Card>
                <ColoredBox sx={{ p: 2 }} bgColor={color?.value}>
                  <Typography>
                    {color?.value}
                  </Typography>
                </ColoredBox>
                <Box>
                  <Typography sx={{ textAlign: 'center' }}>
                    {color?.name}
                  </Typography>
                </Box>
              </Card>
            </Grid>
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
          {destructureColors(cPrimary).map((color) => {
            if (color.name === 'contrastText') {
              return null;
            }
            return (
              <Grid key={`createdPalette-primary-${color?.name}-${color?.value}`} item xs={1}>
                <Card>
                  <ColoredBox sx={{ p: 2 }} bgColor={color?.value}>
                    <Typography>
                      {color?.value}
                    </Typography>
                  </ColoredBox>
                  <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                      {color?.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
          {destructureColors(cSecondary).map((color) => {
            if (color.name === 'contrastText') {
              return null;
            }
            return (
              <Grid key={`createdPalette-secondary-${color?.name}-${color?.value}`} item xs={1}>
                <Card>
                  <ColoredBox sx={{ p: 2 }} bgColor={color?.value}>
                    <Typography>
                      {color?.value}
                    </Typography>
                  </ColoredBox>
                  <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                      {color?.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
}

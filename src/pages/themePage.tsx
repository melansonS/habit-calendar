import React from 'react';
import {
  Box,
  Card,
  Color,
  Grid, PaletteColor,
  Paper, styled, Typography, useTheme as useMUITheme,
} from '@mui/material';
import { TypeText } from '@mui/material/styles/createPalette';
import createPalette from '@material-ui/core/styles/createPalette';
import { ConvertRGBAtoHex } from '../utils/colorUtils';

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

  const createdPalette = createPalette({
    primary: { main: '#9e9858' },
    secondary: { main: '#ffab00' },
  });

  const destructureColors = (colors: PaletteColor | TypeText| Color) => Object.keys(colors).map((color, index) => {
    let colorValue = Object.values(colors)[index];
    if (colorValue.includes('rgb')) {
      const [r, g, b, a] = colorValue.slice(colorValue.indexOf('(') + 1, colorValue.indexOf(')')).split(', ');
      colorValue = ConvertRGBAtoHex(parseInt(r, 10), parseInt(g, 10), parseInt(b, 10), a ? parseFloat(a) : undefined);
    }
    return ({
      name: color,
      value: colorValue,
    });
  });

  return (
    <div>
      <header>
        <Typography variant="h3">
          Theme Colors
        </Typography>
      </header>
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
        <Grid p={2} container spacing={2}>
          {destructureColors(createdPalette.primary).map((color) => {
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
          {destructureColors(createdPalette.secondary).map((color) => {
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

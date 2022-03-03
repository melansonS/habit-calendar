import React from 'react';
import {
  styled,
  Card, Grid, Typography, Box,
} from '@mui/material';

interface IColoredBoxProps {
  bgColor: string
}

const ColoredBox = styled(Box)((props: IColoredBoxProps) => ({
  backgroundColor: props.bgColor,
  minHeight: '4rem',
  p: {
    fontWeight: 'bold',
  },
}));

interface IColorDisplayGridItemProps {
  xs: number
  md?: number
  color: {
    name: string;
    value: any;
  }
}

export default function ColorDisplayGridItem({
  xs, md, color,
}: IColorDisplayGridItemProps) {
  return (
    <Grid item xs={xs} md={md}>
      <Card>
        <ColoredBox sx={{ p: 2 }} bgColor={color?.value} />
        <Box>
          <Typography fontWeight={600} sx={{ textAlign: 'center' }}>
            {color?.name}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}

ColorDisplayGridItem.defaultProps = {
  md: 1,
};

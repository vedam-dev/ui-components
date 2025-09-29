import { Box, Container, Grid } from '@mui/material';
import { FC, JSX } from 'react';
import { Typography } from '../../../component/atom/typography';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

const ColorRenderer: FC = () => {
  const { palette, vd, spacing } = useCoreTheme() as CoreTheme;

  function getKeys<T extends object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
  }

  const colorsToCheck = {
    primary: 'Primary',
    secondary: 'Secondary',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
    success: 'Success',
    text: 'Text',
    common: 'Common',
    grey: 'Grey',
  };

  const colorsToCheckViews = getKeys(colorsToCheck).map((key) => {
    const pal = palette as unknown as Record<string, Record<string, string>>;

    const title = colorsToCheck[key];
    const shades = pal[key];
    const colorKeys = getKeys(shades).map((shade) => {
      const color = shades[shade];
      if (shade === 'contrastText') {
        return null;
      }
      return (
        <Grid size={{ xs: 3 }} key={shade}>
          <Typography>
            {shade} - {color}
          </Typography>
          <Box
            component="span"
            height={75}
            width={75}
            sx={{
              background: color,
              width: '75px',
              height: '75px',
              display: 'block',
              border: '2px solid black',
            }}
          ></Box>
        </Grid>
      );
    });

    return (
      <>
        <Typography sx={{ padding: '8px' }}>{title}</Typography>
        <Grid container spacing={2} sx={{ padding: '8px' }}>
          {colorKeys}
        </Grid>
      </>
    );
  });

  const spacingViews = (): JSX.Element => {
    const range = (n: number): number[] => Array.from({ length: n }, (_value, key) => key);
    const numbers = range(21);
    const numberViews = numbers.map((num) => {
      return (
        <Grid size={{ xs: 3 }} key={num}>
          <Typography sx={{ padding: spacing(num), border: '1px solid black' }}>
            Multiplier {num} and {spacing(num)} Padding
          </Typography>
        </Grid>
      );
    });
    return (
      <>
        <Grid container spacing={2} sx={{ padding: '8px' }}>
          {numberViews}
        </Grid>
      </>
    );
  };

  return (
    <Container>
      <Typography variant={'h3'} sx={{ padding: '16px' }}>
        Colors
      </Typography>
      {colorsToCheckViews}
      <Typography variant={'h3'} sx={{ padding: '16px' }}>
        Spacing
      </Typography>
      {spacingViews()}
      <Typography variant={'h3'} sx={{ padding: '16px' }}>
        Shadow
      </Typography>
      <Grid container spacing={2} sx={{ padding: '8px' }}>
        <Grid size={{ xs: 3 }}>
          <Box
            component="span"
            height={75}
            width={75}
            sx={{
              background: palette.grey['200'],
              width: '75px',
              height: '75px',
              display: 'block',
              boxShadow: vd.shadows.y8,
            }}
          ></Box>
        </Grid>

        <Grid size={{ xs: 3 }}>
          <Box
            component="span"
            height={75}
            width={75}
            sx={{
              background: palette.grey['200'],
              width: '75px',
              height: '75px',
              display: 'block',
              boxShadow: vd.shadows.y12,
            }}
          ></Box>
        </Grid>

        <Grid size={{ xs: 3 }}>
          <Box
            component="span"
            height={75}
            width={75}
            sx={{
              background: palette.grey['200'],
              width: '75px',
              height: '75px',
              display: 'block',
              boxShadow: vd.shadows.y16,
            }}
          ></Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ColorRenderer;

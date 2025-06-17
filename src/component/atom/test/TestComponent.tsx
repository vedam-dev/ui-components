import { FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import { Typography } from '@mui/material';

const TestComponent: FC = () => {
  const { isStorybook, palette } = useCoreTheme() as CoreTheme;

  return (
    <Typography variant={isStorybook ? 'h1' : 'body1'} component="h2" color={palette.primary.dark}>
      This component is for storybook, not to use in production.
    </Typography>
  );
};

export default TestComponent;

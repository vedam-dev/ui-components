import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';

const SxOverride = (
  overrides: SystemStyleObject<Theme>,
  sx?: SxProps<Theme>
): SystemStyleObject<Theme>[] => {
  const sxValue: SystemStyleObject<Theme>[] = Array.isArray(sx) ? sx : [sx];
  const sxValueOverride: SystemStyleObject<Theme>[] = Array.isArray(overrides)
    ? overrides
    : [overrides];
  return [...sxValue, ...sxValueOverride];
};

export default SxOverride;

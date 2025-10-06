import React from 'react';
import { Box, Typography, SxProps, Theme, styled } from '@mui/material';

export interface CourseOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CourseListProps {
  value: string;
  onChange: (value: string) => void;
  options?: CourseOption[];
  sx?: SxProps<Theme>;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
}

const Outer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8),
  borderRadius: theme.spacing(9),
  background: '#FFFFFF',
  boxShadow: ' 0 0 20px 0 rgba(0, 0, 0, 0.10)',
  border: 'none',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
}));

const Title = styled(Typography)({
  color: '#1E1E1EEE',
  fontFamily: 'Poppins',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
});

const Subtitle = styled(Typography)({
  color: '#777777EE',
  fontFamily: 'Poppins',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
});

const CardsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(7.5),
  marginTop: theme.spacing(7),
  alignItems: 'stretch',
  flexWrap: 'wrap',
}));

const Card = styled('button')<{
  selected?: boolean;
  disabled?: boolean;
  colorscheme?: string;
}>(({ theme, selected, disabled, colorscheme }) => {
  const colorSchemes: Record<string, { bg: string; border: string }> = {
    purple: {
      bg: 'linear-gradient(180deg, #F3E8FF 0%, #FFF 100%)',
      border: '#DAC2F2',
    },
    yellow: {
      bg: 'linear-gradient(180deg, #FAEDD7 0%, #FFF 100%)',
      border: '#FDE5B6',
    },
    orange: {
      bg: 'linear-gradient(180deg, #FDEEDD 0%, #FFF 100%)',
      border: '#FFDDB9',
    },
    cyan: {
      bg: 'linear-gradient(180deg, #E3F6F9 0%, #FFF 100%)',
      border: '#9AF3F7',
    },
  };

  const scheme = colorSchemes[colorscheme || 'purple'];

  const base: any = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: theme.spacing(69),
    padding: theme.spacing(6, 7),
    borderRadius: theme.spacing(5.5),
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: `1px solid ${scheme.border}`,
    background: scheme.bg,
    transition: 'all 200ms ease',
    textAlign: 'center',
    outline: 'none',
    boxShadow: 'none',
  };

  if (disabled) {
    base.opacity = 0.5;
  }

  if (selected) {
    base.transform = 'translateY(-1px)';
    base.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
  }

  base['&:hover'] = {
    transform: disabled ? 'none' : 'translateY(-1px)',
    boxShadow: disabled ? 'none' : '0 4px 8px rgba(0,0,0,0.08)',
  };

  base['&:focus-visible'] = {
    outline: `2px solid ${scheme.border}`,
    outlineOffset: '2px',
  };

  return base;
});

const Label = styled(Typography)({
  color: '#1E1E1E',
  textAlign: 'center',
  fontFamily: 'Outfit',
  fontSize: '22px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
});

const CourseList: React.FC<CourseListProps> = ({
  value,
  onChange,
  options = [
    { value: 'java', label: 'Java' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'physics', label: 'Physics' },
  ],
  sx,
  disabled = false,
  title = 'Course List',
  subtitle = "Choose a course to view it's contest details",
}) => {
  const colorSchemes = ['purple', 'yellow', 'orange', 'cyan'];

  const handleClick = (opt: CourseOption) => {
    if (disabled || opt.disabled) return;
    onChange(opt.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, opt: CourseOption) => {
    if (disabled || opt.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(opt.value);
    }
  };

  return (
    <Outer sx={sx}>
      <Box display="flex" flexDirection="column">
        <div>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>

        <CardsRow role="radiogroup" aria-label={title}>
          {options.map((opt, index) => {
            const isSelected = value === opt.value;
            const colorScheme = colorSchemes[index % colorSchemes.length];

            return (
              <Card
                key={opt.value}
                role="radio"
                aria-checked={isSelected}
                aria-disabled={disabled || opt.disabled}
                tabIndex={disabled || opt.disabled ? -1 : 0}
                selected={isSelected}
                disabled={disabled || opt.disabled}
                colorscheme={colorScheme}
                onClick={() => handleClick(opt)}
                onKeyDown={(e) => handleKeyDown(e, opt)}
                title={opt.label}
              >
                <Label>{opt.label}</Label>
              </Card>
            );
          })}
        </CardsRow>
      </Box>
    </Outer>
  );
};

export default CourseList;

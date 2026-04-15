import React from 'react';
import { Box, Typography, SxProps, Theme, styled } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface InstructorOption {
  value: string;
  name: string;
  rating?: number;
  disabled?: boolean;
}

export interface InstructorListProps {
  value: string;
  onChange: (value: string) => void;
  options?: InstructorOption[];
  sx?: SxProps<Theme>;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  variant?: 'instructor' | 'semester';
}

const Outer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(11),
  borderRadius: theme.spacing(9),
  background: theme.palette.background.paper,
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.10)',
  border: 'none',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textStrong,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textMuted,
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
}));

const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(6),
  marginTop: theme.spacing(13),
  rowGap: theme.spacing(12),
  '@media (max-width: 1400px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (max-width: 1000px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const Card = styled('button')<{
  selected?: boolean;
  disabled?: boolean;
  colorscheme?: string;
}>(({ theme, selected, disabled, colorscheme }) => {
  const colorSchemes: Record<string, { bg: string; border: string; ratingColor: string }> = {
    yellow: {
      bg: `linear-gradient(180deg, ${theme.palette.common.white} 0%, ${theme.palette.secondary[50]} 100%)`,
      border: theme.palette.secondary[200],
      ratingColor: theme.palette.secondary[700],
    },
    purple: {
      bg: `linear-gradient(180deg, ${theme.palette.common.white} 0%, ${(theme as CoreTheme).vd.palette.accentPrimaryLight} 100%)`,
      border: theme.palette.primary[200],
      ratingColor: (theme as CoreTheme).vd.palette.accentPrimary,
    },
  };

  const scheme = colorSchemes[colorscheme || 'yellow'];

  const base: any = {
    display: 'flex',
    width:"100%",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(7, 2.5),
    borderRadius: theme.spacing(4),
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: `1px solid ${scheme.border}`,
    background: scheme.bg,
    transition: 'all 200ms ease',
    textAlign: 'center',
    outline: 'none',
    boxShadow: 'none',
    minHeight: '120px',
    overflow: 'hidden',
    minWidth: '280px',
  };

  if (disabled) {
    base.opacity = 0.5;
  }

  if (selected) {
    base.transform = 'translateY(-2px)';
    base.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
  }

  base['&:hover'] = {
    transform: disabled ? 'none' : 'translateY(-2px)',
    boxShadow: disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
  };

  base['&:focus-visible'] = {
    outline: `2px solid ${scheme.border}`,
    outlineOffset: '2px',
  };

  return base;
});

const InstructorName = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textStrong,
  textAlign: 'center',
  fontSize: '22px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  marginBottom: '8px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
}));

const SemesterName = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textStrong,
  textAlign: 'center',
  fontSize: '22px',
  fontStyle: 'semiBold',
  fontWeight: 600,
  lineHeight: 'normal',
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
}));

const RatingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
});

const RatingText = styled(Typography)<{ colorscheme?: string }>(({ theme, colorscheme }) => {
  const coreTheme = theme as CoreTheme;
  const color =
    colorscheme === 'purple' ? coreTheme.vd.palette.accentPrimary : theme.palette.secondary[700];
  return {
    color,
    fontSize: '22px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
  };
});

const StarIcon = styled('span')({
  fontSize: '30px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
});

const InstructorList: React.FC<InstructorListProps> = ({
  value,
  onChange,
  options = [
    { value: 'john-1', name: 'John Doe', rating: 5 },
    { value: 'john-2', name: 'John Doe', rating: 4.5 },
    { value: 'john-3', name: 'John Doe', rating: 5 },
    { value: 'john-4', name: 'John Doe', rating: 4.5 },
    { value: 'john-5', name: 'John Doe', rating: 5 },
    { value: 'john-6', name: 'John Doe', rating: 5 },
    { value: 'john-7', name: 'John Doe', rating: 4.5 },
    { value: 'john-8', name: 'John Doe', rating: 5 },
  ],
  sx,
  disabled = false,
  title = 'Instructor List',
  subtitle = 'Choose an instructor to view their ratings',
  variant = 'instructor',
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const colorSchemes = ['yellow', 'purple'];

  const handleClick = (opt: InstructorOption) => {
    if (disabled || opt.disabled) return;
    onChange(opt.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, opt: InstructorOption) => {
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

        <CardsGrid role="radiogroup" aria-label={title}>
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
                title={variant === 'semester' ? opt.name : `${opt.name} - Rating: ${opt.rating}`}
              >
                {variant === 'semester' ? (
                  <SemesterName>{opt.name}</SemesterName>
                ) : (
                  <>
                    <InstructorName>{opt.name}</InstructorName>
                    <RatingContainer>
                      <RatingText colorscheme={colorScheme}>{opt.rating}</RatingText>
                      <StarIcon>
                        <img
                          src="https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Vector%20(1).png"
                          alt="staricon"
                          width={'32px'}
                          height={'28px'}
                        />
                      </StarIcon>
                    </RatingContainer>
                  </>
                )}
              </Card>
            );
          })}
        </CardsGrid>
      </Box>
    </Outer>
  );
};

export default InstructorList;

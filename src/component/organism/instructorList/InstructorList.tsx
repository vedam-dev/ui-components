import React from 'react';
import { Box, Typography, SxProps, Theme, styled } from '@mui/material';

export interface InstructorOption {
  value: string;
  name: string;
  rating: number;
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
}

const Outer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(11),
  borderRadius: theme.spacing(9),
  background: '#FFFFFF',
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.10)',
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

const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(14),
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
      bg: 'linear-gradient(180deg, #FFF 0%, #FFF4DC 100%)',
      border: '#FDE1AA',
      ratingColor: '#886B33',
    },
    purple: {
      bg: 'linear-gradient(180deg, #FFF 0%, #F6EDFF 100%)',
      border: '#E1BFFF',
      ratingColor: '#8A18FF',
    },
  };

  const scheme = colorSchemes[colorscheme || 'yellow'];

  const base: any = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(7, 19),
    borderRadius: theme.spacing(5),
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

const InstructorName = styled(Typography)({
  color: '#1E1E1E',
  textAlign: 'center',
  fontFamily: 'Outfit',
  fontSize: '22px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  marginBottom: '8px',
});

const RatingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
});

const RatingText = styled(Typography)<{ colorscheme?: string }>(({ colorscheme }) => {
  const color = colorscheme === 'purple' ? '#9B6FE8' : '#C8A658';
  return {
    color,
    fontFamily: 'Poppins',
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
  subtitle = 'Choose a an instructor to view their ratings',
}) => {
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
                title={`${opt.name} - Rating: ${opt.rating}`}
              >
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
              </Card>
            );
          })}
        </CardsGrid>
      </Box>
    </Outer>
  );
};

export default InstructorList;

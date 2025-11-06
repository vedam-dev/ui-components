import React, { useState, useEffect } from 'react';
import { Box, Typography, SxProps, Theme, styled, useTheme } from '@mui/material';

export interface CampusOption {
  value: string;
  collegeName: string;
  campus: string;
  collegeId: string;
  location: string;
  pincode: string;
  disabled?: boolean;
}

export interface CampusSelectionProps {
  value: string;
  onChange: (value: string) => void;
  onSelectCampus?: (campus: CampusOption) => void;
  options?: CampusOption[];
  sx?: SxProps<Theme>;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  showNavigationButtons?: boolean;
  itemsPerPage?: number;
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

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: '40px',
});

const Title = styled(Typography)({
  color: '#1F1F1F',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  marginBottom: '8px',
});

const Subtitle = styled(Typography)({
  color: '#9CA3AF',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
});

const NavButton = styled('button')<{ disabled?: boolean }>(({ disabled }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: '1px solid #E5E7EB',
  background: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'all 200ms ease',
  opacity: disabled ? 0.4 : 1,
  '&:hover': {
    background: disabled ? '#FFFFFF' : '#F9FAFB',
    boxShadow: disabled ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
  },
  '&:active': {
    transform: disabled ? 'none' : 'scale(0.95)',
  },
}));

const CardsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(6),
  alignItems: 'stretch',
  flexWrap: 'wrap',
}));

const Card = styled(Box)<{
  selected?: boolean;
  disabled?: boolean;
}>(({ theme, selected, disabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 calc(33.333% - 24px)',
  minWidth: '321px',
  maxWidth: '440px',
  padding: theme.spacing(5.25),
  borderRadius: theme.spacing(4),
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'all 200ms ease',
  outline: 'none',
  opacity: disabled ? 0.5 : 1,
  '&:hover': {
    transform: disabled ? 'none' : 'translateY(-2px)',
    boxShadow: disabled ? 'inherit' : '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

const CardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '32px',
});

const Logo = styled('img')({
  width: '64px',
  height: '64px',
  flexShrink: 0,
  display: 'block',
});

const CollegeName = styled(Typography)({
  color: '#9333EA',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '18px',
  fontStyle: 'semibold',
  fontWeight: 600,
  lineHeight: '1.4',
  marginBottom: '3px',
});

const Campus = styled(Typography)({
  color: '#1F1F1F',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '1.4',
});

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '40px',
  marginBottom: '20px',
  '&:last-of-type': {
    marginBottom: '32px',
  },
});

const InfoLabel = styled(Typography)({
  color: '#1F1F1F',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  minWidth: '100px',
  flexShrink: 0,
});

const InfoValue = styled(Typography)({
  color: '#4B5563',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '1.5',
  flex: 1,
});

const SelectButton = styled('button')({
  width: '100%',
  padding: '14px 24px',
  borderRadius: '50px',
  border: '2px solid #9333EA',
  background: 'transparent',
  color: '#9333EA',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 200ms ease',
  '&:hover': {
    background: '#9333EA',
    color: '#FFFFFF',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
});

const CampusSelection: React.FC<CampusSelectionProps> = ({
  value,
  onChange,
  onSelectCampus,
  options = [],
  sx,
  disabled = false,
  title = 'Campus List',
  subtitle = 'Choose a campus based on location',
  showNavigationButtons = true,
  itemsPerPage = 3,
}) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(options.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleOptions = options.slice(startIndex, endIndex);

  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleCardClick = (opt: CampusOption) => {
    if (disabled || opt.disabled) return;
    onChange(opt.value);
  };

  const handleSelectClick = (e: React.MouseEvent, opt: CampusOption) => {
    e.stopPropagation();
    if (disabled || opt.disabled) return;
    if (onSelectCampus) {
      onSelectCampus(opt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, opt: CampusOption) => {
    if (disabled || opt.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(opt.value);
    }
  };

  // Reset to first page if options change
  useEffect(() => {
    setCurrentPage(0);
  }, [options.length]);

  return (
    <Outer sx={sx}>
      <Header>
        <Box>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Box>
        
        {showNavigationButtons && totalPages > 1 && (
          <Box display="flex" gap={2}>
            <NavButton 
              onClick={handlePrevious} 
              disabled={!canGoPrevious}
              aria-label="Previous page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M15 18L9 12L15 6" 
                  stroke={canGoPrevious ? "#1F1F1F" : "#9CA3AF"} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </NavButton>
            <NavButton 
              onClick={handleNext} 
              disabled={!canGoNext}
              aria-label="Next page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M9 18L15 12L9 6" 
                  stroke={canGoNext ? "#1F1F1F" : "#9CA3AF"} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </NavButton>
          </Box>
        )}
      </Header>

      <CardsRow role="radiogroup" aria-label={title}>
        {visibleOptions.map((opt, index) => {
          const isSelected = value === opt.value;
          const globalIndex = startIndex + index;
          const cardBackground =
            globalIndex % 2 === 0
              ? 'linear-gradient(180deg, #FFF 0%, #F3E8FF 100%)'
              : 'linear-gradient(180deg, #FFF 0%, #FFF4DC 100%)';

          return (
            <Card
              key={opt.value}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={disabled || opt.disabled}
              tabIndex={disabled || opt.disabled ? -1 : 0}
              selected={isSelected}
              disabled={disabled || opt.disabled}
              onClick={() => handleCardClick(opt)}
              onKeyDown={(e) => handleKeyDown(e, opt)}
              style={{
                background: cardBackground,
              }}
            >
              <CardHeader>
                <Logo
                  src="https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Logo.png"
                  alt="logo"
                />
                <Box flex="1" minWidth={0}>
                  <CollegeName>{opt.collegeName}</CollegeName>
                  <Campus>{opt.campus}</Campus>
                </Box>
              </CardHeader>

              <Box>
                <InfoRow>
                  <InfoLabel>College ID</InfoLabel>
                  <InfoValue>{opt.collegeId}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Location</InfoLabel>
                  <InfoValue>{opt.location}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Pincode</InfoLabel>
                  <InfoValue>{opt.pincode}</InfoValue>
                </InfoRow>
              </Box>

              <SelectButton
                onClick={(e) => handleSelectClick(e, opt)}
                aria-label={`Select ${opt.campus}`}
              >
                Select Campus
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SelectButton>
            </Card>
          );
        })}
      </CardsRow>
    </Outer>
  );
};

export default CampusSelection;
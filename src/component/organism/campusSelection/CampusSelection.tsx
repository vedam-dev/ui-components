import React, { useState, useEffect } from 'react';
import { Box, Typography, SxProps, Theme, styled } from '@mui/material';

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
  padding: '26px 32px 32px 32px',
  borderRadius: theme.spacing(9),
  background: '#FFFFFF',
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.10)',
  border: 'none',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
}));

const Header: React.FC<{ sx?: SxProps<Theme>; children?: React.ReactNode }> = ({
  sx,
  children,
}) => (
  <Typography
    component="div"
    sx={{
      marginBottom: '40px',
      ...sx,
    }}
  >
    {children}
  </Typography>
);

const Title: React.FC<{ sx?: SxProps<Theme>; children?: React.ReactNode }> = ({ sx, children }) => {
  return (
    <Typography
      component="div"
      sx={{
        fontSize: '22px',
        color: '#1E1E1E',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const Subtitle = styled(Typography)(() => ({
  color: '#777777',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
}));

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
  gap: theme.spacing(13),
  mt: '34px',
  alignItems: 'stretch',
  flexWrap: 'wrap',
}));

const Card = styled(Box)<{
  selected?: boolean;
  disabled?: boolean;
}>(({ theme, selected: _selected, disabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 calc(33.333% - 24px)',
  maxWidth: '368px',
  padding: theme.spacing(5.25),
  borderRadius: theme.spacing(5),
  cursor: disabled ? 'not-allowed' : 'pointer',
  outline: 'none',
  opacity: disabled ? 0.5 : 1,
}));

const CardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '20px',
});

const Logo = styled('img')({
  width: '60px',
  height: '60px',
  flexShrink: 0,
  display: 'block',
});

const CollegeName = styled(Typography)(() => ({
  background: 'linear-gradient(90deg, #8A18FF 0%, #FF7829 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '23px',
}));

const Campus = styled(Typography)(() => ({
  color: '#1E1E1E',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '23px',
}));

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  maxWidth: '324px',
  gap: '34px',
  marginBottom: '26px',
  '&:last-of-type': {
    marginBottom: '0px',
  },
});

const InfoLabel = styled(Typography)(() => ({
  color: '#1E1E1E',
  fontSize: '16px',
  fontWeight: 600,
  minWidth: '80px',
  flexShrink: 0,
}));

const InfoValue = styled(Typography)(() => ({
  color: '#1E1E1E',
  fontSize: '16px',
  fontWeight: 400,
  flex: 1,
}));

const SelectButton = styled('button')(() => ({
  padding: '6px 20px',
  borderRadius: '14px',
  border: '1px solid #8A18FF',
  background: 'transparent',
  color: '#8A18FF',
  fontSize: '16px',
  fontWeight: 500,
  cursor: 'pointer',
  lineHeight: '28px',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 200ms ease',
  '&:hover': {
    background: 'transparent',
    color: '#8A18FF',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

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
      <Header
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '34px',
        }}
      >
        <Box>
          <Title sx={{ fontSize: '22px', fontWeight: 600 }}>{title}</Title>
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
                  stroke={canGoPrevious ? '#1F1F1F' : '#9CA3AF'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavButton>
            <NavButton onClick={handleNext} disabled={!canGoNext} aria-label="Next page">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke={canGoNext ? '#1F1F1F' : '#9CA3AF'}
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
              : 'linear-gradient(180deg, #FFF 0%, #FFEAC0 100%)';
          const cardBorder = globalIndex % 2 === 0 ? '1px solid #DAC2F2' : '1px solid #FDE1AA';
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
                border: cardBorder,
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

              <Box
                sx={{
                  borderRadius: '16px',
                  border: '1px solid #F6EDFF',
                  backgroundColor: '#FFF',
                  p: '20px',
                }}
              >
                <InfoRow>
                  <InfoLabel>College ID</InfoLabel>
                  <InfoValue>{opt.collegeId}</InfoValue>
                </InfoRow>

                <InfoRow sx={{ minHeight: '96px' }}>
                  <InfoLabel>Location</InfoLabel>
                  <InfoValue>{opt.location}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Pincode</InfoLabel>
                  <InfoValue>{opt.pincode}</InfoValue>
                </InfoRow>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: '8px',
                }}
              >
                <SelectButton
                  onClick={(e) => handleSelectClick(e, opt)}
                  aria-label={`Select ${opt.campus}`}
                >
                  Select Campus
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                  >
                    <path
                      d="M0 8C0 8.21216 0.0790138 8.41563 0.219662 8.56565C0.36031 8.71567 0.551069 8.79995 0.749975 8.79995H15.4392L9.96905 14.6336C9.89937 14.708 9.84409 14.7962 9.80638 14.8933C9.76867 14.9904 9.74926 15.0945 9.74926 15.1996C9.74926 15.3047 9.76867 15.4088 9.80638 15.5059C9.84409 15.603 9.89937 15.6912 9.96905 15.7656C10.0387 15.8399 10.1215 15.8988 10.2125 15.9391C10.3035 15.9793 10.4011 16 10.4997 16C10.5982 16 10.6958 15.9793 10.7868 15.9391C10.8779 15.8988 10.9606 15.8399 11.0303 15.7656L17.78 8.56597C17.8498 8.49167 17.9051 8.40345 17.9428 8.30633C17.9806 8.20922 18 8.10513 18 8C18 7.89487 17.9806 7.79078 17.9428 7.69366C17.9051 7.59655 17.8498 7.50832 17.78 7.43403L11.0303 0.234432C10.8895 0.0843276 10.6987 -1.5816e-09 10.4997 0C10.3006 1.5816e-09 10.1098 0.0843276 9.96905 0.234432C9.82832 0.384536 9.74926 0.588121 9.74926 0.8004C9.74926 1.01268 9.82832 1.21626 9.96905 1.36637L15.4392 7.20004H0.749975C0.551069 7.20004 0.36031 7.28432 0.219662 7.43435C0.0790138 7.58437 0 7.78784 0 8Z"
                      fill="#8A18FF"
                    />
                  </svg>
                </SelectButton>
              </Box>
            </Card>
          );
        })}
      </CardsRow>
    </Outer>
  );
};

export default CampusSelection;

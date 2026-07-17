import { SxProps, Theme, styled } from '@mui/material';
import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { Box } from '../../atom/box';
import { Typography } from '../../atom/typography';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import { Tooltip } from '@mui/material';
export interface CampusOption {
  value: string;
  collegeName: string;
  campus: string;
  label: string;
  collegeId: string;
  location: string;
  pincode: string;
  website: string;
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
  logourl: string;
  edit: boolean;
}

const Outer = styled(Box)(({ theme }) => ({
  padding: '26px 32px 32px 32px',
  borderRadius: theme.spacing(9),
  background: theme.palette.common.white,
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.10)',
  border: 'none',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  [theme.breakpoints.down(1200)]: {
    padding: '18px',
    borderRadius: theme.spacing(6),
  },
}));

const Header: React.FC<{ sx?: SxProps<Theme>; children?: React.ReactNode }> = ({
  sx,
  children,
}) => (
  <Typography
    component="div"
    sx={{
      marginBottom: { md: '10px', lg: '26px' },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

const Title: React.FC<{ sx?: SxProps<Theme>; children?: React.ReactNode }> = ({ sx, children }) => {
  const titleTheme = useCoreTheme() as CoreTheme;
  return (
    <Typography
      component="div"
      sx={{
        fontSize: { md: '16px', lg: '20px' },
        color: titleTheme.vd.palette.textStrong,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const Subtitle = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textMuted,
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  [theme.breakpoints.down(1200)]: {
    fontSize: '12px',
  },
}));

const NavButton = styled('button')<{ disabled?: boolean }>(({ theme, disabled }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: '1px solid #E5E7EB',
  background: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'all 200ms ease',
  opacity: disabled ? 0.4 : 1,
  '&:hover': {
    background: disabled ? theme.palette.common.white : '#F9FAFB',
    boxShadow: disabled ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
  },
  '&:active': {
    transform: disabled ? 'none' : 'scale(0.95)',
  },
  [theme.breakpoints.down(1200)]: {
    width: '36px',
    height: '36px',
  },
}));

const CardsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(13),
  mt: '34px',
  alignItems: 'stretch',
  flexWrap: 'nowrap',
  [theme.breakpoints.down(1200)]: {
    gap: theme.spacing(2),
    mt: '20px',
  },
}));

const Card = styled(Box)<{
  selected?: boolean;
  disabled?: boolean;
}>(({ theme, selected: _selected, disabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '368px',
  maxWidth: '100%',
  flexShrink: 0,
  padding: theme.spacing(5.25),
  borderRadius: theme.spacing(5),
  cursor: disabled ? 'not-allowed' : 'pointer',
  outline: 'none',
  opacity: 1,
  [theme.breakpoints.down(1200)]: {
    width: '340px',
    padding: theme.spacing(3.5),
    borderRadius: theme.spacing(5),
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '20px',
  [theme.breakpoints.down(1200)]: {
    marginBottom: '14px',
    gap: '14px',
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: '60px',
  height: '60px',
  flexShrink: 0,
  display: 'block',
  [theme.breakpoints.down(1200)]: {
    width: '48px',
    height: '48px',
  },
}));

const CollegeName = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(90deg, ${(theme as CoreTheme).vd.palette.accentPrimary} 0%, ${(theme as CoreTheme).vd.palette.accentSecondary} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '23px',
}));

const Campus = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textStrong,
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '23px',
  [theme.breakpoints.down(1200)]: {
    fontSize: '14px',
    lineHeight: '21px',
  },
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  maxWidth: '324px',
  // gap: '34px',
  // marginBottom: '26px',
  // '&:last-of-type': {
  //   marginBottom: '0px',
  // },
  [theme.breakpoints.down(1200)]: {
    maxWidth: '312px',
    gap: '20px',
    marginBottom: '18px',
  },
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.accentPrimary,
  fontSize: '16px',
  fontWeight: 600,
  minWidth: '80px',
  flexShrink: 0,
  [theme.breakpoints.down(1200)]: {
    fontSize: '14px',
    lineHeight: '20px',
    minWidth: '70px',
  },
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textStrong,
  fontSize: '16px',
  fontWeight: 400,
  flex: 1,
  [theme.breakpoints.down(1200)]: {
    fontSize: '14px',
  },
}));

const SelectButton = styled('button')(({ theme }) => ({
  padding: '6px 20px',
  borderRadius: '12px',
  border: `1px solid ${(theme as CoreTheme).vd.palette.accentPrimary}`,
  background: (theme as CoreTheme).palette.grey[50],
  color: (theme as CoreTheme).vd.palette.accentPrimary,
  fontSize: '16px',
  fontWeight: 500,
  cursor: 'pointer',
  lineHeight: '28px',
  width: '100%',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 200ms ease',
  '&:hover': {
    background: (theme as CoreTheme).palette.grey[50],
    color: (theme as CoreTheme).vd.palette.accentPrimary,
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
  '&:disabled': {
    border: `1px solid ${theme.palette.grey[400]}`,
    background: `${theme.palette.grey[200]}`,
    color: (theme as CoreTheme).vd.palette.textMuted,
    cursor: 'not-allowed',
  },
  [theme.breakpoints.down(1200)]: {
    borderRadius: '10px',
    padding: '5px 20px',
  },
}));

const EditButton = styled('button')(({ theme }) => ({
  display: 'flex',
  height: '44px',
  padding: theme.spacing(0, 3.5),
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  borderRadius: theme.spacing(3),
  border: `1px solid var(--Grey-400, ${theme.palette.grey[400]})`,
  background: `var(--Base-White, ${theme.palette.background.paper} )`,
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
  itemsPerPage: itemsPerPageProp,
  edit = true,
  logourl,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const itemsPerPage = useMemo(() => {
    if (itemsPerPageProp && itemsPerPageProp !== 3) return itemsPerPageProp;
    if (containerWidth === 0) return 1;

    // theme.spacing(13) is 52px based on theme config (spacing: 4)
    const gap = 52;
    const cardWidth = 368;
    const calculated = Math.floor((containerWidth + gap) / (cardWidth + gap));
    return Math.max(1, calculated);
  }, [containerWidth, itemsPerPageProp]);

  const totalPages = Math.ceil(options.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleOptions = options.slice(startIndex, endIndex);

  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const genericLogo =
    'https://images.ctfassets.net/wrc4czfp4sk8/51DQ7QKLYX46JnqwDUNpFM/8525b9631cf1c7f17b97f9a684f0c455/Whitelabelling_Logo.png';

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

  // Reset to first page if options change or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(0);
  }, [options.length, itemsPerPage]);

  return (
    <Outer sx={sx}>
      <Header
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Title sx={{ fontWeight: 600 }}>{title}</Title>
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
                  stroke={canGoPrevious ? theme.vd.palette.textStrong : theme.vd.palette.textSubtle}
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
                  stroke={canGoNext ? theme.vd.palette.textStrong : theme.vd.palette.textSubtle}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavButton>
          </Box>
        )}
      </Header>

      <CardsRow ref={containerRef} role="radiogroup" aria-label={title}>
        {visibleOptions.map((opt, index) => {
          const isSelected = value === opt.value;
          const globalIndex = startIndex + index;
          const cardBackground =
            globalIndex % 2 === 0
              ? `linear-gradient(180deg, ${theme.palette.common.white} 0%, ${theme.vd.palette.accentPrimaryLight} 100%)`
              : `linear-gradient(180deg, ${theme.palette.common.white} 0%, ${theme.palette.secondary[50]} 100%)`;
          const cardBorder =
            globalIndex % 2 === 0
              ? `1px solid ${theme.palette.primary[200]}`
              : `1px solid ${theme.palette.secondary[200]}`;
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
                <Box
                  sx={{
                    width: { md: '48px', lg: '60px' },
                    height: { md: '48px', lg: '60px' },
                    flexShrink: 0,
                    borderRadius: '8px',
                    background: `linear-gradient(to bottom, ${theme.vd.palette.accentSecondary}, ${theme.vd.palette.accentPrimary})`,
                    padding: '1.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      display: 'flex',

                      alignItems: 'center',
                      justifyContent: 'center',
                      background: theme.palette.common.white,
                    }}
                  >
                    <Logo src={logourl ? logourl : genericLogo} alt="logo" height={60} width={60} />
                  </Box>
                </Box>

                <Box flex="1" minWidth={0}>
                  <CollegeName>{opt.collegeName}</CollegeName>
                  <Campus>{opt.campus}</Campus>
                </Box>
              </CardHeader>

              <Box
                sx={{
                  borderRadius: '16px',
                  border: '1px solid #F6EDFF',
                  minHeight: { md: '200px', lg: '220px' },
                  backgroundColor: theme.palette.common.white,
                  p: { md: '16px', lg: '18px' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing(3.25),
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: theme.spacing(3),
                    gap: `${theme.spacing(3.25)} !important`,
                  }}
                >
                  <InfoRow>
                    <InfoLabel>Label</InfoLabel>
                    <InfoValue>{opt.label}</InfoValue>
                  </InfoRow>

                  <InfoRow
                    sx={{
                      height: '126px',
                      overflow: 'hidden',
                    }}
                  >
                    <InfoLabel>Location</InfoLabel>
                    <Tooltip
                      title={opt.location}
                      arrow
                      placement="top"
                      slotProps={{
                        tooltip: {
                          sx: {
                            maxWidth: '60%',
                            whiteSpace: 'normal',
                          },
                        },
                      }}
                    >
                      <InfoValue
                        sx={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word',
                          minWidth: 0,
                        }}
                      >
                        {opt.location}
                      </InfoValue>
                    </Tooltip>
                  </InfoRow>
                </Box>

                <InfoRow
                  sx={{
                    mt: 'auto',
                    minHeight: '50px',
                    maxHeight: '50px',
                    overflow: 'hidden',
                  }}
                >
                  <InfoLabel>Website</InfoLabel>
                  <Tooltip
                    title={opt.website}
                    arrow
                    placement="top"
                    slotProps={{
                      tooltip: {
                        sx: {
                          maxWidth: '60%',
                          whiteSpace: 'normal',
                        },
                      },
                    }}
                  >
                    <InfoValue
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word',
                        minWidth: 0,
                      }}
                    >
                      {opt.website}
                    </InfoValue>
                  </Tooltip>
                </InfoRow>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: { md: '14px', lg: '20px' },
                  gap: theme.spacing(2.5),
                }}
              >
                {edit ? (
                  <EditButton>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <mask
                        id="mask0_11505_20310"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                      >
                        <rect width="20" height="20" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_11505_20310)">
                        <path
                          d="M1.66797 19.9993V16.666H18.3346V19.9993H1.66797ZM5.0013 13.3327H6.16797L12.668 6.85352L11.4805 5.66602L5.0013 12.166V13.3327ZM3.33464 14.9993V11.4577L12.668 2.14518C12.8207 1.9924 12.9978 1.87435 13.1992 1.79102C13.4006 1.70768 13.6124 1.66602 13.8346 1.66602C14.0569 1.66602 14.2721 1.70768 14.4805 1.79102C14.6888 1.87435 14.8763 1.99935 15.043 2.16602L16.1888 3.33268C16.3555 3.48546 16.477 3.66602 16.5534 3.87435C16.6298 4.08268 16.668 4.29796 16.668 4.52018C16.668 4.72852 16.6298 4.93338 16.5534 5.13477C16.477 5.33615 16.3555 5.52018 16.1888 5.68685L6.8763 14.9993H3.33464Z"
                          fill="#777777"
                        />
                      </g>
                    </svg>
                  </EditButton>
                ) : null}
                <SelectButton
                  onClick={(e) => handleSelectClick(e, opt)}
                  aria-label={`Select ${opt.campus}`}
                  disabled={disabled || opt.disabled}
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
                      fill="currentColor"
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

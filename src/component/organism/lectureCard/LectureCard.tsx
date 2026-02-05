import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  styled,
  SxProps,
  Theme,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export type AttendanceStatus =
  | 'Present'
  | 'Absent'
  | 'Late'
  | 'Leave'
  | 'Excused'
  | 'Awaiting Start'
  | 'Session in progress'
  | 'NA';

export interface LectureCardProps {
  title?: string;
  date?: string;
  subtitle?: string;
  buttonText?: string;
  image?: string;
  onWatch?: () => void;
  sx?: SxProps<Theme>;
  showImageHighlight?: boolean;
  variant?: 'default' | 'compact';
  disabled?: boolean;
  lectureState?: 'inFuture' | 'hasEnded';
  attendanceStatus?: AttendanceStatus;
  resourceId?: string; // Optional resource ID for copy functionality
}

const DEFAULT_IMAGE =
  'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Image.png';

const Root = styled(Box)(({ theme }) => ({
  borderRadius: 28,
  background: theme.palette.background.paper,
  maxWidth: '1270px',
}));

const CardInner = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'stretch',
  borderRadius: 24,
  overflow: 'hidden',
  boxShadow: '0 6px 30px rgba(15, 23, 42, 0.06)',
}));

const LeftImageWrapper = styled(Box)<{ ratio?: number }>(() => ({
  position: 'relative',
  flexShrink: 0,
}));

const ImageBox = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
}));

const DecorativeHighlight = styled(Box)(() => ({
  pointerEvents: 'none',
  position: 'absolute',
  inset: 6,
  borderRadius: 12,
  border: '3px solid rgba(59,130,246,0.18)',
}));

const RightContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),
}));

const getAttendanceStyles = (status: AttendanceStatus) => {
  const styles: Record<string, { backgroundColor: string; color: string }> = {
    Present: { backgroundColor: '#F8FFFA', color: '#42B657' },
    Absent: { backgroundColor: '#FFF0F0', color: '#D72525' },
    Late: { backgroundColor: '#FFF', color: '#777' },
    Leave: { backgroundColor: '#FFF', color: '#3870CA' },
    Excused: { backgroundColor: '#FFF', color: '#777' },
    'Awaiting Start': { backgroundColor: '#FFF', color: '#777' },
    'Session in progress': { backgroundColor: '#FFF', color: '#777' },
    NA: { backgroundColor: '#FFF', color: '#777' },
  };

  return styles[status] || styles[''];
};

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="16" viewBox="0 0 6 16" fill="none">
    <mask
      id="mask0_4985_3026"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="6"
      height="16"
    >
      <rect width="6" height="16" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_4985_3026)">
      <path
        d="M3 16C2.45 16 1.97917 15.8042 1.5875 15.4125C1.19583 15.0208 1 14.55 1 14C1 13.45 1.19583 12.9792 1.5875 12.5875C1.97917 12.1958 2.45 12 3 12C3.55 12 4.02083 12.1958 4.4125 12.5875C4.80417 12.9792 5 13.45 5 14C5 14.55 4.80417 15.0208 4.4125 15.4125C4.02083 15.8042 3.55 16 3 16ZM3 10C2.45 10 1.97917 9.80417 1.5875 9.4125C1.19583 9.02083 1 8.55 1 8C1 7.45 1.19583 6.97917 1.5875 6.5875C1.97917 6.19583 2.45 6 3 6C3.55 6 4.02083 6.19583 4.4125 6.5875C4.80417 6.97917 5 7.45 5 8C5 8.55 4.80417 9.02083 4.4125 9.4125C4.02083 9.80417 3.55 10 3 10ZM3 4C2.45 4 1.97917 3.80417 1.5875 3.4125C1.19583 3.02083 1 2.55 1 2C1 1.45 1.19583 0.979167 1.5875 0.5875C1.97917 0.195833 2.45 0 3 0C3.55 0 4.02083 0.195833 4.4125 0.5875C4.80417 0.979167 5 1.45 5 2C5 2.55 4.80417 3.02083 4.4125 3.4125C4.02083 3.80417 3.55 4 3 4Z"
        fill="#777777"
      />
    </g>
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <mask
      id="mask0_4985_3043"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <rect width="16" height="16" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_4985_3043)">
      <path
        d="M5.75 12.499C5.3375 12.499 4.98438 12.3521 4.69063 12.0584C4.39688 11.7646 4.25 11.4115 4.25 10.999V1.99902C4.25 1.58652 4.39688 1.2334 4.69063 0.939648C4.98438 0.645898 5.3375 0.499023 5.75 0.499023H12.5C12.9125 0.499023 13.2656 0.645898 13.5594 0.939648C13.8531 1.2334 14 1.58652 14 1.99902V10.999C14 11.4115 13.8531 11.7646 13.5594 12.0584C13.2656 12.3521 12.9125 12.499 12.5 12.499H5.75ZM5.75 10.999H12.5V1.99902H5.75V10.999ZM2.75 15.499C2.3375 15.499 1.98438 15.3521 1.69063 15.0584C1.39688 14.7646 1.25 14.4115 1.25 13.999V3.49902H2.75V13.999H11V15.499H2.75Z"
        fill="#777777"
      />
    </g>
  </svg>
);

const LectureCard: React.FC<LectureCardProps> = ({
  title = 'Machine Learning Coding',
  date = 'Wednesday, 10 June 2025',
  subtitle,
  buttonText = 'Start Recording',
  image = DEFAULT_IMAGE,
  onWatch = () => {},
  sx = {},
  showImageHighlight = true,
  variant = 'default',
  disabled = false,
  lectureState,
  attendanceStatus,
  resourceId,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const isCompact = variant === 'compact';
  const leftWidth = { xs: '42%', sm: '50%' };
  const minHeight = isCompact ? { xs: 120, sm: 140 } : { xs: 140, sm: 200 };

  const shouldShowAttendance = attendanceStatus !== undefined;
  const displayStatus = attendanceStatus;

  const getTitleColor = () => {
    if (lectureState === 'inFuture') return theme.palette.success.main;
    if (lectureState === 'hasEnded') return theme.palette.info.main;
    return '#1E1E1E';
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopyResourceId = async () => {
    if (resourceId) {
      try {
        await navigator.clipboard.writeText(resourceId);
        // Optionally, you can add a toast notification here
        console.log('Resource ID copied:', resourceId);
      } catch (err) {
        console.error('Failed to copy resource ID:', err);
      }
    }
    handleMenuClose();
  };

  return (
    <Root sx={{ p: isCompact ? 1 : 2, ...sx }}>
      <CardInner>
        <LeftImageWrapper
          sx={{
            width: leftWidth,
            minHeight,
            background: 'linear-gradient(180deg, rgba(8,55,140,0.06) 0%, rgba(8,55,140,0.02) 100%)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              minHeight: '355px',
            }}
          >
            <ImageBox>
              <img
                src={image}
                alt={title}
                loading="lazy"
                draggable={false}
                style={{
                  userSelect: 'none',
                }}
              />
            </ImageBox>

            <IconButton
              aria-label="Play recording"
              onClick={onWatch}
              size="large"
              disabled={disabled}
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
              >
                <circle cx="35" cy="35" r="35" fill="#1C1C1C" fillOpacity="0.85" />
                <path
                  d="M50.198 35.1439C50.1988 35.4349 50.1139 35.7212 49.9514 35.9748C49.7889 36.2285 49.5545 36.4409 49.2709 36.5914L31.6935 46.0354C31.3972 46.1948 31.0578 46.2818 30.7103 46.2874C30.3629 46.2931 30.02 46.2172 29.7172 46.0675C29.4172 45.9202 29.1673 45.7054 28.9932 45.4451C28.8191 45.1849 28.7271 44.8886 28.7266 44.5867V25.701C28.7271 25.3991 28.8191 25.1028 28.9932 24.8426C29.1673 24.5823 29.4172 24.3675 29.7172 24.2202C30.02 24.0706 30.3629 23.9946 30.7103 24.0003C31.0578 24.0059 31.3972 24.093 31.6935 24.2523L49.2709 33.6963C49.5545 33.8468 49.7889 34.0592 49.9514 34.3129C50.1139 34.5665 50.1988 34.8528 50.198 35.1439Z"
                  fill="white"
                />
              </svg>
            </IconButton>

            {showImageHighlight && <DecorativeHighlight />}
          </Box>
        </LeftImageWrapper>

        <RightContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', ml: '38px' }}>
            {shouldShowAttendance && (
              <Box sx={{ mb: '32px' }}>
                <Chip
                  label={displayStatus}
                  sx={{
                    ...getAttendanceStyles(attendanceStatus),
                    fontSize: '14px',
                    fontWeight: 500,
                    height: 'auto',
                    padding: '10px',
                    borderRadius: '14px',
                    border: '1px solid',
                    borderColor: getAttendanceStyles(attendanceStatus).color,
                    '& .MuiChip-label': {
                      padding: 0,
                    },
                  }}
                />
              </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Box
                sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: getTitleColor(),
                    textAlign: 'justify',
                    fontSize: '24px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                    flex: 1,
                    pr: 2,
                  }}
                >
                  {title}
                </Typography>

                {resourceId && (
                  <>
                    <IconButton
                      onClick={handleMenuClick}
                      size="small"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <MenuIcon />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      PaperProps={{
                        sx: {
                          borderRadius: '12px',
                          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                          minWidth: '200px',
                        },
                      }}
                    >
                      <MenuItem
                        onClick={handleCopyResourceId}
                        sx={{
                          display: 'flex',
                          gap: '12px',
                          padding: '8px 16px',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        <CopyIcon />
                        <Typography
                          sx={{
                            fontSize: '18px',
                            color: '#777777',
                            lineHeight: '20px',
                            fontWeight: 400,
                          }}
                        >
                          Copy resource ID
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>

              {subtitle && (
                <Typography
                  variant="body2"
                  sx={{
                    mb: theme.spacing(1),
                    color: 'text.secondary',
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                  }}
                >
                  {subtitle}
                </Typography>
              )}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing(1.25),
                  color: 'text.secondary',
                }}
              >
                <CalendarTodayIcon fontSize="small" sx={{ width: '15px', height: '17px' }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#000',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '20px',
                  }}
                >
                  {date}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: '28px' }}>
              <Button
                onClick={onWatch}
                disableRipple
                disabled={disabled}
                sx={{
                  fontSize: '22px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  padding: theme.spacing(3, 5.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: theme.spacing(4.5),
                  background: '#8A18FF',
                }}
                variant="contained"
              >
                {buttonText}
              </Button>
            </Box>
          </Box>
        </RightContent>
      </CardInner>
    </Root>
  );
};

export default LectureCard;

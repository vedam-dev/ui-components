import React from 'react';
import { Box, Typography, Button, IconButton, styled, SxProps, Theme } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

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
}) => {
  const theme = useCoreTheme() as CoreTheme;

  const isCompact = variant === 'compact';
  const leftWidth = { xs: '42%', sm: '50%' };
  const minHeight = isCompact ? { xs: 120, sm: 140 } : { xs: 140, sm: 200 };
  // const buttonPaddingX = isCompact ? 3 : 4;

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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px', ml: '38px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#1E1E1E',
                  textAlign: 'justify',
                  fontFamily: 'Outfit',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                {title}
              </Typography>

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
                    fontFamily: 'Poppins',
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
            <Box>
              <Button
                onClick={onWatch}
                disableRipple
                sx={{
                  fontSize: '22px',
                  fontStyle: 'normal',
                  fontFamily: theme.typography.fontFamily,
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

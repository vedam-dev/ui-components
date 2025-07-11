import { Card, CardActionArea, CardContent, CardActions } from '../../atom/card';
import { Typography } from '../../atom/typography';
import { Button } from '../../atom/button';
import { FC } from 'react';
import { Box, Stack, SxProps, Theme } from '@mui/material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export interface SubjectCardProps {
  // Content props
  subject: string;
  teacher: string;
  duration: string;
  lectureCount: number;
  description: string;
  iconUrl?: string;
  iconAlt?: string;
  buttonText?: string;

  // Action prop
  onGoToClass?: () => void;

  // Style props
  width?: number | string;
  height?: number | string;
  cardSx?: SxProps<Theme>;
  iconContainerSx?: SxProps<Theme>;
  subjectTextSx?: SxProps<Theme>;
  teacherTextSx?: SxProps<Theme>;
  durationTextSx?: SxProps<Theme>;
  lectureTextSx?: SxProps<Theme>;
  descriptionTextSx?: SxProps<Theme>;
  buttonSx?: SxProps<Theme>;
}

const SubjectCard: FC<SubjectCardProps> = ({
  // Content
  subject,
  teacher,
  duration,
  lectureCount,
  description,
  iconUrl = 'https://cdn-icons-png.flaticon.com/512/226/226777.png',
  iconAlt = 'Subject icon',
  buttonText = 'Go to Class',

  onGoToClass,

  width = 303,
  height = 265,

  cardSx,
  iconContainerSx,
  subjectTextSx,
  teacherTextSx,
  durationTextSx,
  lectureTextSx,
  descriptionTextSx,
  buttonSx
}) => {
  const defaultCardSx: SxProps<Theme> = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: '28px',
    border: 'none',
    background: 'linear-gradient(180deg, rgba(255,230,205,1) 0%, rgba(226,198,255,1) 100%)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    ...cardSx
  };

  const defaultIconContainerSx: SxProps<Theme> = {
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '1px solid transparent',
    padding: '11px 13px',
    bgcolor: 'white',
    backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #FF6B35, #B026FF)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    ...iconContainerSx
  };

  const defaultSubjectTextSx: SxProps<Theme> = {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 500,
    color: '#1A1A1A',
    fontSize: '22px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    marginBottom: '4px',
    ...subjectTextSx
  };

  const defaultTeacherTextSx: SxProps<Theme> = {
    fontFamily: 'Outfit, Helvetica',
    fontWeight: 400,
    color: '#666666',
    fontSize: '1.125rem',
    lineHeight: '20px',
    width: '164px',
    ...teacherTextSx
  };

  const defaultDurationTextSx: SxProps<Theme> = {
    fontFamily: 'Outfit-Medium, Helvetica',
    fontWeight: 500,
    color: '#4c4c4c',
    fontSize: '13px',
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    ...durationTextSx
  };

  const defaultLectureTextSx: SxProps<Theme> = {
    fontFamily: 'Outfit-Medium, Helvetica',
    fontWeight: 500,
    color: '#4c4c4c',
    fontSize: '13px',
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    ...lectureTextSx
  };

  const defaultDescriptionTextSx: SxProps<Theme> = {
    fontFamily: 'Outfit-Regular, Helvetica',
    color: '#1e1e1e',
    fontSize: 16,
    lineHeight: '18px',
    width: 236,
    marginTop: '12px',
    ...descriptionTextSx
  };

  const defaultButtonSx: SxProps<Theme> = {
    width: '265px',
    height: '36px',
    padding: '24px',
    borderRadius: '12px',
    borderColor: '#8a18ff',
    backgroundColor: '#FFFFFF',
    color: '#8a18ff',
    fontFamily: 'Poppins, Helvetica',
    fontWeight: 500,
    fontSize: '16px',
    textTransform: 'none',
    '&:hover': {
      borderColor: '#8a18ff'
    },
    ...buttonSx
  };

  return (
    <Card shadow="none" sx={defaultCardSx}>
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '16px'
        }}
      >
        <Box>
          <Stack direction="row" spacing={4} alignItems="center" mb={3}>
            <Box sx={defaultIconContainerSx}>
              <Box
                component="img"
                src={iconUrl}
                alt={iconAlt}
                sx={{ width: '24px', height: '24px' }}
              />
            </Box>
            <Stack>
              <Typography variant="h6" sx={defaultSubjectTextSx}>
                {subject}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={defaultTeacherTextSx}>
                {teacher}
              </Typography>
            </Stack>
          </Stack>

          <CardContent sx={{ padding: 0 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                mb: '12px'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <AccessTimeIcon
                  sx={{
                    width: '14px',
                    height: '14px',
                    color: '#666666'
                  }}
                />
                <Typography sx={defaultDurationTextSx}>{duration}</Typography>
              </Stack>

              <Typography variant="caption" color="text.secondary">
                |
              </Typography>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <MenuBookOutlinedIcon
                  sx={{
                    width: '14px',
                    height: '14px',
                    color: '#666666'
                  }}
                />
                <Typography sx={defaultLectureTextSx}>{lectureCount} Lectures</Typography>
              </Stack>
            </Box>

            <Typography variant="body1" sx={defaultDescriptionTextSx}>
              {description}
            </Typography>
          </CardContent>
        </Box>

        <CardActions sx={{ padding: 0, mt: '20px' }}>
          <Button variant="outlined" sx={defaultButtonSx} onClick={onGoToClass} disableElevation>
            {buttonText}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default SubjectCard;

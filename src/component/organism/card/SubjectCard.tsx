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
  iconUrl = 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
  iconAlt = 'Subject icon',
  buttonText = 'Go to Class',

  // Action
  onGoToClass,

  // Dimensions
  width = 303,
  height = 265,

  // Styles
  cardSx,
  iconContainerSx,
  subjectTextSx,
  teacherTextSx,
  durationTextSx,
  lectureTextSx,
  descriptionTextSx,
  buttonSx
}) => {
  // Default styles that can be overridden by props
  const defaultCardSx: SxProps<Theme> = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: '28px',
    border: '1px solid #cecece',
    background: 'linear-gradient(180deg, rgba(255,230,205,1) 0%, rgba(226,198,255,1) 100%)',
    ...cardSx
  };

  const defaultIconContainerSx: SxProps<Theme> = {
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'white',
    borderRadius: 2,
    ...iconContainerSx
  };

  const defaultSubjectTextSx: SxProps<Theme> = {
    fontFamily: "'Outfit-Medium', Helvetica",
    fontWeight: 500,
    color: '#1e1e1e',
    fontSize: '22px',
    lineHeight: 'normal',
    ...subjectTextSx
  };

  const defaultTeacherTextSx: SxProps<Theme> = {
    fontFamily: "'Outfit-Regular', Helvetica",
    fontWeight: 400,
    color: 'text.secondary',
    fontSize: '18px',
    lineHeight: 'normal',
    ...teacherTextSx
  };

  const defaultDurationTextSx: SxProps<Theme> = {
    fontFamily: 'Outfit-Medium, Helvetica',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '18px',
    color: '#4c4c4c',
    ...durationTextSx
  };

  const defaultLectureTextSx: SxProps<Theme> = {
    fontFamily: 'Outfit-Medium, Helvetica',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '18px',
    color: '#4c4c4c',
    ...lectureTextSx
  };

  const defaultDescriptionTextSx: SxProps<Theme> = {
    fontFamily: 'Outfit-Regular, Helvetica',
    color: '#1e1e1e',
    fontSize: '16px',
    lineHeight: '18px',
    width: 236,
    ...descriptionTextSx
  };

  const defaultButtonSx: SxProps<Theme> = {
    width: '265px',
    height: '36px',
    padding: '24px',
    borderRadius: '12px',
    borderColor: '#8a18ff',
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
    <Card shadow="y12" sx={defaultCardSx}>
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignContent: 'space-evenly',
          height: '100%'
        }}
      >
        <Stack direction="row" spacing={2.5} alignItems="center" width="238px">
          <Box sx={defaultIconContainerSx}>
            <Box component="img" src={iconUrl} alt={iconAlt} width="33.72px" height="35.41px" />
          </Box>
          <Box width="164px">
            <Typography variant="h6" sx={defaultSubjectTextSx}>
              {subject}
            </Typography>
            <Typography variant="body1" sx={defaultTeacherTextSx}>
              {teacher}
            </Typography>
          </Box>
        </Stack>

        <CardContent sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon sx={{ width: 13, height: 13, color: '#4c4c4c' }} />
              <Typography sx={defaultDurationTextSx}>{duration}</Typography>
            </Stack>

            <Typography variant="caption" color="text.secondary">
              |
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <MenuBookOutlinedIcon sx={{ width: 15, height: 12, color: '#4c4c4c' }} />
              <Typography sx={defaultLectureTextSx}>{lectureCount} Lectures</Typography>
            </Stack>
          </Box>

          <Typography variant="body1" sx={defaultDescriptionTextSx}>
            {description}
          </Typography>
        </CardContent>

        <CardActions sx={{ padding: 3, paddingTop: 0 }}>
          <Button variant="outlined" sx={defaultButtonSx} onClick={onGoToClass}>
            {buttonText}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default SubjectCard;

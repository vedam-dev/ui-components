import { Card, CardActionArea, CardActions } from '../../atom/card';
import { Typography } from '../../atom/typography';
import { Button } from '../../atom/button';
import { FC } from 'react';
import { Box, Stack, SxProps, Theme } from '@mui/material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';

export interface SubjectCardProps {
  subject: string;
  teacher: string;
  duration: string;
  lectureCount: number;
  description: string;
  iconUrl?: string;
  iconAlt?: string;
  buttonText?: string;

  onGoToClass?: () => void;

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
  const theme = useCoreTheme() as CoreTheme;

  const defaultCardSx: SxProps<Theme> = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: theme.spacing(7),
    border: 'none',
    background: 'linear-gradient(180deg, rgba(255,230,205,1) 0%, rgba(226,198,255,1) 100%)',
    boxShadow: theme.vd.shadows.y8,
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
    borderRadius: theme.spacing(2),
    border: '1px solid transparent',
    padding: theme.spacing(2.75, 3.25),
    bgcolor: 'white',
    backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #FF6B35, #B026FF)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    ...iconContainerSx
  };

  const defaultSubjectTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontSize: '22px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    marginBottom: theme.spacing(1),
    width: '100%',
    ...subjectTextSx
  };

  const defaultTeacherTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    color: theme.palette.text.secondary,
    fontSize: '1.125rem',
    lineHeight: '20px',
    width: '100%',
    minWidth: theme.spacing(41),
    ...teacherTextSx
  };

  const defaultDurationTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    whiteSpace: 'nowrap',
    ...durationTextSx
  };

  const defaultLectureTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    whiteSpace: 'nowrap',
    ...lectureTextSx
  };

  const defaultDescriptionTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.spacing(4.5),
    marginTop: theme.spacing(3),
    textWrap: 'stable',
    ...descriptionTextSx
  };

  const defaultButtonSx: SxProps<Theme> = {
    width: '100%',
    padding: theme.spacing(2),
    borderWidth: theme.spacing(0.25),
    borderRadius: theme.spacing(3),
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    fontSize: theme.typography.body1.fontSize,
    textTransform: 'none',
    '&:hover': {
      borderColor: theme.palette.primary.main
    },
    ...buttonSx
  };

  return (
    <Card shadow="y12" sx={defaultCardSx}>
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          gap: theme.spacing(4),
          width: '100%',
          height: '100%',
          padding: theme.spacing(6)
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%'
          }}
        >
          <Stack direction="row" spacing={6} alignItems="center" mb={4}>
            <Box sx={defaultIconContainerSx}>
              <Box
                component="img"
                src={iconUrl}
                alt={iconAlt}
                sx={{ width: '34px', height: '34px' }}
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

          <Box sx={{ pb: theme.spacing(4) }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(2),
                mb: theme.spacing(0)
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon
                  sx={{
                    width: '14px',
                    color: theme.palette.text.secondary
                  }}
                />
                <Typography sx={defaultDurationTextSx}>{duration}</Typography>
              </Stack>

              <Typography variant="caption" color="text.secondary">
                |
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <MenuBookOutlinedIcon
                  sx={{
                    width: '14px',
                    color: theme.palette.text.secondary
                  }}
                />
                <Typography sx={defaultLectureTextSx}>{lectureCount} Lectures</Typography>
              </Stack>
            </Box>

            <Typography variant="body1" sx={defaultDescriptionTextSx}>
              {description}
            </Typography>
          </Box>
          <CardActions sx={{ padding: 0, mt: theme.spacing(0) }}>
            {' '}
            <Button variant="outlined" sx={defaultButtonSx} onClick={onGoToClass} disableElevation>
              {buttonText}
            </Button>
          </CardActions>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default SubjectCard;

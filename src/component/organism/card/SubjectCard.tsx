import { Card, CardActions } from '../../atom/card';
import { Typography } from '../../atom/typography';
import { Button } from '../../atom/button';
import { FC } from 'react';
import { Box, Stack, SxProps, Theme } from '@mui/material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';
import React from 'react';

export interface SubjectCardProps {
  subject: string;
  teacher?: string;
  duration?: string;
  lectureCount?: number;
  description: string;
  iconUrl?: string;
  iconAlt?: string;
  buttonText?: string;
  batch?: string;
  courseCode?: string;
  credit?: string;
  // New props for variant and multiple buttons
  variant?: 'default' | 'course-offering';
  buttons?: Array<{
    text: string;
    onClick: () => void;
    variant?: 'contained' | 'outlined' | 'text';
    startIcon?: React.ReactNode;
  }>;

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
  batchTextSx?: SxProps<Theme>;
  courseInfoTextSx?: SxProps<Theme>;
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
  batch,
  courseCode,
  credit,
  // New props
  variant = 'default',
  buttons,
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
  buttonSx,
  batchTextSx,
  courseInfoTextSx,
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
    ...cardSx,
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
    ...iconContainerSx,
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...subjectTextSx,
  };

  const defaultTeacherTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    color: theme.palette.text.secondary,
    fontSize: '1.125rem',
    lineHeight: '20px',
    width: '100%',
    minWidth: theme.spacing(41),
    ...teacherTextSx,
  };

  const defaultDurationTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    whiteSpace: 'nowrap',
    ...durationTextSx,
  };

  const defaultLectureTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    whiteSpace: 'nowrap',
    ...lectureTextSx,
  };

  const defaultDescriptionTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.spacing(4.5),
    marginTop: theme.spacing(5.25),
    mb: theme.spacing(5.25),
    textWrap: 'stable',
    ml: theme.spacing(6),
    ...descriptionTextSx,
  };

  const defaultButtonSx: SxProps<Theme> = {
    width: theme.spacing(66.25),
    height: theme.spacing(9),
    padding: theme.spacing(2),
    ml: theme.spacing(5),
    mb: theme.spacing(7.5),
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
      borderColor: theme.palette.primary.main,
    },
    ...buttonSx,
  };

  const defaultBatchTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    marginBottom: theme.spacing(1),
    ...batchTextSx,
  };

  const defaultCourseInfoTextSx: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: theme.spacing(1),
    ...courseInfoTextSx,
  };

  // Determine which buttons to display
  const displayButtons =
    buttons ||
    (onGoToClass
      ? [
          {
            text: buttonText,
            onClick: onGoToClass,
            variant: 'outlined' as const,
          },
        ]
      : []);

  // Determine which info section to show (course info OR duration/lectures)
  const showCourseInfo = variant === 'course-offering' && courseCode && credit;
  const showDurationLectures = duration && lectureCount !== undefined;

  // Determine which secondary text to show (batch OR teacher)
  const showBatch = variant === 'course-offering' && batch;
  const showTeacher = teacher && !showBatch; // Only show teacher if batch is not shown

  return (
    <Card shadow="y12" sx={defaultCardSx}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Stack direction="row" spacing={6} alignItems="center" mb={4.25} mt={7} ml={5}>
          <Box sx={defaultIconContainerSx}>
            <Box
              component="img"
              src={iconUrl}
              alt={iconAlt}
              sx={{ width: '34px', height: '34px' }}
            />
          </Box>
          <Stack sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={defaultSubjectTextSx}>
              {subject}
            </Typography>
            {/* Show batch if provided in course-offering variant */}
            {showBatch && (
              <Typography variant="body2" sx={defaultBatchTextSx}>
                {batch}
              </Typography>
            )}
            {/* Show teacher only if batch is not shown */}
            {showTeacher && (
              <Typography variant="body1" color="text.secondary" sx={defaultTeacherTextSx}>
                {teacher}
              </Typography>
            )}
            {/* Empty space if neither batch nor teacher is provided */}
            {!showBatch && !showTeacher && (
              <Box sx={{ height: '20px' }} /> // Empty space to maintain layout
            )}
          </Stack>
        </Stack>

        <Box>
          {/* Show course code and credit if provided in course-offering variant */}
          {showCourseInfo && (
            <Box sx={{ ml: theme.spacing(6), mb: theme.spacing(2) }}>
              <Typography sx={defaultCourseInfoTextSx}>
                Course Code: {courseCode} | Credit: {credit}
              </Typography>
            </Box>
          )}

          {/* Show duration and lectures if provided and NOT showing course info */}
          {showDurationLectures && !showCourseInfo && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(2),
                mb: theme.spacing(0),
                ml: theme.spacing(6),
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon
                  sx={{
                    width: '14px',
                    color: theme.palette.text.secondary,
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
                    color: theme.palette.text.secondary,
                  }}
                />
                <Typography sx={defaultLectureTextSx}>{lectureCount} Lectures</Typography>
              </Stack>
            </Box>
          )}

          <Typography variant="body1" sx={defaultDescriptionTextSx}>
            {description}
          </Typography>
        </Box>
        {/* Buttons Section */}
        {displayButtons.length > 0 && (
          <CardActions sx={{ padding: 0, mt: theme.spacing(0) }}>
            <Box
              sx={{
                display: 'flex',
                gap: theme.spacing(2),
                ml: theme.spacing(5),
                mb: theme.spacing(7.5),
                flexWrap: 'wrap',
              }}
            >
              {displayButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || 'outlined'}
                  startIcon={button.startIcon}
                  sx={{
                    ...defaultButtonSx,
                    width: 'auto',
                    minWidth: theme.spacing(20),
                    ml: 0,
                    ...(button.variant === 'contained' && {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.paper,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                        borderColor: theme.palette.primary.dark,
                      },
                    }),
                    ...(button.variant === 'outlined' && {
                      '&:hover': {
                        backgroundColor: 'rgba(124, 58, 237, 0.04)',
                      },
                    }),
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click events
                    button.onClick();
                  }}
                  disableElevation
                >
                  {button.text}
                </Button>
              ))}
            </Box>
          </CardActions>
        )}
      </Box>
    </Card>
  );
};

export default SubjectCard;

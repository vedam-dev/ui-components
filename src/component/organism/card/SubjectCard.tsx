import { Card, CardActions } from '../../atom/card';
import { Typography } from '../../atom/typography';
import { Button } from '../../atom/button';
import { FC } from 'react';
import { Stack, SxProps, Theme, Tooltip } from '@mui/material';
import { Box } from '../../atom/box';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export type AttendanceChipVariant = 'success' | 'warning' | 'error';

export interface SubjectCardProps {
  subject: string;
  teacher?: string;
  duration?: string;
  lectureCount?: number;
  attendance?: number;
  minAttendance?: number;
  attendanceVariant?: AttendanceChipVariant;
  attendanceTooltip?: string;
  description: string;
  iconUrl?: string;
  iconAlt?: string;
  buttonText?: string;
  batch?: string;
  index: number;
  courseCode?: string;
  credits?: string;
  variant?: 'default' | 'course-offering';
  buttons?: Array<{
    text: string;
    onClick: () => void;
    variant?: 'contained' | 'outlined' | 'text';
    startIcon?: React.ReactNode;
  }>;
  gradient?: string;
  border?: string;

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
  attendanceChipSx?: SxProps<Theme>;
}

const getAttendanceVariantFromValue = (
  attendance: number,
  minAttendance = 75
): AttendanceChipVariant => {
  if (attendance >= minAttendance) return 'success';
  // Keep 3 variants while deriving threshold from course minimum.
  if (attendance >= Math.max(minAttendance - 10, 0)) return 'warning';
  return 'error';
};

const getAttendanceChipStyles = (theme: CoreTheme, variant: AttendanceChipVariant) => {
  const styles: Record<AttendanceChipVariant, { backgroundColor: string; color: string }> = {
    success: {
      backgroundColor: theme.palette.success[500],
      color: theme.palette.success[300],
    },
    warning: {
      backgroundColor: theme.palette.warning[500],
      color: theme.palette.warning[300],
    },
    error: {
      backgroundColor: theme.palette.error[500],
      color: theme.palette.error[300],
    },
  };

  return styles[variant];
};

const SubjectCard: FC<SubjectCardProps> = ({
  subject,
  teacher,
  duration,
  lectureCount,
  attendance,
  minAttendance,
  attendanceVariant,
  attendanceTooltip,
  description,
  iconUrl = 'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/footer/Vector.png',
  iconAlt = 'Subject icon',
  buttonText = 'Go to Class',
  batch,
  index: _index,
  courseCode,
  credits,
  variant = 'default',
  buttons,
  gradient,
  border,
  onGoToClass,

  width = 303,
  height = 260,

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
  attendanceChipSx,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const showAttendance = attendance !== undefined;
  const resolvedAttendanceVariant =
    attendanceVariant ??
    (showAttendance ? getAttendanceVariantFromValue(attendance, minAttendance) : 'success');
  const attendanceChipColors = getAttendanceChipStyles(theme, resolvedAttendanceVariant);
  const resolvedGradient =
    gradient ??
    `linear-gradient(180deg, ${theme.vd.palette.accentPrimaryLight} 0%, ${theme.palette.common.white} 100%)`;
  const resolvedBorder = border ?? `1px solid ${theme.vd.palette.accentPrimaryLight}`;

  const defaultCardSx: SxProps<Theme> = {
    width: { md: '210px', lg: typeof width === 'number' ? `${width}px` : width },
    height: {
      md: showAttendance ? '200px' : '184px',
      lg: showAttendance ? '276px' : typeof height === 'number' ? `${height}px` : height,
    },
    borderRadius: { md: theme.spacing(4.5), lg: theme.spacing(7) },
    padding: {
      md: showAttendance ? theme.spacing(2, 3, 3.5) : theme.spacing(3.5, 3),
      lg: theme.spacing(5),
    },
    border: resolvedBorder,
    background: resolvedGradient,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
    ...cardSx,
  };

  const defaultIconContainerSx: SxProps<Theme> = {
    width: { md: '40px', lg: '56px' },
    height: { md: '40px', lg: '56px' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: { md: theme.spacing(2), lg: theme.spacing(2) },
    gap: theme.spacing(2.5),
    aspectRatio: '1/1',
    border: '1px solid transparent',
    padding: { md: theme.spacing(2.75, 3.25), lg: theme.spacing(2.75, 3.25) },
    bgcolor: 'white',
    backgroundImage: `linear-gradient(white, white), linear-gradient(to right, ${theme.vd.palette.accentSecondary}, ${theme.vd.palette.accentPrimary})`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    ...iconContainerSx,
  };

  const defaultSubjectTextSx: SxProps<Theme> = {
    //FontFamily: theme.typography.//FontFamily,
    fontWeight: { md: 600, lg: 500 },
    color: theme.vd.palette.textStrong,
    fontSize: { md: '16px', lg: '22px' },
    lineHeight: { md: '20px', lg: '28px' },
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...subjectTextSx,
  };

  const defaultTeacherTextSx: SxProps<Theme> = {
    //FontFamily: theme.typography.//FontFamily,
    fontWeight: 400,
    color: theme.palette.text.secondary,
    fontSize: { md: '12px', lg: '1.125rem' },
    lineHeight: { md: '16px', lg: '20px' },
    width: '100%',
    minWidth: theme.spacing(41),
    ...teacherTextSx,
  };

  const defaultDurationTextSx: SxProps<Theme> = {
    //FontFamily: theme.typography.//FontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    whiteSpace: 'nowrap',
    ...durationTextSx,
  };

  const defaultLectureTextSx: SxProps<Theme> = {
    //FontFamily: theme.typography.//FontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    whiteSpace: 'nowrap',
    ...lectureTextSx,
  };

  const defaultDescriptionTextSx: SxProps<Theme> = {
    //FontFamily: theme.typography.//FontFamily,
    color: theme.vd.palette.textStrong,
    fontSize: { md: '12px', lg: '16px' },
    lineHeight: { md: theme.spacing(3.5), lg: theme.spacing(4.5) },
    fontWeight: 400,
    mb: { md: theme.spacing(2.5), lg: theme.spacing(3.75) },
    textWrap: 'stable',
    minHeight: { md: theme.spacing(7), lg: theme.spacing(9.5) },
    ...descriptionTextSx,

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const defaultButtonSx: SxProps<Theme> = {
    width: { md: theme.spacing(46.5), lg: theme.spacing(66.25) },
    height: { md: '36px', lg: theme.spacing(9) },
    padding: theme.spacing(2),
    mb: { md: theme.spacing(3), lg: theme.spacing(7.5) },
    borderWidth: theme.spacing(0.25),
    borderRadius: theme.spacing(3),
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    //FontFamily: theme.typography.//FontFamily,
    fontWeight: 500,
    fontSize: { md: '12px', lg: theme.typography.body1.fontSize },
    textTransform: 'none',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    ...buttonSx,
  };

  const defaultBatchTextSx: SxProps<Theme> = {
    //FontFamily: theme.typography.//FontFamily,
    fontWeight: 400,
    color: theme.palette.text.secondary,
    fontSize: { md: '12px', lg: '18px' },
    lineHeight: { md: '16px', lg: '28px' },
    ...batchTextSx,
  };

  const defaultAttendanceChipSx: SxProps<Theme> = {
    display: 'inline-flex',
    height: { md: '16px', lg: '24px' },
    padding: { md: theme.spacing(0.5, 2.5), lg: theme.spacing(1, 3.25) },
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    flexShrink: 0,
    borderRadius: theme.spacing(25),
    width: 'fit-content',
    mb: { md: theme.spacing(2.5), lg: theme.spacing(3.75) },
    bgcolor: attendanceChipColors.backgroundColor,
    color: attendanceChipColors.color,
    fontFamily: theme.typography.fontFamily ?? 'Outfit, system-ui',
    fontSize: { md: '10px', lg: '12px' },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    ...attendanceChipSx,
  };

  const defaultCourseInfoTextSx: SxProps<Theme> = {
    //FontFamily: theme.typography.//FontFamily,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: { md: '10px', lg: '13px' },
    lineHeight: { md: '13px', lg: '18px' },
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
  const showCourseInfo = variant === 'course-offering' && courseCode && credits;
  const showDurationLectures = duration && lectureCount !== undefined;

  // Determine which secondary text to show (batch OR teacher)
  const showBatch = variant === 'course-offering' && batch;
  const showTeacher = teacher && !showBatch; // Only show teacher if batch is not shown

  return (
    <Card sx={defaultCardSx}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        {showAttendance && (
          <Tooltip
            title={attendanceTooltip ?? ''}
            placement="top"
            arrow
            disableHoverListener={!attendanceTooltip}
            disableFocusListener={!attendanceTooltip}
            disableTouchListener={!attendanceTooltip}
          >
            <Box sx={defaultAttendanceChipSx}>Attendance : {attendance}%</Box>
          </Tooltip>
        )}

        <Stack
          direction="row"
          spacing={{ md: 3, lg: 6 }}
          alignItems="center"
          mb={{ md: theme.spacing(2.5), lg: theme.spacing(3.75) }}
        >
          <Box sx={defaultIconContainerSx}>
            <img
              src={iconUrl}
              alt={iconAlt}
              style={{ width: 'clamp(18px, 2vw, 34px)', height: 'clamp(18px, 2vw, 34px)' }}
            />
          </Box>
          <Stack sx={{ width: '100%', overflow: 'hidden' }}>
            <Tooltip title={subject} placement="top" arrow>
              <Typography variant="h6" sx={defaultSubjectTextSx}>
                {subject}
              </Typography>
            </Tooltip>
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
          {showCourseInfo && (
            <Box
              sx={{
                mb: { md: theme.spacing(2.75), lg: theme.spacing(3.75) },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Course Code */}
              <Typography sx={defaultCourseInfoTextSx}>Course Code: {courseCode}</Typography>

              {/* Custom vertical divider */}
              <Box
                sx={{
                  height: { md: '12px', lg: '15px' },
                  width: '1px',
                  backgroundColor: theme.palette.text.secondary,
                  mx: { md: theme.spacing(1), lg: theme.spacing(2) },
                }}
              />

              {/* Course Credit */}
              <Typography sx={defaultCourseInfoTextSx}>Course Credit: {credits}</Typography>
            </Box>
          )}

          {/* Show duration and lectures if provided and NOT showing course info */}
          {showDurationLectures && !showCourseInfo && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { md: theme.spacing(1), lg: theme.spacing(2) },
                mb: { md: theme.spacing(2.5), lg: theme.spacing(3.75) },
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
          <CardActions
            sx={{
              padding: theme.spacing(0),
              mb: theme.spacing(0),
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: theme.spacing(2),
                flexWrap: 'wrap',
              }}
            >
              {displayButtons.map((button, buttonIndex) => (
                <Button
                  key={buttonIndex}
                  variant={button.variant || 'outlined'}
                  sx={{
                    ...defaultButtonSx,
                    width: 'auto',
                    minWidth: { md: '186px', lg: '260px' },
                    ...(button.variant === 'contained' && {
                      backgroundColor: theme.vd.palette.accentPrimary,
                      color: theme.palette.background.paper,
                      '&:hover': {
                        backgroundColor: theme.vd.palette.accentPrimary,
                        borderColor: theme.palette.primary.dark,
                      },
                    }),
                    ...(button.variant === 'outlined' && {
                      backgroundColor: theme.palette.background.paper,
                      color: theme.vd.palette.accentPrimary,
                      border: `1px solid ${theme.vd.palette.accentPrimary}`,
                      '&:hover': {
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.vd.palette.accentPrimary}`,
                      },
                    }),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
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

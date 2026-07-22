import type React from 'react';
import { useEffect, useState } from 'react';
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Box } from '../../atom/box';
import { Typography } from '../../atom/typography';
import { Button } from '../../atom/button';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ContestCourseOfferingOption {
  id: number;
  label: string;
}

export interface ContestModalFormData {
  title: string;
  label: string;
  courseOfferingId: number | null;
  date: string;
  time: string;
  /** Contest duration in minutes */
  duration: number;
  maxScore: number;
}

export interface ContestModalInitialData {
  title?: string;
  label?: string;
  courseOfferingId?: number | null;
  date?: string;
  time?: string;
  /** Contest duration in minutes */
  duration?: number;
  maxScore?: number;
}

export interface ContestModalProps {
  open: boolean;
  onClose: () => void;
  variant: 'create' | 'edit';
  courseOfferings: ContestCourseOfferingOption[];
  onSubmit?: (data: ContestModalFormData) => Promise<void> | void;
  initialData?: ContestModalInitialData;
}

const TITLE_MAX_LENGTH = 80;
const DEFAULT_DURATION_MINUTES = 120; // 02:00
const DURATION_STEP_MINUTES = 3;
const MIN_DURATION_MINUTES = 3;
const DEFAULT_MAX_SCORE = 100;

function formatDurationHhMm(totalMinutes: number): string {
  const safe = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function parseDurationHhMm(value: string): number | null {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,3}):(\d{1,2})$/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes) || minutes > 59) return null;

  return hours * 60 + minutes;
}

function snapDurationMinutes(totalMinutes: number): number {
  const snapped = Math.round(totalMinutes / DURATION_STEP_MINUTES) * DURATION_STEP_MINUTES;
  return Math.max(MIN_DURATION_MINUTES, snapped);
}

const getDefaultForm = (): ContestModalFormData => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return {
    title: '',
    label: '',
    courseOfferingId: null,
    date: `${year}-${month}-${day}`,
    time: '14:00',
    duration: DEFAULT_DURATION_MINUTES,
    maxScore: DEFAULT_MAX_SCORE,
  };
};

// ── Component ─────────────────────────────────────────────────────────────────

const ContestModal: React.FC<ContestModalProps> = ({
  open,
  onClose,
  variant,
  courseOfferings,
  onSubmit,
  initialData,
}) => {
  const theme = useTheme();
  const isEdit = variant === 'edit';

  const title = isEdit ? 'Edit Contest' : 'Create New Contest';
  const subtitle = isEdit ? 'Edit details for the contest' : 'Enter details for the contest';
  const submitLabel = isEdit ? 'Save Changes' : 'Create Contest';

  const [form, setForm] = useState<ContestModalFormData>(getDefaultForm);
  const [durationText, setDurationText] = useState(formatDurationHhMm(DEFAULT_DURATION_MINUTES));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const nextForm = {
        ...getDefaultForm(),
        ...initialData,
        courseOfferingId: initialData?.courseOfferingId ?? null,
        duration: initialData?.duration ?? DEFAULT_DURATION_MINUTES,
      };
      setForm(nextForm);
      setDurationText(formatDurationHhMm(nextForm.duration));
      setIsLoading(false);
    }
  }, [open, initialData]);

  const handleClose = () => {
    setForm(getDefaultForm());
    setDurationText(formatDurationHhMm(DEFAULT_DURATION_MINUTES));
    setIsLoading(false);
    onClose();
  };

  const updateField = <K extends keyof ContestModalFormData>(
    field: K,
    value: ContestModalFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const setDurationMinutes = (minutes: number) => {
    const next = snapDurationMinutes(minutes);
    updateField('duration', next);
    setDurationText(formatDurationHhMm(next));
  };

  const handleDurationInputChange = (value: string) => {
    const sanitized = value.replace(/[^\d:]/g, '').slice(0, 6);
    setDurationText(sanitized);

    const parsed = parseDurationHhMm(sanitized);
    if (parsed != null && parsed >= MIN_DURATION_MINUTES) {
      updateField('duration', parsed);
    }
  };

  const handleDurationBlur = () => {
    const parsed = parseDurationHhMm(durationText);
    if (parsed == null) {
      setDurationText(formatDurationHhMm(form.duration));
      return;
    }
    setDurationMinutes(parsed);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.label.trim() || form.courseOfferingId == null) {
      return;
    }

    const durationMinutes = snapDurationMinutes(parseDurationHhMm(durationText) ?? form.duration);

    setIsLoading(true);
    try {
      await onSubmit?.({
        ...form,
        title: form.title.trim(),
        label: form.label.trim(),
        duration: durationMinutes,
      });
      handleClose();
    } catch (err: unknown) {
      console.error('ContestModal submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    !form.title.trim() ||
    !form.label.trim() ||
    form.courseOfferingId == null ||
    !form.date ||
    !form.time ||
    form.duration < MIN_DURATION_MINUTES ||
    form.maxScore < 1 ||
    isLoading;

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: theme.palette.common.white,
      fontSize: '16px',
      fontFamily: 'Outfit, sans-serif',
      '& fieldset': { borderColor: theme.palette.grey[300] },
      '&:hover fieldset': { borderColor: theme.palette.grey[400] },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[400],
        borderWidth: '1px',
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[50],
      },
    },
    '& .MuiOutlinedInput-input': { padding: '13px 20px' },
  };

  const labelSx = {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.primary,
    mb: '8px',
    fontFamily: 'Outfit, sans-serif',
  };

  const stepperButtonSx = (enabled: boolean) => ({
    width: '48px',
    height: '48px',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: enabled ? 'pointer' : 'not-allowed',
    opacity: enabled ? 1 : 0.5,
    backgroundColor: theme.palette.common.white,
    userSelect: 'none' as const,
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: enabled ? 'rgba(0,0,0,0.02)' : theme.palette.common.white,
    },
  });

  const canDecreaseDuration = form.duration > MIN_DURATION_MINUTES;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '92%', sm: '90%', md: '672px' },
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '24px',
          padding: '32px',
          outline: 'none',
        }}
      >
        <Box sx={{ mb: '24px' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '30px',
              color: theme.palette.text.primary,
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '23px',
              color: theme.palette.text.secondary,
              fontFamily: 'Outfit, sans-serif',
              mt: '4px',
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '8px',
              }}
            >
              <Typography sx={{ ...labelSx, mb: 0 }}>Title</Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: theme.palette.text.secondary,
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                {`(${form.title.length}/${TITLE_MAX_LENGTH})`}
              </Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Type"
              value={form.title}
              inputProps={{ maxLength: TITLE_MAX_LENGTH }}
              onChange={(e) => updateField('title', e.target.value)}
              sx={textFieldSx}
            />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: '16px',
            }}
          >
            <Box>
              <Typography sx={labelSx}>Label</Typography>
              <TextField
                fullWidth
                placeholder="Type"
                value={form.label}
                onChange={(e) => updateField('label', e.target.value)}
                sx={textFieldSx}
              />
            </Box>

            <Box>
              <Typography sx={labelSx}>Course Offering</Typography>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  disabled={isEdit}
                  value={form.courseOfferingId != null ? String(form.courseOfferingId) : ''}
                  onChange={(e) => {
                    const value = String(e.target.value);
                    updateField('courseOfferingId', value ? Number(value) : null);
                  }}
                  sx={{
                    borderRadius: '12px',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '16px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.grey[300],
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.grey[400],
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.grey[400],
                      borderWidth: '1px',
                    },
                    '&.Mui-disabled': {
                      backgroundColor: theme.palette.grey[50],
                    },
                    '& .MuiSelect-select': {
                      padding: '13px 20px',
                    },
                  }}
                  renderValue={(selected) => {
                    const selectedValue = String(selected ?? '');
                    if (!selectedValue) {
                      return (
                        <Typography
                          sx={{
                            color: theme.palette.text.secondary,
                            fontFamily: 'Outfit, sans-serif',
                          }}
                        >
                          Select
                        </Typography>
                      );
                    }
                    const match = courseOfferings.find(
                      (option) => option.id === Number(selectedValue)
                    );
                    return match?.label ?? selectedValue;
                  }}
                >
                  {courseOfferings.map((option) => (
                    <MenuItem key={option.id} value={String(option.id)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: '16px',
            }}
          >
            <Box>
              <Typography sx={labelSx}>Date</Typography>
              <TextField
                fullWidth
                type="date"
                value={form.date}
                onChange={(e) => updateField('date', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayOutlinedIcon
                        sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  ...textFieldSx,
                  '& input::-webkit-calendar-picker-indicator': {
                    opacity: 0,
                    position: 'absolute',
                    right: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={labelSx}>Time</Typography>
              <TextField
                fullWidth
                type="time"
                value={form.time}
                onChange={(e) => updateField('time', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccessTimeOutlinedIcon
                        sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  ...textFieldSx,
                  '& input::-webkit-calendar-picker-indicator': {
                    opacity: 0,
                    position: 'absolute',
                    right: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: '16px',
            }}
          >
            <Box>
              <Typography sx={labelSx}>Duration</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Box
                  onClick={() =>
                    canDecreaseDuration && setDurationMinutes(form.duration - DURATION_STEP_MINUTES)
                  }
                  sx={stepperButtonSx(canDecreaseDuration)}
                >
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 400,
                      color: theme.palette.text.primary,
                    }}
                  >
                    —
                  </Typography>
                </Box>

                <TextField
                  value={durationText}
                  onChange={(e) => handleDurationInputChange(e.target.value)}
                  onBlur={handleDurationBlur}
                  placeholder="02:00"
                  inputProps={{
                    inputMode: 'numeric',
                    'aria-label': 'Duration in hh:mm',
                  }}
                  sx={{
                    ...textFieldSx,
                    flex: 1,
                    '& .MuiOutlinedInput-input': {
                      padding: '13px 20px',
                      textAlign: 'center',
                      fontWeight: 500,
                    },
                  }}
                />

                <Box
                  onClick={() => setDurationMinutes(form.duration + DURATION_STEP_MINUTES)}
                  sx={stepperButtonSx(true)}
                >
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 400,
                      color: theme.palette.text.primary,
                    }}
                  >
                    +
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography sx={labelSx}>Maximum Score</Typography>
              <TextField
                fullWidth
                type="number"
                value={form.maxScore}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  updateField('maxScore', Number.isNaN(next) ? 0 : next);
                }}
                inputProps={{ min: 1 }}
                sx={textFieldSx}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px',
            mt: '32px',
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={isLoading}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.common.white,
              fontSize: '16px',
              fontWeight: 500,
              borderRadius: '12px',
              padding: '13px 24px',
              textTransform: 'none',
              fontFamily: 'Outfit, sans-serif',
              '&:hover': {
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: 'rgba(0,0,0,0.03)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isDisabled}
            sx={{
              backgroundColor: theme.palette.primary.main,
              fontSize: '16px',
              fontWeight: 500,
              borderRadius: '12px',
              padding: '13px 24px',
              color: theme.palette.common.white,
              textTransform: 'none',
              fontFamily: 'Outfit, sans-serif',
              '&:hover': { backgroundColor: theme.palette.primary.dark },
              '&:disabled': {
                backgroundColor: theme.palette.grey[400],
                color: theme.palette.common.white,
              },
            }}
          >
            {isLoading ? 'Saving...' : submitLabel}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ContestModal;

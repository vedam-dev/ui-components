import type React from 'react';
import { useState, useEffect } from 'react';
import { Modal, useTheme, TextField, IconButton, InputAdornment, Box, alpha } from '@mui/material';

import { Typography } from '../../atom/typography';
import { Button } from '../../atom/button';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AggregatorField {
  key: string;
  label: string;
  placeholder?: string;
}

export interface AggregatorOption {
  id: string;
  name: string;
  fields: AggregatorField[];
}

export interface AggregatorValues {
  title: string;
  description: string;
  credentials: Record<string, string>;
}

export interface AddAggregatorModalProps {
  open: boolean;
  onClose: () => void;
  variant: 'add' | 'edit';
  aggregators?: AggregatorOption[];
  initialAggregatorId?: string;
  initialValues?: Record<string, AggregatorValues>;
  onSubmit?: (aggregatorId: string, values: AggregatorValues) => Promise<void> | void;
}

// ── Default Data ──────────────────────────────────────────────────────────────

const DEFAULT_AGGREGATORS: AggregatorOption[] = [
  {
    id: 'cashfree',
    name: 'Cashfree',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'easebuzz',
    name: 'Easebuzz',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
];

// ── Masking Helpers ───────────────────────────────────────────────────────────

const partialMask = (value: string): string => {
  if (!value) return '';
  if (value.length <= 6) {
    return '*'.repeat(value.length - 1) + value.slice(-1);
  }
  const visibleStart = value.slice(0, 3);
  const visibleEnd = value.slice(-3);
  const maskedMiddle = '*'.repeat(Math.max(value.length - 6, 4));
  return `${visibleStart}${maskedMiddle}${visibleEnd}`;
};

const fullMask = (value: string): string => {
  if (!value) return '';
  return '*'.repeat(Math.max(value.length, 8));
};

// ── Component ─────────────────────────────────────────────────────────────────

const AddAggregatorModal: React.FC<AddAggregatorModalProps> = ({
  open,
  onClose,
  variant,
  aggregators = DEFAULT_AGGREGATORS,
  initialAggregatorId,
  initialValues,
  onSubmit,
}) => {
  const theme = useTheme();

  const isEdit = variant === 'edit';
  const titleText = isEdit ? 'Edit Aggregator' : 'Add an Aggregator';
  const subtitleText = isEdit
    ? 'Edit details for the given fields'
    : 'Enter details for the given fields';
  const submitLabel = isEdit ? 'Save' : 'Create';

  const [activeTabId, setActiveTabId] = useState<string>('');
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [formValues, setFormValues] = useState<Record<string, AggregatorValues>>({});

  useEffect(() => {
    if (open) {
      const initial: Record<string, AggregatorValues> = {};
      aggregators.forEach((agg) => {
        const existing = initialValues?.[agg.id];
        initial[agg.id] = {
          title: existing?.title ?? (isEdit ? agg.name : ''),
          description: existing?.description ?? '',
          credentials: { ...existing?.credentials },
        };
      });
      setFormValues(initial);

      const defaultTab = initialAggregatorId ?? aggregators[0]?.id ?? '';
      setActiveTabId(defaultTab);

      const tabIdx = aggregators.findIndex((a) => a.id === defaultTab);
      if (tabIdx >= 0 && aggregators.length > 4) {
        if (tabIdx >= aggregators.length - 4) {
          setStartIndex(aggregators.length - 4);
        } else {
          setStartIndex(tabIdx);
        }
      } else {
        setStartIndex(0);
      }

      setIsLoading(false);
      setSubmitError('');
    }
  }, [open, aggregators, initialAggregatorId, initialValues, isEdit]);

  const handleClose = () => onClose();

  const handleTabChange = (id: string) => {
    if (isEdit) return;
    setActiveTabId(id);
    setSubmitError('');
  };

  const handlePrevTabs = () => {
    if (startIndex > 0) setStartIndex((prev) => prev - 1);
  };

  const handleNextTabs = () => {
    if (startIndex + 4 < aggregators.length) setStartIndex((prev) => prev + 1);
  };

  const handleTitleChange = (val: string) => {
    setFormValues((prev) => ({
      ...prev,
      [activeTabId]: { ...prev[activeTabId], title: val },
    }));
  };

  const handleDescChange = (val: string) => {
    setFormValues((prev) => ({
      ...prev,
      [activeTabId]: { ...prev[activeTabId], description: val },
    }));
  };

  const handleCredentialChange = (fieldKey: string, val: string) => {
    setFormValues((prev) => ({
      ...prev,
      [activeTabId]: {
        ...prev[activeTabId],
        credentials: { ...prev[activeTabId]?.credentials, [fieldKey]: val },
      },
    }));
  };

  const handlePaste = async (fieldKey: string) => {
    if (isEdit) return;
    try {
      const text = await navigator.clipboard.readText();
      handleCredentialChange(fieldKey, text);
    } catch (err) {
      console.error('Failed to read from clipboard:', err);
    }
  };

  const handleSubmit = async () => {
    const currentForm = formValues[activeTabId];
    if (!currentForm) return;

    setIsLoading(true);
    setSubmitError('');
    try {
      await onSubmit?.(activeTabId, currentForm);
      handleClose();
    } catch (err: unknown) {
      const body = (err as Record<string, unknown>)?.['body'] as
        | Record<string, unknown>
        | undefined;
      const message =
        typeof body?.['message'] === 'string' && body['message']
          ? body['message']
          : 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const currentForm = formValues[activeTabId] || {
    title: '',
    description: '',
    credentials: {},
  };

  const activeAggregator = aggregators.find((a) => a.id === activeTabId);
  const isTitleValid = currentForm.title.trim().length > 0;
  const isCredentialsValid = isEdit
    ? true
    : (activeAggregator?.fields.every(
        (field) => (currentForm.credentials[field.key] ?? '').trim().length > 0
      ) ?? true);

  const isValid = isTitleValid && isCredentialsValid;
  const isDisabled = !isValid || isLoading;

  const hasArrows = aggregators.length > 4;
  const visibleAggregators = hasArrows
    ? aggregators.slice(startIndex, startIndex + 4)
    : aggregators;

  const modalBoxSx = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    width: '670px',
    maxHeight: '672px',
    padding: '32px 28px',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '20px',
    borderRadius: '36px',
    background: theme.palette.background.paper,
    boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.30)',
    outline: 'none',
    boxSizing: 'border-box',
  } as const;

  const labelSx = {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.primary,
    fontFamily: 'Outfit, sans-serif',
  } as const;

  const inputCounterSx = {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.secondary,
    fontFamily: 'Outfit, sans-serif',
  } as const;

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: theme.palette.background.paper,
      fontSize: '16px',
      '& fieldset': { borderColor: theme.palette.grey[300] },
      '&:hover fieldset': { borderColor: theme.palette.grey[400] },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[400],
        borderWidth: '1px',
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
        '& fieldset': { borderColor: theme.palette.grey[300] },
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '13px 20px',
      color: theme.palette.text.primary,
      fontFamily: 'Outfit, sans-serif',
      '&.Mui-disabled': {
        WebkitTextFillColor: theme.palette.text.primary,
      },
    },
  } as const;

  const arrowDisabledColor = theme.palette.action.disabled;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalBoxSx}>
        {/* Header */}
        <Box sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '40px',
              color: theme.palette.text.primary,
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            {titleText}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '24px',
              color: theme.palette.text.secondary,
              fontFamily: 'Outfit, sans-serif',
              mt: '4px',
            }}
          >
            {subtitleText}
          </Typography>
        </Box>

        {/* Tab Bar Slider */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderBottom: `1.5px solid ${theme.palette.divider}`,
            gap: '12px',
            mb: '4px',
            boxSizing: 'border-box',
          }}
        >
          {hasArrows && (
            <IconButton
              onClick={handlePrevTabs}
              disabled={startIndex === 0 || isEdit}
              sx={{
                padding: '4px',
                color: startIndex === 0 ? arrowDisabledColor : theme.palette.primary.main,
                '&.Mui-disabled': { color: arrowDisabledColor },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: hasArrows ? 'space-between' : 'flex-start',
              gap: hasArrows ? '0px' : '32px',
              px: '4px',
            }}
          >
            {visibleAggregators.map((agg) => {
              const isActive = agg.id === activeTabId;
              return (
                <Box
                  key={agg.id}
                  onClick={() => handleTabChange(agg.id)}
                  sx={{
                    cursor: isEdit ? 'default' : 'pointer',
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: '18px',
                    fontFamily: 'Outfit, sans-serif',
                    borderBottom: isActive
                      ? `3.5px solid ${theme.palette.primary.main}`
                      : '3.5px solid transparent',
                    marginBottom: '-2px',
                    transition: 'color 0.15s ease-in-out, border-color 0.15s ease-in-out',
                    textAlign: 'center',
                    minWidth: '80px',
                    userSelect: 'none',
                    '& span': {
                      display: 'inline-block',
                      fontWeight: isActive ? 600 : 500,
                    },
                    ...(!isEdit && {
                      '&:hover': { color: theme.palette.primary.main },
                    }),
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      fontWeight: isActive ? 600 : 500,
                      '&::after': {
                        content: `"${agg.name}"`,
                        display: 'block',
                        fontWeight: 600,
                        height: 0,
                        overflow: 'hidden',
                        visibility: 'hidden',
                        pointerEvents: 'none',
                      },
                    }}
                  >
                    {agg.name}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {hasArrows && (
            <IconButton
              onClick={handleNextTabs}
              disabled={startIndex + 4 >= aggregators.length || isEdit}
              sx={{
                padding: '4px',
                color:
                  startIndex + 4 >= aggregators.length
                    ? arrowDisabledColor
                    : theme.palette.primary.main,
                '&.Mui-disabled': { color: arrowDisabledColor },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          )}
        </Box>

        {/* Inline API Error Banner */}
        {submitError && (
          <Box
            sx={{
              width: '100%',
              backgroundColor: alpha(theme.palette.error.main, 0.06),
              border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{ flexShrink: 0, marginTop: '1px' }}
            >
              <circle cx="12" cy="12" r="10" stroke={theme.palette.error.main} strokeWidth="2" />
              <path
                d="M12 7v6"
                stroke={theme.palette.error.main}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16.5" r="1" fill={theme.palette.error.main} />
            </svg>
            <Typography
              sx={{
                fontSize: '14px',
                lineHeight: '20px',
                color: theme.palette.error.main,
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 400,
              }}
            >
              {submitError}
            </Typography>
          </Box>
        )}

        {/* Scrollable Fields Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '16px',
            overflowY: 'auto',
            flexGrow: 1,
            maxHeight: '380px',
            pr: '4px',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {/* Title Field */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={labelSx}>Title</Typography>
              <Typography sx={inputCounterSx}>{`(${currentForm.title.length}/30)`}</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Type"
              value={currentForm.title}
              inputProps={{ maxLength: 30 }}
              onChange={(e) => handleTitleChange(e.target.value)}
              sx={textFieldSx}
            />
          </Box>

          {/* Description Field */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={labelSx}>Description</Typography>
              <Typography
                sx={inputCounterSx}
              >{`(${currentForm.description.length}/255)`}</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Type"
              value={currentForm.description}
              inputProps={{ maxLength: 255 }}
              onChange={(e) => handleDescChange(e.target.value)}
              sx={textFieldSx}
            />
          </Box>

          {/* Dynamic Credentials Fields */}
          {activeAggregator?.fields.map((field, fieldIndex) => {
            const rawValue = currentForm.credentials[field.key] ?? '';
            const FALLBACK_SECRET_MASK = '****************';
            const displayValue = isEdit
              ? fieldIndex === 0
                ? partialMask(rawValue)
                : fullMask(rawValue) || FALLBACK_SECRET_MASK
              : rawValue;

            return (
              <Box
                key={field.key}
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}
              >
                <Typography sx={labelSx}>{field.label}</Typography>
                <TextField
                  fullWidth
                  disabled={isEdit}
                  placeholder={field.placeholder ?? 'Enter'}
                  value={displayValue}
                  onChange={(e) => handleCredentialChange(field.key, e.target.value)}
                  sx={{
                    ...textFieldSx,
                    ...(isEdit && {
                      '& .MuiOutlinedInput-input': {
                        ...textFieldSx['& .MuiOutlinedInput-input'],
                        letterSpacing: fieldIndex > 0 ? '0.2em' : '0.05em',
                        color: theme.palette.text.secondary,
                        '&.Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.secondary,
                        },
                      },
                    }),
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handlePaste(field.key)}
                          disabled={isEdit}
                          edge="end"
                          sx={{
                            // ✅ was: color: "#777777"
                            color: theme.palette.text.secondary,
                            padding: '4px',
                            '&.Mui-disabled': { color: theme.palette.action.disabled },
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <mask
                              id="mask0_10756_26048"
                              style={{ maskType: 'alpha' }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="18"
                              height="18"
                            >
                              <rect width="18" height="18" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_10756_26048)">
                              <path
                                d="M3.75 15.75C3.3375 15.75 2.98438 15.6031 2.69063 15.3094C2.39688 15.0156 2.25 14.6625 2.25 14.25V3.75C2.25 3.3375 2.39688 2.98438 2.69063 2.69063C2.98438 2.39688 3.3375 2.25 3.75 2.25H6.88125C7.01875 1.8125 7.2875 1.45312 7.6875 1.17188C8.0875 0.890625 8.525 0.75 9 0.75C9.5 0.75 9.94688 0.890625 10.3406 1.17188C10.7344 1.45312 11 1.8125 11.1375 2.25H14.25C14.6625 2.25 15.0156 2.39688 15.3094 2.69063C15.6031 2.98438 15.75 3.3375 15.75 3.75V14.25C15.75 14.6625 15.6031 15.0156 15.3094 15.3094C15.0156 15.6031 14.6625 15.75 14.25 15.75H3.75ZM3.75 14.25H14.25V3.75H12.75V6H5.25V3.75H3.75V14.25ZM9.53438 3.53438C9.67813 3.39062 9.75 3.2125 9.75 3C9.75 2.7875 9.67813 2.60938 9.53438 2.46563C9.39063 2.32188 9.2125 2.25 9 2.25C8.7875 2.25 8.60938 2.32188 8.46563 2.46563C8.32188 2.60938 8.25 2.7875 8.25 3C8.25 3.2125 8.32188 3.39062 8.46563 3.53438C8.60938 3.67813 8.7875 3.75 9 3.75C9.2125 3.75 9.39063 3.67813 9.53438 3.53438Z"
                                fill="currentColor"
                              />
                            </g>
                          </svg>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px',
            width: '100%',
            mt: '12px',
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
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
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
              color: theme.palette.primary.contrastText,
              textTransform: 'none',
              fontFamily: 'Outfit, sans-serif',
              '&:hover': { backgroundColor: theme.palette.primary.dark },
              '&:disabled': {
                backgroundColor: theme.palette.action.disabledBackground,
                color: theme.palette.action.disabled,
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

export default AddAggregatorModal;

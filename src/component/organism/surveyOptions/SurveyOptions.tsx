import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, SxProps, Theme } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export type SurveyOption = {
  id: string;
  label: string;
  allowText?: boolean;
  subtitle?: string;
};

export interface SurveyOptionsProps {
  options: SurveyOption[];
  question?: string;
  value?: string | null;
  textValue?: string;
  onChange?: (selectedId: string | null, text?: string) => void;
  textMaxLength?: number;
  textPlaceholder?: string;
  name?: string;
  sx?: SxProps<Theme>;
  showGlobalOther?: boolean;
}

const OptionRow: React.FC<{
  option: SurveyOption;
  selected: boolean;
  onSelect: () => void;
}> = ({ option, selected, onSelect }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onSelect();
        }
      }}
      onClick={onSelect}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1.5),
        px: theme.spacing(6.5),
        py: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        border: () => (selected ? `2px solid #8A18FF` : `1px solid #CDCDCD`),
        backgroundColor: (t) => (selected ? t.palette.action.hover : 'white'),
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minWidth: theme.spacing(3.5),
        }}
      >
        {selected ? (
          <RadioButtonCheckedIcon
            sx={{
              color: '#8A18FF',
              fontSize: 20,
              width: '18px',
              height: '18px',
            }}
            aria-hidden
          />
        ) : (
          <RadioButtonUncheckedIcon
            sx={{ color: '#8A18FF', width: '18px', height: '18px' }}
            aria-hidden
          />
        )}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 400, fontSize: '20px' }}>{option.label}</Typography>
        {option.subtitle && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: theme.spacing(0.5) }}>
            {option.subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const SurveyOptions: React.FC<SurveyOptionsProps> = ({
  options,
  question,
  value,
  textValue,
  onChange,
  textMaxLength = 80,
  textPlaceholder = 'Other',
  name = 'survey-options',
  sx = {},
  showGlobalOther = false,
}) => {
  const theme = useCoreTheme() as CoreTheme;

  const [internalSelected, setInternalSelected] = useState<string | null>(value ?? null);
  const [internalText, setInternalText] = useState<string>(textValue ?? '');

  useEffect(() => {
    if (value !== undefined) setInternalSelected(value);
  }, [value]);

  useEffect(() => {
    if (textValue !== undefined) setInternalText(textValue);
  }, [textValue]);

  const selectedId = value !== undefined ? value : internalSelected;
  const text = textValue !== undefined ? textValue : internalText;

  // const optionWithText = useMemo(
  //   () => options.find((o) => o.id === selectedId && o.allowText),
  //   [options, selectedId]
  // );

  const onSelect = (id: string) => {
    const newlySelectedOpt = options.find((o) => o.id === id);
    const newlyAllowsText = !!newlySelectedOpt?.allowText;

    if (value === undefined) setInternalSelected(id);

    if (textValue === undefined) {
      if (!newlyAllowsText && !showGlobalOther) setInternalText('');
    }

    onChange?.(id, newlyAllowsText ? text : undefined);
  };

  const onTextChange = (next: string) => {
    const truncated = next.slice(0, textMaxLength);
    if (textValue === undefined) setInternalText(truncated);
    onChange?.(selectedId, truncated);
  };

  return (
    <Box
      sx={{
        width: '100%',
        ...((sx as any) || {}),
      }}
      role="radiogroup"
      aria-label={name}
    >
      {question && (
        <Typography
          sx={{
            mb: theme.spacing(2),
            color: '#1E1E1E',
            fontSize: '22px',
            fontStyle: 'normal',
            fontWeight: 400,
          }}
        >
          {question}
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(6) }}>
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <Box key={opt.id}>
              <OptionRow option={opt} selected={isSelected} onSelect={() => onSelect(opt.id)} />

              {opt.allowText && isSelected && !showGlobalOther && (
                <Box sx={{ mt: theme.spacing(6), px: theme.spacing(1) }}>
                  <TextField
                    placeholder={textPlaceholder}
                    value={text ?? ''}
                    onChange={(e) => onTextChange(e.target.value)}
                    multiline
                    fullWidth
                    minRows={3}
                    inputProps={{ maxLength: textMaxLength }}
                    sx={{
                      borderRadius: theme.shape.borderRadius,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      color: 'text.secondary',
                      mt: theme.spacing(0.5),
                    }}
                  >
                    {String((text ?? '').length)}/{textMaxLength}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {showGlobalOther && (
        <Box sx={{ mt: theme.spacing(6) }}>
          <TextField
            variant="outlined"
            placeholder={textPlaceholder}
            value={text ?? ''}
            onChange={(e) => onTextChange(e.target.value)}
            multiline
            fullWidth
            minRows={3}
            inputProps={{ maxLength: textMaxLength }}
            helperText={null}
            sx={(theme) => ({
              '& .MuiOutlinedInput-root': {
                borderRadius: theme.shape.borderRadius,
                bgcolor: 'white',
                '& fieldset': { borderRadius: theme.shape.borderRadius },
              },
            })}
            aria-label="Other"
          />
        </Box>
      )}
    </Box>
  );
};

export default SurveyOptions;

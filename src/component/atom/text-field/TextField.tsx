import { TextField as BaseTextField, Box, Typography, InputAdornment, FormControl } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';


interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value: propValue,
  onChange
}) => {

  const theme = useCoreTheme() as CoreTheme;
  const [internalValue, setInternalValue] = useState(propValue || '');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (propValue !== undefined) {
      setInternalValue(propValue);
    }
  }, [propValue]);

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) return null;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Incorrect email id entered!';
    }
    return null;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);

    const errorMessage = validateEmail(newValue);
    setValidationError(errorMessage);
    
    if (newValue.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailRegex.test(newValue) && !errorMessage);
    } else {
      setIsValid(false);
    }

    onChange?.(event);
  };

  const hasError = validationError !== null;

  return (
    
    <Box sx={{ display: 'inline-block' }}>
      {label && (
        <Typography
          sx={{
            display: 'block',
            color: '#1E1E1E',
            fontFamily: 'Outfit',
            fontSize: theme.spacing(5.5),
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      )}
      <FormControl fullWidth>
      <BaseTextField
        type="email"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        error={hasError}
        helperText={validationError}
        variant="outlined"
        InputProps={{
          endAdornment: isValid ? (
            <InputAdornment position="end">
              <Box
                component="img"
                src="https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Vector-4.jpg"
                alt="Valid email"
                sx={{
                  width: theme.spacing(4.875),
                  height: theme.spacing(4.875),
                }}
              />
            </InputAdornment>
          ) : null,
        }}
        sx={{
          minWidth: theme.spacing(117.25),
          '& .MuiOutlinedInput-root': {
            borderRadius: theme.spacing(4),
            '& fieldset': {
              borderColor: hasError ? '#DA1414' : '#DCDCD0',
              borderRadius: theme.spacing(4),
            },
            '&:hover fieldset': {
              borderColor: hasError ? '#DA1414' : '#DCDCD0',
            },
            '&.Mui-focused fieldset': {
              borderColor: hasError ? '#DA1414' : '#DCDCD0',
            },
            '& input': {
              color: '#1E1E1E',
              fontFamily: 'Outfit',
              fontSize: theme.spacing(5.5),
              fontWeight: 500,
            },
          },
          '& .MuiFormHelperText-root': {
            color: '#DA1414',
            fontFamily: 'Outfit',
            fontSize: theme.spacing(4.25),
          },
        }}
      />
      </FormControl>
    </Box>
  );
};

export default TextField;

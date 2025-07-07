import { TextField as BaseTextField } from '@mui/material';
import { ComponentProps, FC, useState, useEffect } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

type PaletteColorKeys = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
type Variant = 'filled' | 'outlined' | 'standard';
type Size = 'medium' | 'small';
type Margin = 'dense' | 'none' | 'normal';

export interface ITextFieldProps {
  autoComplete?: string;
  autoFocus?: boolean;
  color?: PaletteColorKeys | string;
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  id?: string;
  label?: React.ReactNode;
  margin?: Margin;
  maxRows?: number | string;
  minRows?: number | string;
  multiline?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number | string;
  select?: boolean;
  size?: Size;
  type?: string;
  value?: any;
  variant?: Variant;
  validate?: {
    type?: 'email' | 'password' | 'text';
    sameAs?: string;
    customValidator?: (value: string) => string | null;
    requiredMessage?: string;
    emailMessage?: string;
    matchMessage?: string;
  };
  FormHelperTextProps?: object;
  InputLabelProps?: object;
  inputProps?: object;
  InputProps?: object;
  inputRef?: React.Ref<any>;
  SelectProps?: object;
  slotProps?: {
    formHelperText?: any;
    htmlInput?: any;
    input?: any;
    inputLabel?: any;
    select?: any;
  };
  slots?: {
    formHelperText?: React.ElementType;
    htmlInput?: React.ElementType;
    input?: React.ElementType;
    inputLabel?: React.ElementType;
    root?: React.ElementType;
    select?: React.ElementType;
  };
}

export type TextFieldProps = ComponentProps<typeof BaseTextField> & ITextFieldProps;

const TextField: FC<TextFieldProps> = ({
  autoComplete,
  autoFocus = false,
  color = 'primary',
  defaultValue,
  disabled = false,
  error: propError = false,
  fullWidth = false,
  helperText,
  id,
  label,
  margin = 'none',
  maxRows,
  minRows,
  multiline = false,
  name,
  onChange,
  placeholder,
  required = false,
  rows,
  select = false,
  size = 'medium',
  type,
  value: propValue,
  variant = 'outlined',
  validate,
  inputRef,
  slotProps,
  slots,
  sx,
  ...props
}) => {
  const { palette } = useCoreTheme() as CoreTheme;
  const [internalValue, setInternalValue] = useState(propValue ?? defaultValue ?? '');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (propValue !== undefined) {
      setInternalValue(propValue);
    }
  }, [propValue]);

  const getColor = () => {
    const paletteColors: PaletteColorKeys[] = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];
    if (paletteColors.includes(color as PaletteColorKeys)) {
      return palette[color as PaletteColorKeys]?.main;
    }
    return color;
  };

  const validateInput = (inputValue: string): string | null => {
    if (!validate) return null;

    if (required && !inputValue.trim()) {
      return validate.requiredMessage ?? 'This field is required';
    }

    if (validate.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        return validate.emailMessage ?? 'Incorrect email id entered!';
      }
    }

    if (validate.sameAs && inputValue !== validate.sameAs) {
      return validate.matchMessage ?? 'Values do not match';
    }

    if (validate.customValidator) {
      return validate.customValidator(inputValue);
    }

    return null;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);

    if (validate) {
      const errorMessage = validateInput(newValue);
      setValidationError(errorMessage);
    }

    onChange?.(event);
  };

  const error = validationError !== null || propError;
  const displayHelperText = validationError ?? helperText;

  const sxValue = SxOverride(
    {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: error ? palette.error.main : getColor(),
        },
        '&:hover fieldset': {
          borderColor: error ? palette.error.main : getColor(),
        },
        '&.Mui-focused fieldset': {
          borderColor: error ? palette.error.main : getColor(),
        },
      },
      '& .MuiInputLabel-root': {
        color: error ? palette.error.main : getColor(),
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: error ? palette.error.main : getColor(),
      },
      '& .MuiFormHelperText-root': {
        color: error ? palette.error.main : undefined,
      },
    },
    sx
  );

  return (
    <BaseTextField
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      color={color as PaletteColorKeys}
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      helperText={displayHelperText}
      id={id}
      label={label}
      margin={margin}
      maxRows={maxRows}
      minRows={minRows}
      multiline={multiline}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      select={select}
      size={size}
      type={type}
      value={internalValue}
      variant={variant}
      inputRef={inputRef}
      slotProps={slotProps}
      slots={slots}
      sx={sxValue}
      {...props}
    />
  );
};

export default TextField;
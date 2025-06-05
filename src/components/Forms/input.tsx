import { FormControl, InputAdornment, TextField } from '@mui/material';

interface customInputProps {
  title: string;
  variant?: 'standard' | 'filled' | 'outlined';
  placeholder?: string;
  value: any;
  onChange?: any;
  required?: boolean;
  error?: any;
  disabled?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
  style?: {};
  hideError?: boolean;
  sx?: {};
  leftIcon?: any;
  rightIcon?: any;
  margin?: any;
}

const CustomInput = ({
  title,
  value,
  onChange,
  error = '',
  variant = 'standard',
  placeholder = '',
  required = false,
  disabled = false,
  type = 'text',
  multiline = false,
  rows = 1,
  style = {},
  hideError = false,
  sx = {},
  leftIcon = null,
  rightIcon = null,
  margin = 'normal',
}: customInputProps) => {
  return (
    <FormControl className="w-100" style={style}>
      <TextField
        id={title}
        label={title}
        variant={variant}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => {
          if (type == 'number') {
            if (/[0-9]/.test(e.target.value) || e.target.value == '') {
              onChange(e.target.value);
            }
          } else {
            onChange(e.target.value);
          }
        }}
        error={error.length > 0}
        disabled={disabled}
        type={type}        
        className="label-large"
        sx={{
          borderBottom: variant === 'outlined' ? 'none' : '1px solid #C6C6C9',
          ...sx
        }}
        margin={margin}
        multiline={multiline}
        rows={rows}
        InputProps={{
          startAdornment: leftIcon && (
            <InputAdornment position="start">{leftIcon}</InputAdornment>
          ),
          endAdornment: rightIcon && (
            <InputAdornment position="end">{rightIcon}</InputAdornment>
          )
        }}
      />
      {!hideError && (
        <>
          {error.length > 0 ? (
            <label
              className="label-medium"
              style={{ color: 'red', marginTop: 1 }}
            >
              {error}
            </label>
          ) : (
            <label className="label-medium" style={{ marginTop: 1 }}>
              &nbsp;
            </label>
          )}
        </>
      )}
    </FormControl>
  );
};
export default CustomInput;

import { FormControl, TextField } from '@mui/material';

interface customInputProps {
  title?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  placeholder?: string;
  value?: any;
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
  margin?: any;
  className?: string;
}

const CustomInput = ({
  title='',
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
  margin = 'normal',
  className
}: customInputProps) => {
  return (
    <FormControl className={`w-100 ${className}`} style={style}>
      <TextField
        id={title}
        label={title}
        variant={variant}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => {
          if (type === 'number') {
            if (/[0-9]/.test(e.target.value) || e.target.value === '') {
              onChange(e.target.value);
            }
          } else {
            onChange(e.target.value);
          }
        }}
        className='inputForm'
        error={error.length > 0}
        disabled={disabled}
        type={type}        
        sx={{
          borderBottom: variant === 'outlined' ? 'none' : '1px solid #C6C6C9',
          ...sx
        }}
        margin={margin}
        multiline={multiline}
        rows={rows}
      />
      {!hideError && (
        <>
          {error.length > 0 ? (
            <label
              className="text-sm"
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

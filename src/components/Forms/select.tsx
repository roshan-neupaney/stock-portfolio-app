import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface customInputProps {
  title: string;
  value: any;
  onChange?: any;
  onLabelChange?: any;
  data?: {id: string, label: string}[];
  placeholder?: string;
  error?: any;
  multiple?: boolean;
  marginTop?: number;
  marginBottom?: number;
  hideError?: boolean;
  style?: {};
  variant?: 'standard' | 'filled' | 'outlined';
}

const CustomSelect = ({
  title,
  value,
  onChange,
  onLabelChange,
  data = [],
  placeholder,
  error = '',
  multiple = false,
  marginTop = 30,
  marginBottom = 0,
  hideError = false,
  style = {},
  variant = 'standard'
}: customInputProps) => {
  return (
    <FormControl
      fullWidth
      style={{ marginTop: marginTop, marginBottom: marginBottom }}
    >
      <InputLabel
        id={`select-label-${title}`}
        shrink
        style={{
          fontSize: '14px',
          color: error ? 'red' : '#45474A',
          textTransform: 'uppercase',
          lineHeight: '16px',
          fontWeight: 500,
          letterSpacing: '0.75px',
          marginLeft: -10
        }}
      >
        {title}
      </InputLabel>
      <Select
        labelId={`select-label-${title}`}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (onLabelChange) {
            let name = data.filter((_data) => {
              if (_data.id == e.target.value) return _data;
            });
            onLabelChange(name[0]?.label);
          }
        }}
        variant={variant}
        sx={{
          borderBottom: '1px solid #C6C6C9',
          ...style
        }}
        displayEmpty
        error={error.length > 0}
        multiple={multiple}
        // placeholder={placeholder}
      >
        <MenuItem key={`${title}-$placeholder`} value="" disabled={!value}>
          { value ? <em>None</em> :placeholder}
        </MenuItem>
        {data.map((_val, index) => {
          return (
            <MenuItem key={`${title}-${index}`} value={_val.id} id={_val.label}>
              {_val.label}
            </MenuItem>
          );
        })}
      </Select>
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

export default CustomSelect;

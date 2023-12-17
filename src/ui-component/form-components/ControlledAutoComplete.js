import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

const ControlledAutoComplete = forwardRef(
  (
    {
      options = [],
      getOptionLabel,
      label,
      value = null,
      isOptionEqualToValue,
      onChange,
      required = false,
    },
    ref
  ) => {
    return (
      <Autocomplete
        value={value}
        fullWidth
        size="small"
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label={label} required={required} />
        )}
      />
    );
  }
);
export default ControlledAutoComplete;

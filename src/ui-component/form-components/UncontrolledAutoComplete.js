import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

const UncontrolledAutoComplete = forwardRef(
  (
    { defaultValue = null, options = [], label, register, required = false },
    ref
  ) => {
    return (
      <Autocomplete
        defaultValue={defaultValue}
        fullWidth
        size="small"
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            {...register}
            required={required}
          />
        )}
      />
    );
  }
);

export default UncontrolledAutoComplete;

import { Autocomplete, Grid, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { paymentMethods } from 'assets/data';
import React from 'react';
import { Controller, useWatch } from 'react-hook-form';
import moment from 'moment';

const ElectricBillField = ({ field, index, control, register, mb }) => {
  const previousReading = useWatch({
    control,
    name: `billDetails[${index}].previousReading`,
  });

  const meterReading = useWatch({
    control,
    name: `billDetails[${index}].meterReading`,
  });

  const unit = Math.max((meterReading || 0) - (previousReading || 0), 0);

  return (
    <Grid container columnSpacing={1} rowSpacing={2} sx={{ mb: mb }}>
      <Grid item xs={1.9}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Controller
            name={`billDetails[${index}].date`}
            control={control}
            defaultValue={field?.date ? moment(field.date) : null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label="Date"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YY"
                value={value || null}
                onChange={(newValue) => onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                    error={!!error}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      {/* Meter Selection */}
      <Grid item xs={2.4}>
        <Controller
          name={`billDetails[${index}].meter`}
          control={control}
          rules={{ required: true }}
          render={({ field: meterField }) => (
            <Autocomplete
              value={meterField.value || field}
              size="small"
              disableClearable
              options={[field]}
              fullWidth
              getOptionLabel={(option) =>
                `${option.smsAccount}, ${option.label}`
              }
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Meter"
                  required
                  InputProps={{ readOnly: true }}
                />
              )}
              onChange={(_, data) => meterField.onChange(data)}
            />
          )}
        />
      </Grid>

      {/* Previous Reading */}
      <Grid item xs={1.6}>
        <TextField
          fullWidth
          label="Previous Reading"
          size="small"
          type="number"
          required
          InputProps={{ inputProps: { min: 1 } }}
          {...register(`billDetails[${index}].previousReading`, {
            valueAsNumber: true,
            required: true,
          })}
        />
      </Grid>

      {/* Meter Reading */}
      <Grid item xs={1.6}>
        <TextField
          fullWidth
          label="New Reading"
          size="small"
          type="number"
          required
          InputProps={{ inputProps: { min: 1 } }}
          {...register(`billDetails[${index}].meterReading`, {
            valueAsNumber: true,
            required: true,
          })}
        />
      </Grid>

      {/* Unit (Auto Calculated) */}
      <Grid item xs={1.3}>
        <TextField
          fullWidth
          value={unit}
          label="Unit"
          size="small"
          type="number"
          required
          InputProps={{ inputProps: { min: 0, readOnly: true } }}
        />
      </Grid>

      {/* Total Bill */}
      <Grid item xs={1.6}>
        <TextField
          fullWidth
          label="Total Bill"
          size="small"
          type="number"
          required
          InputProps={{ inputProps: { min: 1 } }}
          {...register(`billDetails[${index}].amount`, {
            valueAsNumber: true,
            required: true,
          })}
        />
      </Grid>

      {/* Paid By */}
      <Grid item xs={1.6}>
        <Controller
          name={`billDetails[${index}].paidBy`}
          control={control}
          rules={{ required: true }}
          render={({ field: paidField }) => (
            <Autocomplete
              value={paidField.value || null}
              options={paymentMethods}
              size="small"
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Paid By" required />
              )}
              onChange={(_, data) => paidField.onChange(data)}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ElectricBillField;

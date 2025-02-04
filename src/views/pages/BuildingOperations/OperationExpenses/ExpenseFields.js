import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import moment from 'moment';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';

const ExpenseFields = ({
  field,
  index,
  control,
  register,
  allPaymentMethods = [],
  paymentMethodLoading,
  handleRemove,
}) => {
  return (
    <Grid container columnSpacing={1} rowSpacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} md={2.5}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Controller
            name={`buildingPayments[${index}].date`}
            control={control}
            defaultValue={field?.date ? moment(field.date) : moment()}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Date"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={(date) => onChange(date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={2.5}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              loading={paymentMethodLoading}
              defaultValue={field?.paymentMethod || null}
              size="small"
              options={allPaymentMethods}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Payment Method"
                  variant="outlined"
                  required
                />
              )}
              onChange={(e, data) => {
                onChange(data);
                return data;
              }}
            />
          )}
          name={`buildingPayments[${index}].paymentMethod`}
          control={control}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Details"
          name={`buildingPayments[${index}].paymentDetails`}
          {...register(`buildingPayments[${index}].paymentDetails`)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            required
            size="small"
            type="number"
            label="Paid Amount"
            sx={{ mr: 0.5 }}
            InputProps={{ inputProps: { min: 0 } }}
            name={`buildingPayments[${index}].amount`}
            {...register(`buildingPayments[${index}].amount`, {
              valueAsNumber: true,
              required: true,
            })}
          />
          <Tooltip title="Remove Row">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleRemove(index)}
            >
              <IconSquareRoundedXFilled size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ExpenseFields;

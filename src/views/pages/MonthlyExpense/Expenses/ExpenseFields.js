import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { Controller } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetAllMonthlyExpenseHeadsQuery } from 'store/api/monthlyExpenseHead/monthlyExpenseHeadApi';
import { useGetPaymentSourcesQuery } from 'store/api/paymentSource/paymentSourceApi';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

const ExpenseFields = ({
  field,
  index,
  control,
  handleRemove,
  register,
  setExpenseHeadOpen,
}) => {
  // library
  const { data: expenseHeadData, isLoading: expenseHeadLoading } =
    useGetAllMonthlyExpenseHeadsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseHeads = expenseHeadData?.monthlyExpenseHeads || [];

  const { data: paymentSourceData, isLoading: paymentSourceLoading } =
    useGetPaymentSourcesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allPaymentSources = paymentSourceData?.paymentSources || [];

  // end library
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ minWidth: 180, px: '3px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                size="small"
                loading={expenseHeadLoading}
                options={allExpenseHeads}
                fullWidth
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Expense Head"
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
            name={`expenses[${index}].monthlyExpenseHead`}
            control={control}
          />
          <Tooltip title="Add Head">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ minWidth: 0, ml: 0.5 }}
              onClick={() => setExpenseHeadOpen(true)}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </Box>
      </StyledTableCell>
      <StyledTableCell sx={{ px: '3px !important' }}>
        <TextField
          fullWidth
          label="Expense Details"
          size="small"
          name={`expenses[${index}].expenseDetails`}
          {...register(`expenses[${index}].expenseDetails`)}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: 120, px: '3px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              size="small"
              loading={paymentSourceLoading}
              options={allPaymentSources}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Payment Src"
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
          name={`expenses[${index}].paymentSource`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 120, px: '3px !important' }}>
        <TextField
          fullWidth
          size="small"
          required
          placeholder="Amount"
          type="number"
          sx={{
            '& input': { textAlign: 'right' },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
              {
                WebkitAppearance: 'none',
                margin: 0,
              },
          }}
          InputProps={{ inputProps: { min: 1 } }}
          name={`expenses[${index}].amount`}
          {...register(`expenses[${index}].amount`, {
            min: 1,
            required: true,
            valueAsNumber: true,
          })}
        />
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ px: '3px !important' }}>
        <Tooltip title="Remove Row">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleRemove(index)}
          >
            <IconSquareRoundedXFilled size={20} />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ExpenseFields;

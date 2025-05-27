import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetJewelleryTypesQuery } from 'store/api/jewelleryType/jewelleryTypeApi';
import { useGetCaratsQuery } from 'store/api/carat/caratApi';

const JewelleryFields = ({ field, index, control, handleRemove, register }) => {
  // library
  const { data: jewelleryTypeData, isLoading: jewelleryTypeLoading } =
    useGetJewelleryTypesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allJewelleryTypes = jewelleryTypeData?.jewelleryTypes || [];

  const { data: caratData, isLoading: caratLoading } = useGetCaratsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allCarats = caratData?.carats || [];

  // end library
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ minWidth: 160, px: '3px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              size="small"
              loading={jewelleryTypeLoading}
              options={allJewelleryTypes}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Jewellery type"
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
          name={`jewelleries[${index}].jewelleryType`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ px: '3px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              size="small"
              loading={caratLoading}
              options={allCarats}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Carat" variant="outlined" />
              )}
              onChange={(e, data) => {
                onChange(data);
                return data;
              }}
            />
          )}
          name={`jewelleries[${index}].carat`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 150, px: '3px !important' }}>
        <TextField
          fullWidth
          label="Remarks"
          size="small"
          name={`jewelleries[${index}].remarks`}
          {...register(`jewelleries[${index}].remarks`)}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 100, px: '3px !important' }}>
        <TextField
          fullWidth
          size="small"
          required
          placeholder="Weight (gm)"
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
          InputProps={{ inputProps: { min: 0, step: '0.01' } }}
          name={`jewelleries[${index}].weight`}
          {...register(`jewelleries[${index}].weight`, {
            min: 0,
            required: true,
            valueAsNumber: true,
          })}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 100, px: '3px !important' }}>
        <TextField
          fullWidth
          size="small"
          required
          placeholder="Price"
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
          InputProps={{ inputProps: { min: 0 } }}
          name={`jewelleries[${index}].price`}
          {...register(`jewelleries[${index}].price`, {
            min: 0,
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

export default JewelleryFields;

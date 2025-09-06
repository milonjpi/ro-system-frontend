import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetJewelleryTypesQuery } from 'store/api/jewelleryType/jewelleryTypeApi';
import { useGetCaratsQuery } from 'store/api/carat/caratApi';
import { useState } from 'react';

const JewelleryFields = ({
  field,
  index,
  control,
  handleRemove,
  register,
  setValue,
  category,
}) => {
  const [weight, setWeight] = useState(field?.weight);
  const [unitPrice, setUnitPrice] = useState(field?.unitPrice);
  const [makingCharge, setMakingCharge] = useState(field?.makingCharge);
  const [vat, setVat] = useState(field?.vat);
  const [price, setPrice] = useState(field?.price);

  // library
  const { data: jewelleryTypeData, isLoading: jewelleryTypeLoading } =
    useGetJewelleryTypesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allJewelleryTypes = jewelleryTypeData?.jewelleryTypes || [];

  const { data: caratData, isLoading: caratLoading } = useGetCaratsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc', category: category },
    { refetchOnMountOrArgChange: true }
  );

  const allCarats = caratData?.carats || [];

  // end library
  return (
    <StyledTableRow>
      <StyledTableCell
        sx={{ minWidth: 90, maxWidth: 100, px: '3px !important' }}
      >
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
      <StyledTableCell
        sx={{ px: '3px !important', minWidth: 90, maxWidth: 100 }}
      >
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
                <TextField
                  {...params}
                  label="KDM"
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
          name={`jewelleries[${index}].carat`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell
        sx={{ minWidth: 100, maxWidth: 110, px: '3px !important' }}
      >
        <TextField
          fullWidth
          label="Remarks"
          size="small"
          name={`jewelleries[${index}].remarks`}
          {...register(`jewelleries[${index}].remarks`)}
        />
      </StyledTableCell>
      <StyledTableCell
        sx={{ minWidth: 70, maxWidth: 80, px: '3px !important' }}
      >
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
          InputProps={{ inputProps: { min: 0, step: '0.001' } }}
          name={`jewelleries[${index}].weight`}
          value={weight}
          {...register(`jewelleries[${index}].weight`, {
            min: 0,
            required: true,
            valueAsNumber: true,
            onChange: (e) => {
              const newValue = Number(e.target.value) || 0;
              setWeight(newValue);
              setValue(
                `jewelleries[${index}].price`,
                newValue * (Number(unitPrice) || 0) +
                  (Number(makingCharge) || 0) +
                  (Number(vat) || 0)
              );
              setPrice(
                newValue * (Number(unitPrice) || 0) +
                  (Number(makingCharge) || 0) +
                  (Number(vat) || 0)
              );
            },
          })}
        />
      </StyledTableCell>

      <StyledTableCell
        sx={{ minWidth: 70, maxWidth: 80, px: '3px !important' }}
      >
        <TextField
          fullWidth
          size="small"
          required
          placeholder="Unit Price"
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
          name={`jewelleries[${index}].unitPrice`}
          value={unitPrice}
          {...register(`jewelleries[${index}].unitPrice`, {
            min: 0,
            required: true,
            valueAsNumber: true,
            onChange: (e) => {
              const newValue = Number(e.target.value) || 0;
              setUnitPrice(newValue);
              setValue(
                `jewelleries[${index}].price`,
                (Number(weight) || 0) * newValue +
                  (Number(makingCharge) || 0) +
                  (Number(vat) || 0)
              );
              setPrice(
                (Number(weight) || 0) * newValue +
                  (Number(makingCharge) || 0) +
                  (Number(vat) || 0)
              );
            },
          })}
        />
      </StyledTableCell>
      <StyledTableCell
        sx={{ minWidth: 70, maxWidth: 80, px: '3px !important' }}
      >
        <TextField
          fullWidth
          size="small"
          required
          placeholder="Making Charge"
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
          name={`jewelleries[${index}].makingCharge`}
          value={makingCharge}
          {...register(`jewelleries[${index}].makingCharge`, {
            min: 0,
            required: true,
            valueAsNumber: true,
            onChange: (e) => {
              const newValue = Number(e.target.value) || 0;
              setMakingCharge(newValue);
              setValue(
                `jewelleries[${index}].price`,
                (Number(weight) || 0) * (Number(unitPrice) || 0) +
                  newValue +
                  (Number(vat) || 0)
              );
              setPrice(
                (Number(weight) || 0) * (Number(unitPrice) || 0) +
                  newValue +
                  (Number(vat) || 0)
              );
            },
          })}
        />
      </StyledTableCell>
      <StyledTableCell
        sx={{ minWidth: 70, maxWidth: 80, px: '3px !important' }}
      >
        <TextField
          fullWidth
          size="small"
          required
          placeholder="VAT"
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
          name={`jewelleries[${index}].vat`}
          value={vat}
          {...register(`jewelleries[${index}].vat`, {
            min: 0,
            required: true,
            valueAsNumber: true,
            onChange: (e) => {
              const newValue = Number(e.target.value) || 0;
              setVat(newValue);
              setValue(
                `jewelleries[${index}].price`,
                (Number(weight) || 0) * (Number(unitPrice) || 0) +
                  (Number(makingCharge) || 0) +
                  newValue
              );
              setPrice(
                (Number(weight) || 0) * (Number(unitPrice) || 0) +
                  (Number(makingCharge) || 0) +
                  newValue
              );
            },
          })}
        />
      </StyledTableCell>
      <StyledTableCell
        sx={{ minWidth: 70, maxWidth: 80, px: '3px !important' }}
      >
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
          value={price}
          {...register(`jewelleries[${index}].price`, {
            min: 0,
            required: true,
            valueAsNumber: true,
            onChange: (e) => {
              const newValue = Number(e.target.value) || 0;
              setPrice(newValue);
            },
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

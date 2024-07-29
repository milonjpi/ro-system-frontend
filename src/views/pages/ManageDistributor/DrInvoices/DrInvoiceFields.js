import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller, useWatch } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const DrInvoiceFields = ({
  field,
  index,
  control,
  handleRemove,
  register,
  allProducts,
}) => {
  const [product, setProduct] = useState(field?.product || null);
  const watchValue = useWatch({ control, name: 'products' });
  const unitPrice = watchValue[index].product?.price || 0;
  const totalValue =
    (watchValue[index].quantity || 0) * (watchValue[index].product?.price || 0);

  return (
    <StyledTableRow>
      <StyledTableCell sx={{ minWidth: 300 }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={product}
              size="small"
              options={allProducts}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a Product"
                  variant="outlined"
                  required
                />
              )}
              onChange={(e, data) => {
                onChange(data);
                setProduct(data);
                return data;
              }}
            />
          )}
          name={`products[${index}].product`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell>
        <TextField
          fullWidth
          size="small"
          required
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          name={`products[${index}].quantity`}
          {...register(`products[${index}].quantity`, {
            min: 1,
            required: true,
            valueAsNumber: true,
          })}
        />
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ minWidth: 70 }}>
        {unitPrice}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ minWidth: 100 }}>
        {totalValue}
      </StyledTableCell>
      <StyledTableCell align="center">
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

export default DrInvoiceFields;

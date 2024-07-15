import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetFosProductsQuery } from 'store/api/fosProduct/fosProductApi';

const FocProductFields = ({
  field,
  index,
  control,
  handleRemove,
  register,
}) => {
  const [product, setProduct] = useState(field?.fosProduct || null);
  // library
  const { data: productData } = useGetFosProductsQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );

  const allProducts = productData?.fosProducts || [];
  // end library
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ minWidth: 200 }}>
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
          name={`products[${index}].fosProduct`}
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

export default FocProductFields;

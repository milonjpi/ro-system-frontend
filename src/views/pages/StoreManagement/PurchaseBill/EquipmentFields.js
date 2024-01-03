import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller, useWatch } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetEquipmentsQuery } from 'store/api/equipment/equipmentApi';

const EquipmentFields = ({ field, index, control, handleRemove, register }) => {
  const watchValue = useWatch({ control, name: 'equipments' });
  const totalValue =
    (watchValue[index].quantity || 0) * (watchValue[index]?.unitPrice || 0);

  return (
    <StyledTableRow>
      <StyledTableCell sx={{ minWidth: 300 }}>
        <EquipmentSelect index={index} control={control} field={field} />
      </StyledTableCell>
      <StyledTableCell>
        <TextField
          fullWidth
          size="small"
          required
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          inputProps={{
            step: '0.01',
          }}
          name={`equipments[${index}].quantity`}
          {...register(`equipments[${index}].quantity`, {
            min: 1,
            required: true,
            valueAsNumber: true,
          })}
        />
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ minWidth: 70 }}>
        <TextField
          fullWidth
          size="small"
          label="Unit Price"
          type="number"
          inputProps={{
            step: '0.01',
          }}
          {...register(`equipments[${index}].unitPrice`, {
            required: true,
            valueAsNumber: true,
          })}
        />
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

export default EquipmentFields;

const EquipmentSelect = ({ control, index, field }) => {
  const [equipment, setEquipment] = useState(field?.equipment || null);
  // library
  const { data: equipmentData } = useGetEquipmentsQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc', isAsset: false },
    { refetchOnMountOrArgChange: true }
  );

  const allEquipments = equipmentData?.equipments || [];
  // end library
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          value={equipment}
          size="small"
          options={allEquipments}
          fullWidth
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(item, value) => item.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a Equipment"
              variant="outlined"
              required
            />
          )}
          onChange={(e, data) => {
            onChange(data);
            setEquipment(data);
            return data;
          }}
        />
      )}
      name={`equipments[${index}].equipment`}
      control={control}
    />
  );
};

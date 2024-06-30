import TextField from '@mui/material/TextField';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const DistInvoicesRow = ({ index, register, data }) => {
  const dueAmount = data?.amount - data?.paidAmount;

  return (
    <StyledTableRow>
      <StyledTableCell>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.invoiceNo}</StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell align="right">{data?.paidAmount}</StyledTableCell>
      <StyledTableCell align="right">{dueAmount}</StyledTableCell>
      <StyledTableCell align="right" sx={{ width: 120 }}>
        <TextField
          defaultValue={0}
          fullWidth
          required
          size="small"
          label="Amount"
          type="number"
          inputProps={{ min: 0, max: dueAmount }}
          {...register(`invoices[${index}].receiveAmount`, {
            required: true,
            valueAsNumber: true,
          })}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default DistInvoicesRow;

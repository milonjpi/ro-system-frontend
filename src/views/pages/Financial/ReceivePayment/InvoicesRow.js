import TextField from '@mui/material/TextField';
import moment from 'moment';
import { useWatch } from 'react-hook-form';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const InvoicesRow = ({ index, register, control, amount, setAmount, data }) => {
  const dueAmount = data?.amount - data?.paidAmount;
  // calculation
  const watchValue = useWatch({ control });
  const changeMainAmount = () => {
    const changedAmount = Object.values(watchValue)?.reduce(
      (acc, el) => acc + el,
      0
    );
    if (changedAmount > Number(amount)) {
      setAmount(changedAmount);
    }
  };
  return (
    <StyledTableRow>
      <StyledTableCell>
        {moment(data?.invoiceDate).format('DD/MM/YYYY')}
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
          InputProps={{ inputProps: { min: 0, max: dueAmount } }}
          {...register(`invoices[${index}].paidAmount`, {
            required: true,
            valueAsNumber: true,
            onChange: changeMainAmount,
          })}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default InvoicesRow;

import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';

const PrintElectricBillRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.date ? moment(data?.date).format('DD/MM/YYYY') : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder sx={{ minWidth: 150 }}>
        {data?.meter?.label +
          (data?.meter?.smsAccount ? ', ' + data?.meter?.smsAccount : '')}
        <br />
        {data?.meter?.location || 'N/A'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.year}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.month}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.meterReading}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.unit || 0}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.netBill}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.serviceCharge || 0}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.paidBy}</StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PrintElectricBillRow;

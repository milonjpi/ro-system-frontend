import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const DonationReportRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.customerId}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.customerName}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.customerNameBn}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.mobile ? data?.mobile : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.address ? data?.address : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.quantity}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default DonationReportRow;

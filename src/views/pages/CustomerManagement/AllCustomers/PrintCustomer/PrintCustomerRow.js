import { StyledTableCellWithBorder } from 'ui-component/table-component';
import TableRow from '@mui/material/TableRow';

const PrintCustomerRow = ({ sn, data }) => {
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
        {data?.mobile || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.address || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.group?.label || 'n/a'}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PrintCustomerRow;

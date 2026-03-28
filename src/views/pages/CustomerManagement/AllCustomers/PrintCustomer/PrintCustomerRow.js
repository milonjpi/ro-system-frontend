import { StyledTableCellWithBorder } from 'ui-component/table-component';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import ShowStatus from 'ui-component/ShowStatus';

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
        {moment(data?.createdAt).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center">
        <ShowStatus status={data?.isActive ? 'Active' : 'Inactive'} />
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PrintCustomerRow;

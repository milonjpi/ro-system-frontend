import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const AdvanceReportRow = ({ sn, data }) => {

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
      <StyledTableCellWithBorder>
        {data?.lastSaleDate
          ? moment(data?.lastSaleDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.lastPaymentDate
          ? moment(data?.lastPaymentDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.differentAmount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default AdvanceReportRow;

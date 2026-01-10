import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import moment from 'moment';

const PrintExpenseRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        <span
          style={{
            textTransform: 'uppercase',
            display: 'block',
            lineHeight: 1,
          }}
        >
          {data?.expenseArea?.label}
        </span>
        {data?.vehicle ? (
          <span style={{ fontSize: 9, lineHeight: 1 }}>
            {data?.vehicle?.label}
          </span>
        ) : null}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.month + ' - ' + data?.year}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>

      <StyledTableCellWithBorder>
        {data?.monthlyExpenseHead?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.expenseDetail?.label || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder sx={{ fontSize: '9px !important' }}>
        {data?.expenseDetails || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.paymentSource?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PrintExpenseRow;

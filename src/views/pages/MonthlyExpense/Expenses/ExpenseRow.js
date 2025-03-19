import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Button, TableRow } from '@mui/material';
import moment from 'moment';
import UpdateExpense from './UpdateExpense';

const ExpenseRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
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
        {data?.expenseDetails || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.paymentSource?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center">
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setOpen(true)}
        >
          <IconEdit size={14} />
        </Button>
        {/* popup item */}
        <UpdateExpense
          preData={data}
          open={open}
          handleClose={() => setOpen(false)}
        />
        {/* end popup item */}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ExpenseRow;

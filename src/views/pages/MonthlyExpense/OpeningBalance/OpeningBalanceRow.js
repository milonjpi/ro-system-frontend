import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Button } from '@mui/material';
import UpdateOpeningBalance from './UpdateOpeningBalance';

const OpeningBalanceRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.year}</StyledTableCell>
      <StyledTableCell>{data?.month}</StyledTableCell>
      <StyledTableCell>{data?.paymentSource?.label}</StyledTableCell>
      <StyledTableCell>{data?.remarks || 'n/a'}</StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell align="center">
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
        <UpdateOpeningBalance
          preData={data}
          open={open}
          handleClose={() => setOpen(false)}
        />
        {/* end popup item */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OpeningBalanceRow;

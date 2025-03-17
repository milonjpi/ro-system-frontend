import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Button } from '@mui/material';
import UpdatePaymentSource from './UpdatePaymentSource';

const PaymentSourceRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.label}</StyledTableCell>
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
        <UpdatePaymentSource
          preData={data}
          open={open}
          handleClose={() => setOpen(false)}
        />
        {/* end popup item */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PaymentSourceRow;

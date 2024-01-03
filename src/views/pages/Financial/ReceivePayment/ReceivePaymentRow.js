import IconButton from '@mui/material/IconButton';
import { IconCategory2 } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import ReceiveVoucherView from '../VoucherView/ReceiveVoucherView';

const ReceivePaymentRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.voucherNo}</StyledTableCell>
      <StyledTableCell>{data?.customer?.customerName}</StyledTableCell>
      <StyledTableCell>{data?.customer?.customerNameBn}</StyledTableCell>
      <StyledTableCell>{data?.customer?.address || 'n/a'}</StyledTableCell>
      <StyledTableCell>
        {data?.narration ? data?.narration : 'n/a'}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color="primary" size="small" onClick={() => setOpen(true)}>
          <IconCategory2 size={18} />
        </IconButton>

        {/* popup items */}
        <ReceiveVoucherView
          open={open}
          handleClose={() => setOpen(false)}
          data={data}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ReceivePaymentRow;

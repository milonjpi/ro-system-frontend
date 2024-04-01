import IconButton from '@mui/material/IconButton';
import { IconCategory2 } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import PaidVoucherView from '../VoucherView/PaidVoucherView';
import { totalSum } from 'views/utilities/NeedyFunction';

const MakePaymentRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.voucherNo}</StyledTableCell>
      <StyledTableCell>{data?.vendor?.vendorName}</StyledTableCell>
      <StyledTableCell>{data?.vendor?.vendorNameBn}</StyledTableCell>
      <StyledTableCell>{data?.vendor?.address}</StyledTableCell>
      <StyledTableCell>
        {data?.narration ? data?.narration : 'n/a'}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton
          color="primary"
          size="small"
          onClick={() => setOpen(true)}
          disabled={
            data?.amount > totalSum(data?.voucherDetails, 'receiveAmount')
          }
        >
          <IconCategory2 size={18} />
        </IconButton>

        {/* popup items */}
        <PaidVoucherView
          open={open}
          handleClose={() => setOpen(false)}
          data={data}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default MakePaymentRow;

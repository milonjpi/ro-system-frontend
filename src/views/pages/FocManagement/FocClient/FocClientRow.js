import IconButton from '@mui/material/IconButton';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import moment from 'moment';
import UpdateFocClient from './UpdateFocClient';

const FocClientRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.customerId}</StyledTableCell>
      <StyledTableCell>{data?.customerName}</StyledTableCell>
      <StyledTableCell>{data?.customerNameBn}</StyledTableCell>
      <StyledTableCell>{data?.mobile || 'n/a'}</StyledTableCell>
      <StyledTableCell>{data?.address || 'n/a'}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.createdAt).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color="primary" size="small" onClick={() => setOpen(true)}>
          <IconEdit color="#468B97" size={18} />
        </IconButton>
        <UpdateFocClient
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default FocClientRow;

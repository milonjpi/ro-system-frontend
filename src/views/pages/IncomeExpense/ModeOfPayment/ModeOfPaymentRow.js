import IconButton from '@mui/material/IconButton';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import UpdateModeOfPayment from './UpdateModeOfPayment';

const ModeOfPaymentRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.label}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color="primary" size="small" onClick={() => setOpen(true)}>
          <IconEdit color="#468B97" size={18} />
        </IconButton>

        <UpdateModeOfPayment
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ModeOfPaymentRow;

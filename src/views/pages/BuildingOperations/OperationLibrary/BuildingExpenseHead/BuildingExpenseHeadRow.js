import Button from '@mui/material/Button';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import UpdateBuildingExpenseHead from './UpdateBuildingExpenseHead';

const BuildingExpenseHeadRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.label}</StyledTableCell>

      <StyledTableCell align="center">
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setOpen(true)}
        >
          <IconEdit size={14} />
        </Button>

        <UpdateBuildingExpenseHead
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default BuildingExpenseHeadRow;

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { IconCategory2 } from '@tabler/icons-react';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import ShowStatus from 'ui-component/ShowStatus';
import InvoiceView from 'views/pages/SalesManagement/Invoices/InvoiceView';

const PurchasedProductRow = ({ sn, data }) => {
  const [view, setView] = useState(false);
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.invoiceNo}</StyledTableCell>
      <StyledTableCell>
        {data?.invoicedProducts?.map((el) => (
          <Typography key={el.id} sx={{ fontSize: 12 }}>
            {el.product?.label +
              ' - ' +
              el.quantity +
              ' ' +
              el.product?.uom?.toLowerCase()}
          </Typography>
        ))}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.totalPrice}</StyledTableCell>
      <StyledTableCell align="right">{data?.discount}</StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell align="right">
        {data?.amount - data?.paidAmount}
      </StyledTableCell>
      <StyledTableCell align="center">
        <ShowStatus status={data?.status} />
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color="primary" size="small" onClick={() => setView(true)}>
          <IconCategory2 size={18} />
        </IconButton>
        <InvoiceView
          open={view}
          handleClose={() => setView(false)}
          data={data}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PurchasedProductRow;

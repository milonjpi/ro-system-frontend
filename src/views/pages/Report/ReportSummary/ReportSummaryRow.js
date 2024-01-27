import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const ReportSummaryRow = ({ sn, data, allProducts }) => {
  const filterProducts = data?.products?.filter(
    (el) => el.year === data?.year && el.month === data?.month
  );

  // calculation
  const dueAmount = data?.amount - data?.paidAmount;

  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {moment()
          .month(data?.month - 1)
          .format('MMMM')}
      </StyledTableCellWithBorder>
      {allProducts?.map((el) => {
        const findProduct = filterProducts?.find(
          (item) => item.productId === el.id
        );
        return (
          <StyledTableCellWithBorder key={el.id} align="center">
            {findProduct?.quantity || 0}
          </StyledTableCellWithBorder>
        );
      })}
      <StyledTableCellWithBorder align="right">
        {data?.totalPrice}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.discount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.paidAmount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {dueAmount > 0 ? dueAmount : 0}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ReportSummaryRow;

import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const DailyReportRow = ({
  expenses,
  invoicedProducts,
  invoices,
  vouchers,
  investments,
  withdraws,
  allProducts,
}) => {
  const findReceived = vouchers?.find((el) => el.type === 'Received');
  const findPaid = vouchers?.find((el) => el.type === 'Paid');
  const totalCollection = findReceived?._sum?.amount || 0;
  const totalPaid = findPaid?._sum?.amount || 0;
  const allExpenses = expenses?._sum?.amount || 0;

  const totalInvests = investments?._sum?.amount || 0;
  const totalWithdraws = withdraws?._sum?.amount || 0;
  const totalExpenses = totalPaid + allExpenses;

  const totalAdvances = totalCollection - (invoices?._sum?.paidAmount || 0);
  const totalDues =
    (invoices?._sum?.amount || 0) - (invoices?._sum?.paidAmount || 0);

  const totalBalance =
    totalInvests + totalCollection - totalExpenses - totalWithdraws;
  return (
    <TableRow>
      {allProducts?.map((el) => {
        const findProduct = invoicedProducts?.find(
          (item) => item.productId === el.id
        );
        return (
          <StyledTableCellWithBorder key={el.id} align="center">
            {findProduct?.quantity || 0}
            <br />
            {findProduct?.totalPrice || 0} ৳
          </StyledTableCellWithBorder>
        );
      })}
      <StyledTableCellWithBorder
        align="center"
        rowSpan={3}
        sx={{
          fontSize: '12px !important',
          fontWeight: 700,
        }}
      >
        {totalInvests} ৳
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder
        align="center"
        rowSpan={3}
        sx={{
          fontSize: '12px !important',
          fontWeight: 700,
        }}
      >
        {totalWithdraws} ৳
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder
        align="center"
        rowSpan={3}
        sx={{
          fontSize: '12px !important',
          fontWeight: 700,
        }}
      >
        {totalCollection} ৳
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder
        align="center"
        rowSpan={3}
        sx={{
          fontSize: '12px !important',
          fontWeight: 700,
        }}
      >
        {totalExpenses} ৳
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder
        align="center"
        rowSpan={3}
        sx={{
          fontSize: '12px !important',
          fontWeight: 700,
        }}
      >
        {totalAdvances} ৳
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder
        align="center"
        rowSpan={3}
        sx={{
          fontSize: '12px !important',
          fontWeight: 700,
        }}
      >
        {totalDues} ৳
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder
        align="center"
        rowSpan={3}
        sx={{
          fontSize: '12px !important',
          fontWeight: 700,
        }}
      >
        {totalBalance} ৳
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default DailyReportRow;

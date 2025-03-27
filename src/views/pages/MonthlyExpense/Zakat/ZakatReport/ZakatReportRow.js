import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import { convertToBanglaNumber, totalSum } from 'views/utilities/NeedyFunction';

const ZakatReportRow = ({ sn, data }) => {
  const zakatDetails = data?.zakats || [];
  const rowSpan = zakatDetails.length || 1;
  const totalAmount = totalSum(zakatDetails, 'amount');
  return (
    <>
      {/* Main Row */}
      <TableRow>
        <StyledTableCellWithBorder
          align="center"
          rowSpan={rowSpan}
          sx={{ width: 100 }}
        >
          {convertToBanglaNumber(sn)}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.fullName}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.address || 'n/a'}
        </StyledTableCellWithBorder>
        {/* First row includes totals and actions */}
        {zakatDetails.length > 0 ? (
          <>
            <StyledTableCellWithBorder align="center">
              {convertToBanglaNumber(zakatDetails[0].year)}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {convertToBanglaNumber(zakatDetails[0].amount)}
            </StyledTableCellWithBorder>
          </>
        ) : (
          <StyledTableCellWithBorder colSpan={2} align="center">
            রেকর্ড নাই
          </StyledTableCellWithBorder>
        )}

        <StyledTableCellWithBorder rowSpan={rowSpan} align="right">
          {convertToBanglaNumber(totalAmount)}
        </StyledTableCellWithBorder>
      </TableRow>

      {/* Remaining Income Details Rows */}
      {zakatDetails.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder align="center">
            {convertToBanglaNumber(el.year)}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {convertToBanglaNumber(el.amount)}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default ZakatReportRow;

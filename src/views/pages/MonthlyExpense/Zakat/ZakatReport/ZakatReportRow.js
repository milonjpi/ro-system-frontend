import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import { convertToBanglaNumber, totalSum } from 'views/utilities/NeedyFunction';

const ZakatReportRow = ({ sn, data, allYears }) => {
  const zakatDetails = data?.zakats || [];
  const totalAmount = totalSum(zakatDetails, 'amount');
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">
        {convertToBanglaNumber(sn)}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.fullName}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.address || 'n/a'}
      </StyledTableCellWithBorder>
      {allYears?.map((el) => (
        <StyledTableCellWithBorder key={el} align="right">
          {convertToBanglaNumber(
            zakatDetails.find((bl) => bl.year === el)?.amount || 0
          )}
        </StyledTableCellWithBorder>
      ))}
      <StyledTableCellWithBorder align="right">
        {convertToBanglaNumber(totalAmount)}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ZakatReportRow;

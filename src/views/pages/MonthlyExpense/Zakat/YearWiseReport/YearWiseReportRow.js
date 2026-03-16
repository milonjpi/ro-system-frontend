import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import { convertToBanglaNumber } from 'views/utilities/NeedyFunction';

const YearWiseReportRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">
        {convertToBanglaNumber(sn)}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center">
        {convertToBanglaNumber(data?.year)}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {convertToBanglaNumber(data?.amount)}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default YearWiseReportRow;

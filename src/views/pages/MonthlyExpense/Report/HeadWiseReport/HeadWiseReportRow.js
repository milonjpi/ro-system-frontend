import { TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';

const HeadWiseReportRow = ({ sn, head, data = [] }) => {
  const jan = data?.filter((el) => el.month === 'January');
  const feb = data?.filter((el) => el.month === 'February');
  const mar = data?.filter((el) => el.month === 'March');
  const apr = data?.filter((el) => el.month === 'April');
  const may = data?.filter((el) => el.month === 'May');
  const jun = data?.filter((el) => el.month === 'June');
  const jul = data?.filter((el) => el.month === 'July');
  const aug = data?.filter((el) => el.month === 'August');
  const sep = data?.filter((el) => el.month === 'September');
  const oct = data?.filter((el) => el.month === 'October');
  const nov = data?.filter((el) => el.month === 'November');
  const dec = data?.filter((el) => el.month === 'December');
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{head}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(jan, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(feb, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(mar, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(apr, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(may, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(jun, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(jul, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(aug, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(sep, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(oct, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(nov, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(dec, 'amount')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {totalSum(data, 'amount')}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default HeadWiseReportRow;

import { StyledTableCellWithNanoBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const ElectricReportRow = ({ data }) => {
  const yearData = data?.data || [];
  const rowSpan = yearData.length || 1;

  const findMonthData = (year, month) =>
    year?.data?.find((el) => el.month === month);

  return (
    <>
      {/* Main Row */}
      <TableRow>
        <StyledTableCellWithNanoBorder rowSpan={rowSpan}>
          <span
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 10,
            }}
          >
            {data?.meter}
          </span>
          <span
            style={{
              display: 'block',
              fontSize: 8,
              lineHeight: 1,
              color: 'red',
            }}
          >
            {`Unit: ${data?.unit}`}
          </span>
          <span
            style={{
              display: 'block',
              fontSize: 8,
              lineHeight: 1,
              color: 'purple',
            }}
          >
            {`Amount: ${data?.amount}`}
          </span>
        </StyledTableCellWithNanoBorder>
        {/* First row includes totals and actions */}
        {yearData.length > 0 && (
          <>
            <StyledTableCellWithNanoBorder>
              {yearData[0].year}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'JANUARY')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'JANUARY')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'FEBRUARY')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'FEBRUARY')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'MARCH')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'MARCH')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'APRIL')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'APRIL')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'MAY')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'MAY')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'JUNE')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'JUNE')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'JULY')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'JULY')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'AUGUST')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'AUGUST')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'SEPTEMBER')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'SEPTEMBER')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'OCTOBER')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'OCTOBER')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'NOVEMBER')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'NOVEMBER')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {findMonthData(yearData[0], 'DECEMBER')?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {findMonthData(yearData[0], 'DECEMBER')?.amount || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'red' }}
            >
              {yearData[0]?.unit || 0}
            </StyledTableCellWithNanoBorder>
            <StyledTableCellWithNanoBorder
              align="right"
              style={{ color: 'purple' }}
            >
              {yearData[0]?.amount || 0}
            </StyledTableCellWithNanoBorder>
          </>
        )}

        {/* Totals and Actions */}
      </TableRow>

      {/* Remaining Income Details Rows */}
      {yearData.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithNanoBorder>
            {el.year}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'JANUARY')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'JANUARY')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'FEBRUARY')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'FEBRUARY')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'MARCH')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'MARCH')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'APRIL')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'APRIL')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'MAY')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'MAY')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'JUNE')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'JUNE')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'JULY')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'JULY')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'AUGUST')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'AUGUST')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'SEPTEMBER')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'SEPTEMBER')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'OCTOBER')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'OCTOBER')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'NOVEMBER')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'NOVEMBER')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {findMonthData(el, 'DECEMBER')?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {findMonthData(el, 'DECEMBER')?.amount || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder align="right" style={{ color: 'red' }}>
            {el?.unit || 0}
          </StyledTableCellWithNanoBorder>
          <StyledTableCellWithNanoBorder
            align="right"
            style={{ color: 'purple' }}
          >
            {el?.amount || 0}
          </StyledTableCellWithNanoBorder>
        </TableRow>
      ))}
    </>
  );
};

export default ElectricReportRow;

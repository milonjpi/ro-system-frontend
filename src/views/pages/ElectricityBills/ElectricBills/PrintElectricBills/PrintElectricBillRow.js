import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import { TableRow } from '@mui/material';
import { totalSum } from 'views/utilities/NeedyFunction';

const PrintElectricBillRow = ({ sn, data }) => {
  const billDetails = data?.data || [];
  const rowSpan = billDetails.length || 1;
  const totalAmount = totalSum(billDetails, 'amount');

  return (
    <>
      {/* Main Row */}
      <TableRow>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          {sn}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.month + '-' + data?.year}
        </StyledTableCellWithBorder>
        {/* First row includes totals and actions */}
        {billDetails.length > 0 && (
          <>
            <StyledTableCellWithBorder>
              {billDetails[0].date
                ? moment(billDetails[0].date).format('DD/MM/YYYY')
                : 'N/A'}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>
              {billDetails[0]?.paidBy || 'N/A'}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>
              {billDetails[0]?.meter?.smsAccount +
                ', ' +
                billDetails[0]?.meter?.label}
              <br />
              {billDetails[0]?.meter?.location || 'N/A'}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0]?.previousReading}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0]?.meterReading}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0].unit}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0].amount}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right" rowSpan={rowSpan}>
              {totalAmount}
            </StyledTableCellWithBorder>
          </>
        )}

        {/* Totals and Actions */}
      </TableRow>

      {/* Remaining Income Details Rows */}
      {billDetails.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder>
            {el.date ? moment(el.date).format('DD/MM/YYYY') : 'N/A'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>
            {el?.paidBy || 'N/A'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>
            {el?.meter?.smsAccount + ', ' + el?.meter?.label}
            <br />
            {el?.meter?.location || 'N/A'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el?.previousReading}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el?.meterReading}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.unit}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.amount}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default PrintElectricBillRow;

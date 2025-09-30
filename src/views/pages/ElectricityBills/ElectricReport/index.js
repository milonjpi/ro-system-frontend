import {
  Box,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { useGetElectricAllSummaryQuery } from 'store/api/electricityBill/electricityBillApi';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCellWithNanoBorder } from 'ui-component/table-component';
import ElectricReportRow from './ElectricReportRow';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useGetSmsAccountsQuery } from 'store/api/meter/meterApi';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconPrinter } from '@tabler/icons-react';

const ElectricReport = () => {
  // library
  const { data: meterData } = useGetSmsAccountsQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allMeters = meterData?.data;
  // end library

  const { data, isLoading } = useGetElectricAllSummaryQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const allElectricityBills = data?.data || [];
  const totalUnit = totalSum(allElectricityBills, 'unit');
  const totalAmount = totalSum(allElectricityBills, 'amount');

  // handle print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
        @media print {
          .pageBreakRow {
            page-break-inside: avoid;
          }
        }
        `,
  });
  return (
    <MainCard
      title="Report"
      secondary={
        <Tooltip title="Print">
          <IconButton size="small" color="primary" onClick={handlePrint}>
            <IconPrinter size={20} />
          </IconButton>
        </Tooltip>
      }
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ minWidth: 800 }}>
          <Table id="printTable" ref={componentRef}>
            <TableHead>
              <TableRow>
                <StyledTableCellWithNanoBorder rowSpan={2}>
                  Meter
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder rowSpan={2}>
                  Year
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  January
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  February
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  March
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  April
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  May
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  June
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  July
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  August
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  September
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  October
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  November
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  December
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="center" colSpan={2}>
                  Total
                </StyledTableCellWithNanoBorder>
              </TableRow>
              <TableRow>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Unit
                </StyledTableCellWithNanoBorder>
                <StyledTableCellWithNanoBorder align="right">
                  Amount
                </StyledTableCellWithNanoBorder>
              </TableRow>
            </TableHead>
            <TableBody>
              {allElectricityBills?.length ? (
                allElectricityBills.map((item) => (
                  <ElectricReportRow
                    key={item.meter}
                    meter={allMeters?.find(
                      (el) => el.smsAccount === item.meter
                    )}
                    data={item}
                  />
                ))
              ) : (
                <TableRow>
                  <StyledTableCellWithNanoBorder
                    colSpan={16}
                    sx={{ border: 0 }}
                    align="center"
                  >
                    {isLoading ? (
                      <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                    ) : (
                      'No Data'
                    )}
                  </StyledTableCellWithNanoBorder>
                </TableRow>
              )}
              {allElectricityBills?.length ? (
                <TableRow>
                  <StyledTableCellWithNanoBorder
                    colSpan={26}
                    sx={{ fontWeight: 'bold !important' }}
                  >
                    TOTAL
                  </StyledTableCellWithNanoBorder>
                  <StyledTableCellWithNanoBorder
                    align="right"
                    style={{ fontWeight: 700, color: 'red' }}
                  >
                    {totalUnit}
                  </StyledTableCellWithNanoBorder>
                  <StyledTableCellWithNanoBorder
                    align="right"
                    style={{ fontWeight: 700, color: 'purple' }}
                  >
                    {totalAmount}
                  </StyledTableCellWithNanoBorder>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </MainCard>
  );
};

export default ElectricReport;

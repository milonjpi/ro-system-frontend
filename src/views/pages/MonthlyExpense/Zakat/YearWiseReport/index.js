import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { IconButton, LinearProgress, Tooltip } from '@mui/material';
import { convertToBanglaNumber, totalSum } from 'views/utilities/NeedyFunction';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconPrinter } from '@tabler/icons-react';
import { useGetYearWiseZakatsQuery } from 'store/api/zakat/zakatApi';
import YearWiseReportRow from './YearWiseReportRow';
import PrintYearWiseReport from './PrintYearWiseReport';

const YearWiseReport = () => {
  const { data, isLoading } = useGetYearWiseZakatsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const allZakats =
    data?.data?.map((el) => ({
      year: el.year,
      amount: el._sum?.amount || 0,
    })) || [];

  const totalAmount = totalSum(allZakats, 'amount');

  // handle Print
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
      title="যাকাত রিপোর্ট (বছর)"
      secondary={
        <Tooltip title="Print">
          <IconButton size="small" color="primary" onClick={handlePrint}>
            <IconPrinter size={18} />
          </IconButton>
        </Tooltip>
      }
    >
      {/* popup items */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintYearWiseReport
          ref={componentRef}
          allZakats={allZakats}
          isLoading={isLoading}
          totalAmount={totalAmount}
        />
      </Box>
      {/* end popup items */}

      {/* data table */}
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCellWithBorder align="center" sx={{ width: 100 }}>
              ক্রোমিক নং
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center">
              বছর
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              যাকাতের পরিমাণ
            </StyledTableCellWithBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          {allZakats?.length ? (
            allZakats?.map((el, index) => (
              <YearWiseReportRow key={el.id} sn={index + 1} data={el} />
            ))
          ) : (
            <TableRow>
              <StyledTableCellWithBorder colSpan={15} align="center">
                {isLoading ? (
                  <LinearProgress
                    color="primary"
                    sx={{ opacity: 0.5, py: 0.5 }}
                  />
                ) : (
                  'No Data'
                )}
              </StyledTableCellWithBorder>
            </TableRow>
          )}
          {allZakats?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={2}
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                মোট
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {convertToBanglaNumber(totalAmount || 0)}
              </StyledTableCellWithBorder>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
      {/* end data table */}
    </MainCard>
  );
};

export default YearWiseReport;

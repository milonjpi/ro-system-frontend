import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { Box, IconButton, TableRow, Tooltip } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useGetTypeWiseSummaryQuery } from 'store/api/jewelleryReport/jewelleryReportApi';
import TypeWiseSummaryRow from './TypeWiseSummaryRow';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconPrinter } from '@tabler/icons-react';
import PrintTypeWiseSummary from './PrintTypeWiseSummary';

const TypeWiseSummary = () => {
  // table
  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Category',
    },
    {
      title: 'Jewellery Type',
    },
    {
      title: 'KDM',
    },
    {
      title: 'Weight (gm)',
      align: 'right',
    },
    {
      title: 'Total Weight (gm)',
      align: 'right',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  const { data, isLoading } = useGetTypeWiseSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allData = data?.data || [];

  // calculation
  const totalWeight = totalSum(allData, 'weight');

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
    <SubCard
      title="Jewellery Type Wise Summary"
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
        <PrintTypeWiseSummary
          ref={componentRef}
          tableHeads={tableHeads}
          allData={allData}
          isLoading={isLoading}
          totalWeight={totalWeight}
        />
      </Box>
      {/* end popup items */}
      {/* data table */}
      <DataTable
        bordered
        tableHeads={tableHeads}
        data={allData}
        options={(el, index) => (
          <TypeWiseSummaryRow key={index} sn={index + 1} data={el} />
        )}
        loading={isLoading}
        extra={
          allData?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={5}
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                TOTAL
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalWeight?.toFixed(3)}
              </StyledTableCellWithBorder>
            </TableRow>
          ) : null
        }
      />

      {/* end data table */}
    </SubCard>
  );
};

export default TypeWiseSummary;

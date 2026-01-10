import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { Box, IconButton, TableRow, Tooltip } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useGetJewellerySummaryQuery } from 'store/api/jewelleryReport/jewelleryReportApi';
import GAssetSummaryRow from './GAssetSummaryRow';
import { IconPrinter } from '@tabler/icons-react';
import PrintGAssetSummary from './PrintGAssetSummary';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const GAssetSummary = () => {
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
      title: 'Weight (gm)',
      align: 'right',
    },
    {
      title: 'Price (TK)',
      align: 'right',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  const { data, isLoading } = useGetJewellerySummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allData = data?.data || [];

  // calculation
  const totalWeight = totalSum(allData, 'weight');
  const totalPrice = totalSum(allData, 'price');

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
      title="Jewellery Summary"
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
        <PrintGAssetSummary
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
          <GAssetSummaryRow key={index} sn={index + 1} data={el} />
        )}
        loading={isLoading}
        extra={
          allData?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={2}
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
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalPrice}
              </StyledTableCellWithBorder>
            </TableRow>
          ) : null
        }
      />

      {/* end data table */}
    </SubCard>
  );
};

export default GAssetSummary;

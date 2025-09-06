import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useGetJewellerySummaryQuery } from 'store/api/jewelleryReport/jewelleryReportApi';
import GAssetSummaryRow from './GAssetSummaryRow';

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

  return (
    <SubCard title="Jewellery Summary">
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

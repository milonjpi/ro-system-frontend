import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useGetCaratWiseSummaryQuery } from 'store/api/jewelleryReport/jewelleryReportApi';
import KdmWiseSummaryRow from './KdmWiseSummaryRow';

const KdmWiseSummary = () => {
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
      title: 'KDM',
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

  const { data, isLoading } = useGetCaratWiseSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allData = data?.data || [];

  // calculation
  const mappedAllData = allData?.map((el) => ({
    weight: totalSum(el.carats || [], 'weight'),
    price: totalSum(el.carats || [], 'price'),
  }));
  const totalWeight = totalSum(mappedAllData, 'weight');
  const totalPrice = totalSum(mappedAllData, 'price');

  return (
    <SubCard title="KDM Wise Summary">
      {/* data table */}
      <DataTable
        bordered
        tableHeads={tableHeads}
        data={allData}
        options={(el, index) => (
          <KdmWiseSummaryRow key={index} sn={index + 1} data={el} />
        )}
        loading={isLoading}
        extra={
          allData?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={3}
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

export default KdmWiseSummary;

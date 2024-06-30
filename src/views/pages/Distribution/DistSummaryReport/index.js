import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import { useGetDistDashboardQuery } from 'store/api/distReport/distReportApi';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import MainCard from 'ui-component/cards/MainCard';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const DistSummaryReport = () => {
  const { data: getUserData } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = getUserData?.data;

  const [distributor, setDistributor] = useState(
    ['super_admin'].includes(userData?.role) ? null : userData?.distributor
  );

  // library
  const { data: distributorData, isLoading: distributorLoading } =
    useGetCustomersQuery(
      {
        isDistributor: true,
        limit: 1000,
        sortBy: 'customerName',
        sortOrder: 'asc',
      },
      { refetchOnMountOrArgChange: true }
    );

  const allDistributor = distributorData?.customers || [];
  // end library

  // table
  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Pur. Qty',
      align: 'right',
    },
    {
      title: 'Pur. Amount',
      align: 'right',
    },
    {
      title: 'Sales Qty',
      align: 'right',
    },
    {
      title: 'Sales Amount',
      align: 'right',
    },
    {
      title: 'Expenses',
      align: 'right',
    },
    {
      title: 'Receivable',
      align: 'right',
    },
    {
      title: 'Payable',
      align: 'right',
    },
  ];
  // end table

  const { data, isLoading } = useGetDistDashboardQuery(
    { distributorId: distributor?.id || '123' },
    { refetchOnMountOrArgChange: true }
  );
  const allReport = data?.report;

  const amountReceivable =
    (allReport?.saleAmount || 0) - (allReport?.salePaidAmount || 0);

  const amountPayable =
    (allReport?.buyAmount || 0) - (allReport?.buyPaidAmount || 0);

  return (
    <MainCard title="Summary">
      {/* filter area */}
      <Box
        sx={{ mb: 2 }}
        hidden={['super_admin'].includes(userData?.role) ? false : true}
      >
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={6} lg={3}>
            <Autocomplete
              value={distributor}
              loading={distributorLoading}
              size="small"
              fullWidth
              options={allDistributor}
              getOptionLabel={(option) => option.customerName}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setDistributor(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Distributor" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              {tableHeads?.map((el, index) => (
                <StyledTableCellWithBorder
                  key={index}
                  align={el.align || 'left'}
                >
                  {el.title}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {distributor ? (
              <TableRow>
                <StyledTableCellWithBorder align="center">
                  1
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder align="right">
                  {allReport?.buyQuantity}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder align="right">
                  {allReport?.buyAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder align="right">
                  {allReport?.saleQuantity}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder align="right">
                  {allReport?.saleAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder align="right">
                  {allReport?.expense}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder align="right">
                  {amountReceivable > 0 ? amountReceivable : 0}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder align="right">
                  {amountPayable > 0 ? amountPayable : 0}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={10}
                  sx={{ border: 0 }}
                  align="center"
                >
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCellWithBorder>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      {/* end data table */}
    </MainCard>
  );
};

export default DistSummaryReport;

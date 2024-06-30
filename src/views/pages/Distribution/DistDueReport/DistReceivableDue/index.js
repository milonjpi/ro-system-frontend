import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IconCloudDownload, IconPrinter } from '@tabler/icons-react';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { utils, writeFile } from 'xlsx';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import { useGetDistClientsQuery } from 'store/api/distClient/distClientApi';
import { useGetDistDueReportQuery } from 'store/api/distReport/distReportApi';
import PrintDistReceivable from './PrintDistReceivable';
import DistReceivableRow from './DistReceivableRow';

const DistReceivableDue = () => {
  const { data: getUserData } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = getUserData?.data;

  const [distributor, setDistributor] = useState(
    ['super_admin'].includes(userData?.role) ? null : userData?.distributor
  );
  const [customer, setCustomer] = useState(null);

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

  // client
  const { data: customerData } = useGetDistClientsQuery(
    {
      limit: 1000,
      sortBy: 'customerName',
      sortOrder: 'asc',
      distributorId: distributor?.id || '123',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.distClients || [];
  // end library

  // table
  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // end pagination

  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Client ID',
    },
    {
      title: 'Client Name',
    },
    {
      title: 'Client Name (BN)',
    },
    {
      title: 'Mobile',
    },
    {
      title: 'Address',
    },
    {
      title: 'Last Sale',
    },
    {
      title: 'Last Payment',
    },
    {
      title: 'Due Amount',
      align: 'right',
    },
  ];
  // end table

  // filtering
  const query = {};

  query['distributorId'] = '123';

  if (['super_admin'].includes(userData?.role)) {
    query['distributorId'] = undefined;
  }

  if (distributor) {
    query['distributorId'] = distributor?.id;
  }

  const { data, isLoading } = useGetDistDueReportQuery(
    { ...query },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const getAllReports = data?.report || [];

  const allDueReports = getAllReports
    ?.filter(
      (el) =>
        (customer ? el.id === customer.id : true) &&
        (el.differentAmount > 0 ? true : false)
    )
    .sort((a, b) => b.differentAmount - a.differentAmount);

  let sn = page * rowsPerPage + 1;

  // calculation
  const totalDue = totalSum(allDueReports, 'differentAmount');

  // print and export
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

  const handleExport = () => {
    let elt = document.getElementById('printTable');
    let wb = utils.book_new();
    let ws = utils.table_to_sheet(elt);
    utils.book_append_sheet(wb, ws, 'sheet 1');

    ws['!cols'] = [
      { wch: 5 },
      { wch: 9 },
      { wch: 18 },
      { wch: 19 },
      { wch: 12 },
      { wch: 19 },
      { wch: 8 },
      { wch: 12 },
      { wch: 15 },
    ];
    writeFile(wb, `DueReport.xlsx`);
  };

  return (
    <MainCard
      title="Receivable"
      secondary={
        <ButtonGroup>
          <Tooltip title="Export to Excel">
            <IconButton color="primary" size="small" onClick={handleExport}>
              <IconCloudDownload size={22} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton size="small" color="secondary" onClick={handlePrint}>
              <IconPrinter size={22} />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      }
    >
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            hidden={['super_admin'].includes(userData?.role) ? false : true}
          >
            <Autocomplete
              value={distributor}
              loading={distributorLoading}
              size="small"
              fullWidth
              options={allDistributor}
              getOptionLabel={(option) => option.customerName}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => {
                setDistributor(newValue);
                setCustomer(null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Distributor" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Autocomplete
              value={customer}
              size="small"
              fullWidth
              options={allCustomers}
              getOptionLabel={(option) =>
                option.customerName +
                (option.customerNameBn ? ', ' + option.customerNameBn : '')
              }
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setCustomer(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintDistReceivable
          ref={componentRef}
          tableHeads={tableHeads}
          data={allDueReports}
          totalDue={totalDue}
          distributor={distributor}
          loading={isLoading}
        />
      </Box>
      {/* end popup item */}

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
            {allDueReports?.length ? (
              allDueReports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <DistReceivableRow key={item.id} sn={sn++} data={item} />
                ))
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
            {allDueReports?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={8}
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  Total:
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  {totalDue}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allDueReports?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* end data table */}
    </MainCard>
  );
};

export default DistReceivableDue;

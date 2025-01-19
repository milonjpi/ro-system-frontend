import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import DataTable from 'ui-component/table';
import { utils, writeFile } from 'xlsx';
import moment from 'moment';
import { useGetCustomInvoicesQuery } from 'store/api/customInvoice/customInvoiceApi';
import CustomInvoiceRow from './CustomInvoiceRow';
import { useGetCustomerGroupsQuery } from 'store/api/customerGroup/customerGroupApi';
import { totalSum } from 'views/utilities/NeedyFunction';
import { IconButton, Tooltip } from '@mui/material';
import { IconCloudDownload } from '@tabler/icons-react';

const CustomInvoices = () => {
  const [group, setGroup] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());

  // library
  const { data: groupData, isLoading: groupLoading } =
    useGetCustomerGroupsQuery(
      { limit: 100, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allCustomerGroups = groupData?.customerGroups || [];

  const customerQuery = {};
  customerQuery['limit'] = 1000;
  customerQuery['sortBy'] = 'customerName';
  customerQuery['sortOrder'] = 'asc';

  if (group) {
    customerQuery['groupId'] = group.id;
  }

  const { data: customerData } = useGetCustomersQuery(
    { ...customerQuery },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.customers || [];
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
      title: 'Customer',
    },
    {
      title: 'Total Invoice',
      align: 'right',
    },
    {
      title: 'Total Price',
      align: 'right',
    },
    {
      title: 'Discount',
      align: 'right',
    },
    {
      title: 'Amount',
      align: 'right',
    },
    {
      title: 'Paid Amount',
      align: 'right',
    },
    {
      title: 'Due',
      align: 'right',
    },
    {
      title: 'Quick View',
      align: 'center',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'customerId';
  query['sortOrder'] = 'asc';

  if (group) {
    query['groupId'] = group?.id;
  }
  if (customer) {
    query['customerId'] = customer?.id;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  const { data, isLoading } = useGetCustomInvoicesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomInvoices = data?.customInvoices || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;

  // export data
  const { data: printData, isLoading: printLoading } =
    useGetCustomInvoicesQuery(
      { ...query, page: 0, limit: 5000 },
      { refetchOnMountOrArgChange: true }
    );

  const allPrintCustomInvoices = printData?.customInvoices || [];

  const handleExport = () => {
    let elt = allPrintCustomInvoices.map((el, index) => {
      const invoiceCount = el?.invoices?.length || 0;

      // calculation
      const totalPrice = totalSum(el?.invoices || [], 'totalPrice');
      const totalDiscount = totalSum(el?.invoices || [], 'discount');
      const totalAmount = totalSum(el?.invoices || [], 'amount');
      const paidAmount = totalSum(el?.invoices || [], 'paidAmount');
      const dueAmount = totalAmount - paidAmount;
      return {
        SN: index + 1,
        Customer: el.customerName,
        'Total Invoice': invoiceCount,
        'Total Price': totalPrice,
        Discount: totalDiscount,
        Amount: totalAmount,
        'Paid Amount': paidAmount,
        Due: dueAmount,
      };
    });
    let wb = utils.book_new();
    let ws = utils.json_to_sheet(elt);
    utils.book_append_sheet(wb, ws, 'sheet 1');

    ws['!cols'] = [
      { wch: 5 },
      { wch: 20 },
      { wch: 11 },
      { wch: 9 },
      { wch: 8 },
      { wch: 7 },
      { wch: 11 },
      { wch: 7 },
    ];
    writeFile(wb, `Custom-Invoice.xlsx`);
  };
  return (
    <MainCard
      title="Custom Invoices"
      secondary={
        <Tooltip title="Export">
          <IconButton
            color="primary"
            size="small"
            disabled={printLoading}
            onClick={handleExport}
          >
            <IconCloudDownload size={20} />
          </IconButton>
        </Tooltip>
      }
    >
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={3.5}>
            <Autocomplete
              value={group}
              loading={groupLoading}
              size="small"
              fullWidth
              options={allCustomerGroups}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => {
                setGroup(newValue);
                setCustomer(null);
              }}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Group" />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={3.5}>
            <Autocomplete
              value={customer}
              size="small"
              fullWidth
              options={allCustomers}
              getOptionLabel={(option) => option.customerName}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setCustomer(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.5}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Invoice Date (From)"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} lg={2.5}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Invoice Date (To)"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        tableHeads={tableHeads}
        data={allCustomInvoices}
        options={(el) => (
          <CustomInvoiceRow
            key={el.id}
            sn={sn++}
            data={el}
            startDate={startDate}
            endDate={endDate}
          />
        )}
        loading={isLoading}
        pagination={true}
        page={page}
        rowsPerPage={rowsPerPage}
        count={meta?.total || 0}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {/* end data table */}
    </MainCard>
  );
};

export default CustomInvoices;

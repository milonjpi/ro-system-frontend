import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import moment from 'moment';
import { useGetRecipientsQuery } from 'store/api/recipient/recipientApi';
import { useGetZakatsQuery } from 'store/api/zakat/zakatApi';
import { Autocomplete, TableRow, TextField } from '@mui/material';
import { zakatYears } from 'assets/data';
import ZakatPayRow from './ZakatPayRow';
import AddZakatPay from './AddZakatPay';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { convertToBanglaNumber } from 'views/utilities/NeedyFunction';
import { useGetRecipientGroupsQuery } from 'store/api/recipientGroup/recipientGroupApi';

const ZakatPay = () => {
  const [year, setYear] = useState(moment().format('YYYY'));
  const [recipientGroup, setRecipientGroup] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);

  // library
  const { data: groupData, isLoading: groupLoading } =
    useGetRecipientGroupsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allRecipientGroups = groupData?.recipientGroups || [];

  const recipientQuery = {};
  recipientQuery['limit'] = 1000;
  recipientQuery['sortBy'] = 'fullName';
  recipientQuery['sortOrder'] = 'asc';
  if (recipientGroup) {
    recipientQuery['recipientGroupId'] = recipientGroup?.id;
  }

  const { data: recipientData, isLoading: recipientLoading } =
    useGetRecipientsQuery(
      { ...recipientQuery },
      { refetchOnMountOrArgChange: true }
    );

  const allRecipients = recipientData?.recipients || [];
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
      title: 'ক্রোমিক নং',
      align: 'center',
    },
    {
      title: 'বছর',
    },
    {
      title: 'যাকাত গ্রহীতা',
    },
    {
      title: 'গ্রহীতা গ্রুপ',
    },
    {
      title: 'স্ট্যাটাস',
      align: 'center',
    },
    {
      title: 'পরিমাণ',
      align: 'right',
    },
    {
      title: 'অ্যাকশন',
      align: 'center',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;

  if (year) {
    query['year'] = year;
  }

  if (status) {
    query['status'] = status;
  }

  if (recipientGroup) {
    query['recipientGroupId'] = recipientGroup?.id;
  }

  if (recipient) {
    query['recipientId'] = recipient?.id;
  }

  const { data, isLoading } = useGetZakatsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allZakats = data?.zakats || [];
  const meta = data?.meta;
  const sum = data?.sum;
  return (
    <SubCard
      title="যাকাত"
      secondary={
        <Button
          size="small"
          color="secondary"
          variant="contained"
          startIcon={<IconPlus size={16} />}
          sx={{ minWidth: 0, fontSize: 12 }}
          onClick={() => setOpen(true)}
        >
          যোগ করুন
        </Button>
      }
    >
      {/* popup items */}
      <AddZakatPay open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}

      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3}>
            <Autocomplete
              loading={groupLoading}
              value={recipientGroup}
              size="small"
              fullWidth
              options={allRecipientGroups}
              getOptionLabel={(option) =>
                option.labelBn + ' => ' + option.label
              }
              onChange={(e, newValue) => {
                setRecipientGroup(newValue);
                setRecipient(null);
              }}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="গ্রহীতা গ্রুপ" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              loading={recipientLoading}
              value={recipient}
              size="small"
              fullWidth
              options={allRecipients}
              getOptionLabel={(option) =>
                option.fullName +
                (option.fullNameEn ? ' => ' + option.fullNameEn : '')
              }
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setRecipient(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="যাকাত গ্রহীতা" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              value={year}
              size="small"
              fullWidth
              options={zakatYears}
              getOptionLabel={(option) => convertToBanglaNumber(option)}
              onChange={(e, newValue) => setYear(newValue)}
              renderInput={(params) => <TextField {...params} label="বছর" />}
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              value={status}
              size="small"
              fullWidth
              options={['DUE', 'PAID']}
              onChange={(e, newValue) => setStatus(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="স্ট্যাটাস" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        bordered
        sx={{ minWidth: allZakats?.length && 600 }}
        tableHeads={tableHeads}
        data={allZakats}
        options={(el, index) => (
          <ZakatPayRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
          />
        )}
        extra={
          allZakats?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={5}
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
                {convertToBanglaNumber(sum?._sum?.amount || 0)}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              ></StyledTableCellWithBorder>
            </TableRow>
          ) : null
        }
        loading={isLoading}
        pagination={true}
        page={page}
        rowsPerPage={rowsPerPage}
        count={meta?.total || 0}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* end data table */}
    </SubCard>
  );
};

export default ZakatPay;

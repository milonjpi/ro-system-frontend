import Button from '@mui/material/Button';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import {  TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { convertToBanglaNumber } from 'views/utilities/NeedyFunction';
import { useGetZakatValuesQuery } from 'store/api/zakatValue/zakatValueApi';
import AddZakatAmount from './AddZakatAmount';
import ZakatAmountRow from './ZakatAmountRow';

const ZakatAmount = () => {
  const [open, setOpen] = useState(false);
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
      title: 'যাকাতের পরিমাণ',
      align: 'right',
    },
    {
      title: 'পরিশোধিত',
      align: 'right',
    },
    {
      title: 'অবশিষ্ট',
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

  const { data, isLoading } = useGetZakatValuesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allZakatValues = data?.zakatValues || [];
  const meta = data?.meta;
  const sum = data?.sum;
  return (
    <SubCard
      title="যাকাত এমাউন্ট"
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
      <AddZakatAmount open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}

      {/* data table */}
      <DataTable
        bordered
        tableHeads={tableHeads}
        data={allZakatValues}
        options={(el, index) => (
          <ZakatAmountRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
          />
        )}
        extra={
          allZakatValues?.length ? (
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
                {convertToBanglaNumber(sum?._sum?.amount || 0)}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
                colSpan={3}
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

export default ZakatAmount;

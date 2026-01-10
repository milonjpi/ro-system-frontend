import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import DataTable from 'ui-component/table';
import PrintMainSoldAssetRow from './PrintMainSoldAssetRow';

const PrintMainSoldAsset = forwardRef(
  ({ title, allSoldJewelleries, isLoading, sum }, ref) => {
    const tableHeads = [
      {
        title: 'SN',
        align: 'center',
      },
      {
        title: 'Sold Date',
      },
      {
        title: 'Sale/Exchange',
        align: 'center',
      },
      {
        title: 'Jewellery Type',
      },
      {
        title: 'Vendor',
      },
      {
        title: 'Invoice No',
      },
      {
        title: 'Weight (gm)',
        align: 'right',
      },
      {
        title: 'Unit Price',
        align: 'right',
      },
      {
        title: 'Total Price',
        align: 'right',
      },
      {
        title: 'Deduction',
        align: 'right',
      },
      {
        title: 'Sale/Exchange Price',
        align: 'right',
      }
    ];
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            {title}
          </Typography>
        </Box>

        <DataTable
          bordered
          tableHeads={tableHeads}
          data={allSoldJewelleries}
          options={(el, index) => (
            <PrintMainSoldAssetRow key={el.id} sn={index + 1} data={el} />
          )}
          extra={
            allSoldJewelleries?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={6}
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
                  {sum?._sum?.weight?.toFixed(3) || 0}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                ></StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {sum?._sum?.totalPrice || 0}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {sum?._sum?.deduction || 0}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {sum?._sum?.price || 0}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null
          }
          loading={isLoading}
        />
      </Box>
    );
  }
);

export default PrintMainSoldAsset;

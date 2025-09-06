import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import DataTable from 'ui-component/table';
import PrintMainJewelleriesRow from './PrintMainJewelleriesRow';

const PrintMainJewelleries = forwardRef(
  ({ category, allJewelleries, sum, isLoading }, ref) => {
    const tableHeads = [
      {
        title: 'SN',
        align: 'center',
      },
      {
        title: 'DOP',
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
        title: 'KDM',
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
        title: 'Raw Price',
        align: 'right',
      },
      {
        title: 'Making Charge',
        align: 'right',
      },
      {
        title: 'VAT',
        align: 'right',
      },
      {
        title: 'Price',
        align: 'right',
      },
    ];
    return (
      <Box component="div" ref={ref} sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 20, textAlign: 'center', fontWeight: 700 }}
          >
            {category} JEWELLERIES
          </Typography>
        </Box>

        <DataTable
          bordered
          tableHeads={tableHeads}
          data={allJewelleries}
          options={(el, index) => (
            <PrintMainJewelleriesRow
              key={el.id}
              sn={index + 1}
              data={el}
              category={category}
            />
          )}
          extra={
            allJewelleries?.length ? (
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
                  {sum?._sum?.totalPrice -
                    sum?._sum?.makingCharge -
                    sum?._sum?.vat}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {sum?._sum?.makingCharge}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {sum?._sum?.vat}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {sum?._sum?.price}
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

export default PrintMainJewelleries;

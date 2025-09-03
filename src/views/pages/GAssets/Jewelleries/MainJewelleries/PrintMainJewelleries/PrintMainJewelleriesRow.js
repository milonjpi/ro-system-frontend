import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import moment from 'moment';

const PrintMainJewelleriesRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {moment(data?.dop).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.jewelleryType?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.vendor?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.invoiceNo}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.carat?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.weight}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.unitPrice}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {Math.round(data?.weight * data?.unitPrice)}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.makingCharge}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.vat}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.price}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PrintMainJewelleriesRow;

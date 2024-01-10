import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import InvoiceComponent from './InvoiceComponent';

const PrintCustomInvoice = forwardRef(({ data, startDate, endDate }, ref) => {
  return (
    <Box
      sx={{
        p: 3,
      }}
      ref={ref}
    >
      <Box sx={{ mb: 10 }}>
        <InvoiceComponent data={data} startDate={startDate} endDate={endDate} />
      </Box>
      <InvoiceComponent data={data} startDate={startDate} endDate={endDate} />
    </Box>
  );
});

export default PrintCustomInvoice;

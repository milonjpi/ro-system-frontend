import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import InvoiceComponent from './InvoiceComponent';
import PrintCustomInvoice from './PrintCustomInvoice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 800 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const ViewCustomInvoice = ({ open, handleClose, data, startDate, endDate }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @media print {

    }
    `,
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Typography sx={{ fontSize: 18, color: '#878781' }}>
            Invoice View
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handlePrint}
            size="small"
            sx={{ position: 'absolute', top: 70, right: 16, zIndex: 12 }}
          >
            <PrintIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mt: 0.5, mb: 2 }} />
        {/* popup items */}
        <Box sx={{ height: 0, overflow: 'hidden' }}>
          <PrintCustomInvoice
            ref={componentRef}
            data={data}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        {/* end popup items */}
        <Box
          sx={{
            minWidth: 600,
            p: 3,
          }}
        >
          <InvoiceComponent
            data={data}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
      </Paper>
    </Modal>
  );
};

export default ViewCustomInvoice;

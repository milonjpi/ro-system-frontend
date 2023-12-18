import IconButton from '@mui/material/IconButton';
import { IconTrashXFilled } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const AddedProductRow = ({ sn, data, products, setProducts }) => {
  const [dialog, setDialog] = useState(false);

  // handle quantity remove
  const handleQuantityAdd = () => {
    const modifiedData = parseInt(data?.quantity) + 1;
    const newProducts = products?.map((el) =>
      el.product?.id === data?.product?.id
        ? { product: el.product, quantity: modifiedData }
        : el
    );
    setProducts(newProducts);
  };

  // handle quantity remove
  const handleQuantityRemove = () => {
    const modifiedData = parseInt(data?.quantity) - 1;
    if (modifiedData >= 1) {
      const newProducts = products?.map((el) =>
        el.product?.id === data?.product?.id
          ? { product: el.product, quantity: modifiedData }
          : el
      );
      setProducts(newProducts);
    }
  };

  // handle remove
  const handleRemove = () => {
    setDialog(false);
    setProducts(products?.filter((el) => el.product.id !== data?.product?.id));
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.product?.label}</StyledTableCell>
      <StyledTableCell align="center">
        <span>
          <IconButton
            disabled={parseInt(data?.quantity) <= 1 ? true : false}
            size="small"
            color="error"
            onClick={handleQuantityRemove}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
        </span>
        <span
          style={{
            fontSize: 14,
            display: 'inline-block',
            paddingLeft: 7,
            paddingRight: 7,
          }}
        >
          {data?.quantity}
        </span>

        <span>
          <IconButton size="small" color="primary" onClick={handleQuantityAdd}>
            <AddIcon fontSize="small" />
          </IconButton>
        </span>
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton size="small" color="error" onClick={() => setDialog(true)}>
          <IconTrashXFilled size={16} />
        </IconButton>
        {/* popup items */}
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Remove Product"
          handleDelete={handleRemove}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AddedProductRow;

import React from 'react';
import Typography from '@mui/material/Typography';

const CardItem = ({ title = 'Title', value = 0 }) => {
  return (
    <Typography
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        lineHeight: 2.5,
      }}
    >
      {title} <span>{value}</span>
    </Typography>
  );
};

export default CardItem;

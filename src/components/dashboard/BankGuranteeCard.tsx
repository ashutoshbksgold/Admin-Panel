import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  LinearProgress,
  Typography,
  linearProgressClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const BankGuranteeCard = () => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
    },
  }));

  return (
    <Card sx={{ p: 3, mb: 3, maxWidth: '80%', backgroundColor: 'primary.lighter' }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Icon icon="fluent:info-28-filled" />
        <Typography fontWeight={600}>
          Your bank Garuntee is in Danger, please increase limit.
        </Typography>
        <Box flex=".9">
          <BorderLinearProgress variant="determinate" value={10} />
        </Box>
      </Box>
      <Box mt={3}>
        <Button variant="contained">Increase Limit</Button>{' '}
        <Button variant="outlined" sx={{ ml: 2 }}>
          Clear Dues
        </Button>{' '}
      </Box>
    </Card>
  );
};

export default BankGuranteeCard;

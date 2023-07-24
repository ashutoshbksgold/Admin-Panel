import {
  Box,
  Button,
  Card,
  Divider,
  ListItem,
  ListItemText,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const SectionCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#DDDBDB',
  padding: theme.spacing(1, 2),
  minWidth: 160,
}));

const StyledCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#F5F5F5',
  padding: theme.spacing(1, 2),
  minWidth: 160,
}));

const ConfirmGstDetails = ({ gstData, sendGstOtp }: any) => {
  return (
    <Card sx={{ p: 5, width: '100%' }}>
      <Typography fontWeight={600} fontSize={22} textAlign="center" my={3}>
        Confim GST Details Before Proceeding
      </Typography>

      <Box display="flex" justifyContent="center">
        <Box>
          <TableRow>
            <SectionCell>Business Name</SectionCell>
            <StyledCell>{gstData?.businessName} </StyledCell>
          </TableRow>
          <Divider />
          <TableRow>
            <SectionCell>GST Number</SectionCell>
            <StyledCell>{gstData?.gstNo}</StyledCell>
          </TableRow>
          <Divider />
          <TableRow>
            <SectionCell>PAN Number</SectionCell>
            <StyledCell></StyledCell>
          </TableRow>
          <Divider />
          <TableRow>
            <SectionCell>Email</SectionCell>
            <StyledCell>{gstData.email}</StyledCell>
          </TableRow>
          <Divider />
          <TableRow>
            <SectionCell>Phone Number</SectionCell>
            <StyledCell>{gstData?.mobile}</StyledCell>
          </TableRow>
          <Divider />
          <TableRow>
            <SectionCell>Owner Name</SectionCell>
            <StyledCell>{gstData?.legalName}</StyledCell>
          </TableRow>
        </Box>
      </Box>

      <Box textAlign="center" mt={3}>
        <Button variant="contained" onClick={() => sendGstOtp(gstData.clientId)}>
          Proceed to verify
        </Button>
      </Box>
    </Card>
  );
};

export default ConfirmGstDetails;

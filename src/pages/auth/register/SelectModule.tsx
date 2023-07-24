import { Box, Grid, TextField, Button, Typography, Container, Link } from '@mui/material';
import React, { useState } from 'react';
import { Module } from 'src/@types/module';
import ModuleCard from 'src/components/auth/ModuleCard';
import { toast } from 'react-hot-toast';
import { getApi, postApi } from 'src/common/apis';
import RegisterApi from 'src/common/apis/register.api';
import { styled } from '@mui/material/styles';
import LoadingScreen from 'src/components/LoadingScreen';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { PATH_AUTH } from 'src/routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useResponsive from 'src/hooks/useResponsive';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  background: 'linear-gradient(to bottom, #541338,#050C5A)',
  minHeight: '100vh',
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(8, 0),
}));

const moudleData: Module[] = [
  {
    id: 1,
    title: 'Retailer',
    description: 'Choose if you want to sell your products online',
    isSelected: false,
  },
  {
    id: 2,
    title: 'Verifier',
    description: 'Choose if you want to sell your products online',
    isSelected: false,
  },
  {
    id: 3,
    title: 'Refiner',
    description: 'Choose if you want to sell your products online',
    isSelected: false,
  },
  {
    id: 4,
    title: 'Lease Partner',
    description: 'Choose if you want to sell your products online',
    isSelected: false,
  },
];

const SelectModule = () => {
  const smUp = useResponsive('up', 'sm');
  const [loading, setLoading] = useState(false);
  const [moduleState, setModuleState] = useState(moudleData);
  const [bgAmount, setBgAmount] = useState(false);
  const [amount, setAmount] = useState<string | number>(0);
  const navigate = useNavigate();

  const handleSelect = (id: number) => {
    // Find item by its id
    const selectedItem = moduleState.find((item) => item.id === id);

    // Update the isSelected property
    if (selectedItem) {
      selectedItem.isSelected = !selectedItem.isSelected;
      if (id === 4) {
        setBgAmount(!bgAmount);
      }
    }

    // Create a new array with the updated item
    const updatedData = moduleState
      .map((item) => (item.id === id ? selectedItem : item))
      .filter(Boolean) as Module[];

    // Update the state with the new array
    setModuleState(updatedData);
  };

  const handleNext = async () => {
    const selectedItem = moduleState.filter((item) => item?.isSelected);
    if (!selectedItem.length) {
      return toast.error('Please select any module first!');
    }

    if (selectedItem.find((item) => item.id === 4) && Number(amount) <= 0) {
      return toast.error('For lease partner Bg amount is required.');
    }
    let data = {
      retailer: false,
      verifier: false,
      leasePartner: false,
      refiner: false,
      bgOffered: amount,
    };

    selectedItem.map((item) => {
      if (item.title.toLowerCase() === 'retailer') data.retailer = true;
      if (item.title.toLowerCase() === 'verifier') data.verifier = true;
      if (item.id === 4) data.leasePartner = true;
      if (item.title.toLowerCase() === 'refiner') data.refiner = true;
    });

    const res = await postApi({ url: RegisterApi.requestModule, values: data });
    if (!res || res.errors) {
      return;
    }
    navigate(PATH_AUTH.verifyGst);
  };

  return (
    <Page title="Select Module">
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <RootStyle>
          <HeaderStyle>
            <Logo />
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Already have an account? {''}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                  Login
                </Link>
              </Typography>
            )}
          </HeaderStyle>
          <Container>
            <ContentStyle>
              <Grid container spacing={3} justifyContent="center">
                <Grid item sm={12} textAlign="center">
                  <Typography align="center" py={3} sx={{ color: '#eee' }} variant="h4">
                    Select your applicable module
                  </Typography>
                </Grid>
                {moudleData.map((item: Module) => (
                  <Grid item key={item.id}>
                    <ModuleCard
                      id={item.id}
                      title={item.title}
                      handleSelect={handleSelect}
                      description={item.description}
                      key={item.id}
                      isSelected={item?.isSelected}
                    />
                  </Grid>
                ))}
                <Grid item sm={12} textAlign="center">
                  {bgAmount && (
                    <TextField
                      type="number"
                      onChange={(e) => setAmount(e.target.value)}
                      label="BG Amount"
                    />
                  )}
                </Grid>
                <Grid item sm={12} textAlign="center">
                  <Box textAlign="center" my={2}>
                    <Button variant="contained" onClick={handleNext}>
                      {' '}
                      Proceed to next step
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              {!smUp && (
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                    Login
                  </Link>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      )}
    </Page>
  );
};

export default SelectModule;

import { useCallback, useEffect, useState } from 'react';
// @mui
import { Card, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// sections
import { useTheme } from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import { getApi } from 'src/common/apis';
import RetailerApi from 'src/common/apis/retailer.api';

// ----------------------------------------------------------------------

export default function UserManagement() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const { user } = useAuth();
  const [overViewData, setOverviewData] = useState(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getRetailerData = useCallback(async () => {
    setIsloading(true);
    const res = await getApi({ url: RetailerApi.overview });
    if (res.data) {
      console.log(res.data);
      setOverviewData(res.data);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    if (user && user.modules.retailer.agreementStatus == 'signed') {
      getRetailerData();
    }
  }, []);

  return (
    <Page title="Retailer ">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Retailer"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Retailer' }]}
        />

        <Card elevation={5} sx={{ p: 5 }}>
          Agreement Status: {user?.modules?.retailer?.agreementStatus} <br />
          BG Status: {user?.modules?.retailer?.bgStatus} <br />
        </Card>
      </Container>
    </Page>
  );
}

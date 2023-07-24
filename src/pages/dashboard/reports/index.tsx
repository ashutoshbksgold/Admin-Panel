import { useCallback } from 'react';
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

// ----------------------------------------------------------------------

export default function Reports() {
  const { themeStretch } = useSettings();
  const theme = useTheme();

  const getCustodianData = useCallback(async () => {}, []);

  return (
    <Page title="Reports ">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Reports"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Reports' }]}
        />

        <Card>hello</Card>
      </Container>
    </Page>
  );
}

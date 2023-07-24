import { useCallback } from 'react';
// @mui
import { Card, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// sections
import { useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Settings() {
  const { themeStretch } = useSettings();
  const theme = useTheme();

  const getCustodianData = useCallback(async () => {}, []);

  return (
    <Page title="Settings ">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Settings"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Settings' }]}
        />

        <Card>hello</Card>
      </Container>
    </Page>
  );
}

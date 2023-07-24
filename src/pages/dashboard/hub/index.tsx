import { useCallback, useEffect, useState } from "react";
// @mui
import { Container, Card, Typography, Box, Skeleton } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// @types
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";

// sections
import { useTheme } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import { getApi } from "src/common/apis";
import HubApi from "src/common/apis/hub.api";
import { capitalCase } from "change-case";
import BankGuranteeCard from "src/components/dashboard/BankGuranteeCard";

// ----------------------------------------------------------------------

export default function Hub() {
  const { themeStretch } = useSettings();
  const theme = useTheme();

  const { user } = useAuth();
  const [overViewData, setOverviewData] = useState(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getHubData = useCallback(async () => {
    setIsloading(true);
    const res = await getApi({ url: HubApi.overview });
    if (res.data) {
      setOverviewData(res.data);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    if (user && user.modules.hub.agreementStatus == "signed") {
      getHubData();
    }
  }, []);

  return (
    <Page title="Hub ">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs
          heading="Hub"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Hub" },
          ]}
        />

        <Box display="flex" flexWrap="wrap" sx={{ gap: 3, mb: 3 }}>
          {!isLoading ? (
            overViewData &&
            Object.keys(overViewData).map((item) => (
              <Card key={item} sx={{ minWidth: 280, p: 5 }} elevation={8}>
                <Typography color="text.secondary">
                  {" "}
                  {capitalCase(item)}
                </Typography>
                <Typography variant="h4">{overViewData[item]}</Typography>
              </Card>
            ))
          ) : (
            <>
              <Skeleton variant="rectangular" width={280} height={150} />
              <Skeleton variant="rectangular" width={280} height={150} />
              <Skeleton variant="rectangular" width={280} height={150} />
              <Skeleton variant="rectangular" width={280} height={150} />
              <Skeleton variant="rectangular" width={280} height={150} />
              <Skeleton variant="rectangular" width={280} height={150} />
            </>
          )}
        </Box>

        <BankGuranteeCard />
      </Container>
    </Page>
  );
}

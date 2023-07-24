import { useCallback, useEffect, useState } from "react";
// @mui
import { Box, Card, Container, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";

// sections
import { useTheme } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import { getApi } from "src/common/apis";
import CustodianApi from "src/common/apis/custodian.api";
import { Icon } from "@iconify/react";
import { capitalCase } from "change-case";
import BankGuranteeCard from "src/components/dashboard/BankGuranteeCard";

// ----------------------------------------------------------------------

export default function Custodian() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const { user } = useAuth();
  const [overViewData, setOverviewData] = useState(null);

  console.log("log:profile ");

  const getCustodianData = useCallback(async () => {
    const res = await getApi({ url: CustodianApi.overview });
    if (res.data) {
      setOverviewData(res.data);
    }
  }, []);

  useEffect(() => {
    if (user && user.modules.custodian.agreementStatus == "signed") {
      getCustodianData();
    }
  }, []);

  return (
    <Page title="Custodian ">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs
          heading="Custodian"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Custodian" },
          ]}
        />

        <BankGuranteeCard />

        <Box display="flex" flexWrap="wrap" sx={{ gap: 3 }}>
          {overViewData ? (
            Object.keys(overViewData).map((item) => (
              <Card key={item} sx={{ minWidth: 280, p: 5 }} elevation={8}>
                <Typography variant="h4">
                  {(item === "due" || item == "revenue") && (
                    <Icon icon="mdi:rupee" />
                  )}
                  {overViewData[item]}
                  {(item === "custodyGiven" || item == "custodyRelease") && (
                    <> gm</>
                  )}
                </Typography>
                <Typography color="text.secondary">
                  {" "}
                  {capitalCase(item)}
                </Typography>
              </Card>
            ))
          ) : (
            <>
              <Skeleton variant="rectangular" width={280} height={150} />
              <Skeleton variant="rectangular" width={280} height={150} />
              <Skeleton variant="rectangular" width={280} height={150} />
              <Skeleton variant="rectangular" width={280} height={150} />
            </>
          )}
        </Box>
      </Container>
    </Page>
  );
}

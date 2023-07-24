import { useCallback, useEffect, useState } from "react";
// @mui
import { Box, Card, Container, Skeleton, Typography } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";

// sections
import { useTheme } from "@mui/material";
import { getApi } from "src/common/apis";
import useAuth from "src/hooks/useAuth";
import VerifierApi from "src/common/apis/verifier.api";
import { capitalCase } from "change-case";
import BankGuranteeCard from "src/components/dashboard/BankGuranteeCard";

// ----------------------------------------------------------------------
type VerifierOverview = {
  verificationDetails: any;
  verificationCancelledRevenue: string | number;
  verificationSucceedRevenue: string | number;
};

const initailState = {
  verificationDetails: {},
  verificationCancelledRevenue: "",
  verificationSucceedRevenue: "",
};

export default function Verifier() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const { user } = useAuth();
  const [overViewData, setOverviewData] =
    useState<VerifierOverview>(initailState);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getVerifierData = useCallback(async () => {
    setIsloading(true);
    const res = await getApi({ url: VerifierApi.overview });
    if (res.data) {
      setOverviewData(res.data);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    if (user && user.modules.verifier.agreementStatus == "signed") {
      getVerifierData();
    }
  }, []);

  return (
    <Page title="Verifier ">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs
          heading="Verifier"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Verifier" },
          ]}
        />

        <Card sx={{ p: 2, mb: 3, maxWidth: "80%" }}>
          <Box>
            <Typography color="primary.light" fontSize={20} fontWeight={600}>
              Order Statitics
            </Typography>
          </Box>
        </Card>

        <Box display="flex" flexWrap="wrap" sx={{ gap: 3, mb: 3 }}>
          {!isLoading ? (
            Object.keys(overViewData?.verificationDetails).map((item) => (
              <Card key={item} sx={{ minWidth: 280, p: 5 }} elevation={8}>
                <Typography color="text.secondary">
                  {" "}
                  {capitalCase(item)}
                </Typography>
                <Typography variant="h4">
                  {overViewData?.verificationDetails[item]}
                </Typography>
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

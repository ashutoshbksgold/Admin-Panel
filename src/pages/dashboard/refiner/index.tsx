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
import useAuth from "src/hooks/useAuth";
import { getApi } from "src/common/apis";
import RefinerApi from "src/common/apis/refiner.api";
import { capitalCase } from "change-case";

// ----------------------------------------------------------------------

export default function Refiner() {
  const { themeStretch } = useSettings();
  const theme = useTheme();

  const { user } = useAuth();
  const [overViewData, setOverviewData] = useState(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getRefinerData = useCallback(async () => {
    setIsloading(true);
    const res = await getApi({ url: RefinerApi.overview });
    if (res.data) {
      setOverviewData(res.data);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    if (user && user.modules.refiner.agreementStatus == "signed") {
      getRefinerData();
    }
  }, []);

  console.log("log: refiner", user);

  return (
    <Page title="Refiner ">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs
          heading="Refiner"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Refiner" },
          ]}
        />
        <Card sx={{ p: 5 }}>
          <Typography>
            Agreement Status : {user && user.modules.refiner.agreementStatus}
          </Typography>
          <Typography>
            Bg Status : {user && user.modules.refiner.bgStatus}
          </Typography>
        </Card>
      </Container>
    </Page>
  );
}

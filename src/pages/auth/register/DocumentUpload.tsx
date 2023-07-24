import { Icon } from '@iconify/react';
import { Box, Card, MenuItem, TextField, Typography, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import useResponsive from 'src/hooks/useResponsive';
import { PATH_AUTH } from 'src/routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getApi, postApi } from 'src/common/apis';
import RegisterApi from 'src/common/apis/register.api';
import { toast } from 'react-hot-toast';
import useAuth from 'src/hooks/useAuth';
import { LoadingButton } from '@mui/lab';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '2px solid',
  borderColor: 'primary',
  minWidth: 180,
  textAlign: 'center',
  cursor: 'pointer',
}));

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

interface BusinessDocuemnt {
  name: string;
  value: string;
}

// Type for each item in 'doc'
interface BusinessType {
  name: string;
  value: string;
  document: BusinessDocuemnt[];
}

const doc = [
  {
    name: 'Limited Liability Partnership',
    value: 'llp',
    document: [
      {
        name: 'Certificates Of Incorporations',
        value: 'certificate_of_incorporation',
      },
    ],
  },
  {
    name: 'Private Limited',
    value: 'pvt_ltd',
    document: [
      {
        name: 'Certificates Of Incorporations',
        value: 'certificate_of_incorporation',
      },
    ],
  },
  {
    name: 'Public Limited',
    value: 'pub_ltd',
    document: [
      {
        name: 'Certificates Of Incorporations',
        value: 'certificate_of_incorporation',
      },
    ],
  },
  {
    name: 'Partnership',
    value: 'partnership',
    document: [
      {
        name: 'Partnership Deed',
        value: 'partnership_deed',
      },
    ],
  },
  {
    name: 'Proprietorship',
    value: 'sole_proprietorship',
    document: [
      {
        name: 'Certificates Of Incorporations',
        value: 'owner_pan',
      },
    ],
  },
  {
    name: 'Hindu United Family',
    value: 'huf',
    document: [
      {
        name: 'HUF Deed',
        value: 'huf_deed',
      },
    ],
  },
];
const initialValue = {
  name: '',
  value: '',
  document: [],
};

const DocumentUpload = () => {
  const [loading, setLoading] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const smUp = useResponsive('up', 'sm');
  const [businessDocument, setBusinessDocument] = useState<BusinessType>(initialValue);
  const navigate = useNavigate();
  const [uploadFile, setUploadFile] = useState<any>({
    document,
    name: '',
  });

  const { user } = useAuth();
  //function for getting files
  const handleFile = (event: any, item: BusinessDocuemnt) => {
    const file = event.target.files[0];
    setUploadFile({
      document: file,
      name: item.value,
    });
  };

  const handleNoSelect = () => {
    toast.error('please Select Business Type First');
  };

  const getRequiredDocument = async () => {
    const res = await getApi({ url: RegisterApi.getRequiredDocument });
    console.log(res.data);
    if (res.data) {
      setDocumentList(res.data);
    }
  };

  const handleBusinessTypeChange = (event: any) => {
    const selectedBusinessValue = event.target.value;
    const selectedBusiness = doc.find((item) => item.value === selectedBusinessValue);
    if (selectedBusiness) {
      console.log('log: selected', selectedBusiness);
      setBusinessDocument(selectedBusiness);
    } else {
      setBusinessDocument(initialValue); // Set an empty array if no business type is selected
    }
  };

  //Upload document
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('document', uploadFile.document);
    formData.append('name', uploadFile.name);
    formData.append('companyType', businessDocument.value);
    setLoading(true);
    const res = await postApi({
      url: RegisterApi.uploadDocument,
      values: formData,
      showToast: true,
    });
    console.log(res);
    setLoading(false);
    if (!res) {
      return;
    }
    navigate(PATH_AUTH.authorizationDetails);
  };

  useEffect(() => {
    if (user && user.documentStatus == 'not_uploaded') {
      getRequiredDocument();
    } else {
      navigate(PATH_AUTH.authorizationDetails);
    }
  }, [user]);

  return (
    <Page title="Upload Document">
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
            <Card sx={{ p: 5, display: 'flex' }}>
              <Box flex=".5" margin="auto" textAlign="center">
                <Typography fontWeight={600} color="primary.light" py={5}>
                  Select Your Business Type
                </Typography>

                <TextField
                  onChange={handleBusinessTypeChange}
                  select
                  label="Select business"
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  {doc.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box flex=".5">
                <Typography
                  textAlign="center"
                  color="primary.light"
                  mb={2}
                  fontWeight={600}
                  variant="h5"
                >
                  Submit Documents
                </Typography>

                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                  {businessDocument?.document?.length ? (
                    businessDocument?.document?.map((item: BusinessDocuemnt, index: number) => (
                      <StyledCard key={index}>
                        <div>
                          <input
                            id="icon-button-file"
                            type="file"
                            name="file"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFile(e, item)}
                          />
                          <label htmlFor="icon-button-file" style={{ cursor: 'pointer' }}>
                            <Icon icon="material-symbols:upload" height={75} width={75} />
                          </label>
                        </div>
                        <Typography>{item?.name}</Typography>
                      </StyledCard>
                    ))
                  ) : (
                    <StyledCard>
                      <Icon
                        icon="material-symbols:upload"
                        height={75}
                        width={75}
                        onClick={handleNoSelect}
                      />
                      <Typography>Upload Document</Typography>
                    </StyledCard>
                  )}
                </Box>

                <Box textAlign="center" mt={3}>
                  <LoadingButton loading={loading} variant="contained" onClick={handleUpload}>
                    Submit Documents
                  </LoadingButton>
                </Box>
              </Box>
            </Card>

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
    </Page>
  );
};

export default DocumentUpload;

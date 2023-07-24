// material
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';

import { CloseIcon } from 'src/theme/overrides/CustomIcons';
import { Breakpoint } from '@mui/system';

// -----------------------------Custom Modal-----------------------------//

type Props = {
  title: string;
  open: boolean;
  maxWidth?: false | Breakpoint | undefined;
  onClose: () => void; // Fix the type declaration here
  fullWidth?: boolean;
  children: any;
  dialogActions?: any;
  minHeight?: Breakpoint | undefined | number;
};

export default function CustomModal({
  title = '',
  open,
  maxWidth = 'md',
  onClose = () => {},
  fullWidth = true,
  children,
  dialogActions,
  minHeight = 300,
}: Props) {
  return (
    <Dialog open={open} maxWidth={maxWidth} onClose={onClose} fullWidth={fullWidth}>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">{title}</Typography>
          {onClose && (
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ minHeight }}>{children}</DialogContent>
      {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
    </Dialog>
  );
}

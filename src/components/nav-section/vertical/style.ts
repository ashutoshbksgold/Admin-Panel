import { ReactNode } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  LinkProps,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  ListItemButtonProps,
} from '@mui/material';
// config
import { ICON, NAVBAR } from '../../../config';

// ----------------------------------------------------------------------

type IProps = LinkProps & ListItemButtonProps;

export interface ListItemStyleProps extends IProps {
  component?: ReactNode;
  to?: string;
  activeRoot?: boolean;
  activeSub?: boolean;
  subItem?: boolean;
  roles?: string[];
}

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem',
})<ListItemStyleProps>(({ activeRoot, activeSub, subItem, theme }) => ({
  ...theme.typography.body2,
  position: 'relative',
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  // activeRoot
  ...(activeRoot && {
    ...theme.typography.subtitle2,
    color: theme.palette.primary.contrastText,   //changes 
    // backgroundColor: alpha(theme.palette.primary.activeText, theme.palette.action.selectedOpacity),
    backgroundColor: theme.palette.primary.activeText,  //changes
    borderLeft: "2px solid"  //changes
    
  }),

    // Non activeRoot
    ...(!activeRoot && {
      ...theme.typography.subtitle2,
      color: theme.palette.primary.nonActive,   //changes
      
    }),
  // activeSub
  ...(activeSub && {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
  }),
  // subItem
  ...(subItem && {
    height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
  }),
}));

interface ListItemTextStyleProps extends ListItemButtonProps {
  isCollapse?: boolean;
}

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})<ListItemTextStyleProps>(({ isCollapse, theme }) => ({
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['width', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
});
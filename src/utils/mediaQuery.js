/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme, useMediaQuery } from '@mui/material';

// TODO: Convert to provider
export const isMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

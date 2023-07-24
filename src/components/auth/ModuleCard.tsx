import { Card, Typography, Box } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';

type ModuleCardProps = {
  id: number;
  title: string;
  description: string;
  isSelected: boolean;
  handleSelect: (id: number) => any;
};

const ModuleCard = ({
  id,
  title = '',
  description = '',
  isSelected = true,
  handleSelect,
}: ModuleCardProps) => {
  return (
    <Card
      sx={{ textAlign: 'center', cursor: 'pointer', maxWidth: 338 }}
      onClick={() => handleSelect(id)}
    >
      {isSelected ? (
        <Box sx={{ backgroundColor: '#6DF281' }} py={1}>
          <Typography textAlign="center"> SELECTED </Typography>
        </Box>
      ) : (
        <Box py={1} minHeight={16} color="#fff">
          .
        </Box>
      )}
      <Box p={3}>
        <Icon icon="ion:bag" width="81" height="85" />
        <Typography fontSize={20} fontWeight={700}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Card>
  );
};

export default ModuleCard;

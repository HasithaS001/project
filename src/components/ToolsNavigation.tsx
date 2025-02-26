import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import { toolRoutes } from '../routes/toolRoutes';

const ToolsNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || '';

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/tools/${newValue}`);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs 
        value={currentPath}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="writing tools navigation"
      >
        {toolRoutes.map((route) => (
          <Tab
            key={route.path}
            value={route.path}
            label={route.title}
            id={`tool-tab-${route.path}`}
            aria-controls={`tool-tabpanel-${route.path}`}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ToolsNavigation;

import React from 'react';

import {
  Box,
  Card,
  Paper,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import StyledComponentTests from '../components/styledComponentTests';

interface ITabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}

function TabPanel(props : ITabPanelProps) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function ColorTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value={0} label="Item One" />
        <Tab value={1} label="Item Two" />
        <Tab value={2} label="Item Three" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography p={2}>
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...
          is a card... This is a card... This is a card... This is a card...
          This is a card... This is a card... This is a card... This is a card...

        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>
          Item Two
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>
          Item Three
        </Typography>
      </TabPanel>
    </Box>
  );
}

export default function ProfilePage() {
  return (
    <div>
      <Box p={5}>
        <Paper elevation={7}>
          <Typography variant="h3" p={2}>
            This is the homepage
          </Typography>
        </Paper>
        <Card>
          <Typography variant="h3" p={2}>
            This is a card...
          </Typography>
        </Card>
      </Box>
      <Box p={3}>
        <StyledComponentTests />
      </Box>
      <Card>
        <ColorTabs />
      </Card>
    </div>
  );
}

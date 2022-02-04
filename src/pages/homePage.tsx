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
          <Typography>{children}</Typography>
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
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

export default function HomePage() {
  return (
    <div>
      <header>
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
        </Card>
      </header>
    </div>
  );
}

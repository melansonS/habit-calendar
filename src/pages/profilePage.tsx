import React from 'react';

import {
  Box,
  Card,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@mui/material';

// @ts-ignore
import audio0 from '../audio/mixkit-cool-interface-click-tone-2568.wav';
// @ts-ignore
import audio1 from '../audio/mixkit-single-key-press-in-a-laptop-2541.wav';
// @ts-ignore
import audio2 from '../audio/mixkit-slide-click-1130.wav';
// @ts-ignore
import audio3 from '../audio/mixkit-plastic-bubble-click-1124.wav';

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

const playAudio = (index: number) => {
  const audioArray = [audio0, audio1, audio2, audio3];
  new Audio(audioArray[index]).play();
};

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
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h4" align="center">
          Audio!
        </Typography>
        <Box p={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button onClick={() => playAudio(0)}>cool-interface-click-tone</Button>
          <Button onClick={() => playAudio(1)}>single-key-press-in-a-laptop</Button>
          <Button onClick={() => playAudio(2)}>slide-click</Button>
          <Button onClick={() => playAudio(3)}>plastic-bubble-click</Button>
        </Box>
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
          <Card>
            <ColorTabs />
          </Card>
        </Paper>
      </Box>
    </div>
  );
}

import React from 'react';
import './App.css';

import ControlledSlyder from '@mui/material/Slider';
import { Typography } from '@mui/material';
import styled from 'styled-components';

// Using styed components' styled function in conjuction with their transient props
// which aren't pased down through to DOM elements ie; $customColor

type CustomSliderProps = {
  $customColor?: string,
  ree?: number,
}

type MyOwnDivProps = {
  textValue: string
}

const CustomSlider = styled(ControlledSlyder)({
  background: 'red',
});

const CustomSliderTwo = styled(ControlledSlyder)((props : CustomSliderProps) => ({
  color: props.$customColor,
  width: '50%',
  paddingLeft: props.ree || 0,
}));

function MyOwnDiv({ textValue } : MyOwnDivProps) {
  return (<div>{textValue}</div>);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h3" gutterBottom>MUI Typescript Playground</Typography>
        <ControlledSlyder defaultValue={23} />
        <CustomSlider defaultValue={50} />
        <CustomSliderTwo defaultValue={25} $customColor="violet" />
      </header>
      <MyOwnDiv textValue="cool and interactive testing" />
    </div>
  );
}

export default App;

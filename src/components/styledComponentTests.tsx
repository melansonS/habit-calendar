import React, { useState } from 'react';

import ControlledSlyder from '@mui/material/Slider';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// import styled from 'styled-components';
// Using styed components' styled function in conjuction with their transient props
// which aren't pased down through to DOM elements ie; $customColor

// using the MUI styled engine for styled-components
// striping transient props with the shouldForwardProp styledConfig Option
const transientConfig = {
  shouldForwardProp: (prop : string | number | symbol) => typeof prop === 'string' && prop[0] !== '$',
};

type CustomSliderProps = {
  $customColor?: string,
  ree?: number,
}
const CustomBox = styled(Box)`
  background-color: navy;
`;

const CustomSlider = styled(ControlledSlyder, transientConfig)(
  (props: CustomSliderProps) => ({
    color: props.$customColor,
  }),
);

const CustomSliderTwo = styled(ControlledSlyder, transientConfig)(
  (props : CustomSliderProps) => ({
    color: props.$customColor,
    width: '50%',
    paddingLeft: props.ree || 0,
  }),
);

export default function StyledComponentTests() {
  const [sliderValue, setSliderValue] = useState(10);

  const updateSliderValue = () => {
    setSliderValue(sliderValue + 1);
  };

  return (
    <div>
      <ControlledSlyder defaultValue={23} />
      <CustomSlider
        value={sliderValue}
        onChange={(e, newValue) => {
          setSliderValue(newValue as number);
        }}
        $customColor="maroon"
      />
      <CustomBox>
        <h1>is box</h1>
      </CustomBox>
      <CustomSliderTwo defaultValue={25} $customColor="violet" />
      <Button variant="contained" onClick={updateSliderValue}>+1</Button>
    </div>
  );
}

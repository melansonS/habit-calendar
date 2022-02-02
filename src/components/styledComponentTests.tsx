import React from 'react';

import ControlledSlyder from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

// import styled from 'styled-components';
// Using styed components' styled function in conjuction with their transient props
// which aren't pased down through to DOM elements ie; $customColor

type CustomSliderProps = {
  $customColor?: string,
  ree?: number,
}

const CustomSlider = styled(ControlledSlyder)`
  background:red;
`;

// using the MUI styled engine for styled-components
// striping transient props with the shouldForwardProp styledConfig Option

const CustomSliderTwo = styled(ControlledSlyder, {
  shouldForwardProp: (prop : string | number | symbol) => typeof prop === 'string' && prop[0] !== '$',
})(
  (props : CustomSliderProps) => ({
    color: props.$customColor,
    width: '50%',
    paddingLeft: props.ree || 0,
  }),
);

export default function StyledComponentTests() {
  return (
    <div>
      <ControlledSlyder defaultValue={23} />
      <CustomSlider defaultValue={50} />
      <CustomSliderTwo defaultValue={25} $customColor="violet" />
    </div>
  );
}

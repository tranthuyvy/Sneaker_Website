import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = [
  "PLACED",
  'CONFIRMED',
  'SHIPPED',
  'DELIVERED',
  'SUCCESS'
];
export default function OrderTraker({activeStep}) {
    
  return (
    <Box sx={{ width: '100%' }} >
      
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel  sx={{ color: '#9155FD',fontSize: '45px' }}  className={``}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

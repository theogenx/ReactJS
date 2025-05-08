import * as React from 'react';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box;

// npm install material-mui-date-range-picker

export default function DateRangePickerComponent() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <DateRangePicker
      startText="Startdatum"
      endText="Enddatum"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      renderInput={(startProps, endProps) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField {...startProps} />
          <TextField {...endProps} />
        </Box>
      )}
    />
  );
}

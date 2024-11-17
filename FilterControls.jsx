import React from 'react';
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

function FilterControls({ orderBy, setOrderBy }) {
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        

        <FormControl fullWidth>
          <InputLabel>Room</InputLabel>
          <Select label="Room" value="">
            <MenuItem value="">All Rooms</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Student</InputLabel>
          <Select label="Student" value="">
            <MenuItem value="">All Students</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Student status</InputLabel>
          <Select label="Student status" value="">
            <MenuItem value="">All Statuses</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ mb: 2 }}>
        <Typography component="span" color="text.secondary">
          Order by
        </Typography>
        <Select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          size="small"
          sx={{ ml: 1 }}
        >
          <MenuItem value="recent">Most recent</MenuItem>
          <MenuItem value="oldest">Unread</MenuItem>
        </Select>
      </Box>
    </>
  );
}

export default FilterControls;
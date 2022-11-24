import * as React from 'react';
import MuiChip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

export default function IconChips() {
  return (
    <Stack direction="row" spacing={1}>
      <MuiChip icon={<HeadsetMicIcon />} label="실시간 문의는 내일 오전 9시부터 가능합니다" />
    </Stack>
  );
}
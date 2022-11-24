import { TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';

const format = 'HH:mm';

const AntdTimePicker: React.FC = () => <TimePicker
    defaultValue={moment('12:08', format)}
    format={format}
    placeholder="시간 선택"
    size='large'
/>;

export default AntdTimePicker;
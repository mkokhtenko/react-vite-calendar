import { FC } from 'react';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { IEvent } from '../../../models/IEvent';

interface EventCalendarProps {
  events: IEvent[];
}


export const EventCalendar: FC<EventCalendarProps> = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <Calendar onPanelChange={onPanelChange} />;
};
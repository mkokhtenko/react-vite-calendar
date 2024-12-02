import { FC, PropsWithChildren } from 'react';
import { Calendar, CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { IEvent } from '../../../models/IEvent';
import { formatDate } from '../../../utlis/date';

interface EventCalendarProps {
  events: IEvent[];
}

export const EventCalendar: FC<EventCalendarProps> = (props: PropsWithChildren<EventCalendarProps>) => {
  const dateCellRender = (value: Dayjs) => {
    const formatedData = formatDate(value.toDate());
    const currentDaysEvents = props.events.filter (ev => ev.date === formatedData);
    return (
      <ul className="events">
        {currentDaysEvents.map((event: IEvent, index: number) => (
          <li key={index}>{event.description}</li>
        ))}
      </ul>
    );
  };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
      if (info.type === 'date') return dateCellRender(current);
      return info.originNode;
    };

  return <Calendar style={{ padding: '24px' }} cellRender={cellRender} />;
};

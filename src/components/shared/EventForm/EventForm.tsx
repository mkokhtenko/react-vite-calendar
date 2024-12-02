import { FC, useState } from 'react';
import { Form, Input, Button, DatePicker, Row, Select } from 'antd';
import { rules } from '../../../utlis/rules';
import { IUser } from '../../../models/IUser';
import { PropsWithChildren } from 'react';
import { IEvent } from '../../../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../../../utlis/date';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface EventFormProps {
  guests: IUser[],
  submit: (event: IEvent) => void
}

export const EventForm: FC<EventFormProps> = (props: PropsWithChildren<EventFormProps>) => {
  const { user } = useTypedSelector((state) => state.auth);

  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: '',
  } as IEvent);

  const selectDate = (date: Moment | null) => {
    if (date) {
      const formattedDate = formatDate(date.toDate());
      setEvent({ ...event, date: formattedDate });
    }
  };

  const submitForm = () => {
    props.submit({ ...event, author: user.username });
  };

  return (
    <Form name="basic" onFinish={submitForm}>
      <Form.Item label="Event Description" name="description" rules={[rules.required()]}>
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Date" name="date" rules={[rules.required()]}>
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label="Guest" name="guest" rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })} style={{ width: 140 }}>
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Add event
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

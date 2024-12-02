import { FC, useEffect } from 'react';
import { EventCalendar } from '../../components/shared';
import Layout from 'antd/es/layout/layout';
import { Button, Modal, Row } from 'antd';
import { useState } from 'react';
import { EventForm } from '../../components/shared/EventForm/EventForm';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IEvent } from '../../models/IEvent';

export const EventPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { guests, events } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth )

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setIsModalOpen(false);
    createEvent(event);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout style={{ padding: '24px' }}>
      <Row style={{ padding: '14px 0 24px ' }}>
        <Button onClick={showModal}>Add event</Button>
      </Row>
      <EventCalendar events={events} />
      <Modal title="Add Event" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

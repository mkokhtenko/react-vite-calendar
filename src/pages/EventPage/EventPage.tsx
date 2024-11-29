import { FC, useEffect } from 'react';
import { EventCalendar } from '../../components/shared';
import Layout from 'antd/es/layout/layout';
import { Button, Modal, Row } from 'antd';
import { useState } from 'react';
import { EventForm } from '../../components/shared/EventForm/EventForm';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const EventPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchGuests } = useActions();
  const { guests } = useTypedSelector((state) => state.event);

  useEffect(() => {
    fetchGuests();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout style={{padding: '48px'}}>
      <EventCalendar />
      <Row justify="center">
        <Button onClick={showModal}>Add event</Button>
      </Row>
      <Modal
        title="Add Event"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <EventForm guests={guests} />
      </Modal>
    </Layout>
  );
};

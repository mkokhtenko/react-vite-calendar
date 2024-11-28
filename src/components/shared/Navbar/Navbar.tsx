import { FC } from 'react';
import { Header } from 'antd/es/layout/layout';
import type { MenuProps } from 'antd';
import { Menu, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';

type MenuItem = Required<MenuProps>['items'][number];

export const Navbar: FC = () => {
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();
  const location = useLocation();

  const currentKey =
    location.pathname === '/event' ? 'event' : location.pathname === '/about' ? 'about' : 'login';

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);

    if (e.key === 'logout') {
      logout();
    }
  };

  const publicItems: MenuItem[] = [
    {
      label: <Link to="about">About</Link>,
      key: 'about',
    },
    {
      label: <Link to="">Login</Link>,
      key: 'login',
    },
  ];

  const privateItems: MenuItem[] = [
    {
      label: <Link to="event">Event</Link>,
      key: 'event',
    },
    {
      label: 'Log out',
      key: 'logout',
    },
  ];

  return (
    <Header>
      <Row justify="end">
        {isAuth && <div style={{ color: 'white' }}>{ user.username }</div>}
        <Menu
          onClick={onClick}
          selectedKeys={[currentKey]}
          theme="dark"
          mode="horizontal"
          items={isAuth ? privateItems : publicItems}
          selectable={false}
          disabledOverflow
        />
      </Row>
    </Header>
  );
};

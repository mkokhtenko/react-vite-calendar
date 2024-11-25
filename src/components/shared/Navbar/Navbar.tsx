import { FC, useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import type { MenuProps } from 'antd';
import { Menu, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

type MenuItem = Required<MenuProps>['items'][number];

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
    label: <Link to="">Log out</Link>,
    key: 'log out',
  },
];

export const Navbar: FC = () => {
  const [current, setCurrent] = useState('login');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const { isAuth } = useTypedSelector((state) => state.auth);

  return (
    <Header>
      <Row justify="end">
        {isAuth && <div style={{ color: 'white' }}>Username</div>}
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
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

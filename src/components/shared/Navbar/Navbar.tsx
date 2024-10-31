import { FC, useState } from 'react'
import { Header } from 'antd/es/layout/layout'
import type { MenuProps } from 'antd'
import { Menu, Row } from 'antd'
import { Link } from 'react-router-dom'

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
      
      const auth = false;
  return (
    <Header>
      <Row justify="end">
        {auth && <div style={{ color: 'white' }}>Username</div>}
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          theme="dark"
          mode="horizontal"
          items={auth ? privateItems : publicItems}
          selectable={false}
          disabledOverflow
        />
      </Row>
    </Header>
  );
}

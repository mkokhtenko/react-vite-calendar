import { FC, useState, useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { rules } from '../../../utlis/rules';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const LoginForm: FC = () => {
  const { error, isLoading, isAuth } = useTypedSelector((state) => state.auth);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useActions();
  const navigate = useNavigate();

  const submit = () => {
    login(username, password);
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/event');
    }
  }, [isAuth, navigate]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={submit}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      {error && (
        <div style={{ color: 'red' }}>
          {error} <br />
          <br />
        </div>
      )}
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[rules.required('Please input your username!')]}>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[rules.required('Please input your password!')]}>
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

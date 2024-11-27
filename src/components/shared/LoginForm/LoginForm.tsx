import { FC } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { rules } from '../../../utlis/rules';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../../../store/reducers/auth/action-creators';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

// const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//   console.log('Success:', values);
// }

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useTypedSelector((state) => state.auth);

  const submit = () => {
    dispatch(AuthActionCreators.login('test', '123'));
  };

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
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[rules.required('Please input your password!')]}>
        <Input.Password />
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

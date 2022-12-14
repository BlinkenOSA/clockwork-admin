import React, {useState, useEffect} from 'react';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Alert, Form, Input, Button } from 'antd';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Getting the error details from URL
    if (router.query.error) {
      switch(router.query.error) {
        case 'SessionRequired':
          setLoginError('Your session expired, please log in again!')
          break;
        default:
          setLoginError(router.query.error)
          break;
      }
    }
  }, [router]);

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const response = await signIn('credentials',
      {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: "/"
      }
    );

    if (response.error) {
      switch (response.error) {
        case 'serverProblem':
          setLoginError('There seems to be an issue with the backend server. Please try again later!');
          break;
        case 'badCredentials':
          setLoginError('Your login credentials are not valid. Please try again with different username and password!');
          break;
      }
      setLoading(false);
    } else {
      await router.push(response.url)
    }
  };

  return (
    <React.Fragment>
      {
        loginError !== '' &&
        <Alert message={loginError} type="error" closable style={{margin: '20px 0'}} onClose={() => setLoginError('')}/>
      }
      <Form
        style={{marginTop: '10px'}}
        name="login"
        initialValues={{ username: '', password: '' }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input addonBefore={<UserOutlined/>}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password addonBefore={<LockOutlined/>}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  )
};

export default LoginForm;

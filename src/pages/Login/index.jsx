import { Card, Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';

import { loginAction } from '../../redux/actions';

function LoginPage({ login }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <div style={{ width: 500, margin: '16px auto' }}>
      <Card size="small">
      <h2>LOGIN</h2>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => login(values)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(loginAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);

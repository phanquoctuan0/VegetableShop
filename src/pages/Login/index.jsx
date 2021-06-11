import { Card, Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';

import { loginAction } from '../../redux/actions';
import './style.css';

function LoginPage({ login }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <div className='login-form'>
      <h2 style={{ padding: "10px 230px" }}>ĐĂNG NHẬP</h2>
      {/* <Card size="small"> */}
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values) => login(values)}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Nhớ mât khẩu</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
           </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}><a href="http://localhost:3000/register">Đăng ký</a>
          </Button>
        </Form.Item>
      </Form>
      {/* </Card> */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(loginAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);

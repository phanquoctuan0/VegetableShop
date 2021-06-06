import { Form, Input, Select, Checkbox, Button, Card } from 'antd';
import { connect } from 'react-redux';

import { registerAction } from '../../redux/actions';

function RegisterPage( {register} ) {
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    register(values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div style={{ width: 700, margin: "15px auto", padding: 15, backgroundColor: "#edeae6" }}>
      <h2 style={{ padding: "10px 230px" }}>ĐĂNG KÝ TÀI KHOẢN</h2>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'E-mail không đúng định dạng!',
              },
              {
                required: true,
                message: 'Vui lòng nhập E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Nhập lại mật khẩu của bạn',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Mật khẩu của bạn không trùng khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Họ tên"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ tên',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="SĐT"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Chấp nhận điều khoản')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              Tôi đã đọc <a href="">điều khoản</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Đăng ký
        </Button>
          </Form.Item>
        </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (params) => dispatch(registerAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(RegisterPage);

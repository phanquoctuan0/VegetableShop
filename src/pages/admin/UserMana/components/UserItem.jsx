import { useState } from 'react';
import '../styles.css'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Modal, Button, Space, Form, Input, Select, Checkbox, Card } from 'antd';

function UserItem(props) {
  const {
    id,
    name,
    email,
    handleDeleteUser,
    isModalVisible,
    setIsModalVisible,
    handleEditUser
  } = props;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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

  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  console.log("🚀 ~ file: userItem.jsx ~ line 53 ~ UserItem ~ onFinish", onFinish)

  const role = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
    { label: 'Ban', value: 'banned' },
  ];

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
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
    <>
      <Modal title="Chỉnh sửa thông tin" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Space>
          <Card size="small">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={(values) => { handleEditUser(id, values); }}
              initialValues={{
                prefix: '86',
              }}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
                values = {email}
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="name"
                label="Nickname"
                value = {name}
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
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
              <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Missing area' }]}>
                <Select options={role} onChange={handleChange} />
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Change
              </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Modal>
      <tr>
        <td>
          {id}
        </td>
        <td>
          {name}
        </td>
        <td>
          {email}
        </td>
        <td className='icon-options'>
          <btn onClick={() => { handleDeleteUser(id) }}>
            <span>
              <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
            </span>
          </btn>
          <button >
            <span>
              <EditOutlined onClick={showModal} style={{ color: 'blue', cursor: 'pointer' }} />
            </span>
          </button>
        </td>
      </tr>
    </>
  )
}
export default UserItem;
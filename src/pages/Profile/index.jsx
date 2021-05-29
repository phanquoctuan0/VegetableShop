import { useEffect, useState } from 'react';
import {
  Row,
  Space,
  Button,
  Form,
  Input,
  Tabs,
} from 'antd';
import history from '../../utils/history';

import { connect } from 'react-redux';
import { CheckCircleTwoTone } from '@ant-design/icons';
import ItemProduct from '../ProductList/components/ItemProduct';
import {
  getUserInfoAction,
  updatePasswordAction,
  updateProfileAction
} from '../../redux/actions';

function ProfilePage({
  updateProfile,
  updatePassword,
}) {
  const [amount, setAmount] = useState(1);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log("🚀 ~ file: index.jsx ~ line 39 ~ userInfo", userInfo);

  const [userForm] = Form.useForm();
  const [repassForm] = Form.useForm();

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Thông tin tài khoản" key="1">
          <div style={{ width: 700, margin: '0px auto 15px auto', padding: 15, backgroundColor: "#edeae6" }}>
            <h2>Thông tin tài khoản</h2>
            <Form
              form={userForm}
              layout="vertical"
              name="productForm"
              initialValues={{
                email: userInfo.email,
                name: userInfo.name,
                phone: userInfo.phone,
              }}
              onFinish={(values) => {
                const user = {
                  id: userInfo.id,
                  email: values.email,
                  name: values.name,
                  phone: values.phone,
                }
                updateProfile({
                  user: user
                })
              }}
            >
              <Form.Item name="email" label="Email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item name="name" label="Họ tên">
                <Input placeholder="Họ tên">
                </Input>
              </Form.Item>
              <Form.Item name="phone" label="SĐT">
                <Input placeholder="SĐT" />
              </Form.Item>
              <Row justify="end">
                <Space>
                  <Button
                    htmlType="submit"
                    style={{ backgroundColor: "#d42c2c", color: "white" }}
                  >Lưu</Button>
                </Space>
              </Row>
            </Form>
          </div>
        </TabPane>
        <TabPane tab="Đổi mật khẩu" key="2">
          <div style={{ width: 700, margin: '0px auto 15px auto', padding: 15, backgroundColor: "#edeae6" }}>
            <h2>Đổi mật khẩu</h2>
            <Form
              form={repassForm}
              layout="vertical"
              name="productForm"
              onFinish={(values) => {
                const pass = {
                  id: userInfo.id,
                  password: values.new_pw,
                }
                updatePassword({
                  pass: pass
                })
              }}
            >
              <Form.Item
                label="Mật khẩu cũ"
                name="password"
                rules={[{ required: true, message: 'Bạn cần nhập mật khẩu cũ' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="new_pw"
                rules={[{ required: true, message: 'Bạn cần nhập mật khẩu mới' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="renew_pw"
                rules={[{ required: true, message: 'Bạn cần nhập lại mật khẩu mới' }]}
              >
                <Input.Password />
              </Form.Item>

              <Row justify="end">
                <Space>
                  <Button
                    htmlType="submit"
                    style={{ backgroundColor: "#d42c2c", color: "white" }}
                  >Lưu</Button>
                </Space>
              </Row>
            </Form>
          </div>
        </TabPane>

        <TabPane tab="Lịch sử mua hàng" key="3">
          <div style={{ width: 700, margin: '0px auto 15px auto', padding: 15, backgroundColor: "#edeae6" }}>
            <h2>Lịch sử mua hàng</h2>
          </div>
        </TabPane>
      </Tabs>


    </>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  return {
    userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    updateProfile: (params) => dispatch(updateProfileAction(params)),
    updatePassword: (params) => dispatch(updatePasswordAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
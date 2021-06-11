import { useEffect } from 'react';

import {
  Row,
  Space,
  Form,
  Input,
  Tabs,
  Radio,
  DatePicker,
  notification
} from 'antd';
import 'moment/locale/vi';
import moment from 'moment';

import { connect } from 'react-redux';
import './styles.css'
import {
  getUserInfoAction,
  updatePasswordAction,
  updateProfileAction
} from '../../../redux/actions';

function ProfileAdminPage({
  updateProfile,
  updatePassword,
}) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [userForm] = Form.useForm();
  const [repassForm] = Form.useForm();

  const { TabPane } = Tabs;

  useEffect(() => {
    repassForm.resetFields();
  }, [repassForm]);

  function callback(key) {
    console.log(key);
  }

  let birthdayString = '';
  const dateFormatList = 'DD/MM/YYYY';

  function onChange(date, dateString) {
    birthdayString = dateString.trim();
  }

  function showNotification() {
    return notification.success({
      message: 'Chỉnh sửa hồ sơ thành công!',
    });
  }

  function showNotiChange() {
    return notification.success({
      message: 'Thay đổi mật khẩu thành công!',
    });
  }
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Thông tin tài khoản" key="1">
          <div style={{ width: 700, margin: '0px auto 15px auto', padding: 15, backgroundColor: "#d1d1cf71" }}>
            <h2>Thông tin tài khoản</h2>
            <Form
              form={userForm}
              layout="vertical"
              name="productForm"
              initialValues={{
                email: userInfo.email,
                name: userInfo.name,
                phone: userInfo.phone,
                gender: userInfo.gender || '',
                birthDay: userInfo.birthDay ? moment(userInfo.birthDay, dateFormatList) : null
              }}
              onFinish={(values) => {
                const user = {
                  id: userInfo.id,
                  email: values.email,
                  name: values.name,
                  phone: values.phone,
                  gender: values.gender,
                  birthDay: birthdayString || userInfo.birthDay
                }
                updateProfile({
                  user: user
                })
                showNotification()
              }}
            >

              <Form.Item
                name="name"
                label="Họ tên"
                rules={[
                  {
                    required: true,
                    message: 'Tên không được để trống!',
                  },
                  { min: 3, message: 'Phải lớn hơn 3 ký tự' }
                ]}
              >
                <Input className="text-bold">
                </Input>
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Số điện thoại không được để trống!',
                  },
                ]}
              >
                <Input className="text-bold">
                </Input>
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Không được để trống!' },
                ]}
                hasFeedback
              >
                <Input className="text-bold" />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn giới tính!',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="Male">{<span className="text-bold">Nam</span>}</Radio>
                  <Radio value="Female">{<span className="text-bold">Nữ</span>}</Radio>
                  <Radio value="Other">{<span className="text-bold">Khác</span>}</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="birthDay"
                label="Ngày sinh"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn ngày sinh!',
                  },
                ]}
              >
                <DatePicker format={dateFormatList} style={{ width: '100%' }} onChange={onChange} placeholder="Nhập ngày, tháng, năm sinh" />
              </Form.Item>
              <Row justify="end">
                <Space>
                  <button
                    htmlType="submit"
                    className='btn-submit-change'
                  >
                    Thay đổi
                  </button>
                </Space>
              </Row>
            </Form>
          </div>
        </TabPane>
        <TabPane tab="Đổi mật khẩu" key="2">
          <div style={{ width: 700, margin: '0px auto 15px auto', padding: 15, backgroundColor: "#d1d1cf71" }}>
            <h2>Đổi mật khẩu</h2>
            <Form
              form={repassForm}
              layout="vertical"
              name="productForm"
              onFinish={(values) => {
                if (values.password !== userInfo.password) {
                  alert('Bạn nhập mật khẩu cũ sai')
                } else if (values.new_pw !== values.renew_pw) {
                  alert('Mật khẩu không trùng nhau')
                } else {
                  const pass = {
                    id: userInfo.id,
                    password: values.new_pw,
                  }
                  updatePassword({
                    pass: pass
                  })
                  showNotiChange()
                }
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
                  <button
                    htmlType="submit"
                    className='btn-submit-change'
                  >Thay đổi</button>
                </Space>
              </Row>
            </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdminPage);
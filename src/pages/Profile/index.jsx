import { connect } from 'react-redux';
import { useEffect } from 'react';

import {
  Row,
  Space,
  Form,
  Input,
  Tabs,
  Radio,
  DatePicker,
  notification,
  Table,
  List
} from 'antd';
import 'moment/locale/vi';
import moment from 'moment';
import './styles.css';


import {
  updatePasswordAction,
  updateProfileAction,
  getOrderItemAction
} from '../../redux/actions';

function ProfilePage({
  updateProfile,
  updatePassword,
  getOrderItem,
  orderItem
}) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    getOrderItem({userId: userInfo.id})
  }, []);


  const [userForm] = Form.useForm();
  const [repassForm] = Form.useForm();

  const { TabPane } = Tabs;

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

  const tableData = orderItem.data.map((item) => {
    return {
      key: item.id,
      id: item.id,
      fullName: item.orderInforAddress.fullName,
      status: item.status,
      address: item.orderInforAddress.address,
      cartList: item.orderInforAddress.cartList,
      time: `${item.orderInforAddress.time} - ${item.orderInforAddress.date}`,
      totalPrice: item.orderInforAddress.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }
  })

  const tableColumns = [
    {
      title: 'Tên người nhận',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (record.status == 'waiting') {
          return (
            <div>Đang chờ xác nhận</div>
          )
        } else if (record.status == 'confirmed') {
          return (
            <div>Đã xác nhận</div>
          )
        } else {
          return (
            <div>Đã hủy</div>
          )
        }
      }
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback} style={{ marginLeft: 10}}>
        <TabPane tab="Thông tin tài khoản" key="1">
          <div style={{ maxWidth: 700, margin: '0px auto 15px auto', padding: 15, backgroundColor: "#edeae6" }}>
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
                  birthDay: birthdayString
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
          <div style={{ width: 700, margin: '0px auto 15px auto', padding: 15, backgroundColor: "#edeae6" }}>
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
        <TabPane tab="Lịch sử mua hàng" key="3">
          <div style={{ width: 1100, margin: '0px auto 15px auto', padding: 15, backgroundColor: "#edeae6" }}>
            <h2>Lịch sử mua hàng</h2>
            <Table
              loading={orderItem.load}
              size="middle"
              columns={tableColumns}
              dataSource={tableData}
              expandable={{
                expandedRowRender: (record) => {
                  return (
                    <List
                      size="small"
                      dataSource={record.cartList}
                      renderItem={(item) => (
                        <List.Item>
                          <Row justify="space-between" style={{ width: '100%' }}>
                            <div>{item.name}</div>
                            <div>Giá: {(item.price * item.count).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                          </Row>
                        </List.Item>
                      )}
                    />
                  )
                }
              }}
            />
          </div>
        </TabPane>
      </Tabs>
    </>
  );
}

const mapStateToProps = (state) => {
  const {orderItem } = state.orderReducer;
  return {
    orderItem
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (params) => dispatch(updateProfileAction(params)),
    updatePassword: (params) => dispatch(updatePasswordAction(params)),
    getOrderItem: (params) => dispatch(getOrderItemAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
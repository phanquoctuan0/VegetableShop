import { Table, Modal, Space, Radio, Input, Button, Popconfirm, Form } from 'antd';
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getUserListAction, deleteUserAction } from '../../../redux/actions';

import Register from '../../Register';

function AdminUserPage({
  getUserList,
  userList,
  deleteUser,
}) {
  useEffect(() => {
    getUserList({});
  }, []);


  const { Search } = Input;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const [initValue, setInitValue] = useState(null)
  const [isIdEdit, setIsIdEdit] = useState(null);

  useEffect(() => {
    userItemForm.resetFields();
  }, [isIdEdit]);

  const [userItemForm] = Form.useForm();


  function callModal(id) {
    userList.data.forEach((item) => {
      if (id === item.id) {
        setInitValue({ role: item.role })
      }
    })
    setIsModalVisible(true);
    setIsIdEdit(id)
  }

  function handleEditUser(id) {
    const values = userItemForm.getFieldValue();
    userList.data.forEach((item) => {
      if (id === item.id) {
        const user = {
          id: item.id,
          email: item.email,
          password: item.password,
          name: item.name,
          phone: item.phone,
          role: values.role
        }
        deleteUser({
          id: id,
          user: user
        })
        setIsModalVisible(false)
      }
    })

  }

  function handleDeleteUser(id) {
    userList.data.forEach((item) => {
      if (id === item.id) {
        const user = {
          id: item.id,
          email: item.email,
          password: item.password,
          name: item.name,
          phone: item.phone,
          role: 'banned'
        }
        deleteUser({
          id: id,
          user: user
        })
      }
    })
  }

  const tableData = userList.data.map((item) => {
    return {
      ...item,
      key: item.id
    }
  })

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <EditOutlined
            onClick={() => { callModal(record.id) }}
            style={{
              color: '#1890ff',
              cursor: 'pointer',
              fontSize: '180%'
            }}
          />
          <Popconfirm
            title={`Bạn có chắc muốn khóa người dùng này`}
            onConfirm={() => { handleDeleteUser(record.id) }}
          >
            <UserDeleteOutlined
              style={{
                color: '#ff4d4f',
                cursor: 'pointer',
                fontSize: '180%'
              }}
            />
          </Popconfirm>
          <div></div>
        </div>
      )
    },

  ];


  return (
    <div className='home' >
      <Modal title="Chỉnh sửa tài khoản"
        visible={isModalVisible}
        onOk={() => { handleEditUser(isIdEdit) }}
        onCancel={() => { setIsModalVisible(false) }}
        okText='Xác nhận'
        cancelText='Hủy'
      >
        <Form
          form={userItemForm}
          layout="vertical"
          name="userItemForm"
          initialValues={initValue}
        >
          <Form.Item name='role'>
            <Radio.Group >
              <Space direction="vertical">
                <Radio value={'user'}>User</Radio>
                <Radio value={'admin'}>Admin</Radio>
                <Radio value={'banned'}>Ban</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Thêm tài khoản"
        width="800px"
        visible={isModalVisible2}
        onOk={() => { setIsModalVisible2(false) }}
        onCancel={() => { setIsModalVisible2(false) }}
        okText='Thêm'
        cancelText='Hủy'
      >
        <Register />
      </Modal>
      <h2>Quản lý người dùng</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
        <Search
          placeholder="Nhập vào thông tin"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: 400 }}
          onSearch={(value) => { getUserList({ searchKey: value }) }}
        />
        <div>
          <Button type="primary"
            style={{ height: '100%' }}
            onClick={() => { setIsModalVisible2(true) }}
          >
            Thêm người dùng
          </Button>
        </div>
      </div>
      <Table
        dataSource={tableData}
        loading={userList.load}
        columns={tableColumns}
        size='middle'
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  const { userList } = state.userReducer;
  return {
    userList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (params) => dispatch(getUserListAction(params)),
    deleteUser: (params) => dispatch(deleteUserAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminUserPage);

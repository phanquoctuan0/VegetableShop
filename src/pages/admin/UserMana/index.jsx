import { Table, Modal, Space, Radio, Input } from 'antd';
import { EditOutlined, UserDeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';

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
    getUserList();
  }, []);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { Search } = Input;
  const onSearch = value => console.log(value);
  const { Column } = Table;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const [valueRadio, setValueRadio] = useState(1);
  const [isIdEdit, setIsIdEdit] = useState(null);

  const onChange = e => {
    console.log(e.target.value);
    setValueRadio(e.target.value);
  };

  console.log("🚀 ~ file: index.jsx ~ line 36 ~ userList.data.forEach ~ userList", userList.data)
  function handleEditUser(id) {
    userList.data.forEach((item) => {
      if (id === item.id) {
        const user = {
          id: item.id,
          email: item.email,
          password: item.password,
          name: item.name,
          phone: item.phone,
          role: valueRadio
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
  
  
 

  return (
    <div className='home'>
      <Modal title="Edit role"
        visible={isModalVisible}
        onOk={() => { handleEditUser(isIdEdit) }}
        onCancel={() => { setIsModalVisible(false) }}
      >
        <Radio.Group onChange={onChange} value={valueRadio}>
          <Space direction="vertical">
            <Radio value={'user'}>User</Radio>
            <Radio value={'admin'}>Admin</Radio>
            <Radio value={'banned'}>Ban</Radio>
          </Space>
        </Radio.Group>
      </Modal>
      <Modal title="Add User"
        width="800px"
        visible={isModalVisible2}
        onOk={() => { setIsModalVisible2(false) }}
        onCancel={() => { setIsModalVisible2(false) }}
      >
        <Register />
      </Modal>
      <h2>Quản lý người dùng</h2>
      <div style={{ display: 'flex',justifyContent : 'space-between', marginBottom: '14px' }}>
        <div></div>
        <Search
          placeholder="Nhập vào thông tin"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: 400 }}
          onSearch={onSearch}
        />
        <div>
          <PlusSquareOutlined
            onClick={() => { setIsModalVisible2(true) }}
            style={{ fontSize: '290%', color: '#008848', cursor: 'pointer' }}
          />
        </div>
      </div>
      <Table dataSource={userList.data}>
        <Column title="ID" dataIndex="id" id="id" />
        <Column title="Name" dataIndex="name" id="name" />
        <Column title="Email" dataIndex="email" id="email" />
        <Column title="Role" dataIndex="role" id="role" />
        <Column
          width='200px'
          title="Action"
          render={(record) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <EditOutlined
                onClick={() => { setIsModalVisible(true); setIsIdEdit(record.id) }}
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  fontSize: '180%'
                }}
              />
              <UserDeleteOutlined
                onClick={() => { handleDeleteUser(record.id) }}
                style={{
                  color: 'red',
                  cursor: 'pointer',
                  fontSize: '180%'
                }}
              />
            </div>
          )}
        />
      </Table>
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

import { Input } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getUserListAction, deleteUserAction } from '../../../redux/actions';

import UserItem from './components/UserItem';
import Register from '../../Register';

function AdminUserPage({
  getUserList,
  userList,
  deleteUser,
}) {

  useEffect(() => {
    getUserList();
  }, []);

  const { Search } = Input;
  const onSearch = value => console.log(value);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isModalVisible2, setIsModalVisible2] = useState(false);

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

  function handleEditUser(id, values) {
    console.log("🚀 ~ file: index.jsx ~ line 42 ~ handleEditUser ~ values", values)
    const user = {
      id: id,
      email: values.email,
      password: values.item,
      name: values.name,
      phone: values.phone,
      role: values.role
    }
    deleteUser({
      id: id,
      user: user
    })
  }

  function renderUserList() {
    if (userList.load) return <p>Loading...</p>;
    return userList.data.map((userItem, productIndex) => {
      if (userItem.role !== 'banned' && userItem.id !== userInfo.id) {
        return (
          <UserItem
            id={userItem.id}
            name={userItem.name}
            email={userItem.email}
            handleDeleteUser={handleDeleteUser}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            handleEditUser={handleEditUser}
          />
        )
      }
    })
  }

  return (
    <div className='home'>
      <Modal title="Thêm người dùng"
        width = '900px'
        visible={isModalVisible2}
        onOk={() => { setIsModalVisible2(false) }}
        onCancel={() => { setIsModalVisible2(false) }}
      >
        <Register />
      </Modal>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontSize: '180%', }}>Quản lý người dùng</span>
        <PlusSquareOutlined style={{ fontSize: '280%', color: '#1890ff', cursor: 'pointer' }} onClick={() => { setIsModalVisible2(true) }} />
        <Search
          style={{ width: 400 }}
          placeholder="Nhập vào thông tin"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
        />

      </div>
      <table className='users' style={{ width: '100%' }}>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Email</th>
          <th>Trash</th>
        </tr>
        {renderUserList()}
      </table>
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

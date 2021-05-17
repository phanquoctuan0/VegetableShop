
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getUserListAction, deleteUserAction } from '../../../redux/actions';

import UserItem from './components/UserItem';


function AdminUserPage({
  getUserList,
  userList,
  deleteUser,
}) {
  
  useEffect(() => {
    getUserList();
  }, []);
  
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  function handleEditUser(id,values){
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
      if (userItem.role !== 'banned') {
        return (
          <UserItem
            id={userItem.id}
            name={userItem.name}
            email={userItem.email}
            handleDeleteUser={handleDeleteUser}
            isModalVisible = {isModalVisible}
            setIsModalVisible = {setIsModalVisible}
            handleEditUser = {handleEditUser}
          />
        )
      }
    })
  }

  return (
    <div className='home'>
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

import { Table, Modal, Switch, Input, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  addCategoryListAction,
  deleteCategoryListAction,
  editCategoryListAction,
  getCategoryListAction
}
  from '../../../redux/actions';


function CategoryManagementPage({
  getCategoryList,
  categoryList,
  editCategoryList,
  deleteCategoryList,
  addCategoryList
}) {

  const { Search } = Input;
  const onSearch = value => console.log(value);
  const { Column } = Table;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [valueInput, setValueInput] = useState('');


  useEffect(() => {
    getCategoryList();
  }, []);

  function handleDeleteCategory(id) {
    deleteCategoryList({ id: id })
  }

  function handleAddCategory() {
    const newCategory = {
      name: valueInput,
      status: 'off'
    }
    addCategoryList({
      category: newCategory
    })
    setIsModalVisible2(false)
  }

  function handleEditCategory(id, status) {
    const newStatus = status === 'on' ? 'off' : 'on'
    categoryList.data.forEach((item) => {
      if (id === item.id) {
        const category = {
          id: item.id,
          name: item.name,
          status: newStatus
        }
        editCategoryList({
          id: id,
          category: category
        })
      }
    })
  }

  console.log(categoryList.data);
  return (
    <div className='category'>
      <Modal title="Edit category"
        visible={isModalVisible}
        onOk={() => { handleEditCategory() }}
        onCancel={() => { setIsModalVisible(false) }}
      >
      </Modal>
      <Modal title="Add category"
        width="800px"
        visible={isModalVisible2}
        onOk={() => { handleAddCategory() }}
        onCancel={() => { setIsModalVisible2(false) }}
      >
        <Input placeholder="Add category name"
          onChange={(e) => { setValueInput(e.target.value) }}
        />
      </Modal>
      <h2>Quản lý danh mục</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
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
          <Button type="primary"
            style={{ height: '100%' }}
            onClick={() => { setIsModalVisible2(true) }}
          >
            Thêm danh mục
          </Button>
        </div>
      </div>
      <Table dataSource={categoryList.data}
        size='middle'
      >
        <Column title="ID" dataIndex="id" id="id" />
        <Column title="Name" dataIndex="name" id="name" />
        <Column title="Status" dataIndex="status" id="status" />
        <Column
          width='200px'
          title="Action"
          render={(record) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Switch defaultChecked={record.status === 'on' ? true : false}
                onChange={() => { handleEditCategory(record.id, record.status) }}
              />
              <DeleteOutlined
                onClick={() => { handleDeleteCategory(record.id) }}
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
  )
}

const mapStateToProps = (state) => {
  const { categoryList } = state.productReducer;
  return {
    categoryList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
    editCategoryList: (params) => dispatch(editCategoryListAction(params)),
    deleteCategoryList: (params) => dispatch(deleteCategoryListAction(params)),
    addCategoryList: (params) => dispatch(addCategoryListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagementPage);

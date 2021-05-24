import { Table, Modal, Input, Button, Space, Popconfirm, Select, Form, InputNumber } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  addProductListAction,
  deleteProductListAction,
  editProductListAction,
  getCategoryListAction,
  getProductListAction
}
  from '../../../redux/actions'


function AdminProductPage({
  getCategoryList,
  categoryList,
  productList,
  getProductList,
  editProductList,
  deleteProductList,
  addProductList
}) {
  useEffect(() => {
    getCategoryList();
    getProductList({
      page: 1,
      limit: 99,
    });
  }, []);

  console.log("🚀 ~ file: index.jsx ~ line 21 ~ productList", productList)



  const { Search } = Input;
  const onSearch = value => console.log(value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);


  const [productSelected, setProductSelectd] = useState({})
  const [idProductSelect, setIdProductSelect] = useState();

  useEffect(() => {
    productForm.resetFields();
  }, [productSelected]);

  const [productForm] = Form.useForm();

  const [addProductForm] = Form.useForm();


  function callModal(id) {
    productList.data.forEach((item) => {
      if (id === item.id) {
        setProductSelectd({
          name: item.name,
          categoryId: item.categoryId,
          price: item.price,
          id: id,
          img: item.img,
          description: item.description,
          categoryName: item.category.name
        })
      }
    })

    setIsModalVisible(true);
    setIdProductSelect(id);
  }

  function renderCategoryOptions() {
    return categoryList.data.map((categoryItem, categoryIndex) => {
      return (
        <Select.Option key={categoryIndex} value={categoryItem.id}>
          {categoryItem.name}
        </Select.Option>
      )
    })
  }

  const tableData = productList.data.map((item) => {
    return {
      name: item.name,
      categoryName: item.category.name,
      price: item.price.toLocaleString(),
      id: item.id,
      img: item.img
    }
  })

  const tableColumns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'img',
      key: 'img',
      render: (_, record) => {
        return (
          <img src = {record.img} style = {{height: '32px'}}/>
        )
      }
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" ghost onClick={() => callModal(record.id)}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa ${record.name}`}
              onConfirm={() => deleteProductList({ id: record.id })}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger ><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>
        )
      }
    },


  ];
  return (
    <div className='products'>
      <Modal title="Chỉnh sửa sản phẩm"
        visible={isModalVisible}
        onOk={() => { setIsModalVisible(false) }}
        onCancel={() => { setIsModalVisible(false) }}
      >
        <Form
          form={productForm}
          layout="vertical"
          name="productForm"
          onFinish={(values) => {
            const product = {
              id: idProductSelect,
              name: values.name,
              price: values.price,
              categoryId: values.categoryId,
              img: productSelected.img,
              description: productSelected.description,
              categoryName: productSelected.categoryName
            }
            editProductList({
              product: product
            })
          }}
          initialValues={productSelected}
        >
          <Form.Item name="name" label="Tên sản phẩm">
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item name="categoryId" label="Loại sản phẩm">
            <Select placeholder="Loại sản phẩm">
              {renderCategoryOptions()}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá">
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button htmlType='submit'>Thay đổi</Button>
          </div>
        </Form>
      </Modal>

      <Modal title="Thêm sản phẩm"
        visible={isModalVisible2}
        onOk={() => { setIsModalVisible2(false) }}
        onCancel={() => { setIsModalVisible2(false) }}
      >
        <Form
          form={addProductForm}
          layout="vertical"
          name="addProductForm"
          onFinish={(values) => {
            let categoryName = undefined
            categoryList.data.forEach((item) => {
              if (item.id == values.categoryId) {
                categoryName = item.name;
              }
            })
            const newProduct = {
              name: values.name,
              price: values.price,
              categoryId: values.categoryId,
              img: [values.img],
              description: values.description,
              categoryName: categoryName
            }
            addProductList({
              newProduct: newProduct
            })
          }
          }
        >
          <Form.Item name="name" label="Tên sản phẩm">
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item name="categoryId" label="Loại sản phẩm">
            <Select placeholder="Loại sản phẩm">
              {renderCategoryOptions()}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá">
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item name="img" label="Link hình ảnh">
            <Input placeholder="Link hình ảnh" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input placeholder="Mô tả" />
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button htmlType='submit'>Thêm sản phẩm</Button>
          </div>
        </Form>
      </Modal>


      <h2>Quản lý danh mục</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}
      >
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
      <Table
        // loading={productList.load}
        size="middle"
        columns={tableColumns}
        dataSource={tableData}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { categoryList, productList } = state.productReducer;
  return {
    categoryList,
    productList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
    getProductList: (params) => dispatch(getProductListAction(params)),
    editProductList: (params) => dispatch(editProductListAction(params)),
    deleteProductList: (params) => dispatch(deleteProductListAction(params)),
    addProductList: (params) => dispatch(addProductListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductPage);


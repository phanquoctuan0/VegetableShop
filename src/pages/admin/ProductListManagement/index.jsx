import { Table, Modal, Input, Button, Popconfirm, Select, Form, InputNumber, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
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
    getCategoryList({});
    getProductList({});
  }, []);


  const { Search } = Input;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);


  const [productSelected, setProductSelectd] = useState({})
  const [idProductSelect, setIdProductSelect] = useState();
  const { TextArea } = Input;
  useEffect(() => {
    productForm.resetFields();
  }, [productSelected]);

  const [productForm] = Form.useForm();

  const [addProductForm] = Form.useForm();


  function callModal(id) {
    productList.data.forEach((item) => {
      if (id === item.id) {
        const formImages = id
          ? item.img.map((img, index) => ({
            uid: index,
            name: `image-${index + 1}.jpg`,
            type: 'image/jpeg',
            thumbUrl: img,
          }))
          : []
        setProductSelectd({
          name: item.name,
          categoryId: item.categoryId,
          price: item.price,
          id: id,
          img: formImages,
          description: item.description,
          unit: item.unit
        })
      }
    })

    setIsModalVisible(true);
    setIdProductSelect(id);
  }

  function handleUpdateProduct() {
    const values = productForm.getFieldValue();
    const newImages = values.img.map((file) => file.thumbUrl);
    let categoryName = ''
    categoryList.data.forEach((item) => {
      if (item.id === values.categoryId) {
        categoryName = item.name
      }
    })
    const product = {
      id: idProductSelect,
      name: values.name,
      price: values.price,
      categoryId: values.categoryId,
      img: newImages,
      description: productSelected.description,
      categoryName: categoryName,
      unit: values.unit
    }
    editProductList({
      product: product
    })
  }

  function handleAddProduct() {
    const values = addProductForm.getFieldValue();
    const newImages = values.img.map((file) => file.thumbUrl);
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
      img: newImages,
      description: values.description,
      categoryName: categoryName,
      unit: values.unit,
    }
    addProductList({
      newProduct: newProduct
    })
    addProductForm.resetFields();
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
      price: item.price.toLocaleString('it-IT'),
      id: item.id,
      img: item.img,
      unit: item.unit,
      key: item.id
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
          <img src={record.img[0]} style={{ height: '32px' }} />
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <EditOutlined
              onClick={() => callModal(record.id)}
              style={{
                color: '#008848',
                cursor: 'pointer',
                fontSize: '180%'
              }}
            />
            <Popconfirm
              title={`Bạn có chắc muốn xóa ${record.name}`}
              onConfirm={() => deleteProductList({ id: record.id })}
              okText="Xóa"
              cancelText="Hủy"
            >
              <DeleteOutlined
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
      }
    },


  ];
  return (
    <div className='products'>
      <Modal title="Chỉnh sửa sản phẩm"
        visible={isModalVisible}
        onOk={() => { handleUpdateProduct(); setIsModalVisible(false) }}
        onCancel={() => { setIsModalVisible(false) }}
      >
        <Form
          form={productForm}
          layout="vertical"
          name="productForm"
          initialValues={productSelected}
        >
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Tên sản phẩm không được rỗng!' }]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Loại sản phẩm"
            rules={[{ required: true, message: 'Chọn loại sản phẩm!' }]}
          >
            <Select placeholder="Loại sản phẩm">
              {renderCategoryOptions()}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Giá không được rỗng!' }]}
          >
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá"
              style={{ width: '50%' }}
            />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Cân nặng"
            rules={[{ required: true, message: 'Cân nặng không được rỗng!' }]}
          >
            <Input placeholder="Cân nặng sản phẩm" />
          </Form.Item>
          <Form.Item
            valuePropName="fileList"
            label="Hình ảnh"
            name="img"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList
            }}
            validateFirst
            rules={[
              { required: true, message: 'Vui lòng tải ảnh lên!' },
              () => ({
                validator(_, value) {
                  if (!['image/png', 'image/jpeg'].includes(value[0].type)) {
                    return Promise.reject('File không đúng định dạng');
                  }
                  return Promise.resolve();
                }
              })
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <TextArea rows={4} placeholder="Mô tả" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Thêm sản phẩm"
        visible={isModalVisible2}
        onOk={() => { handleAddProduct(); setIsModalVisible2(false) }}
        onCancel={() => { setIsModalVisible2(false) }}
      >
        <Form
          form={addProductForm}
          layout="vertical"
          name="addProductForm"
        >
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Tên sản phẩm không được rỗng!' }]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Loại sản phẩm"
            rules={[{ required: true, message: 'Chọn loại sản phẩm!' }]}
          >
            <Select placeholder="Loại sản phẩm">
              {renderCategoryOptions()}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Giá không được rỗng!' }]}
          >
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Cân nặng"
            rules={[{ required: true, message: 'Cân nặng không được rỗng!' }]}
          >
            <Input placeholder="Cân nặng sản phẩm" />
          </Form.Item>
          <Form.Item
            valuePropName="fileList"
            label="Hình ảnh"
            name="img"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList
            }}
            validateFirst
            rules={[
              { required: true, message: 'Vui lòng tải ảnh lên!' },
              () => ({
                validator(_, value) {
                  if (!['image/png', 'image/jpeg'].includes(value[0].type)) {
                    return Promise.reject('File không đúng định dạng');
                  }
                  return Promise.resolve();
                }
              })
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={4} placeholder="Mô tả" />
          </Form.Item>
        </Form>
      </Modal>


      <h2>Quản lý sản phẩm</h2>
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
          onSearch={(value) => { getProductList({ searchKey: value }) }}
        />
        <div>
          <Button type="primary"
            style={{ height: '100%' }}
            onClick={() => { setIsModalVisible2(true) }}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>
      <Table
        loading={productList.load}
        size="middle"
        columns={tableColumns}
        dataSource={tableData}
        pagination={{ defaultPageSize: 9 }}
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


import { useEffect, useState } from 'react';
import {
  Row,
  Space,
  Button,
  notification,
  Form,
  Input,
  Select,
  InputNumber,
} from 'antd';
import history from '../../utils/history';

import { connect } from 'react-redux';
import { CheckCircleTwoTone } from '@ant-design/icons';
import ItemProduct from '../ProductList/components/ItemProduct';
import {
  getProductDetailAction,
  addToCartAction,
  getCategoryListAction,
  getProductListAction
} from '../../redux/actions';



function ProfilePage({
  productDetail,
  getProductDetail,
  match,
  cartList,
  addToCart,
  categoryList,
  getCategoryList,
  getProductList,
  productList,
}) {
  const productId = match.params.id;
  const [amount, setAmount] = useState(1);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [productForm] = Form.useForm();

  useEffect(() => {
    getProductDetail({ id: productId });
  }, [productId])


  const openNotificationAdd = () => {
    notification.open({
      message: 'Thêm vào giỏ hàng thành công !',
    });
  };

  const openNotificationUpdate = () => {
    notification.open({
      message: 'Cập nhật giỏ hàng thành công !',
      icon: <CheckCircleTwoTone style={{ color: '#108ee9' }} />,
    });
  };

  function onChange(value) {
    setAmount(value)
  }

  console.log(cartList)
  function handleAddToCart() {
    const existProductIndex = cartList.data.findIndex((item) => item.productId === parseInt(productId));
    if (existProductIndex !== -1) {
      const newCart = cartList.data;
      newCart.splice(existProductIndex, 1, {
        productId: parseInt(productId),
        count: cartList.data[existProductIndex].count + amount,
        name: productDetail.data.name,
        price: productDetail.data.price,
        img: productDetail.data.img
      })
      addToCart({
        orderId: cartList.orderId,
        carts: newCart,
      })
      openNotificationUpdate()
    } else {
      addToCart({
        orderId: cartList.orderId,
        carts: [
          ...cartList.data,
          {
            productId: parseInt(productId),
            count: amount,
            name: productDetail.data.name,
            price: productDetail.data.price,
            img: productDetail.data.img
          }
        ]
      })
      openNotificationAdd()
    }
  }
  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem) => {
      if (productDetail.data.categoryId === productItem.categoryId) {
        return (
          <ItemProduct
            title={productItem.name}
            price={productItem.price}
            img={productItem.img[0]}
            id={productItem.id}
          />
        )
      }
    })
  }

  return (
    <>
      <div style={{ width:700, margin: '16px auto', padding: 15, backgroundColor:"#edeae6" }}>
        <h2>Thông tin tài khoản</h2>
        <Form
          form={productForm}
          layout="vertical"
          name="productForm"
          // initialValues={productSelected.id
          //   ? { ...productSelected, hasOption: false }
          //   : {}
          // }
        >
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="name" label="Họ tên">
            <Input placeholder="Họ tên">
              {/* {renderCategoryOptions()} */}
            </Input>
          </Form.Item>
          <Form.Item name="phone" label="SĐT">
            <Input placeholder="SĐT" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu cũ">
            <Input placeholder="Mật khẩu cũ" />
          </Form.Item>
          <Form.Item name="re-password" label="Mật khẩu mới">
            <Input placeholder="Mật khẩu mới" />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button style={{backgroundColor:"#d42c2c", color:"white"}}>Lưu</Button>
              {/* <Button type="primary" onClick={() => handleSubmitForm()}>Lưu</Button> */}
            </Space>
          </Row>
        </Form>
      </div>
      <div style={{ width:700, margin: '16px auto', padding: 15, backgroundColor:"#edeae6" }}>
        <h2>Lịch sử mua hàng</h2>
        
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  const { cartList } = state.cartReducer;

  const { categoryList, productList } = state.productReducer;
  return {
    productDetail,
    cartList,
    categoryList,
    productList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addToCart: (params) => dispatch(addToCartAction(params)),
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
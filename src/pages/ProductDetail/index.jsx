
import { useEffect, useState } from 'react';
import { Card, Row, Col, InputNumber, notification } from 'antd';
import { connect } from 'react-redux';
import { CheckCircleTwoTone } from '@ant-design/icons';

import {
  getProductDetailAction,
  addToCartAction,
} from '../../redux/actions';

function ProductDetailPage({
  productDetail,
  getProductDetail,
  match,
  cartList,
  addToCart,
}) {
  const productId = match.params.id;
  const [amount, setAmount] = useState(1);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    getProductDetail({ id: productId });
  }, [])


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



  return (
    <Row gutter={6}>
      <Col span={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="box" style={{ marginTop: 16, marginBottom: 16 }}>
          <Card style={{ width: 420, marginLeft: 130 }}>
            <div className="slide-img">
              <img src={productDetail.data.img}></img>
            </div>
          </Card>
        </div>
      </Col>
      <Col span={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="box" style={{ marginTop: 16, marginBottom: 16 }}>
          <Card style={{ width: 420, height: 420, marginLeft: 130, color: '#008848', fontWeight: 700, fontSize: '120%' }}>
            <div style={{ color: '#008848', fontWeight: 700, fontSize: '140%' }}>
              <p>{productDetail.data.name}</p>
            </div>
            <div>
              <div className="type">
                <p>Loại: {productDetail.data.category.name}</p>
              </div>
              <div className="price" style={{ color: '#008848', fontWeight: 700, fontSize: '120%' }}>
                <p>Giá: {productDetail.data.price} </p>
              </div>
              <div className="number">
                <p>Số lượng: <InputNumber min={1} max={10} defaultValue='1' onChange={onChange} /></p>
              </div>
              <div>
                <button className="buy-btn" style={{ color: '#008848', fontSize: '90%' }} onClick={() => handleAddToCart()}>
                  Cho vào giỏ hàng
                </button>
              </div>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  const { cartList } = state.cartReducer;

  return {
    productDetail,
    cartList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addToCart: (params) => dispatch(addToCartAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);

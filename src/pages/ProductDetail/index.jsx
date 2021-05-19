import { useEffect, useState } from 'react';
import { Card, Row, Col, InputNumber, notification, Descriptions } from 'antd';
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



function ProductDetailPage({
  productDetail,
  getProductDetail,
  match,
  cartList,
  addToCart,
  productList,
}) {
  console.log("🚀 ~ file: index.jsx ~ line 25 ~ cartList", cartList)
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const productId = match.params.id;
  const [amount, setAmount] = useState(1);
  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));


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

  function handleAddToCart() {
    if (!userInfoLocal) {
      history.push('/login')
    } else {
      const existProductIndex = cartList.data.findIndex((item) => item.productId === parseInt(productId));
      if (existProductIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existProductIndex, 1, {
          productId: parseInt(productId),
          count: cartList.data[existProductIndex].count + amount,
          name: productDetail.data.name,
          price: productDetail.data.price,
          img: productDetail.data.img
        })
        addToCart({
          userId: userInfo.id,
          carts: newCartList,
        })
        openNotificationAdd()
      } else {
        addToCart({
          userId: userInfo.id,
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
        openNotificationUpdate()
      }
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
    <Row gutter={6}>
      <Col span={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div style={{ width: 420, marginLeft: 130 }}>
            <div className="slide-img">
              <img src={productDetail.data.img}></img>
            </div>
          </div>
        </div>
      </Col>
      <Col span={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginTop: 32, marginBottom: 16 }}>
          <div style={{ width: 420, height: 420, marginLeft: 130, color: '#008848', fontWeight: 700, fontSize: '120%' }}>
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
          </div>
        </div>
      </Col>

      <Descriptions title="Mô tả:" style={{ marginLeft: 130, marginRight: 130, textAlign: 'justify' }}>
        <Descriptions.Item style={{ width: 500, marginLeft: 130, fontWeight: 700, }}>
          {productDetail.data.description}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Sản phẩm tương tự:" style={{ marginLeft: 130, marginRight: 130 }}>
        <Row gutter={8}>
          {renderProductList()}
        </Row>
      </Descriptions>
    </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
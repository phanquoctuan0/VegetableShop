
import { useEffect, useState } from 'react';
import { Card, Row, Col, InputNumber, Radio } from 'antd';
import { connect } from 'react-redux';

import { getProductDetailAction } from '../../redux/actions';

function ProductDetailPage({
  productDetail,
  getProductDetail,
  productItem,
  match,
}) {

  // const {title,price,img,id} = props;

  const productId = match.params.id;
  // const [optionSelected, setOptionSelected] = useState({});

  useEffect(() => {
    getProductDetail({ id: productId });
  }, [])

  // useEffect(() => {
  //   if (productDetail.data.id) {
  //     setOptionSelected(productDetail.data.productOptions[0] || {})
  //   }
  // }, [productDetail.data])

  // console.log('123',productDetail);
  // function renderProductOptions() {
  //   return productDetail.data.productOptions.map((item, index) => {
  //     return (
  //       <Radio.Button value={item}>
  //         {item.title}
  //       </Radio.Button>
  //     )
  //   })
  // }

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
                <p>Số lượng: <InputNumber className="" min={1} max={99} defaultValue='1'/></p>
              </div>
              <div>
                <button className="buy-btn" style={{ color: '#008848', fontSize: '90%' }}>
                  Cho vào giỏ hàng</button>
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
  return {
    productDetail,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);


import { useEffect, useState } from 'react';
import { Card, Radio } from 'antd';
import { connect } from 'react-redux';

import { getProductDetailAction } from '../../redux/actions';

function ProductDetailPage({
  productDetail,
  getProductDetail,
  match,
}) {
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
    <Card title={productDetail.data.name}>
      <p>Hãng: {productDetail.data.category.name}</p>
      {/* <Radio.Group
        onChange={(e) => setOptionSelected(e.target.value)}
        value={optionSelected}
      >
        {renderProductOptions()}
      </Radio.Group> */}
      <p>Giá: 
        {productDetail.data.price }
      </p>
    </Card>
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

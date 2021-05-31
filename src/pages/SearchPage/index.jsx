import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Row } from 'antd';

import { getProductListAction } from '../../redux/actions';
import ItemProduct from '../ProductList/components/ItemProduct';
import './styles.css'
function SearchPage({
  getProductList,
  productList,
  searchValue
}) {

  useEffect(() => {
    getProductList({
      searchValue: searchValue[0].searchValue ? searchValue[0].searchValue : ''
    });
  }, [searchValue[0].searchValue]);

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem) => {
      return (
        <ItemProduct
          title={productItem.name}
          price={productItem.price}
          img={productItem.img[0]}
          id={productItem.id}
          unit={productItem.unit}
        />
      )
    })
  }

  return (
    <>
      <div style={{
        maxWidth: '1170px',
        margin: '16px auto 16px',
        minHeight: '90vh'
      }}
      >
        <h1 className="title-search">
          Kết quả tìm kiếm cho "{searchValue[0].searchValue}": ({productList.data.length} kết quả)
        </h1>
        <Row gutter={[16, 16]}>
          {renderProductList()}
        </Row>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { productList, searchValue } = state.productReducer;
  return {
    productList,
    searchValue
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

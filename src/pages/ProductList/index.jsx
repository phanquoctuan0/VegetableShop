import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row } from 'antd';

import history from '../../utils/history';

import { getCategoryListAction } from '../../redux/actions';
import { getProductListAction } from '../../redux/actions';
import ItemProduct from './components/ItemProduct'

function ProductListPage({
  getCategoryList,
  getProductList,
  categoryList,
  productList, }) {

  const [categorySelected, setCategorySelected] = useState(null);
  const [page, setPage] = useState(1)
  useEffect(() => {
    getCategoryList();
    getProductList({
      page: 1,
      limit: 8,
    });
  }, []);

  function handleFilterCategory(id) {
    productList.arrCategoryId.push(id)
    setCategorySelected(id);
    getProductList({
      page: 1,
      limit: 8,
      categoryId: id,
    });
  }

  function handleShowMoreProduct() {
    getProductList({
      more: true,
      page: page + 1,
      limit: 8,
      categoryId: categorySelected,
    });
    setPage(page+1);
  }

  function renderCategory() {
    return categoryList.data.map((item) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3
            onClick={() => handleFilterCategory(item.id)}
            style={{
              color: categorySelected === item.id ? '#e91e63' : 'RGBA(0,0,0,0.6)',
              borderBottom: categorySelected === item.id ? '#e91e63 1px solid' : '#e91e63',
              padding: '0px 16px',
              cursor: 'pointer'
            }}
          >
            {item.name}
          </h3>
        </div>
      )
    })
  }

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem, productIndex) => {
      return (
        <ItemProduct
          title={productItem.name}
          price={productItem.price}
          img={productItem.img[0]}
          onClick={() => history.push(`/product/${productItem.id}`)}
        />
      )
    })
  }
  console.log('lengthArr', productList.data.length)
  return (
    <div style={{ maxWidth: '1170px', margin: '16px auto 16px', minHeight: '90vh' }}>
      <Row style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0px 10px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3
            onClick={() => handleFilterCategory(null)}
            style={{
              color: categorySelected === null ? '#e91e63' : 'RGBA(0,0,0,0.6)',
              borderBottom: categorySelected === null ? '#e91e63 1px solid' : null,
              padding: '0px 16px',
              cursor: 'pointer'
            }}
          >
            Tất cả
          </h3>
        </div>
        {renderCategory()}
      </Row>
      <Row gutter={8}>
        {renderProductList()}
      </Row>
      <div style={{
        display: productList.data.length % 8 !== 0 ? 'none' : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div
          className='btn-see-more'
          onClick={() => handleShowMoreProduct()}
        >
          {productList.load ? 'Đang tải...' : 'Xem thêm'}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { categoryList, productList } = state.productReducer;
  return {
    categoryList,
    productList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

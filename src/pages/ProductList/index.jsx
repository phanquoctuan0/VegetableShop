import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getProductListAction } from '../../redux/actions';

function ProductListPage({ getProductList, productList }) {
  useEffect(() => {
    getProductList({
      page: 1,
      limit: 10,
    });
  }, []);

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem, productIndex) => {
      return <p>{productItem.name}</p>
    })
  }

  return (
    <div>
      {renderProductList()}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productList } = state.productReducer;
  return {
    productList: productList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

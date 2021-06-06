import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Row } from 'antd';

import { getProductListAction, getAllCommentAction } from '../../redux/actions';
import ItemProduct from '../ProductList/components/ItemProduct';
import './styles.css'
function SearchPage({
  getProductList,
  productList,
  searchValue,
  getAllComment,
  allCommentList
}) {

  useEffect(() => {
    getProductList({
      searchValue: searchValue.length > 0 ? searchValue[0].searchValue : ""
    });
    getAllComment();
  }, [searchValue]);

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem) => {
      if (productItem.category.status === 'on') {
        let totalRate = 0;
        let count = 0;
        allCommentList.data.forEach((item) => {
          if (productItem.id == item.productId) {
            totalRate = totalRate + item.rate
            count += 1;
          }
        })
        return (
          <ItemProduct
            title={productItem.name}
            price={productItem.price}
            img={productItem.img[0]}
            id={productItem.id}
            unit={productItem.unit}
            rate={count !== 0 ? Math.ceil(totalRate / count) : 0}
            count={count}
          />
        )
      }
    })
  }

  function renderTitle(){
    return(
        <h1 className="title-search">
          Kết quả tìm kiếm cho "{searchValue[0].searchValue}": ({productList.data.length} kết quả)
        </h1>
    )
  }

  return (
    <>
      <div style={{
        maxWidth: '1170px',
        margin: '16px auto 16px',
        minHeight: '90vh'
      }}
      >
        {searchValue.length ? renderTitle(): ''}
        <Row gutter={[16, 16]}>
          {renderProductList()}
        </Row>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { productList, searchValue } = state.productReducer;
  const { allCommentList } = state.commentReducer;

  return {
    productList,
    searchValue,
    allCommentList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getAllComment: (params) => dispatch(getAllCommentAction(params)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

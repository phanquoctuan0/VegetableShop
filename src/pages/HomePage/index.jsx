import { Carousel, Row, Card, Col } from 'antd';
import { UpOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import history from '../../utils/history';

import ItemProduct from '../ProductList/components/ItemProduct';
import { useEffect, useState } from 'react';

import './styles.css'

import { getCategoryListAction, getProductListAction } from '../../redux/actions';

function HomePage({
  getCategoryList,
  getProductList,
  categoryList,
  productList,
}) {
  console.log("🚀 ~ file: index.jsx ~ line 20 ~ productList", productList)

  useEffect(() => {
    getCategoryList({});
    getProductList({
      page: 1,
      limit: 16,
    });
  }, []);

  const { Meta } = Card;

  function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem, productIndex) => {
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

  const contentStyle = {
    height: '420px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    cursor: 'pointer'
  };
  return (
    <>
      <div className="carousel-container">
        <Carousel  autoplay>
          <div>
            <div
              onClick={() => {
                history.push('/about')
              }}
              style={{
                ...contentStyle,
                backgroundImage: 'url(https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2020/February/7/4984-206301581066123-1581066123.png)'
              }}>

            </div>
          </div>
          <div>
            <div
              onClick={() => {
                history.push('/about')
              }}
              style={{
                ...contentStyle,
                backgroundImage: 'url(https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/April/27/8171-291121619496843-1619496843.png)'
              }}>

            </div>
          </div>
          <div>
            <div
              onClick={() => {
                history.push('/about')
              }}
              style={{
                ...contentStyle,
                backgroundImage: 'url(https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2020/December/17/7310-533931608178729-1608178729.png)'
              }}>

            </div>
          </div>
          <div>
            <div
              onClick={() => {
                history.push('/about')
              }}
              style={{
                ...contentStyle,
                backgroundImage: 'url(https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2019/November/6/4312-673831573020630-1573020630.png)'
              }}>

            </div>
          </div>
        </Carousel>
        <div style={{ maxWidth: '1170px', margin: '16px auto 16px', minHeight: '90vh' }}>
          <div className="btn-top" onClick={() => goToTop()}>
            <UpOutlined style={{ fontSize: 30 }} />
          </div>
          <h3 style={{ fontSize: '26px' }}>Sản phẩm nổi bật</h3>
          <Row gutter={[16, 16]}>
            {renderProductList()}
          </Row>
          <h3 style={{ fontSize: '26px', paddingTop: '12px' }}>Một số thông tin hữu ích</h3>
          <Row gutter={[16, 16]}>
            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card
                hoverable
                cover={<img alt="example" src="https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/May/27/8309-820051622132210-1622132210.jpg" />}
              >
                <Meta
                  description="Tại sao người bị tiểu đường hay bị chóng mặt ?"
                />
              </Card>
            </Col>
            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card
                hoverable
                cover={<img alt="example" src="https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/May/26/8299-683871622024114-1622024114.jpg" />}
              >
                <Meta
                  description="Tại sao không ăn đồ ngọt như vẫn bị tiểu đường ?"
                />
              </Card>
            </Col>
            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card
                hoverable
                cover={<img alt="example" src="https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/May/24/8281-721261621838490-1621838490.jpg" />}
              >
                <Meta
                  description="Biết được chỉ số GI trong thực phẩm giúp bạn bệnh tiểu đường ?"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

    </>
  )
}


const mapStateToProps = (state) => {
  const { categoryList, productList, searchValue } = state.productReducer;
  return {
    categoryList,
    productList,
    searchValue
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
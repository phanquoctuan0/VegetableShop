import { useEffect, useState } from 'react';

import { Rate, Input, Row, Col, InputNumber, notification, Descriptions } from 'antd';
import history from '../../utils/history';
import moment from 'moment';

import { connect } from 'react-redux';
import { CheckCircleTwoTone, LikeOutlined } from '@ant-design/icons';
import ItemProduct from '../ProductList/components/ItemProduct';
import './styles.css';

import {
  getProductDetailAction,
  addToCartAction,
  getCategoryListAction,
  getProductListAction,
  addToCommentAction,
  getCommentListAction
} from '../../redux/actions';



function ProductDetailPage({
  productDetail,
  getProductDetail,
  match,
  cartList,
  addToCart,
  productList,
  getProductList,
  addToComment,
  getCommentList,
  commentList
}) {

  const { TextArea } = Input;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const productId = match.params.id;

  const [amount, setAmount] = useState(1);

  const [comment, setComment] = useState(null);

  const [rate, setRate] = useState(null);

  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));
  const desc = [
    'Rất không hài lòng',
    'Tệ',
    'Bình thường',
    'Hài lòng',
    'Cực kỳ hài lòng'
  ];

  useEffect(() => {
    getProductDetail({ id: productId });
    getProductList({
      page: 1,
      limit: 99,
    });
    getCommentList({
      productId: productId
    })
  }, [productId])


  const onChangeComment = e => {
    setComment(e.target.value);
  };

  const openNotificationAdd = () => {
    notification.open({
      top: 80,
      duration: 2,
      message: 'Thêm vào giỏ hàng thành công !',
    });
  };

  const openNotificationUpdate = () => {
    notification.open({
      top: 80,
      duration: 2,
      message: 'Cập nhật giỏ hàng thành công !',
      icon: <CheckCircleTwoTone style={{ color: '#108ee9' }} />,
    });
  };

  function onChange(value) {
    setAmount(value)
  }

  function handleAddToComment() {
    if (rate && comment) {
      moment.locale('vi');
      const newComment = {
        userId: userInfoLocal.id,
        productId: productId,
        name: userInfoLocal.name,
        date: moment().format("L"),
        time: moment().format('LT'),
        rate: rate,
        comment: comment
      }
      setRate(0);
      addToComment({
        comment: newComment
      })
    } else {
      alert('Bạn phải nhập đầy đủ đánh giá')
    }
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
          img: productDetail.data.img,
          unit: productDetail.data.unit
        })
        addToCart({
          userId: userInfo.id,
          carts: newCartList,
        })
        openNotificationUpdate()
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
              img: productDetail.data.img,
              unit: productDetail.data.unit
            }
          ]
        })
        openNotificationAdd()
      }
    }
  }

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem) => {
      if (productDetail.data.categoryId === productItem.categoryId &&
        productItem.id != productId
      ) {
        return (
          <ItemProduct
            title={productItem.name}
            price={productItem.price}
            img={productItem.img[0]}
            id={productItem.id}
            unit={productItem.unit}
          />
        )
      }
    })
  }

  function getAvgRate() {
    let avgRate = 0
    commentList.data.forEach((item) => {
      avgRate = avgRate + item.rate
    })
    return Math.ceil(avgRate / commentList.data.length)
  }

  function renderAvatarUser() {
    let txtAvatar = userInfo.name.split(" ", 2);
    let avatar = '';
    txtAvatar.forEach((item) => {
      avatar = avatar + item.slice(0, 1);
    })
    return avatar
  }
  function renderCommetList() {
    if (commentList.load) return <p>Loading...</p>;
    return commentList.data.map((commentItem) => {
      return (
        <div className='comment-container'>
          <div className="user-comment">
            <div className="user-comment-avatar">{renderAvatarUser()}</div>
            <div className="user-comment-content">{commentItem.name}</div>
          </div>
          <div className='content-coment'>
            <Rate
              tooltips={desc}
              value={commentItem.rate}
              disabled
            />
            {<span className="ant-rate-text">{desc[commentItem.rate - 1]}</span>}

            <br />
            <div>
              {commentItem.comment}
            </div>
            <div className='commet-time'>
              Nhận xét vào {commentItem.time} - {commentItem.date}
            </div>
            {/* <div>
              <button>
                <LikeOutlined/>
              </button>
              <span>
                Gửi trả lời
              </span>
            </div> */}
          </div>
        </div>
      )
    })
  }

  return (
    <>
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
                <div>
                  {productDetail.data.name}
                </div>
                <div style={{ color: "rgb(120,120,120)", fontSize: '70%', fontWeight: 450 }}>
                  <Rate
                    value={getAvgRate()}
                    style={{ paddingRight: '26px', fontSize: '16px' }}
                    disabled
                  />  ({commentList.data.length} đánh giá)
                </div>
              </div>
              <div>
                <div className="type">
                  <p>Loại: {productDetail.data.category.name}</p>
                </div>
                <div className="price" style={{ color: '#008848', fontWeight: 700, fontSize: '120%' }}>
                  <p>Giá: {productDetail.data.price ? productDetail.data.price.toLocaleString('it-IT') : ''}đ /{productDetail.data.unit}</p>
                </div>
                <div className="number">
                  <p>Số lượng: <InputNumber min={1} max={10} defaultValue='1' onChange={onChange} /></p>
                </div>
                <div>
                  <button className="btn-add-cart"
                    onClick={() => handleAddToCart()}>
                    Cho vào giỏ hàng
                </button>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Descriptions title="MÔ TẢ:" style={{ marginLeft: 130, marginRight: 130, textAlign: 'justify' }}>
          <Descriptions.Item style={{ width: 500, marginLeft: 130, fontWeight: 700, }}>
            {productDetail.data.description}</Descriptions.Item>
        </Descriptions>

        <Descriptions title="SẢN PHẨM TƯƠNG TỰ:" style={{ marginLeft: 130, marginRight: 130 }}>
          <Row gutter={8}>
            {renderProductList()}
          </Row>
        </Descriptions>
      </Row>
      {
        userInfo ?
          <div className='comment-rate'>
            <p className='text-content'>NHẬN XÉT VÀ ĐÁNH GIÁ</p>
            <div>
              Viết đánh giá
              <br />
              <Rate
                onChange={(value) => { setRate(value) }}
                value={rate}
              />
              {
                rate ?
                  <span className="ant-rate-text">
                    {desc[rate - 1]}
                  </span>
                  :
                  <span className="ant-rate-text">
                    Chọn mức độ hài lòng
                  </span>
              }
              <br />
              <TextArea
                value={comment}
                style={{ width: "500px" }}
                placeholder="Nhập vào nhận xét của bạn"
                autoSize={{ minRows: 2 }}
                onChange={onChangeComment}
              />
              <button
                className='btn-comment'
                onClick={() => {
                  handleAddToComment();
                  setComment("");
                }}
                type='submit'
              >
                Đánh giá
              </button>
            </div>
            <div className='show-comment'>
              <p className='text-content'>ĐÁNH GIÁ - NHẬN XÉT TỪ KHÁCH HÀNG</p>
              {renderCommetList()}
            </div>
          </div>
          :
          <h3>Đăng nhập để xem nhận xét và đánh giá</h3>
      }
    </>
  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  const { cartList } = state.cartReducer;
  const { categoryList, productList } = state.productReducer;
  const { commentList } = state.commentReducer;
  return {
    productDetail,
    cartList,
    categoryList,
    productList,
    commentList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addToCart: (params) => dispatch(addToCartAction(params)),
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
    getCommentList: (params) => dispatch(getCommentListAction(params)),
    addToComment: (params) => dispatch(addToCommentAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
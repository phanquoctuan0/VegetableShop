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
  getCommentListAction,
  getAllCommentAction
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
  commentList,
  getAllComment,
  allCommentList
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
    });
    getAllComment();
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
        comment: comment,
        avatar: renderAvatarUser()
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
        productItem.id != productId && productItem.category.status === 'on'
      ) {
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
            <div className="user-comment-avatar">{commentItem.avatar}</div>
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
          </div>
        </div>
      )
    })
  }

  const Image = productDetail.data.img || [];
  const [img, setImg] = useState(0);

  const handleSelectImg = (index) => {
    setImg(index);
  }

  return (
    <>
      <div className="container">
        <Row gutter={6} style={{ maxWidth: '1170px', margin: 'auto' }}>
          <Col xl={12} md={12} sm={12} xs={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginTop: 32, marginBottom: 16, paddingLeft: 80 }}>
              <div style={{ width: 420 }}>
                <img src={Image[img]}
                  style={{ transformOrigin: '((e.pageX - $(this).offset().left) / $(this).width()) * 100 + ' % ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +' % '' }}
                />
                {Image.map((item, index) => {
                  return (
                    <img src={item}
                      key={index}
                      onClick={() => {
                        handleSelectImg(index);
                      }}
                      width='120px'
                      height='auto'
                      style={{ margin: 10 }}
                    />
                  )
                })}
              </div>
            </div>
          </Col>
          <Col xl={12} md={12} sm={12} xs={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginTop: 32, marginBottom: 16, paddingLeft: 80 }} >
              <div style={{ width: 420, height: 420, color: '#008848', fontWeight: 700, fontSize: '120%' }}>
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
                    <button className="btn-buy-now"
                      onClick={() => { handleAddToCart(); history.push('/order') }}>
                      Mua ngay
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Descriptions title="MÔ TẢ:" style={{ textAlign: 'justify' }}>
            <Descriptions.Item style={{ width: 'auto', fontWeight: 700, }}>
              {productDetail.data.description}</Descriptions.Item>
          </Descriptions>

          <Descriptions title="SẢN PHẨM TƯƠNG TỰ:">
            <Row gutter={8}>
                {renderProductList()}
            </Row>
          </Descriptions>
        </Row>
        {
          userInfo ?
            <div className='comment-rate' style={{ width: 'auto' }}>
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
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  const { cartList } = state.cartReducer;
  const { categoryList, productList } = state.productReducer;
  const { commentList, allCommentList } = state.commentReducer;
  return {
    productDetail,
    cartList,
    categoryList,
    productList,
    commentList,
    allCommentList
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
    getAllComment: (params) => dispatch(getAllCommentAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);

import { connect } from 'react-redux';
import history from '../../utils/history';


import { addToCartAction, deleteItemCartAction } from '../../redux/actions'

import CartItem from './components/CartItem'


function CartPage({
  cartList,
  addToCart,
  deleteItemCart
}) {
  console.log("🚀 ~ file: index.jsx ~ line 16 ~ cartList", cartList)

  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));


  function handleDeteteItem(productId) {

    const indexOfProduct = cartList.data.findIndex((item) => item.productId === parseInt(productId));
    const newCartList = cartList.data;
    newCartList.splice(indexOfProduct, 1);
    deleteItemCart({
      userId: userInfoLocal.id,
      carts: newCartList,
    })
  }

  function handleIncrease(productId, productDetail) {
    console.log("🚀 ~ file: index.jsx ~ line 33 ~ handleIncrease ~ productDetail", productDetail)
    const indexOfProduct = cartList.data.findIndex((item) => item.productId === parseInt(productId));
    const newCartList = cartList.data;
    newCartList.splice(indexOfProduct, 1, {
      productId: parseInt(productId),
      count: productDetail.count + 1,
      name: productDetail.name,
      price: productDetail.price,
      img: [productDetail.img],
      unit: productDetail.unit
    })
    addToCart({
      userId: userInfoLocal.id,
      carts: newCartList,
    })
  }

  function handleDecrease(productId, productDetail) {
    const indexOfProduct = cartList.data.findIndex((item) => item.productId === parseInt(productId));
    const newCartList = cartList.data;
    newCartList.splice(indexOfProduct, 1, {
      productId: parseInt(productId),
      count: productDetail.count - 1,
      name: productDetail.name,
      price: productDetail.price,
      img: [productDetail.img],
      unit: productDetail.unit
    })
    addToCart({
      userId: userInfoLocal.id,
      carts: newCartList,
    })
  }


  function renderCartList() {
    if (cartList.load) return <p>Loading...</p>;
    return cartList.data.map((item) => {
      return (
        <CartItem
          title={item.name}
          price={item.price}
          img={item.img[0]}
          count={item.count}
          unit={item.unit}
          productId={item.productId}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleDeteteItem={handleDeteteItem}
        />
      )
    })
  }


  function showTotalOrder() {
    var total = 0
    if (cartList.data.lenth === 0) return 0
    cartList.data.forEach((item) => {
      total = total + item.price * item.count
    })
    return total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  }
  return (
    <div className="cart">
      <div>
        <h2>Giỏ hàng</h2>
      </div>
      <div>
        {renderCartList()}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            Thành tiền: <span style={{ fontSize: '22px', color: 'rgb(254, 56, 52' }}>{showTotalOrder()}</span>
          </h4>
        </div>
        <button
          className="btn order-btn"
          onClick={() => { history.push('/order') }}
        >
          Tiến hành đặt hàng
        </button>
      </footer>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  return {
    cartList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (params) => dispatch(addToCartAction(params)),
    deleteItemCart: (params) => dispatch(deleteItemCartAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

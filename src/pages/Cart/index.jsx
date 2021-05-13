import { connect } from 'react-redux';
import { useEffect } from 'react';

import { getCartListAction } from '../../redux/actions'

import CartItem from './components/CartItem'


function CartPage({ cartList }) {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log(cartList.data)
  function renderCartList() {
    if (userInfo) {
      if (cartList.load) return <p>Loading...</p>;
      return cartList.data.map((item) => {
          return (
            <CartItem
              title={item.name}
              price={item.price}
              img={item.img[0]}
              count={item.count}
            />
          )
      })
    }
    return null;
  }

  function showTotalOrder() {
    if (userInfo) {
      var total = 0
      if (cartList.data.lenth === 0) return 0
      cartList.data.forEach((item) => {
          total = total + item.price*item.count
      })
      return total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    } else {
      return 0
    }
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
            Tổng tiền <span style={{ fontSize: '22px', color: 'rgb(254, 56, 52' }}>{showTotalOrder()}</span>
          </h4>
        </div>
        <button
          className="btn order-btn"
        >
          Tiến hành đặng hàng
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
    getCartList: (params) => dispatch(getCartListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

import { useEffect} from 'react';
import { connect } from 'react-redux';

import {getCartListAction} from '../../redux/actions'

import CartItem from './components/CartItem'


function CartPage({getCartList, cartList}) {
  useEffect(() => {
    getCartList();
  }, []);

  function renderCartList() {
    if (cartList.load) return <p>Loading...</p>;
    return cartList.data.map((item, index) => {
      return (
        <CartItem
          key = {index}
          title={item.name}
          price={item.price}
          img={item.img[0]}
          amount = {item.amount}
        />
      )
    })
  }

  function showTotalOrder(){
    var total = 0
    if(cartList.data.lenth === 0 ) return 0
    cartList.data.forEach((item)=>{
      total = total + item.price * item.amount
    })
    return total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
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
  const { cartList} = state.cartReducer;
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

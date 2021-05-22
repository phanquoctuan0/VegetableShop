import { connect } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';

import { addToOrderAction } from '../../redux/actions';
import history from '../../utils/history';

import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import './styles.css';

function OrderPage({ cartList, addToOrder }) {

  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));

  const [orderInfo, setOrderInfo] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
  });

  const openNotification = () => {
    notification.open({
      description:
        'Chúc mừng bạn đã đặt hàng thành công !',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  }

  function handleSubmit() {
    moment.locale('vi');
    const orderInforAddress = {
      fullName: orderInfo.fullName,
      phone: orderInfo.phone,
      address: `${orderInfo.city}-${orderInfo.address}`,
      totalPrice: total,
      date: moment().format("dd/mm/yyyy"),
      time: moment().format('LT'),
      cartList: cartList.data,
      userId: userInfoLocal.id,
    }

    addToOrder({
      orderInforAddress: orderInforAddress
    })
    openNotification();
    history.push('/')
  }

  let total = 0;
  cartList.data.forEach((item) => {
    total = total + item.count * item.price
  })


  function renderItemOrder() {
    return cartList.data.map((item) => {
      return (
        <div className='itemOrder'>
          <img src={item.img} />
          <div className="itemInfo">
            <p className="itemName">{item.name}</p>
            <p className="itemPrice">
              <span>SL: x{item.count} </span>
              <span>{(item.price * item.count).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </span>
            </p>
          </div>
        </div>
      )
    })
  }

  return (
    <div class="orderPage">
      <div className="formOrder">
        <h3>Thông tin nhận hàng</h3>
        <form action="">
          <div className='formItem'>
            <label htmlFor="">Họ  tên</label>
            <input name="fullName" type="text" onChange={(e) => handleChange(e)} />
          </div>
          <div className='formItem'>
            <label htmlFor="">Điện thoại di động</label>
            <input name="phone" type="text" onChange={(e) => handleChange(e)} />
          </div>
          <div className='formItem'>
            <label htmlFor="">Thành phố</label>
            <input name="city" type="text" onChange={(e) => handleChange(e)} />
          </div>
          <div className='formItem'>
            <label htmlFor="">Địa chỉ</label>
            <input name="address" type="text" onChange={(e) => handleChange(e)} />
          </div>
        </form>
      </div>
      <div className="formConfirm">
        <h3>Đơn hàng</h3>
        {renderItemOrder()}

        <div className="finalCheckout">
          <div className="emptyPrice">
            <div>Tạm tính</div>
            <div>{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
          </div>
          <div className="emptyPrice">
            <div>Phí vận chuyển</div>
            <div>Miễn phí</div>
          </div>
          <hr />
          <div className="totalPrice">
            <h4>Thành tiền:</h4>
            <div className="finalPrice">{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
          </div>
          <div className="btnCheckout">
            <button onClick={() => handleSubmit()}>Đặt hàng</button>
          </div>
        </div>
      </div>
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
    addToOrder: (params) => dispatch(addToOrderAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);

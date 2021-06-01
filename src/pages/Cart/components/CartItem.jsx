import '../styles.css'
import { Popconfirm } from 'antd';

function CartItem(props) {
  const {
    title,
    price,
    img,
    count,
    productId,
    handleIncrease,
    handleDecrease,
    handleDeteteItem,
    unit
  } = props;

  return (
    <div className="cart-item">
      <img src={img} />
      <div>
        <h4>{title} ({unit})</h4>
        <h5 className="item-price">{price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h5>
        <Popconfirm
          title={`Bạn có chắc muốn xóa ${title} khỏi giỏ hàng`}
          onConfirm={() => {
            handleDeteteItem(
              productId,
              {
                name: title,
                price: price,
                img: img,
                count: count,
                unit: unit
              })
          }}
          okText="Xóa"
          cancelText="Hủy"
        >
          <button className="remove-btn">
            Xóa
        </button>
        </Popconfirm>
      </div>
      <div>
        <button className="amount-btn"
          onClick={() => {
            handleIncrease(
              productId,
              {
                name: title,
                price: price,
                img: img,
                count: count,
                unit: unit
              })
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          </svg>
        </button>
        <p className="amount">{count}</p>
        <button
          className="amount-btn"
          disabled={count === 1 ? true : false}
          onClick={() => {
            handleDecrease(
              productId,
              {
                name: title,
                price: price,
                img: img,
                count: count,
                unit: unit
              })
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CartItem
import '../styles.css'
import { Popconfirm } from 'antd';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';

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
        <div className="item-price">
          <div></div>
          <div style={{ display: 'flex' }}>

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
              <MinusSquareOutlined style={{ fontSize: '150%' }} />
            </button>
            <p className="amount">{count}</p>

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
              <PlusSquareOutlined style={{ fontSize: '150%' }} />
            </button>
          </div>
          <div>{price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
        </div>
        <div className='bottom-item'>
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
          <p className = 'total-price-item'>
            Tổng tiền: 
            <span className='total-item'>
              {(price * count).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
            </span>
          </p>
        </div>
      </div>

    </div>
  )
}

export default CartItem
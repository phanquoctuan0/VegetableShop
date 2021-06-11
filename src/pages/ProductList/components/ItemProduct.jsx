import { Col, Rate } from 'antd';
import '../styles.css'

import history from '../../../utils/history';

function ItemProduct(props) {
  const { title, price, img, id, description, unit, rate, count } = props;
  return (
    <Col xl={6} md = {8} sm={12} xs = {24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="box" >
        <div className="slide-img">
          <img className = 'img-product' src={img}></img>
          <div className="overlay">
            <a onClick={() => history.push(`/product/${id}`)} className="buy-btn">Mua ngay</a>
          </div>
        </div>
        <div className="detail-box">
          <div className="type-name">
            <a onClick={() => history.push(`/product/${id}`)}>{title}</a>
            <span style = {{fontSize: '12px',fontWeight:'500', color: 'rgb(120, 120, 120)'}}>
              <Rate
                style={{ fontSize: '13px' }}
                value={rate}
                disabled
              />
              ({count})
            </span>
          </div>
          <a onClick={() => history.push(`/product/${id}`)}
            className="price">
            {price.toLocaleString('it-IT')}đ /{unit}
          </a>
        </div>
      </div>
    </Col>
  )
}

export default ItemProduct;
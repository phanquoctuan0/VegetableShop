import { Col } from 'antd';
import '../styles.css'

import history from '../../../utils/history';

function ItemProduct(props) {
  const { title, price, img, id, description } = props;
  return (
    <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="box" style={{ marginTop: 16, marginBottom: 16 }}>
        <div className="slide-img">
          <img src={img}></img>
          <div className="overlay">
            <a onClick={() => history.push(`/product/${id}`)} className="buy-btn">Mua ngay</a>
          </div>
        </div>
        <div className="detail-box">
          <div className="type">
            <a onClick={() => history.push(`/product/${id}`)}>{title}</a>
            <span>Rate</span>
          </div>
          <a onClick={() => history.push(`/product/${id}`)}
            className="price">
            {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
          </a>
        </div>
      </div>
    </Col>
  )
}

export default ItemProduct;
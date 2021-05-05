import '../styles.css'
import {Col} from 'antd';

import history from '../../../utils/history';

function ItemProduct(props) {
  const {title,price,img,id} = props;
  console.log(title);
  return (
    <Col span={6} style = {{display: 'flex' , justifyContent: 'center',alignItems:'center'}}>
      <div className="box" style={{ marginTop: 16,marginBottom: 16 }}>
        <div className="slide-img">
          <img src={img}></img>
          <div className="overlay">
            <a onClick={() => history.push(`/product/${id}`)} className="buy-btn">Mua ngay</a>
          </div>
        </div>
        <div className="detail-box">
          <div className="type">
            <a href="#">{title}</a>
            <span>Rate</span>
          </div>
          <a href="#" className="price">{price}</a>
        </div>
      </div>
    </Col>
  )
}

export default ItemProduct;
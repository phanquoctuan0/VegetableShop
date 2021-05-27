import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';

import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getOrderListAction } from '../../../redux/actions';

import './styles.css'

function Home({
  getOrderList,
  orderList,
}) {
  useEffect(() => {
    getOrderList({
      status: null
    });
  }, []);

  console.log("🚀 ~ file: index.jsx ~ line 12 ~ orderList", orderList)

  let waitingCount = 0, confirmedCount = 0, cancelledCount = 0;
  let totalMoney = 0;
  orderList.data.forEach((itemOrder) => {
    if (itemOrder.status === "waiting") {
      waitingCount = waitingCount + 1
    } else if (itemOrder.status === "confirmed") {
      confirmedCount = confirmedCount + 1;
      itemOrder.orderInforAddress.cartList.forEach((itemCart) => {
        totalMoney = totalMoney + itemCart.price * itemCart.count
      })
    } else {
      cancelledCount = cancelledCount + 1
    }
  })

  const state = {
    labels: ['Thành công', 'Đang chờ xác nhận', 'Hủy bỏ'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#2FDE00',
          '#C9DE00',
          '#B21F00',
        ],
        hoverBackgroundColor: [
          '#175000',
          '#4B5000',
          '#501800',
        ],
        data: [confirmedCount, waitingCount, cancelledCount]
      }
    ]
  }
  return (
    <div className='home'>
      <div className='container-graph'>
        <div style={{ width: '400px' }}>
          <Doughnut
            data={state}
            className='graph'
            options={{
              title: {
                display: true,
                text: 'Tổng đơn hàng',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
        <div className='content-total'>
          <Card title="Doanh số bán hàng " >
            <h3>{totalMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
          </Card>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { orderList } = state.orderReducer;
  return {
    orderList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (params) => dispatch(getOrderListAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);


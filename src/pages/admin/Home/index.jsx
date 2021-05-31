import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
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

  const stateLine = {
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: 'Doanh thu',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 70, 80, 81, 90]
      }
    ]
  }

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
    <div>
      <div className='home-admin'>
        <div className='line-graph'>
          <Line
            data={stateLine}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
        <div className='container-graph'>
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
      </div>
      <div className = 'report-total'>
        <div className='content-total'>
          <Card title="Doanh số bán hàng " >
            <h3>{totalMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
          </Card>
        </div>
        <div className='content-total'>
          <Card title="Tổng lược bán " >
            <h3>{totalMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
          </Card>
        </div>
        <div className='content-total'>
          <Card title="Thành viên mới" >
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


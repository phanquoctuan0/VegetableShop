import { Table, Popconfirm, Space, Input, Button, List, Row, Select, Form } from 'antd';

import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getOrderListAction, reviewOrderListAction } from '../../../redux/actions';


function OrderManagementPage({
  getOrderList,
  orderList,
  reviewOrderList
}) {
  
  useEffect(() => {
    getOrderList({
      status : null
    });
  }, []);
  const { Search } = Input;
  const onSearch = value => console.log(value);

  const { Option } = Select;

  function onSelect(value) {
    getOrderList({
      status : value
    });
  }

  function handleAcceptOrder(id) {
    orderList.data.forEach((item) => {
      if (item.id === id) {
        reviewOrderList({
          order: {
            orderInforAddress: {
              fullName: item.orderInforAddress.fullName,
              phone: item.orderInforAddress.phone,
              address: item.orderInforAddress.address,
              totalPrice: item.orderInforAddress.totalPrice,
              date: item.orderInforAddress.date,
              time: item.orderInforAddress.time,
              cartList: [...item.orderInforAddress.cartList],
            },
            id: id,
            userId: item.orderInforAddress.userId,
            status: 'confirmed'
          }, id: id
        });
      }
    })
  }

  function handleCancelOrder(id) {
    orderList.data.forEach((item) => {
      if (item.id === id) {
        reviewOrderList({
          order: {
            orderInforAddress: {
              fullName: item.orderInforAddress.fullName,
              phone: item.orderInforAddress.phone,
              address: item.orderInforAddress.address,
              totalPrice: item.orderInforAddress.totalPrice,
              date: item.orderInforAddress.date,
              time: item.orderInforAddress.time,
              cartList: [...item.orderInforAddress.cartList],
            },
            userId: item.orderInforAddress.userId,             
            id: id,
            status: 'cancelled'
          }, id: id
        });
      }
    })
  }

  const tableData = orderList.data.map((item) => {
    return {
      key: item.id,
      id: item.id,
      fullName: item.orderInforAddress.fullName,
      status: item.status,
      address: item.orderInforAddress.address,
      cartList: item.orderInforAddress.cartList,
      time: `${item.orderInforAddress.time} - ${item.orderInforAddress.date}`,
      totalPrice: item.orderInforAddress.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }
  })

  const tableColumns = [
    {
      title: 'Tên người nhận',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (record.status == 'waiting') {
          return (
            <Space>
              <Button type="primary" ghost
                onClick={() => { handleAcceptOrder(record.id) }}
              >
                Xác nhận
              </Button>
              <Popconfirm
                title={`Bạn có chắc muốn hủy đơn hàng này`}
                onConfirm={() => { handleCancelOrder(record.id) }}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button danger >Hủy </Button>
              </Popconfirm>
            </Space>
          )
        } else if (record.status == 'confirmed') {
          return (
            <div>Đã xác nhận đơn hàng</div>
          )
        } else {
          return (
            <div>Đã hủy đơn hàng</div>
          )
        }
      }
    },

  ];

  return (
    <div className='home' >
      <h2>Quản lý danh mục</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}
      >
        <Search
          placeholder="Nhập vào thông tin"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: 400 }}
          onSearch={(value)=>{getOrderList({searchKey : value})}}
        />
        <div>
          <Select defaultValue = "Chọn loại đơn hàng" style={{ width: 200 }} onSelect={onSelect}>
            <Option >Tất cả đơn hàng</Option>
            <Option value="waiting">Đang đợi xác nhận</Option>
            <Option value="confirmed">Đã xác nhận</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        </div>
      </div>
      <Table
        loading={orderList.load}
        size="middle"
        columns={tableColumns}
        dataSource={tableData}
        pagination = {{defaultPageSize: 9}}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <List
                size="small"
                dataSource={record.cartList}
                renderItem={(item) => (
                  <List.Item>
                    <Row justify="space-between" style={{ width: '100%' }}>
                      <div>{item.name}</div>
                      <div>Giá: {(item.price * item.count).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                    </Row>
                  </List.Item>
                )}
              />
            )
          }
        }}
      />
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
    reviewOrderList: (params) => dispatch(reviewOrderListAction(params)),

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderManagementPage);

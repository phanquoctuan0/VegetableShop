import { useEffect, useState } from 'react';
import {
  Row,
  Space,
  Button,
  Form,
  Input,
} from 'antd';
import history from '../../utils/history';

import { connect } from 'react-redux';
import { CheckCircleTwoTone } from '@ant-design/icons';
import ItemProduct from '../ProductList/components/ItemProduct';
import {
  getProductDetailAction,
  addToCartAction,
  getCategoryListAction,
  getProductListAction,
  getUserListAction,
  getUserInfoAction,
  updateProfileAction
} from '../../redux/actions';

function ProfilePage({
  updateProfile,
}) {
  const [amount, setAmount] = useState(1);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log("🚀 ~ file: index.jsx ~ line 39 ~ userInfo", userInfo);

  const [userForm] = Form.useForm();

  return (
    <>
      <div style={{ width: 700, margin: '16px auto', padding: 15, backgroundColor: "#edeae6" }}>
        <h2>Thông tin tài khoản</h2>
        <Form
          form={userForm}
          layout="vertical"
          name="productForm"
          initialValues={{
            email: userInfo.email,
            name: userInfo.name,
            phone: userInfo.phone,
            password: userInfo.password,
            // repassword: userInfo.password,
          }}
          onFinish={(values) => {
            const user = {
              id: userInfo.id,
              email: values.email,
              name: values.name,
              phone: values.phone,
              password: values.password,
            }
            console.log("🚀 ~ file: index.jsx ~ line 138 ~ user", user)
            updateProfile({
              user: user
            })
          }}
        >
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="name" label="Họ tên">
            <Input placeholder="Họ tên">
              {/* {renderCategoryOptions()} */}
            </Input>
          </Form.Item>
          <Form.Item name="phone" label="SĐT">
            <Input placeholder="SĐT" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input placeholder="Mật khẩu cũ" />
          </Form.Item>
          {/* <Form.Item name="repassword" label="Mật khẩu mới">
            <Input placeholder="Mật khẩu mới" />
          </Form.Item> */}
          <Row justify="end">
            <Space>
              <Button
                htmlType="submit"
                style={{ backgroundColor: "#d42c2c", color: "white" }}
              >Lưu</Button>
              {/* <Button type="primary" onClick={() => handleSubmitForm()}>Lưu</Button> */}
            </Space>
          </Row>
        </Form>
      </div>
      <div style={{ width: 700, margin: '16px auto', padding: 15, backgroundColor: "#edeae6" }}>
        <h2>Lịch sử mua hàng</h2>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  const { cartList } = state.cartReducer;

  const { categoryList, productList } = state.productReducer;
  const { userInfo } = state.userReducer;
  const { userList } = state.userReducer;
  return {
    productDetail,
    cartList,
    categoryList,
    productList,
    userInfo,
    userList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addToCart: (params) => dispatch(addToCartAction(params)),
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
    getUserList: (params) => dispatch(getUserListAction(params)),
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    updateProfile: (params) => dispatch(updateProfileAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
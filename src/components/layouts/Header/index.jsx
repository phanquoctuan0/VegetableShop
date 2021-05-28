import { connect } from 'react-redux';

import history from '../../../utils/history';
import logo from '../../../images/logo.png'

import { useEffect, useState } from 'react';
import { Menu, Dropdown } from 'antd';

import {
  addSearchProductAction
} from '../../../redux/actions';

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavSearch,
  Cart,
  SearchInput,
  SearchBtn,
  SearchIcon,
  NavLinkImg,
  LinkItem,
  HeaderContainer,
  AmountContainer,
  TotalAmount,
  Avatar,
  GlobalStyles
} from './HeaderElements';

function Header({ userInfo, cartList, addSearchProduct }) {

  const [searchValue, setSearchValue] = useState();

  function handleLogout() {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <LinkItem to='/profile'>
          Thông tin cá nhân
        </LinkItem>
      </Menu.Item>
      <Menu.Item>
        <LinkItem onClick={() => { handleLogout() }} to='/' >
          Đăng xuất
        </LinkItem>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {/* <GlobalStyles /> */}
      <HeaderContainer>
        <Nav>
          <NavLinkImg to='/'>
            <img
              src={logo}
              alt='logo'
              style={{ height: '60px' }}
              onClick={() => { history.push('/') }}
            />
          </NavLinkImg>
          <NavSearch>
            <SearchInput
              placeholder='Tìm sản phẩm'
              onChange={(e) => { setSearchValue(e.target.value) }}
            />
            <SearchBtn
              onClick={() => {
                addSearchProduct({ searchValue });
                history.push('/productlist');
              }}

            >
              <SearchIcon />
            </SearchBtn>
          </NavSearch>
          <Bars />
          <NavMenu>
            <NavLink to='/' >
              Trang chủ
          </NavLink>
            <NavLink to='/productlist' >
              Sản phẩm
          </NavLink>
            <NavLink to='/about' >
              Giới thiệu
          </NavLink>

            {userInfo.data.id
              ? (
                <NavLink to='/profile'>
                  <Dropdown overlay={menu} placement="bottomLeft" arrow>
                    <Avatar />
                  </Dropdown>
                </NavLink>
              )
              :
              <NavLink to='/login'>
                Đăng nhập
          </NavLink>
            }
            <NavLink to='/cart' style={{ position: 'relative' }}>
              <Cart />
              <AmountContainer>
                <TotalAmount>
                  {cartList.data.length}
                </TotalAmount>
              </AmountContainer>
            </NavLink>
          </NavMenu>
        </Nav>
      </HeaderContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { cartList } = state.cartReducer;
  return {
    userInfo,
    cartList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSearchProduct: (params) => dispatch(addSearchProductAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
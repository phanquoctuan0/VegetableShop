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
  Img,
  NavLinkCart,
  MenuMobile,
  HomeIcon,
  ProductIcon
} from './HeaderElements';

function Header({ userInfo, cartList, addSearchProduct }) {

  const [searchValue, setSearchValue] = useState();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addSearchProduct({ searchValue });
      history.push('/search');
      setSearchValue('')
    }
  }

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
      <HeaderContainer>
        <Nav>
          <NavLinkImg to='/'>
            <Img
              src={logo}
              onClick={() => { history.push('/') }}
            />
          </NavLinkImg>
          <NavSearch>
            <SearchInput
              placeholder='Tìm sản phẩm'
              onChange={(e) => { setSearchValue(e.target.value) }}
              value={searchValue}
              onKeyDown={handleKeyDown}
            />
            <SearchBtn
              onClick={() => {
                if (searchValue.length !== 0) {
                  addSearchProduct({ searchValue });
                  history.push('/search');
                  setSearchValue('')
                }
              }}
            >
              <SearchIcon />
            </SearchBtn>
          </NavSearch>
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
            <NavLink to='/cart' style={{ position: 'relative' }}>
              <Cart />
              <AmountContainer>
                <TotalAmount>
                  {cartList.data.length}
                </TotalAmount>
              </AmountContainer>
            </NavLink>
            {userInfo.data.id
              ? (
                <NavLink to='/profile'>
                  <Dropdown overlay={menu} placement="bottomLeft" arrow>
                    <Avatar />
                  </Dropdown>
                  {userInfo.data.name}
                </NavLink>
              )
              :
              <NavLink to='/login'>
                Đăng nhập
          </NavLink>
            }
          </NavMenu>
          <NavLinkCart to='/cart' style={{ position: 'relative' }}>
              <Cart />
              <AmountContainer>
                <TotalAmount>
                  {cartList.data.length}
                </TotalAmount>
              </AmountContainer>
          </NavLinkCart>
          <div></div>
        </Nav>
        <MenuMobile>
          <NavLink to = '/'>
            <HomeIcon />
          </NavLink>
          <NavLink to='/productlist'>
            <ProductIcon/>
          </NavLink>
          <NavLink to='/profile'>
            <Avatar/>
          </NavLink>
        </MenuMobile>
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
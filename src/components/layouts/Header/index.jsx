import { connect } from 'react-redux';

import history from '../../../utils/history';
import logo from '../../../images/logo.png'
import { getCartListAction } from '../../../redux/actions'

import { Menu } from 'antd';
import { useEffect } from 'react';



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
  TotalAmount
} from './HeaderElements';

function Header({ userInfo, cartList }) {

  useEffect(()=>{
    
  },[])
  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));
  function showTotalAmount() {
    if (userInfoLocal) {
      var total = 0
      if (cartList.data.lenth === 0) return 0
      cartList.data.forEach((item) => {
          total = total + item.count
      })
      return total
    } else {
      return 0
    }
  }

  function handleLogout() {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }
  const { SubMenu } = Menu;
  return (
    <HeaderContainer>
      <Nav>
        <NavLinkImg to='/'>
          <img src={logo} alt='logo' style={{ height: '80px' }} />
        </NavLinkImg>
        <NavSearch>
          <SearchInput placeholder='Tìm sản phẩm' />
          <SearchBtn>
            <SearchIcon />
          </SearchBtn>
        </NavSearch>
        <Bars />
        <NavMenu>
          <NavLink to='/' >
            Trang chủ
          </NavLink>
          <NavLink to='/products' >
            Sản phẩm
          </NavLink>
          <NavLink to='/about' >
            Giới thiệu
          </NavLink>

          {userInfo.data.id
            ? (
              <div>
                <NavLink to='/profile' style=
                  {
                    {
                      display: 'flex',
                      flexDirection: 'column'
                    }
                  }>
                  <Menu style={
                    {
                      width: 100,
                      backgroundColor: '#008848'
                    }
                  } mode="horizontal">
                    <SubMenu
                      style=
                      {
                        {
                          color: '#fff',
                          fontSize: '120%',
                        }
                      } title={`${userInfo.data.name}`}>
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
                    </SubMenu>
                  </Menu>
                </NavLink>
              </div>
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
                {showTotalAmount()}
              </TotalAmount>
            </AmountContainer>
          </NavLink>
        </NavMenu>
      </Nav>
    </HeaderContainer>
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


export default connect(mapStateToProps)(Header);
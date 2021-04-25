import { connect } from 'react-redux';

import history from '../../../utils/history';
import logo from '../../../images/logo.png'

import { Menu } from 'antd';



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
  ArrowIcon
} from './HeaderElements';

function Header({ userInfo }) {
  function handleLogout() {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }
  const { SubMenu } = Menu;
  return (
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
              <NavLink to='/profile' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Menu style={{ width: 100, backgroundColor: '#008848'}} mode="horizontal">
                      <SubMenu style = {{color: '#fff',fontSize: '120%',"&:hover": { background: "red" }}} title={`${userInfo.data.name}`}>
                        <Menu.Item key="12"><LinkItem to = '/profile'>Thông tin cá nhân</LinkItem></Menu.Item>
                        <Menu.Item key="11"><LinkItem onClick = {()=> {handleLogout()}} to = '/' >Đăng xuất</LinkItem></Menu.Item>
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
        <NavLink to='/cart'>
          <Cart />
        </NavLink>
      </NavMenu>
    </Nav>

  );
};

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  console.log('🚀 ~ file: index.jsx ~ line 13 ~ mapStateToProps ~ userInfo', userInfo);
  return {
    userInfo,
  }
};

export default connect(mapStateToProps)(Header);

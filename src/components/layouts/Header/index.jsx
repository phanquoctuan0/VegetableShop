import { connect } from 'react-redux';
import { Menu } from 'antd';

import history from '../../../utils/history';
import logo from '../../../images/logo.png'


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
  ArrowIcon
} from './HeaderElements';

// function Header({ userInfo }) {
//   return (
// <div>
//   {userInfo.data.id
//     ? (
//       <Space>
//         <p>{`Tên đăng nhập: ${userInfo.data.name}`}</p>
//         <Button>Đăng xuất</Button>
//       </Space>
//     )
//     : <Button onClick={() => history.push('/login')}>Đăng nhập</Button>
//   }
// </div>
//   );
// }

function Header({ userInfo }) {
  function handleLogout(){
    localStorage.removeItem("userInfo");
  }
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
                <span>Tài khoản</span>
                <span>
                  <span>
                    {`${userInfo.data.name}`}
                  </span>
                </span>
              </NavLink>
              <ArrowIcon onClick={() => handleLogout()}/>
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

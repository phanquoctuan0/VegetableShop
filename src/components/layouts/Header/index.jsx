import { connect } from 'react-redux';
import { Space, Button } from 'antd';

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
  NavLinkImg
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
        <NavLink to='/login'>
            {userInfo.data.id
              ? (
                <Space>
                  <p>{`${userInfo.data.name}`}</p>
                  <Button>Đăng xuất</Button>
                </Space>
              )
              : `Đăng nhập`
            }
        </NavLink>
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

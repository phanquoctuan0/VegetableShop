import history from '../../../utils/history'
import './styles.css';
import { Layout, Menu } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  HomeOutlined,
  TableOutlined,
  LogoutOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import logoAdmin from '../../../images/logoAdmin.png'

const { Sider } = Layout;
function Sidebar() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  function handleLogout() {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }
  return (
    <Layout >
      <Sider
        style={{ backgroundColor: '#fff', height: '100vh' }}
        width="260px"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="logo">
            <img src={logoAdmin} alt="logo" style = {{height: '90px', paddingTop : '8px'}}/>
          </div>
        </div>
        <Menu theme="" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => { history.push('/admin/') }}>
            Dashboard
        </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />} onClick={() => { history.push('/admin/product') }} >
            Quản lý sản phẩm
        </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />} onClick={() => { history.push('/admin/order') }}>
            Quản lý đơn hàng
        </Menu.Item>
          <Menu.Item key="4" icon={<UsergroupAddOutlined />} onClick={() => { history.push('/admin/user') }}>
            Quản lý thành viên
        </Menu.Item>
          <Menu.Item key="5" icon={<TableOutlined />} onClick={() => { history.push('/admin/category') }}>
            Quản lý danh mục
        </Menu.Item>
          <Menu.Item key="6" icon={<UserOutlined />} onClick={() => { history.push('/admin/category') }}>
            Tài khoản ( {userInfo.name} )
        </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />} onClick={() => { handleLogout() }}>
            Đăng xuất
        </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
}

export default Sidebar;

import { Route, Redirect } from 'react-router-dom';
import HeaderAdmin from '../HeaderAdmin';
import SidebarAdmin from '../SidebarAdmin/Sidebar'

function PrivateLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.id) {
    if (userInfo.role !== 'admin') {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            {/* <HeaderAdmin {...routeProps} /> */}
            <div style={{ display: 'flex', maxWidth: '1370px', margin: 'auto' }}>
              <SidebarAdmin {...routeProps} />
              <div style={{ width: 'calc(100% - 300px)', marginLeft: '26px', marginTop: '14px' }}>
                {/* <HeaderAdmin {...routeProps} /> */}
                <Component {...other} {...routeProps} />
              </div>
            </div>
          </>
        )
      }}
    />
  );
}

export default PrivateLayout;

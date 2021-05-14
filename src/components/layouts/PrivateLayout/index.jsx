import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
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
            {/* <Header {...routeProps} /> */}
            <div style={{ display: 'flex' }}>
              <SidebarAdmin {...routeProps} />
              <div style = {{width: 'calc(100% - 300px)', marginLeft : '26px', marginTop : '14px'}}>
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

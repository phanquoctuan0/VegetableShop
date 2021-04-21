import { Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer'

function DefaultLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps} />
            <Component {...other} {...routeProps} />
            <Footer {...routeProps} />
          </>
        )
      }}
    />
  );
}

export default DefaultLayout;

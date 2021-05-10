import { Router, Switch, Route } from 'react-router-dom';
// utils
import history from './utils/history';
// components
import LoginLayout from './components/layouts/LoginLayout';
import DefaultLayout from './components/layouts/DefaultLayout';

import ProductListPage from './pages/ProductList';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AboutPage from './pages/About'

import CartPage from './pages/Cart'
import ProductDetailPage from './pages/ProductDetail'


function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path="/" component={ProductListPage} />
        <DefaultLayout exact path="/login" component={LoginPage} />
        <DefaultLayout exact path="/register" component={RegisterPage}/>
        <DefaultLayout exact path="/about" component = {AboutPage}/>
        <DefaultLayout exact path="/cart" component={CartPage} />
        <DefaultLayout exaxt path = "/product/:id" component = {ProductDetailPage}/>
        {/* <DefaultLayout exact path="/product/:id" component={UserProductDetailPage} />
        <PrivateLayout exact path="/admin/products" component={AdminProductListPage} /> */}
      </Switch>
    </Router>
  );
}

export default BrowserRouter;

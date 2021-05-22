import { Router, Switch, Route } from 'react-router-dom';
// utils
import history from './utils/history';
// components

import DefaultLayout from './components/layouts/DefaultLayout';
import PrivateLayout from './components/layouts/PrivateLayout';

import ProductListPage from './pages/ProductList';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AboutPage from './pages/About'

import CartPage from './pages/Cart'
import ProductDetailPage from './pages/ProductDetail'
import OrderPage from './pages/OrderPage';

import AdminHomePage from './pages/admin/Home'
import AdminProductListPage from './pages/admin/ProductList';
import AdminUserPage from './pages/admin/UserManagement';
import AdminCategoryPage from './pages/admin/CategoryManagement';

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
        <DefaultLayout exaxt path = "/order" component = {OrderPage}/>
        
        <PrivateLayout exact path="/admin/"component={AdminHomePage} />
        <PrivateLayout exact path="/admin/product" component={AdminProductListPage} />
        <PrivateLayout exact path="/admin/user" component={AdminUserPage} />
        <PrivateLayout exact path="/admin/category" component={AdminCategoryPage} />

      </Switch>
    </Router>
  );
}

export default BrowserRouter;

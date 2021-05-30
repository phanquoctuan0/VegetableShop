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
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

import AdminHomePage from './pages/admin/Home'
import AdminProductListPage from './pages/admin/ProductListManagement';
import AdminUserPage from './pages/admin/UserManagement';

import ProfilePage from './pages/Profile';
import AdminCategoryPage from './pages/admin/CategoryManagement';
import OrderCategoryPage from './pages/admin/OrderManagementPage';

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        {/* <DefaultLayout exact path="/" component={HomePage} /> */}
        <DefaultLayout exact path="/" component={ProductListPage} />
        <DefaultLayout exact path="/search" component={SearchPage} />
        <DefaultLayout exact path="/login" component={LoginPage} />
        <DefaultLayout exact path="/register" component={RegisterPage} />
        <DefaultLayout exact path="/about" component={AboutPage} />
        <DefaultLayout exact path="/cart" component={CartPage} />
          
        <DefaultLayout exact path = "/profile" component = {ProfilePage}/>
          
        <DefaultLayout exaxt path="/product/:id" component={ProductDetailPage} />
        <DefaultLayout exaxt path="/order" component={OrderPage} />

        <PrivateLayout exact path="/admin/" component={AdminHomePage} />
        <PrivateLayout exact path="/admin/product" component={AdminProductListPage} />
        <PrivateLayout exact path="/admin/user" component={AdminUserPage} />
        <PrivateLayout exact path="/admin/category" component={AdminCategoryPage} />
        <PrivateLayout exact path="/admin/order" component={OrderCategoryPage} />

      </Switch>
    </Router>
  );
}

export default BrowserRouter;

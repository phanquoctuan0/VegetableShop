import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';

function* getCartListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/cart`,
    });
    yield put({
      type: "GET_CART_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_CART_LIST_FAIL", message: e.message});
  }
}

function* addToCartSaga(action) {
  try {
    const { email, password, name, phone } = action.payload;
    const result = yield axios.post(`http://localhost:3001/cart`, { email , password, name, phone});
    yield put({
      type: "ADD_TO_CART_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield history.push('/login');
  } catch (e) {
    yield put({
      type: "ADD_TO_CART_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery('GET_CART_LIST_REQUEST', getCartListSaga);
  yield takeEvery('ADD_TO_CART_REQUEST', addToCartSaga);
}

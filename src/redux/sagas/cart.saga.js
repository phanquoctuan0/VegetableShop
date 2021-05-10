import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

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


export default function* cartSaga() {
  yield takeEvery('GET_CART_LIST_REQUEST', getCartListSaga);
}

import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addToOrderSaga(action) {
  try {
    const { orderInforAddress  } = action.payload;
    const result = yield axios({
      method: "POST",
      url: `http://localhost:3001/carts/`,
      data: {
        orderInforAddress: orderInforAddress,
      },
    });
    yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/users/${orderInforAddress.userId}`,
      data: {
        carts: [],
      }
    });
    yield put({
      type: "ADD_TO_ORDER_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_TO_ORDER_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}
export default function* orderSaga() {
  yield takeEvery("ADD_TO_ORDER_REQUEST", addToOrderSaga);
}
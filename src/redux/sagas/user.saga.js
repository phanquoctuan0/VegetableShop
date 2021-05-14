import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/users',
      params: {
        email,
        password,
      }
    });
    if (result.data.length > 0) {
      localStorage.setItem('userInfo', JSON.stringify(result.data[0]));
      yield put({
        type: "LOGIN_SUCCESS",
        payload: {
          data: result.data[0],
        },
      });
      if (result.data[0].role === 'user') {
        yield history.push('/');
      } else {
        yield history.push('/admin/');
      }
    } else {
      yield put({
        type: "LOGIN_FAIL",
        payload: {
          error: 'Email hoặc mật khẩu không đúng',
        },
      });
    }
  } catch (e) {
    yield put({
      type: "LOGIN_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3001/users/${id}`);
    yield put({
      type: "GET_USER_INFO_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_INFO_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { email, password, name, phone } = action.payload;
    const result = yield axios.post(`http://localhost:3001/users`, { email , password, name, phone});
    yield put({
      type: "REGISTER_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield history.push('/login');
  } catch (e) {
    yield put({
      type: "REGISTER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery('LOGIN_REQUEST', loginSaga);
  yield takeEvery('GET_USER_INFO_REQUEST', getUserInfoSaga);
  yield takeEvery('REGISTER_REQUEST', registerSaga);
}

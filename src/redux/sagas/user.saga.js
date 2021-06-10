import { put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';
import history from '../../utils/history';



function* getUserListSaga(action) {
  try {
    const { searchKey } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/users',
      params: {
        _sort : "id",
        _order: "desc",
        ...searchKey && { q: searchKey }
      }
    });
    yield put({
      type: "GET_USER_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

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
      notification.success({
        message: 'Đăng nhập thành công!',
      });
      if (result.data[0].role === 'user') {
        yield history.push('/');
      } else {
        yield history.push('/admin/');
      }
    } else {
      notification.error({
        message: 'Email hoặc mật khẩu không đúng!',
      });
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
    const checkEmailResult = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/users',
      params: {
        email,
      }
    });
    if (checkEmailResult.data.length > 0) {
      notification.error({
        message: 'Email đăng ký đã tồn tại!',
      });
    } else {
      const result = yield axios.post(`http://localhost:3001/users`, { email, password, name, phone, role: 'user' });
      yield put({
        type: "REGISTER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
      notification.success({
        message: 'Đăng ký tài khoản thành công!',
      });
      yield history.push('/login');
    }
  } catch (e) {
    yield put({
      type: "REGISTER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteUserSaga(action) {
  try {
    const { id, user } = action.payload;
    console.log(user);
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/users/${id}`,
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
    yield put({ type: "GET_USER_LIST_REQUEST"});
    yield put({
      type: "DELETE_USER_SUCCESS",
      payload: {
        id: id,
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "DELETE_USER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* updateProfileSaga(action) {
  console.log("🚀 ~ file: user.saga.js ~ line 150 ~ function*updateProfileSaga ~ action", action)
  try {
    const { user } = action.payload;
    console.log("🚀 ~ file: user.saga.js ~ line 152 ~ function*updateProfileSaga ~ user", user)
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/users/${user.id}`,
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        gender: user.gender || '',
        birthDay: user.birthDay || ''
      }
    });
    yield localStorage.setItem('userInfo', JSON.stringify(result.data));
    yield put({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: {
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "UPDATE_PROFILE_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* updatePasswordSaga(action) {
  try {
    const { pass } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/users/${pass.id}`,
      data: {
        password: pass.password,
      }
    });
    yield localStorage.setItem('userInfo', JSON.stringify(result.data));
    yield put({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: {
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "UPDATE_PROFILE_FAIL",
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
  yield takeEvery('GET_USER_LIST_REQUEST', getUserListSaga);
  yield takeEvery('DELETE_USER_REQUEST', deleteUserSaga);
  yield takeEvery('UPDATE_PROFILE_REQUEST', updateProfileSaga);
  yield takeEvery('UPDATE_PASSWORD_REQUEST', updatePasswordSaga);
}

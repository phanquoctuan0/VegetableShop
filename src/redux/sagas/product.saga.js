import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductListSaga(action) {
  try {
    const { more, page, limit, categoryId } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/products',
      params: {
        _page: page,
        _limit: limit,
        ...categoryId && { categoryId },
        // ...searchKey && { q: searchKey },
        // _sort: 'price',
        // _order: 'desc',
      }
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
        more
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/products/${id}`,
      params: {
        _expand: 'category'
      }
    });
    yield put({
      type: "GET_PRODUCT_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({ type: "GET_PRODUCT_DETAIL_FAIL", message: e.message });
  }
}

function* getCategoryListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/categories',
    });
    yield put({
      type: "GET_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* editCategorySaga(action) {
  try {
    const { id, category } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/categories/${id}`,
      data: {
        name: category.name,
        status: category.status
      }
    });
    yield put({
      type: "EDIT_CATEGORY_LIST_SUCCESS",
      payload: {
        id: id,
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "EDIT_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteCategorySaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'DELETE',
      url: `http://localhost:3001/categories/${id}`,
    });
    yield put({
      type: "DELETE_CATEGORY_LIST_SUCCESS",
      payload: {
        id: id,
      }
    });
  } catch (e) {
    yield put({
      type: "DELETE_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addCategorySaga(action) {
  console.log("🚀 ~ file: product.saga.js ~ line 131 ~ function*addCategorySaga ~ action", action)
  try {
    const { category } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: `http://localhost:3001/categories/`,
      data: {
        name : category.name,
        status : category.status
      }
    });
    yield put({
      type: "ADD_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "ADD_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
export default function* productSaga() {
  yield takeEvery('GET_PRODUCT_LIST_REQUEST', getProductListSaga);
  yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
  yield takeEvery('GET_CATEGORY_LIST_REQUEST', getCategoryListSaga);
  yield takeEvery('EDIT_CATEGORY_LIST_REQUEST', editCategorySaga);
  yield takeEvery('DELETE_CATEGORY_LIST_REQUEST', deleteCategorySaga);
  yield takeEvery('ADD_CATEGORY_LIST_REQUEST', addCategorySaga);

}

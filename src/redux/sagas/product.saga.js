import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductListSaga(action) {
  try {
    const { more, page, limit, categoryId,searchKey,searchValue } = action.payload;
    console.log("🚀 ~ file: product.saga.js ~ line 7 ~ function*getProductListSaga ~ searchValue", searchValue)
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/products',
      params: {
        _page: page,
        _limit: limit,
        ...categoryId && { categoryId },
        _expand: 'category',
        _sort : "id",
        _order: "desc",
        ...searchValue && { q: searchValue },
        ...searchKey && { q: searchKey },
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
        _expand: 'category',
        q: '123'
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
    const {searchKey} = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/categories',
      params : {
        ...searchKey && { q: searchKey },
      }
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
    yield put({ type: "GET_CATEGORY_LIST_REQUEST" });
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
    yield put({ type: "GET_CATEGORY_LIST_REQUEST" });
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
  try {
    const { category } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: `http://localhost:3001/categories/`,
      data: {
        name: category.name,
        status: category.status
      }
    });
    yield put({ type: "GET_CATEGORY_LIST_REQUEST" });
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

function* editProductSaga(action) {
  try {
    const { product } = action.payload;
    console.log("🚀 ~ file: product.saga.js ~ line 164 ~ function*editProductSaga ~ product", product)

    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/products/${product.id}`,
      data: {
        id: product.id,
        name: product.name,
        img: product.img,
        categoryId: product.categoryId,
        description: product.description,
        price: product.price,
        unit:product.unit
      }
    });
    yield put({
      type: "EDIT_PRODUCT_LIST_SUCCESS",
      payload: {
        id: product.id,
        data: {
          ...result.data,
          category: {
            id: product.categoryId,
            name: product.categoryName
          }
        }
      }
    });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "EDIT_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'DELETE',
      url: `http://localhost:3001/products/${id}`,
    });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
    yield put({
      type: "DELETE_PRODUCT_LIST_SUCCESS",
      payload: {
        id: id,
      }
    });
  } catch (e) {
    yield put({
      type: "DELETE_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addProductSaga(action) {
  try {
    const { newProduct } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: `http://localhost:3001/products/`,
      data: {
        name: newProduct.name,
        img: newProduct.img,
        categoryId: newProduct.categoryId,
        description: newProduct.description,
        price: newProduct.price,
        unit: newProduct.unit
      }
    });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
    yield put({
      type: "ADD_PRODUCT_LIST_SUCCESS",
      payload: {
        id: newProduct.id,
        data: {
          ...result.data,
          category: {
            id: newProduct.categoryId,
            name: newProduct.categoryName
          }
        }
      }
    });
  } catch (e) {
    yield put({
      type: "ADD_PRODUCT_LIST_FAIL",
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
  yield takeEvery('EDIT_PRODUCT_LIST_REQUEST', editProductSaga);
  yield takeEvery('DELETE_PRODUCT_LIST_REQUEST', deleteProductSaga);
  yield takeEvery('ADD_PRODUCT_LIST_REQUEST', addProductSaga);

}

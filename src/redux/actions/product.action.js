export function getProductListAction(params) {
  console.log("🚀 ~ file: product.action.js ~ line 2 ~ getProductListAction ~ params", params)
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}
export function getProductDetailAction(params) {
  return {
    type: 'GET_PRODUCT_DETAIL_REQUEST',
    payload: params,
  }
}

export function getCategoryListAction(params) {
  return {
    type: 'GET_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}

export function getMoreProductAction(params) {
  return {
    type: 'GET_MORE_PRODUCT_REQUEST',
    payload: params,
  }
}

export function editCategoryListAction(params) {
  return {
    type: 'EDIT_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}

export const deleteCategoryListAction = (params) => {
  return {
    type: 'DELETE_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}

export const addCategoryListAction = (params) => {
  return {
    type: 'ADD_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}

export function editProductListAction(params) {
  return {
    type: 'EDIT_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export const deleteProductListAction = (params) => {
  return {
    type: 'DELETE_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export const addProductListAction = (params) => {
  return {
    type: 'ADD_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export const addSearchProductAction = (params) => {
  return {
    type: 'ADD_SEARCH_PRODUCT',
    payload: params,
  }
}
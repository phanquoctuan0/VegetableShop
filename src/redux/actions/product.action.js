export function getProductListAction(params) {
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
console.log("🚀 ~ file: product.action.js ~ line 43 ~ addCategoryListAction ~ params", params)
  return {
    type: 'ADD_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}
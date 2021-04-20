// import {
//   GET_PRODUCT_LIST,
// } from '../constants';

export function getProductListAction(params) {
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

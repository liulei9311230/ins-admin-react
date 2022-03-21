/*
 * @Author: lei.liu
 * @Date: 2022-03-12 20:17:18
 */
import { getProduct } from '@src/api/user';
import { ProductTypes } from '../types/ProductTypes';

export const getProductAll = dispatch => {
  getProduct().then(res => {
    dispatch({ type: ProductTypes.SET, data: res?.data?.data || {} });
  });
};

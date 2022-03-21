/*
 * @Author: lei.liu
 * @Date: 2022-03-12 20:11:51
 */

import { ProductTypes } from '../types/ProductTypes';
const product = {
  productList: [], // 险种集合[{productCode:"PA_EMPTY_TIMES_RISK",productName:"平安放空险(次单定价模型)"}]
  productMap: {}, // 险种对象，productCode为key，productName为value
  companyMap: {}, // 公司为维度的保险集合
  renewalCompanyMap: {}
};

export default (state = product, action) => {
  switch (action.type) {
    case ProductTypes.SET:
      return { ...state, ...dataHandler(action.data) };
    default:
      return state;
  }
};

interface Item {
  productCode: string;
  productName: string;
}
const arr: Item[] = [];
const dataHandler = data => {
  const companyMap = data.companyMap || {};
  const renewalCompanyMap = data.renewalCompanyMap || {};
  const productList: any = Object.values(data.companyMap || {}).reduce(
    (o: any, v: any) => o.concat(v.products || []),
    arr
  );
  const productMap = productList.reduce((o, k) => {
    o[k.productCode] = k.productName;
    return o;
  }, {});
  return { companyMap, renewalCompanyMap, productList, productMap };
};

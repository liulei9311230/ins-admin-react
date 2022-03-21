/*
 * @Author: lei.liu
 * @Date: 2022-03-13 14:07:56
 */

import Server from '@src/tools/Server';

export const keyWordList = params => {
  return Server({
    url: '/insure-admin/insurance/keyword/selectList',
    method: 'POST',
    data: params
  });
};

export const getTreeData = () => {
  return Server({
    url: '/insure-admin/insurance/keyword/getProductTree',
    method: 'POST',
    data: {}
  });
};

export const getKeywordDetail = id => {
  return Server({
    url: '/insure-admin/insurance/keyword/selectDetail',
    method: 'POST',
    data: {
      keywordId: id
    }
  });
};

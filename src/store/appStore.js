import { observable } from 'mobx';
const packageInfo = require('../../package.json');

class Store {
  @observable packageInfo = packageInfo;
}
const store = new Store();
export default store;

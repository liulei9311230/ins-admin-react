import { observable, action } from 'mobx';
class Store {
  @observable collapsed = false;
  @observable allRootSubmenuKeys = [];
  @action setCollapsed(data) {
    this.collapsed = data;
  }
  @action setAllRootSubmenuKeys(data) {
    this.allRootSubmenuKeys = data;
  }
}
const store = new Store();
export default store;

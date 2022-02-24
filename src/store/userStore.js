import { observable, action } from 'mobx';
class Store {
  @observable userInfo = {
    id: 0,
    name: '',
    gender: 1,
    avatarUrl: '',
    jobNumber: ''
  };
  @observable collapsed = false;
  @observable menuData = {};
  @observable allPowerUrl = [];
  @observable allPowerCode = [];
  @action setCollapsed(data) {
    this.collapsed = data;
  }
  @action setUserInfo(data) {
    this.userInfo = data;
  }
  @action setMenuData(data) {
    this.menuData = data;
  }
  @action setAllPowerUrl(data) {
    this.allPowerUrl = data;
  }
  @action setAllPowerCode(data) {
    this.allPowerCode = data;
  }
}
export default new Store();

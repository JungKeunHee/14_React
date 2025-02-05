import menus from "../data/menu-detail.json";

/** menus 라는 이름으로 json 데이터를 사용하겠다. */

export function getMenuList() {
  return menus;
}

export function getMenuByCode(menuCode) {
  return menus.filter((menu) => menu.menuCode === parseInt(menuCode))[0];
}

export function getSearchMenu(menuName) {
  return menus.filter((menu) => menu.menuName.match(menuName));
}

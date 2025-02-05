import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import boxStyle from "./Menu.module.css";
import { getSearchMenu } from "../apis/MenuAPI";
import MenuItem from "../items/MenuItem";

function MenuSearchResult() {
  const [searchParam] = useSearchParams();

  const menuName = searchParam.get("menuName");

  console.log("메뉴이름 넘어오나?", menuName);

  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    setMenuList(getSearchMenu(menuName));
  }, [menuName]);

  return (
    <>
      <h1>검색 결과!!</h1>
      <div className={boxStyle.MenuBox}>
        {menuList.map((menu) => (
          <MenuItem key={menu.menuCode} menu={menu} />
        ))}
      </div>
    </>
  );
}

export default MenuSearchResult;

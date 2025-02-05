import boxStyle from "./Menu.module.css";
import { useState, useEffect } from "react";
import { getMenuList } from "../apis/MenuAPI";
import MenuItem from "../items/MenuItem";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [menuList, setMenuList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => setSearchValue(e.target.value);
  const clickHandler = () => {
    navigate(`/menu/search?menuName=${searchValue}`);
  };

  // 마운트 시점에 동작 (메뉴 전체 조회)
  useEffect(() => {
    setMenuList(getMenuList());
  }, []);

  return (
    <>
      <h1>하이미디어 레스토랑 메뉴</h1>
      <div>
        <input
          type="text"
          name="menuName"
          value={searchValue}
          onChange={changeHandler}
        />
        <button onClick={clickHandler}>검색</button>
      </div>
      <div className={boxStyle.MenuBox}>
        {menuList.map((menu) => (
          <MenuItem key={menu.menuCode} menu={menu} />
        ))}
      </div>
    </>
  );
}

export default Menu;

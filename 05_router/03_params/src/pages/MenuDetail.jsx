import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMenuByCode } from "../apis/MenuAPI";

function MenuDetail() {
  const { menuCode } = useParams();
  const [menu, setMenu] = useState({
    menuName: "",
    menuPrice: 0,
    categoryName: "",
    detail: {},
  });

  useEffect(() => {
    setMenu(getMenuByCode(menuCode));
  }, [menuCode]);

  return (
    <>
      <h1>{menu.menuName} 상세 조회</h1>
      <h3>가격 : {menu.menuPrice}</h3>
      <h3>종류 : {menu.categoryName}</h3>
      <h3>설명 : {menu.detail.description}</h3>
      <img src={menu.detail.image} style={{ maxWidth: 500 }} />
    </>
  );
}

export default MenuDetail;

import "./common.css";

function Header() {
  return (
    <div className="header">
      {/* 왼쪽 메인 로고 */}
      <img src="/images/main_logo.png" alt="로고" className="logo" />

      {/* 가운데 제목 + 몬스터볼 이미지 */}
      <h1>
        <img
          src="/images/pngwing.com.png"
          alt="몬스터볼"
          className="pokeball"
        />
        포켓몬 도감
      </h1>
    </div>
  );
}

export default Header;

import "./common.css";

function Search() {
  return (
    <div className="search">
      <input
        type="text"
        className="input-box"
        placeholder="검색어를 입력해주세요"
      />
      <button className="find">검색</button>
    </div>
  );
}

export default Search;

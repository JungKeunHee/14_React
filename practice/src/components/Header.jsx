import "./common.css";

function Header() {
  return (
    <div className="header">
      <h1>
        <div className="png">
          <img
            src="/images/pngwing.com.png"
            alt="monster-ball"
            className="monster-ball"
          />
          Poke`Mon Guide
        </div>
      </h1>
    </div>
  );
}

export default Header;

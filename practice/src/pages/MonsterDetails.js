import "./MonsterDetails.css";

function MonsterDetails({ monster }) {
  return (
    <div className="monster-card">
      <h2 className="monster-name">{monster.name.toUpperCase()}</h2>
      <div className="monster-image-container">
        <img
          src={monster.sprites?.front_default}
          alt={monster.name}
          className="monster-image"
        />
      </div>
      <div className="monster-info">
        <p>
          <strong>타입:</strong>
          {monster.types?.map((t) => t.type.name).join(", ")}
        </p>
        <p>
          <strong>키:</strong> {monster.height / 10}m
        </p>
        <p>
          <strong>몸무게:</strong> {monster.weight / 10}kg
        </p>
      </div>
    </div>
  );
}

export default MonsterDetails;

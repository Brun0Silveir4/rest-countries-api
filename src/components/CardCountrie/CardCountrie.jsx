import "./CardCountrie.scss";

export default function CardCountrie({
  i,
  flags,
  name,
  population,
  region,
  capitals,
  code
}) {
  return (
    <div className="home__items__countrie-group__countrie-item" key={i}>
      <div className="home__items__countrie-group__countrie-item__flag">
        <img src={flags} alt="" className="image" />
      </div>
      <div className="home__items__countrie-group__countrie-item__text">
        <div className="title">
          <p>{name}</p>
        </div>
        <div className="informations">
          <div className="population" style={{ display: "flex", gap: "5px" }}>
            <p style={{ fontWeight: "600" }}>Population:</p>
            <p>{population.toLocaleString("pt-BR")}</p>
          </div>
          <div className="region" style={{ display: "flex", gap: "5px" }}>
            <p style={{ fontWeight: "600" }}>Region:</p>
            <p>{region}</p>
          </div>
          <div className="capital" style={{ display: "flex", gap: "5px" }}>
            <p style={{ fontWeight: "600" }}>Capital:</p>
              <p>{capitals}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

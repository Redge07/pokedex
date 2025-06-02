import React from "react";

const ColorsType = ({ type }) => {
  const typeColors = {
    Feu: "red",
    Eau: "blue",
    Plante: "green",
    Electrik: "gold",
    Fée: "pink",
    Normal: "gray",
    Poison: "purple",
    Insecte: "brown",
  };
  return (
    <p className="type" style={{ background: typeColors[type] }}>
      {type}
    </p>
  );
};

export default ColorsType;

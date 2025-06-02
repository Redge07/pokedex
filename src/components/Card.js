import React, { useEffect, useState } from "react";
import ColorsType from "../helpers/ColorsType";
import { useNavigate } from "react-router-dom";

const Card = ({ pokemon, handlePokemon, searchDynamic }) => {
  // Couleur de la care (anecdotique)
  const [colorCard, setColorCard] = useState("transparent");
  // Setter qui permet de modifier le nom d'un pokémon et qui modifira directement la base de données
  const [nameCard, setNameCard] = useState(pokemon.name);
  // Je déclare un navigate qui me permet d'aller vers un nouveau lien (comme si j'appuie sur une balise a)
  const navigate = useNavigate();
  // A chaque fois que le setter nameCard est modifié j'éxécute cette fonction
  useEffect(() => {
    // Pour dire que si le nom est vide, je remets le nom d'origine
    if (nameCard === "") {
      handlePokemon(pokemon.original, pokemon.id);
    } else {
      handlePokemon(nameCard, pokemon.id);
    }
  }, [nameCard]);

  // Cette fonction permet d'aller vers un url qui prend en compte le nom et l'id du chien.
  const handleDetails = () => {
    const urlPokemon = `${pokemon.original}-${pokemon.id}`;
    // Je vais vers ce lien, grave a cette route dans App "<Route path="/:pokemonUrl" element={<PokemonDetails />}></Route>" je vais en direction du composant PokemonDetails qui prendra en paramètre le nom et l'id du pokémon de la carte en question
    navigate(`${urlPokemon}`);
  };

  return (
    <li style={{ border: `solid 5px ${colorCard}` }}>
      <div className="change">
        <span>{nameCard === "" ? pokemon.original : pokemon.name}</span>
        <input
          type="text"
          placeholder="Changer le nom"
          disabled={searchDynamic === "" ? false : true}
          // A chaque écriture dans la case je modifie le setter nameCard qui représente le nouveau du pokémon
          onChange={(e) => setNameCard(e.target.value)}
        />
      </div>
      <div className="card">
        <img src={pokemon.picture} />
        <div className="infos">
          <h2>{pokemon.original}</h2>
          {pokemon.types.map((type) => (
            <ColorsType key={type} type={type} />
          ))}
          <p className="date">{pokemon.created.toLocaleDateString("fr-FR")}</p>
        </div>
      </div>
      <div className="color">
        <select onChange={(e) => setColorCard(e.target.value)}>
          <option value="transparent">Choisir une couleur</option>
          <option value="red">Rouge</option>
          <option value="blue">Bleu</option>
          <option value="green">Vert</option>
          <option value="yellow">Jaune</option>
          <option value="purple">Violet</option>
          <option value="orange">Orange</option>
          <option value="black">Noir</option>
        </select>
      </div>
      <button className="voir-details" onClick={handleDetails}>
        Voir le détails
      </button>
    </li>
  );
};

export default Card;

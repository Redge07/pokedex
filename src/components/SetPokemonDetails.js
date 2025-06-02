import React, { useContext, useState } from "react";
import ColorsType from "../helpers/ColorsType";
import { PokemonContext } from "../App";
import { useNavigate } from "react-router-dom";

// Au chargement du composant on récupère un pokemon et on sait si on est en modification ou en création d'un pokemon
const SetPokemonDetails = ({ pokemon, setEdit }) => {
  // Tableau de tous les types possibles
  const types = [
    "Feu",
    "Eau",
    "Plante",
    "Electrik",
    "Fée",
    "Normal",
    "Poison",
    "Insecte",
  ];

  // On récupère tous les paramètres du pokemon et on les mets dans des setters
  const [listTypes, setListTypes] = useState(pokemon.types);
  const [name, setName] = useState(pokemon.name);
  const [hp, setHp] = useState(pokemon.hp);
  const [cp, setCp] = useState(pokemon.cp);

  // Pour la création d'un pokemon on met l'url de l'image par défaut
  const [image, setImage] = useState(
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png"
  );

  // On récupère la base de données des pokemon, par la suite on pourra l'utiliser pour soit moidifier un pokemon ou ajouter un pokémon
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const navigate = useNavigate();

  // A chaque fois qu'on coche ou décoche un type dans le formulaire, on lance cette fonction pour mettre a jour le setter qui s'occupe de contenir les types du pokémon
  const handleTypes = (type) => {
    if (!listTypes.includes(type)) {
      setListTypes([...listTypes, type]);
    } else if (listTypes.includes(type) && listTypes.length > 1) {
      setListTypes((prev) => prev.filter((prevType) => prevType !== type));
    }
  };

  // Fonction qui permet de modifier le pokémon, on trouve l'identifiant dans la base de données qui correspond au pokémon en question et on modifie ces paramètres
  const changePokemon = () => {
    setPokemons((prev) => {
      return prev.map((prevPokemon) => {
        if (pokemon.id === prevPokemon.id) {
          return {
            ...prevPokemon,
            name: name,
            hp: hp,
            cp: cp,
            types: listTypes,
          };
        } else {
          return prevPokemon;
        }
      });
    });
    // Une fois que le pokémon est modifié, on passe le setter edit a false ce qui veut dire qu'on retire le composant SetPokemonDetails et que le composant PokemonDetails va réapparaitre sur la page
    setEdit(false);
  };

  // Fonction qui permet d'ajouter un pokemon en prenant en compte tous les paramètres du formulaire
  const addPokemon = () => {
    let tab = [];
    for (let i = 0; i < pokemons.length; i++) {
      tab.push(pokemons[i].id);
    }
    let id = 1;
    if (tab.length > 0) {
      id = Math.max(...tab);
    }
    const pokemon = {
      id: id + 1,
      name,
      original: name,
      hp,
      cp,
      picture: image,
      types: listTypes,
      created: new Date(),
    };
    setPokemons((prev) => [...prev, pokemon]);
    // On repart a la racine du projet, donc on retire ce composant
    navigate("/");
  };

  return (
    <div className="edit-pokemon">
      <img src={pokemon.picture} />
      <div className="poubelle">
        {/* Bouton pour partir de la fenetre qui est soit de création ou de modification */}
        <button
          onClick={() => {
            // Si on est en edit, cela veut dire qu'on est sur la page "pokemon-id" et que comme edit est true alors le composant PokemonDetais est caché dans la page et le composant SetPokemonDetails apparait sur la page. Si on appuie sur le bouton on déclenche setEdit(false), le composant SetPokemonDetails se cache pour faire réapparaitre le composant PokemonDeatils, dans tous les cas au final on est toujours sur la meme page.
            // Si on est pas en edit, cela veut dire qu'on est sur la page "Edit" et si on appuie sur le bouton on repart a la racine du projet
            setEdit ? setEdit(false) : navigate("/");
          }}
        >
          <i className="fa-solid fa-rotate-left"></i>
        </button>
      </div>
      {/* Si on est pas en edit, on ajoute la section pour ajouter une image au pokemon comme on est en création */}
      {!setEdit && <h6>Image</h6>}
      {!setEdit && (
        <input
          type="text"
          defaultValue={image}
          onChange={(e) => setImage(e.target.value)}
        />
      )}
      <h6>Nom</h6>
      <input
        type="text"
        defaultValue={pokemon.name}
        onChange={(e) => setName(e.target.value)}
      />
      <h6>Point de vie</h6>
      <input
        type="number"
        defaultValue={pokemon.hp}
        onChange={(e) => setHp(e.target.value)}
      />
      <h6>Dégats</h6>
      <input
        type="number"
        defaultValue={pokemon.cp}
        onChange={(e) => setCp(e.target.value)}
      />
      <h6>Types</h6>
      <ul>
        {types.map((type) => (
          <li key={type}>
            <input
              type="checkbox"
              checked={listTypes.includes(type)}
              id={type}
              onChange={() => handleTypes(type)}
              disabled={!listTypes.includes(type) && listTypes.length >= 3}
            />
            <label htmlFor={type}>
              <ColorsType type={type} />
            </label>
          </li>
        ))}
      </ul>
      {/* Bouton pour valider le formulaire */}
      <div className="btn">
        <button
          onClick={() => {
            // Si on est en edit, alors on lance la fonction pour changer le pokemon grace au paramètre du formulaire, si on est pas en edit et donc techniquement en création, on lance la fonction pour ajouter un pokemon avec les parametre du formulaire et donc en plus l'url de l'image
            setEdit ? changePokemon() : addPokemon();
          }}
        >
          valider
        </button>
      </div>
    </div>
  );
};

export default SetPokemonDetails;

import React, { useContext } from "react";
import { PokemonContext } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // On récupère ce qui nous permet de passer de l'état "non connecté" a l'état "connecté"
  const { setLogin } = useContext(PokemonContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = e.target.elements.user.value;
    const password = e.target.elements.password.value;
    if (user === "pikachu" && password === "pikachu") {
      // Tout les composants de l'application auront eux aussi le setter login passer a true comme c'est un useContext
      setLogin(true);
      // On va a la page qui affiche le pokédex et comme login sera a true on ne se fera pas virer
      navigate("/");
    } else {
      alert("Identifiants incorrects");
    }
  };
  return (
    <div className="container-login">
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" placeholder="user" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default Login;

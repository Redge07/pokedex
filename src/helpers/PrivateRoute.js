import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { PokemonContext } from "../App";

const PrivateRoute = ({ children }) => {
  // Je récupère le login du useContext pour savoir si mon user est connecté ou pas
  const { login } = useContext(PokemonContext);

  // Si il est connecté le composant PrivateRoute affichera tout simplement le props qu'il a en paramètre sinon on renvoie vers le lien "/Login" (comme un navigate classique) qui est un lien qui amène vers le composant Login.js
  return login ? <div>{children} coucou</div> : <Navigate to="/Login" />;
  // Du coup au final ici toute les pages sont d'abord PrivateRoute.js qui contient le children, mais si a la place de "? children" je mets "? <div>{children} coucou</div>" on verra un coucou en bas de chaque page. Et pour le <Navigate to="/Login" /> j'aurai pu mettre un composant aussi. Juste pour montrer que tout est envisageable
};

export default PrivateRoute;

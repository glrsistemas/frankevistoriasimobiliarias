  
import React, {useEffect, useState } from "react";
import utils from "../utils";
// import axios from "axios";

export const Context = React.createContext({});

export const ContextProvider = (props) => {

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedImobiliaria = localStorage.getItem('@App:imobiliaria');

    if (storagedImobiliaria && storagedUser) {
      setUser(JSON.parse(storagedUser));
      setImobiliariaUsuario(JSON.parse(storagedImobiliaria));
    }
  }, []);

  let [user, setUser] = useState({});
  let [imobiliaria, setImobiliaria] = useState([]);
  let [imobiliariaUsuario, setImobiliariaUsuario] = useState([]);
  let [atendimento, setAtendimento] = useState([]);

  return (
    <Context.Provider value={{ user, setUser, atendimento, setAtendimento, imobiliaria, setImobiliaria, setImobiliariaUsuario, imobiliariaUsuario}}>
      {props.children}
    </Context.Provider>
  );
};

const useContextApi = () => React.useContext(Context);

export default useContextApi;
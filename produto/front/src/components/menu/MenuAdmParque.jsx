import React from "react";
import { ChatIcon, ArrowBackIcon } from "@chakra-ui/icons";

function MenuAdmParque({ setShowInformacoes, setShowEventos }) {
  return (
    <div className="chakrabox">
      <button
        className="botaoLateral"
        onClick={() => {
          setShowInformacoes();
        }}
      >
        Informações
      </button>
      <button
        className="botaoLateral"
        onClick={() => {
          setShowEventos();
        }}
      >
        Eventos
      </button>
      <button className="botaoChat">
        <ChatIcon />
        Chat
      </button>
      <button className="botaoDeslogar">
        <ArrowBackIcon />
        Deslogar
      </button>
    </div>
  );
}

export default MenuAdmParque;

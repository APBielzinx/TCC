import React from "react";
import { ChatIcon, ArrowBackIcon } from "@chakra-ui/icons";

function Menu({ onChatButtonClick, onLogoutButtonClick, setShowParque, setShowUsuario, setShowSolicitacao }) {
  return (
    <div className="chakrabox">
      <button className="botaoLateral"         
          onClick={() => {
          setShowParque(true);
          setShowUsuario(false);
          setShowSolicitacao(false);
        }}>
        Parque
      </button>
      <button className="botaoLateral"         
          onClick={() => {
          setShowUsuario(true);
          setShowParque(false);
          setShowSolicitacao(false);
        }}>
        Usuário
      </button>
      <button className="botaoLateral"         
          onClick={() => {
          setShowSolicitacao(true);
          setShowParque(false);
          setShowUsuario(false);
        }}>
        Solicitação
      </button>
      <button className="botaoChat" onClick={onChatButtonClick}>
        <ChatIcon />
        Chat
      </button>
      <button className="botaoDeslogar" onClick={onLogoutButtonClick}>
        <ArrowBackIcon />
        Deslogar
      </button>
    </div>
  );
}

export default Menu;

import React from "react";
import { ChatIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Menu({ onLogoutButtonClick, setShowParque, setShowUsuario, setShowSolicitacao }) {

  const navigate = useNavigate();

   const onChatButtonClick = () => {
     console.log("oi")
    navigate("/chat")
   }


  return (
    <div className="chakrabox">
      <button className="botaoLateral"         
          onClick={() => {
          setShowParque(true);
          setShowUsuario(false);
          setShowSolicitacao(false);
        }}>
        <FontAwesomeIcon icon="fa-solwid fa-tree" />
          Parque
      </button>
      <button className="botaoLateral"         
          onClick={() => {
          setShowUsuario(true);
          setShowParque(false);
          setShowSolicitacao(false);
        }}>
      <FontAwesomeIcon icon="fa-solid fa-tree" />
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
      <button className="botaoChat"  onClick={() => onChatButtonClick()}>
        <ChatIcon />
        Chat
      </button>
      <button className="botaoDeslogar" onClick={() => onChatButtonClick()}>
        <ArrowBackIcon />
        Deslogarr
      </button>
    </div>
  );
}

export default Menu;

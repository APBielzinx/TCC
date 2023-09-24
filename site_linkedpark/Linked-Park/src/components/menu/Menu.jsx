import React, { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import * as C from "./styles/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./services/firebase";
import Loading from "./components/Loading";


const App = () => {
  const [user, loading] = useAuthState(auth);
  const [userChat, setUserChat] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // Estado para controlar a exibição do formulário de chat

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set({
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, [user]);

  if (loading) return <Loading />;

  // Função para abrir o formulário de chat
  const handleChatButtonClick = () => {
    setIsChatOpen(true);
  };

  // Função para fechar o formulário de chat
  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Se o usuário não estiver logado, exiba o formulário de login
  if (!user || isChatOpen) {
    return (
      <div>
        {/* Use o componente Menu aqui */}
        <Menu
          onChatButtonClick={handleChatButtonClick}
          onLogoutButtonClick={() => {
            // Adicione a lógica para fazer logout aqui
          }}
          setShowParque={() => {}}
          setShowUsuario={() => {}}
          setShowSolicitacao={() => {}}
        />
        {isChatOpen && (
          <div className="login-form">
            <h2>Faça o login para acessar o chat</h2>
          
          </div>
        )}
      </div>
    );
  }

  return (
    <C.Container>
      <Sidebar setUserChat={setUserChat} userChat={userChat} />
      <Chat userChat={userChat} />
    </C.Container>
  );
};

export default App;

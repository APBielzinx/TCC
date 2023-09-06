import React, { useState } from 'react';
import './App.css'; // Importe o seu arquivo de estilo CSS aqui
import Parque from './components/Parque';
import Usuario from './components/Usuario';
import Solicitacao from './components/Solicitacao';

// Estilos CSS para o menu lateral
const sidebarStyle = {
  width: '200px',
  background: 'linear-gradient(to left, #7fff00, #011e11)',
  color: 'white',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const menuItemStyle = {
  cursor: 'pointer',
  padding: '10px',
  transition: 'color 0.3s', // Alterado para mudar a cor do texto
};

const menuItemActiveStyle = {
  ...menuItemStyle,
  color: '#7fff00', // Alterado para a cor quando o mouse passa por cima
};

// Estilos CSS para a lista de parques à direita
const contentStyle = {
  padding: '20px',
  backgroundColor: '#011e11',
  color: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  flex: '1',
  overflowY: 'auto',
};

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const tableStyle = {
  width: '100%',
  margin: '10px 0',
  borderCollapse: 'collapse',
};

const thStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '5px 10px',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const pencilIconStyle = {
  marginRight: '10px',
  cursor: 'pointer',
};

const trashIconStyle = {
  cursor: 'pointer',
};

const cellStyle = {
  borderRight: '1px solid #ddd', // Adicionando coluna vertical
};

const addButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '80px',
};

function Home() {
  const [openParque, setOpenParque] = useState(false);
  const [openUsuario, setOpenUsuario] = useState(false);
  const [openSolicitacao, setOpenSolicitacao] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('parque');

  //mensagem de sucesso
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Em Home.js
  const [dadosParques, setDadosParques] = useState([]); // Certifique-se de que o estado está sendo inicializado
  const [dadosUsuario, setDadosUsuario] = useState([]); // Certifique-se de que o estado está sendo inicializado
  const [dadosSolicitacao, setDadosSolicitacao] = useState([]); // Certifique-se de que o estado está sendo inicializado

  const atualizarDados = (novoItem) => {
    setDadosParques([...dadosParques, novoItem]); // Certifique-se de que os dados estão sendo atualizados corretamente
  };

  const updateData = (novoItem) => {
    setDadosUsuario([...dadosUsuario, novoItem]);
    // Adicione lógica para atualizar os dados em outros estados, se necessário
  };

  // Função para fechar a mensagem de sucesso
  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <div
          style={selectedMenuItem === 'parque' ? menuItemActiveStyle : menuItemStyle}
          onClick={() => handleMenuItemClick('parque')}
        >
          Parque
        </div>
        <div
          style={selectedMenuItem === 'usuario' ? menuItemActiveStyle : menuItemStyle}
          onClick={() => handleMenuItemClick('usuario')}
        >
          Usuário
        </div>
        <div
          style={selectedMenuItem === 'solicitacao' ? menuItemActiveStyle : menuItemStyle}
          onClick={() => handleMenuItemClick('solicitacao')}
        >
          Solicitação
        </div>
      </div>

      <div style={contentStyle}>
        <h1 style={{ color: '#4CAF50' }}>{selectedMenuItem.charAt(0).toUpperCase() + selectedMenuItem.slice(1)}</h1>

        {selectedMenuItem === 'parque' && (
          <div style={sectionStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Nome</th>
                  <th style={thStyle}>Endereço</th>
                  <th style={thStyle}>Adm</th>
                  <th style={thStyle}>Editar</th>
                  <th style={thStyle}>Excluir</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tdStyle, ...cellStyle }}></td>
                  <td style={{ ...tdStyle, ...cellStyle }}></td>
                  <td style={{ ...tdStyle, ...cellStyle }}></td>
                  <td style={{ ...tdStyle, ...cellStyle }}></td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span style={pencilIconStyle} onClick={() => setOpenParque(true)} role="img" aria-label="Editar">
                      ✏️
                    </span>
                  </td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span style={trashIconStyle} role="img" aria-label="Excluir">
                      🗑️
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <Parque isOpen={openParque} setCloseParque={() => setOpenParque(false)} setSelectedMenuItem={setSelectedMenuItem} closeSuccessMessage={closeSuccessMessage} updateData={atualizarDados} dados={dadosParques} />
            <button style={addButtonStyle} onClick={() => setOpenParque(true)}>Adicionar</button>
          </div>
        )}

        {selectedMenuItem === 'usuario' && (
          <div style={sectionStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Nome de Usuário</th>
                  <th style={thStyle}>Senha</th>
                  <th style={thStyle}>Editar</th>
                  <th style={thStyle}>Excluir</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tdStyle, ...cellStyle }}>1</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>John Doe</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>parkebrada123</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span style={pencilIconStyle} onClick={() => setOpenUsuario(true)} role="img" aria-label="Editar">
                      ✏️
                    </span>
                  </td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span style={trashIconStyle} role="img" aria-label="Excluir">
                      🗑️
                    </span>
                  </td>
                </tr>
                {/* Adicione mais linhas aqui, se necessário */}
              </tbody>
            </table>
            <Usuario
              isOpen={openUsuario}
              setCloseUsuario={() => setOpenUsuario(false)}
              setSelectedMenuItem={setSelectedMenuItem}
              closeSuccessMessage={closeSuccessMessage}
              updateData={updateData} // Passe a função updateData aqui
              dados={dadosUsuario}
            />
            <button style={addButtonStyle} onClick={() => setOpenUsuario(true)}>Adicionar</button>
          </div>
        )}

        {selectedMenuItem === 'solicitacao' && (
          <div style={sectionStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID Solicitação</th>
                  <th style={thStyle}>Email do Adm</th>
                  <th style={thStyle}>Senha</th>
                  <th style={thStyle}>ID Usuario</th>
                  <th style={thStyle}>Editar</th>
                  <th style={thStyle}>Excluir</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tdStyle, ...cellStyle }}>1</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>admin@up.com</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>senha123</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>1</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span style={pencilIconStyle} onClick={() => setOpenSolicitacao(true)} role="img" aria-label="Editar">
                      ✏️
                    </span>
                  </td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span style={trashIconStyle} role="img" aria-label="Excluir">
                      🗑️
                    </span>
                  </td>
                </tr>
                {/* Adicione mais linhas aqui, se necessário */}
              </tbody>
            </table>
            <Solicitacao isOpen={openSolicitacao} setCloseSolicitacao={() => setOpenSolicitacao(false)} setSelectedMenuItem={setSelectedMenuItem} closeSuccessMessage={closeSuccessMessage} updateData={atualizarDados} />
            <button style={addButtonStyle} onClick={() => setOpenSolicitacao(true)}>Adicionar</button>
          </div>
        )}

        {/* ... */}
      </div>
    </div>
  );
}

export default Home;

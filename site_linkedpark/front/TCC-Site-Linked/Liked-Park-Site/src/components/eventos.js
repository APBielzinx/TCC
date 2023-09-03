import React, { useState } from 'react';

// Estilos CSS para o menu lateral
const sidebarStyle = {
  width: '200px',
  background: '#333',
  color: 'white',
  padding: '20px',
};

const menuItemStyle = {
  cursor: 'pointer',
  padding: '10px',
  transition: 'background 0.3s',
};

// Estilos CSS para a lista de parques à direita
const contentStyle = {
  marginLeft: '220px', // para acomodar o menu lateral
  padding: '20px',
};

const parkListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const parkCardStyle = {
  width: '200px',
  height: '150px',
  margin: '10px',
  border: '1px solid #ddd',
  padding: '10px',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  margin: '5px',
  cursor: 'pointer',
};

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('parque'); // Padrão: 'parque'

  // Função para alternar o item do menu selecionado
  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };

  return (
    <div>
      <div style={sidebarStyle}>
        <div
          style={{
            ...menuItemStyle,
            background: selectedMenuItem === 'parque' ? '#4CAF50' : 'transparent',
          }}
          onClick={() => handleMenuItemClick('parque')}
        >
          Parque
        </div>
        <div
          style={{
            ...menuItemStyle,
            background: selectedMenuItem === 'usuario' ? '#4CAF50' : 'transparent',
          }}
          onClick={() => handleMenuItemClick('usuario')}
        >
          Usuário
        </div>
        <div
          style={{
            ...menuItemStyle,
            background: selectedMenuItem === 'solicitacao' ? '#4CAF50' : 'transparent',
          }}
          onClick={() => handleMenuItemClick('solicitacao')}
        >
          Solicitação
        </div>
      </div>

      <div style={contentStyle}>
        <h1>{selectedMenuItem.charAt(0).toUpperCase() + selectedMenuItem.slice(1)}</h1>

        {/* Lista de Parques */}
        {selectedMenuItem === 'parque' && (
          <div style={parkListStyle}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} style={parkCardStyle}>
                <h3>Parque {index + 1}</h3>
                <button style={buttonStyle}>Adicionar</button>
                <button style={buttonStyle}>Editar</button>
                <button style={buttonStyle}>Excluir</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
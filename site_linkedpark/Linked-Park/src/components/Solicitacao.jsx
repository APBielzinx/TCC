import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const BACKGROUND_STYLE = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '1000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const MODAL_STYLE = {
  position: 'fixed',
  padding: '20px',
  height: '400px',
  width: '700px',
  borderRadius: '20px',
  color: 'white',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};

const MODAL_BACKGROUND_STYLE = {
  content: '""',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backdropFilter: 'blur(15px)',
  zIndex: '-1',
  borderRadius: '10px',
};

const CLOSE_ICON_STYLE = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  color: 'white',
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
  verticalAlign: 'middle',
};

const trashIconStyle = {
  cursor: 'pointer',
  verticalAlign: 'middle',
};

const cellStyle = {
  borderRight: '1px solid #ddd',
};

const addButtonStyle = {
  backgroundColor: '#7FFF00',
  color: 'black',
  borderRadius: '20px',
  padding: '5px 10px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '10px',
  marginBottom: '20px',
};

const inputContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
};

const inputStyle = {
  borderRadius: '5px',
  padding: '5px',
  marginRight: '10px',
};

export default function Solicitacao({ isOpen, setCloseSolicitacao, setSelectedMenuItem, closeSuccessMessage }) {
  const [dados, setDados] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [IDUsuario, setIDUsuario] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // buscarDados();
  }, []);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleMenuItemClick = (item) => {
    setCloseSolicitacao(false);
    setSelectedMenuItem(item);
  };

  const adicionarLinha = () => {
    if (email && senha && IDUsuario) {
      if (editIndex === -1) {
        const novoItem = { id: dados.length + 1, email, senha, IDUsuario };
        setDados([...dados, novoItem]);
        setShowSuccessMessage(true);
        closeSuccessMessage();
        setEmail('');
        setSenha('');
        setIDUsuario('');
        console.log('Adicionado:', novoItem); // Log para adicionar no console
      } else {
        const novosDados = [...dados];
        novosDados[editIndex] = { id: novosDados[editIndex].id, email, senha, IDUsuario };
        setDados(novosDados);
        setEditIndex(-1);
        setEmail('');
        setSenha('');
        setIDUsuario('');
        console.log('Editado:', novosDados[editIndex]); // Log para editar no console
      }
    }
  };

  const editarLinha = (index) => {
    const linha = dados[index];
    setEmail(linha.email);
    setSenha(linha.senha);
    setIDUsuario(linha.IDUsuario);
    setEditIndex(index);
  };

  const excluirLinha = (index) => {
    const novosDados = [...dados];
    const excluido = novosDados.splice(index, 1);
    setDados(novosDados);
    console.log('Excluído:', excluido); // Log para excluir no console
  };

  /* const buscarDados = () => {
    fetch('http://localhost:8080/api/solicitacoes', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbXN1cHJlbW9AZ21haWwuY29tIiwiZXhwIjoxNjk0MjI5MTY3fQ.698pMSzntwh83yjDHW5VgeSfuN7Zh58TpvcwgSIZqv8"
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data => {
      console.log(data)
      if (data) {
        setDados(data); // Atualize o estado dados com os dados obtidos
      }
    })
  }; */

  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
          <FontAwesomeIcon
            onClick={setCloseSolicitacao}
            icon={faTimes}
            style={CLOSE_ICON_STYLE}
          />
          <h2>ADICIONAR TABELA SOLICITAÇÃO</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>E-mail do adm</th>
                <th style={thStyle}>Senha</th>
                <th style={thStyle}>IDUsuário</th>
                <th style={thStyle}>Editar</th>
                <th style={thStyle}>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr key={item.idSolicitacoes}>
                  <td style={{ ...tdStyle, ...cellStyle }}>{item.idSolicitacoes}</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>{item.email}</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>{item.senha}</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>{item.IDUsuario}</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span
                      style={pencilIconStyle}
                      onClick={() => editarLinha(index)}
                      role="img"
                      aria-label="Editar"
                    >
                      ✏️ Editar
                    </span>
                  </td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span
                      style={trashIconStyle}
                      onClick={() => excluirLinha(index)}
                      role="img"
                      aria-label="Excluir"
                    >
                      🗑️ Excluir
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div style={inputContainerStyle}>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="IDUsuario"
                value={IDUsuario}
                onChange={(e) => setIDUsuario(e.target.value)}
                style={inputStyle}
              />
            </div>
            <button onClick={adicionarLinha} style={addButtonStyle}>
              {editIndex === -1 ? 'Adicionar' : 'Salvar'}
            </button>
            {showSuccessMessage && (
              <div className="success-message">
                Item adicionado com sucesso!
              </div>
            )}
          </div>
        </div>
        <div style={MODAL_BACKGROUND_STYLE}></div>
      </div>
    );
  }

  return null;
}

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
};

const trashIconStyle = {
  cursor: 'pointer',
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
  marginTop: 'auto',
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

export default function Parque({ isOpen, setCloseParque, setSelectedMenuItem, closeSuccessMessage }) {
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [adm, setAdm] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

    //*useEffect(() => {
   //*  buscarDados();
  //* }, []);
 
  // mensagem de adicionar

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleMenuItemClick = (item) => {
    setCloseParque(false);
    setSelectedMenuItem(item);
  };

  const adicionarLinha = () => {
    if (nome && endereco && adm) {
      if (editIndex === -1) {
        const novoItem = { id: dados.length + 1, nome, endereco, adm };
        setDados([...dados, novoItem]);
        setShowSuccessMessage(true);
        closeSuccessMessage();
        setSelectedMenuItem('parque');
        setCloseParque(false);
        console.log('Adicionado:', novoItem); // Log para adicionar no console
      } else {
        const novosDados = [...dados];
        novosDados[editIndex] = { id: novosDados[editIndex].id, nome, endereco, adm };
        setDados(novosDados);
        setEditIndex(-1);
        console.log('Editado:', novosDados[editIndex]); // Log para editar no console
      }
      setNome('');
      setEndereco('');
      setAdm('');
    }
  };

  
  /* const enviarDados = (novoitem) =>{
    console.log(novoitem)
    fetch('http://localhost:8080/api/lazer', {
      method: 'POST',
      body: JSON.stringify({
        "nome":novoitem.nome,
        "endereco":novoitem.endereco,
        "administrador":{
          "idAdm":novoitem.id
        }
    
       
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
       'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbXN1cHJlbW9AZ21haWwuY29tIiwiZXhwIjoxNjk0MjI5MTY3fQ.698pMSzntwh83yjDHW5VgeSfuN7Zh58TpvcwgSIZqv8"

      },
    })
    .then(response => {
     
      if (response.status == 201) {
        return response.json(); 
      } else if(response.status == 403){
          console.log("Você não tem permissao para isso tente fazer login novamente")
      }
    })
    .catch(error => {
      console.error("Erro durante a requisição:", error);
    });
   
    
  };

const buscarDados = ()=>{

  fetch('http://localhost:8080/api/lazer', {
    method: 'GET',
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbXN1cHJlbW9AZ21haWwuY29tIiwiZXhwIjoxNjk0MjI5MTY3fQ.698pMSzntwh83yjDHW5VgeSfuN7Zh58TpvcwgSIZqv8"
    },

}).then(response =>{

if(response.status == 200 ){
  return response.json()
}


}).then(data =>{
  console.log("data"+data)

  if (data) {
    setDados(data); // Atualize o estado dados com os dados obtidos

  }
} )

}
 
const editar =(dados)=>{

  fetch('http://localhost:8080/api/lazer', {
    method: 'PUT',
    body: JSON.stringify({
      "idLazer":dados.idLazer,
      "nome":dados.nome,
      "endereco":dados.endereco
      
     
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
     'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbXN1cHJlbW9AZ21haWwuY29tIiwiZXhwIjoxNjk0MjI5MTY3fQ.698pMSzntwh83yjDHW5VgeSfuN7Zh58TpvcwgSIZqv8"

    },
  })
  .then(response => {
   
    if (response.status == 200) {
      return response.json(); 
    } else if(response.status == 403){
        console.log("Você não tem permissao para isso tente fazer login novamente")
    }
  })
  .catch(error => {
    console.error("Erro durante a requisição:", error);
  });
 
  };
*/

 /* const editarLinha = (index) => {
     const linha = dados[index];
     };
  */
  const editarLinha = (index) => {
    const linha = dados[index];
    setNome(linha.nome);
    setEndereco(linha.endereco);
    setAdm(linha.adm);
    setEditIndex(index);
    console.log('Editando linha:', linha); // Log para editar no console
  };

  const excluirLinha = (index) => {
    const novosDados = [...dados];
    const excluido = novosDados.splice(index, 1);
    setDados(novosDados);
    console.log('Excluído:', excluido[0]); // Log para excluir no console
  };

  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
          <FontAwesomeIcon
            onClick={setCloseParque}
            icon={faTimes}
            style={CLOSE_ICON_STYLE}
          />
          <h2>ADICIONAR TABELA PARQUE</h2>
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
              {dados.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ ...tdStyle, ...cellStyle }}>{item.id}</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>{item.nome}</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>{item.endereco}</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>{item.adm}</td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span
                      style={pencilIconStyle}
                      onClick={() => editarLinha(index)}
                      role="img"
                      aria-label="Editar"
                    >
                      ✏️
                    </span>
                  </td>
                  <td style={{ ...tdStyle, ...cellStyle }}>
                    <span
                      style={trashIconStyle}
                      onClick={() => excluirLinha(index)}
                      role="img"
                      aria-label="Excluir"
                    >
                      🗑️
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
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Adm"
                value={adm}
                onChange={(e) => setAdm(e.target.value)}
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

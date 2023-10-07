import { useParams, useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import '../App.css'; // Importe o seu arquivo de estilo CSS aqui
import Parque from '../components/Parque';
import Usuario from '../components/Usuario';
import Solicitacao from '../components/Solicitacao';

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
  color: 'black',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '80px',
};


const ContactDetails = () => {


    const navigate = useNavigate()

    const handleContact = () => {
        console.log("Contato enviado!")
        return navigate("/homeadm")
    }

  return (
  <div>
    <h1>Exixbindo mais informações do contato </h1>
    <button onClick={handleContact}>Enviar Mensagem</button>
  </div>
  );
}

export default ContactDetails
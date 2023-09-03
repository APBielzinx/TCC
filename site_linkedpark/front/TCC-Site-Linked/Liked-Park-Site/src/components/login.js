import React from 'react';
import Logo from '../img/logo.png'

const BACKGROUND_STYLE = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor do fundo com opacidade
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
  borderRadius: '10px',
  color: 'black',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Cor do modal com opacidade
};
const PARTE_ESQUERDA_STYLE = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '-20px',
    alignItems: 'center',
    marginTop: -20,
    width: '35%',
    height: '440px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Cor do modal com opacidade
    backdropFilter: 'blur(10px)', // Efeito de vidro
    borderRadius: '10px',
  };

  const TEXTO_STYLE = {
    display: 'flex',
    width: '35%',
    height: '40px',
    backgroundColor: 'transparent',
    color: '#fff',
    textAlign: 'center',
  };

  const TEXTO2_STYLE = {
    display: 'flex',
    width: '120px',
    height: '25px',
    backgroundColor: 'transparent',
    color: '#fff',
    textAlign: 'center',
  };

  const IMG_STYLE = {
    display: 'flex',
    width: '120px',
    height: '140px',
    marginLeft: '10px',
    marginBottom: '0',
    backgroundColor: 'transparent',
    color: '#fff',
    textAlign: 'center',
  };

  const BUTTON_STYLE = {
    display: 'flex',
    marginTop: '0',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    height: '40px',
    backgroundColor:  '#fff',
    color: 'black', 
    borderRadius: '20px'
  };

const MODAL_BACKGROUND_STYLE = {
  content: '""',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backdropFilter: 'blur(15px)', // Efeito de vidro
  zIndex: '-1',
  borderRadius: '10px',
};



export default function Login({ isOpen }) {
  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
            <div style={PARTE_ESQUERDA_STYLE}>
          <p style={TEXTO_STYLE}>Bem vindo</p>
          <img style={IMG_STYLE} src={Logo} alt="logo do app" title="logo do app"/>
          <p style={TEXTO2_STYLE}>NOVA CONTA</p>
          <button style={BUTTON_STYLE}>CADASTRE-SE</button>
            </div>
          <div style={MODAL_BACKGROUND_STYLE}></div>
        </div>
      </div>
    );
  }

  return null;
}

import React, { useState, useEffect } from 'react';
import Logo from '../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

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
  borderRadius: '10px',
  color: 'black',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};

const CLOSE_ICON_STYLE = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  color: 'white',
};

const PARTE_ESQUERDA_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '-20px',
  alignItems: 'center',
  marginTop: -20,
  width: '35%',
  height: '440px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
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
  width: '65px',
  height: '25px',
  backgroundColor: 'transparent',
  color: '#fff',
  textAlign: 'center',
  alignItems: 'center',
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
  marginTop: '20px',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  width: '150px',
  height: '40px',
  backgroundColor: '#fff',
  color: 'black',
  borderRadius: '20px',
  cursor: 'pointer',
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

const INPUT_STYLE1 = {
  display: 'block',
  width: '100%',
  height: '40px',
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid #fff',
  borderRadius: '50px',
  margin: '10px 0',
  paddingLeft: '40px',
};

const INPUT_ICON_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '10px',
  transform: 'translateY(-50%)',
  color: 'gray',
};

const INPUT_STYLE2 = {
  display: 'block',
  width: '91%',
  height: '40px',
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid #fff',
  borderRadius: '40px',
  margin: '10px 0',
  paddingLeft: '40px',
};

export default function Login({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Exibir os dados do formulário no console
    console.log('Dados do formulário:', formData);

    
    fetch('http://localhost:8080/api/administrador/login', {
      method: 'POST',
      body: JSON.stringify({
        "email":formData.username,
        "senha":formData.password
    
       
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => {
     
      if (response.status === 200) {
        return response.json(); 
      } else {
          console.log("usuario nao encontrado")
      }
    })
    .then(data => {
      if (data) {
        console.log(data)
    
      localStorage.setItem('email',data.select.email);
      localStorage.setItem('senha',data.select.senha);
      localStorage.setItem('token',data.token);
     //var logado = true
    //  navigation.navigate('TelaInicial',logado);
    
    
        console.log("Dados de resposta da API:", data);
      }
    })
    .catch(error => {
      console.error("Erro durante a requisição:", error);
    });
   
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    document.title = 'Linked Park';
  }, []);

  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
          <FontAwesomeIcon
            icon={faTimes}
            style={CLOSE_ICON_STYLE}
            onClick={onClose}
          />
          <div style={{ display: 'flex' }}>
            <div style={{ ...PARTE_ESQUERDA_STYLE, width: '35%' }}>
              <p style={TEXTO_STYLE}>Bem vindo</p>
              <img
                style={IMG_STYLE}
                src={Logo}
                alt="logo do app"
                title="logo do app"
              />
              <p style={TEXTO2_STYLE}>LINKED PARK</p>
            </div>
            <div
              style={{
                width: '60%',
                height: '1000%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p style={TEXTO2_STYLE}>LOGIN</p>
              <p style={TEXTO_STYLE}>ㅤㅤㅤ</p>
              <div style={{ position: 'relative', width: '100%' }}>
                <FontAwesomeIcon icon={faUser} style={INPUT_ICON_STYLE} />
                <input
                  style={INPUT_STYLE1}
                  type="text"
                  placeholder="Usuário"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon
  icon={faTimes}
  style={CLOSE_ICON_STYLE}
  onClick={onClose}
/>
              </div>
              <div style={{ position: 'relative', width: '100%' }}>
                <FontAwesomeIcon icon={faLock} style={INPUT_ICON_STYLE} />
                <input
                  style={{ ...INPUT_STYLE2, paddingRight: '40px' }}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '5px',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'gray',
                    cursor: 'pointer',
                  }}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? '◠ Ocultar' : '  ͡o Mostrar'}
                </button>
              </div>
              <button style={BUTTON_STYLE} onClick={handleLogin}>
                ENTRAR
              </button>
            </div>
          </div>
          <div style={MODAL_BACKGROUND_STYLE}></div>
        </div>
      </div>
    );
  }

  return null;
}

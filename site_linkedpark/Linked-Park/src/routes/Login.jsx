import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Logo from "../img/logoLinkedParkSemFundo.png"
import '../css/App.css'; // Importe o seu arquivo de estilo CSS aqui
import { FaUser, FaLock, FaTimes } from 'react-icons/fa'; // Substituído FaEnvelope por FaUser

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
  backgroundColor: 'rgba(217, 217, 217, 0.10)',
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
  justifyContent: 'center',
  marginTop: -20,
  width: '40%',
  height: '400px',
  background: 'linear-gradient(180deg, #F1FFEF 0%, rgba(241, 255, 239, 0.50) 0.01%, rgba(1, 30, 17, 0.50) 100%)',
  backdropFilter: 'blur(10px), (20px)',
  borderRadius: '10px',
};

const PARTE_DIREITA_STYLE = {
  width: '60%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
  width: '70px',
  height: '25px',
  backgroundColor: 'transparent',
  color: '#fff',
  textAlign: 'center',
  alignItems: 'center',
  fontSize: '11px',
};

const TEXTO3_STYLE = {
  display: 'flex',
  width: '70px',
  height: '25px',
  backgroundColor: 'transparent',
  color: '#fff',
  textAlign: 'center',
  alignItems: 'center',
  fontSize: '15px',
  marginLeft: '45px',
};

const IMG_STYLE = {
  display: 'flex',
  width: '140px',
  height: '140px',
  marginLeft: '10px',
  marginTop: '5px',
  marginBottom: '15px',
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

const INPUT_CONTAINER_STYLE = {
  position: 'relative',
  width: '95%',
  height: '40px',
  margin: '15px 30px',
};

const INPUT_ICON_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '10px',
  transform: 'translateY(-50%)',
  color: 'gray',
  zIndex: '1', // Coloca o ícone na frente do input
};

const INPUT_STYLE = {
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid #fff',
  borderRadius: '50px',
  paddingLeft: '40px',
};

export default function Login({ isOpen, setCloseLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = (data) => {
    console.log(data);
    fetch('https://tcc-production-e100.up.railway.app/api/administrador/login', {
      method: 'POST',
      body: JSON.stringify({
        "email": data.username,
        "senha": data.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("Usuário não encontrado!");
      }
    })
    .then(data => {
      if (data) {
        console.log(data);
        localStorage.setItem('administrador', JSON.stringify(data));
        alert("Usuário encontrado!");
        if (data.select.role === "MANAGER") {
          navigate("/homeadmparque");
        } else {
          console.log("tela de adm normal");
        }
      }
    })
    .catch(error => {
      console.error("Erro durante a requisição:", error);
      alert("Erro");
    });
  }

  useEffect(() => {
    document.title = 'Linked Park';
  }, []);

  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
          <FaTimes style={CLOSE_ICON_STYLE} onClick={setCloseLogin} />
          <div style={{ display: 'flex' }}>
            <div style={{ ...PARTE_ESQUERDA_STYLE }}>
              <p style={TEXTO_STYLE}>Bem-vindo</p>
              <img
                src={Logo}
                style={IMG_STYLE}
                alt="logo do app"
                title="logo do app"
              />
              <p style={TEXTO2_STYLE}>LINKED PARK</p>
            </div>
            <div style={PARTE_DIREITA_STYLE}>
              <p style={TEXTO3_STYLE}>LOGIN</p>
              <p style={TEXTO_STYLE}>ㅤㅤㅤ</p>
              <div style={INPUT_CONTAINER_STYLE}>
                <FaUser style={INPUT_ICON_STYLE} /> {/* Ícone de CONTATO */}
                <input
                  style={INPUT_STYLE}
                  type="text"
                  placeholder="Usuário"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div style={INPUT_CONTAINER_STYLE}>
                <FaLock style={INPUT_ICON_STYLE} />
                <input
                  style={{ ...INPUT_STYLE }}
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
                  {showPassword ? '◠ Ocultar' : ' ⦾ Mostrar'}
                </button>
              </div>
              <button style={BUTTON_STYLE} onClick={() => login(formData)}>
                ENTRAR
              </button>
            </div>
          </div>
          <div style={MODAL_BACKGROUND_STYLE}></div>
        </div>
      </div>
    );
  }
}

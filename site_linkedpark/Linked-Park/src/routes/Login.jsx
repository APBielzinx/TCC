import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Logo from "../img/logoLinkedParkSemFundo.png";
import { FaUser, FaLock, FaTimes } from 'react-icons/fa';
import '../css/Login.css'; // Importe o arquivo CSS separado

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
          navigate("/homeadm");
        } else {
          console.log("tela de adm normal");
          navigate("/homeadmparque");
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
      <div className="BACKGROUND_STYLE">
        <div className="MODAL_STYLE">
          <FaTimes className="CLOSE_ICON_STYLE" onClick={setCloseLogin} />
          <div style={{ display: 'flex' }}>
            <div className="PARTE_ESQUERDA_STYLE">
              <p className="TEXTO_STYLE">Bem-vindo</p>
              <img
                src={Logo}
                className="IMG_STYLE"
                alt="logo do app"
                title="logo do app"
              />
              <p className="TEXTO2_STYLE">LINKED PARK</p>
            </div>
            <div className="PARTE_DIREITA_STYLE">
              <p className="TEXTO3_STYLE">LOGIN</p>
              <p className="TEXTO_STYLE">ㅤㅤㅤ</p>
              <div className="INPUT_CONTAINER_STYLE">
                <FaUser className="INPUT_ICON_STYLE" />
                <input
                  className="INPUT_STYLE"
                  type="text"
                  placeholder="Usuário"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="INPUT_CONTAINER_STYLE">
                <FaLock className="INPUT_ICON_STYLE" />
                <input
                  className="INPUT_STYLE"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  className="SHOW_PASSWORD_BUTTON_STYLE"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? '◠ Ocultar' : ' ⦾ Mostrar'}
                </button>
              </div>
              <button className="BUTTON_STYLE" onClick={() => login(formData)}>
                ENTRAR
              </button>
            </div>
          </div>
          <div className="MODAL_BACKGROUND_STYLE"></div>
        </div>
      </div>
    );
  }
}

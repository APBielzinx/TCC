import React, { useState } from 'react';
import { FaTimes, FaEnvelope, FaLock, FaTree } from 'react-icons/fa'; // Importe os ícones necessários do FontAwesome
import Logo from "../img/logoLinkedParkSemFundo.png";
import '../css/Login.css';

export default function SolicitarLogin({ isOpen, setCloseModal }) {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    parque: '', 
  });

  const parques = [
    'Parque A',
    'Parque B',
    'Parque C',
  ];

  const [isIncomplete, setIsIncomplete] = useState(false); // Adicionando estado para controle de campo incompleto
  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para controlar se a senha deve ser mostrada

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Verifique se algum campo obrigatório está em branco
    if (!formData.email || !formData.senha || !formData.parque) {
      setIsIncomplete(true);
    } else {
      // Aqui você pode adicionar a lógica para lidar com o envio do formulário
      console.log('Dados do formulário:', formData);
      // Feche a modal após o envio do formulário
      setCloseModal();
      // Exibir o alerta após o envio do formulário
      if (window.location.href === 'http://localhost:5173/') {
        alert('ATENÇÃO!\nEsta solicitação é para obter a sua área do administrador. Por favor, cheque seu e-mail e aguarde para ter seu login');
      }
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="BACKGROUND_STYLE"> 
          <div className="MODAL_STYLE"> 
            <FaTimes className="CLOSE_ICON_STYLE" onClick={setCloseModal} />
            <div style={{ display: 'flex' }}>
              <div className="PARTE_ESQUERDA_STYLE"> 
                <h3 className="TEXTO_STYLE">ﾠBem-Vindoﾠﾠ</h3> 
                <img
                  src={Logo}
                  className="IMG_STYLE"
                  alt="logo do app"
                  title="logo do app"
                />
                <p className="TEXTO2_STYLE">LINKED PARK</p>
              </div>
              <div className="PARTE_DIREITA_STYLE"> 
                <h3 className="TEXTO3_STYLE">SOLICITAR LOGIN</h3> 
                <h3 className="TEXTO_STYLE">ﾠ</h3> 
                <form onSubmit={handleSubmit}>
                  <div className="INPUT_CONTAINER_STYLE"> 
                    <FaEnvelope className="ICON_STYLE" /> {/* Ícone do envelope */}
                    <input
                      className="INPUT_STYLE"
                      type="email"
                      placeholder="E-mail"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="INPUT_CONTAINER_STYLE"> 
                    <FaLock className="ICON_STYLE" /> {/* Ícone do cadeado */}
                    <input
                      className="INPUT_STYLE"
                      type={mostrarSenha ? 'text' : 'password'}
                      placeholder="Senha"
                      name="senha"
                      value={formData.senha}
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
                      className="SHOW_PASSWORD_BUTTON_STYLE"
                      onClick={toggleMostrarSenha}
                    >
                    {mostrarSenha ? '◠ Ocultar' : ' ⦾ Mostrar'}
                    </button>
                  </div>
                  <div className="INPUT_CONTAINER_STYLE"> 
                    <FaTree className="ICON_STYLE" /> {/* Ícone da árvore */}
                    <select
                      className="INPUT_STYLE" 
                      name="parque"
                      value={formData.parque}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Selecione um parque</option>
                      {parques.map((parque, index) => (
                        <option key={index} value={parque}>
                          {parque}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="BOTAO_CONTAINER_STYLE" style={{ textAlign: 'center' }}> 
                    <button className="BUTTON_STYLE">
                      ENVIAR
                    </button>
                  </div>
                  {isIncomplete && ( // Exibe a mensagem de aviso se algum campo estiver em branco
                    <p className="AVISO_STYLE">Por favor, preencha todos os campos.</p>
                  )}
                  <p className="AVISO_STYLE">ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</p>
                  {/* Espaço para os inputs */} 
                </form>
              </div>
            </div>
            <div className="MODAL_BACKGROUND_STYLE"></div>
          </div>
        </div>
      )}
    </div>
  );
}

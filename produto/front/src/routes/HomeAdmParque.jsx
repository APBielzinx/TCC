import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon, ChatIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box as ChakraBox,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";

import {
  Box,
  ChakraProvider,
  Image,
  VStack,
  Text,
  Spacer,
  StackDivider,
  Link,
} from "@chakra-ui/react";

import ModalComp from "../components/ModalComp";
import ModalCompUsuario from "../components/ModalCompUsuario";
import ModalCompSolicitacao from "../components/ModalCompSolicitacao";
import Menu from "../components/menu/menu";
import FlexContainer from "../components/flexcontainer/FlexContainer";
import Parque from "../components/menu/opcoes/Parque";
import Usuario from "../components/menu/opcoes/Usuario";
import Solicitacao from "../components/menu/opcoes/Solicitacao";
import { extendTheme } from "@chakra-ui/react";
import "../css/HomeAdm.css";
import { Navigate } from "react-router-dom";

function HomeAdm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataParque, setDataParque] = useState([]); // Dados do Parque
  const [dataUsuario, setDataUsuario] = useState([]); // Dados do Usuário
  const [dataSolicitacao, setDataSolicitacao] = useState([]); // Dados da Solicitação
  const [dataEdit, setDataEdit] = useState({});
  const [showParque, setShowParque] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const [dados, setDados] = useState([]);
  const [dadosUsuario, setDadosUsuario] = useState([]);

  var administrador = JSON.parse(localStorage.getItem("administrador"));

  async function buscarUsuarios() {
    try {
      const token = administrador.token;
      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/usuario",
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log("Dados da resposta: u", data);

          // Atualize o estado dataUsuario com os dados recebidos da API
          setDataUsuario(data);
        } else {
          console.error("Erro na solicitação:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    // Defina os estados de dados separados para cada seção
    setDataParque(db_costumer.filter((item) => item.section === "parque"));
    setDataUsuario(db_costumer.filter((item) => item.section === "usuario"));
    setDataSolicitacao(
      db_costumer.filter((item) => item.section === "solicitacao")
    );
  }, []);

  const handleRemove = (email, section) => {
    // Use a seção especificada para filtrar os dados corretos
    let newData = [];
    switch (section) {
      case "parque":
        newData = dataParque.filter((item) => item.email !== email);
        setDataParque(newData);
        break;
      case "usuario":
        newData = dataUsuario.filter((item) => item.email !== email);
        setDataUsuario(newData);
        break;
      case "solicitacao":
        newData = dataSolicitacao.filter((item) => item.email !== email);
        setDataSolicitacao(newData);
        break;
      default:
        break;
    }

    // Atualize o localStorage com os dados filtrados
    localStorage.setItem("cad_cliente", JSON.stringify(newData));
  }

  async function handleAdicionarParque(novoParque) {
    try {
      // Obtém o token do administrador
      const token = await administrador.token;

      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "URL_DA_API_PARA_ADICIONAR_PARQUE",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(novoParque),
          }
        );

        if (response.status === 201) {
          const data = await response.json();
          console.log("Parque adicionado com sucesso:", data);

          // Adicione o novo parque aos dados existentes
          setDataParque([...dataParque, data]);

          onClose(); // Feche o modal de adição após a conclusão
        } else {
          console.error("Erro na adição do parque:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar o parque:", error);
    }
  }

  async function handleEditarUsuario(usuarioEditado) {
    try {
      const token = administrador.token;

      if (token) {
        const headers = {
          "Content-type": "application.json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `URL_DA_API_PARA_EDITAR_USUARIO/${usuarioEditado.id}`,
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(usuarioEditado),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log("Usuário editado com sucesso:", data);

          // Atualize o estado do usuário editado na lista de usuários
          const newDataUsuario = dataUsuario.map((item) => {
            if (item.id === data.id) {
              return data;
            }
            return item;
          });

          setDataUsuario(newDataUsuario);

          onClose(); // Feche o modal de edição após a conclusão
        } else {
          console.error("Erro na edição do usuário:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao editar o usuário:", error);
    }
  }

  async function handleExcluirParque(id) {
    try {
      const token = await administrador.token;

      if (token) {
        const headers = {
          "Content-type": "application.json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `https://tcc-production-e100.up.railway.app/api/lazer/${id}`,
          {
            method: "DELETE",
            headers: headers,
          }
        );

        if (response.status === 204) {
          // Remova o parque da lista
          const newDataParque = dataParque.filter((item) => item.id !== id);
          setDataParque(newDataParque);

          console.log("Parque removido com sucesso!");
        } else {
          console.error("Erro na exclusão do parque:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao excluir o parque:", error);
    }
  }

  const navigate = useNavigate();

  const chat = () => {
    console.log("amem");
    navigate("/chat");
  };

  const voltartelainicial = () => {
    // Redirecione para a tela inicial
    window.location.href = "http://localhost:5173/";
  };

  const handleLogout = () => {
    // Lógica para fazer logout e redirecionar para a tela de login
    // Por exemplo, limpar o localStorage e redirecionar para a tela de login
    localStorage.removeItem("administrador");
    voltartelainicial(); // Redirecione para a tela inicial
  };

  return (
    <>
      <ChakraProvider>
        <ChakraBox className="fundo">
          {/* Cabeçalho */}
          <Flex className="header">
            <Heading as="h1" size="xl">
              Linked Park
            </Heading>
            <Flex className="usuarioAdm">
              <img
                className="fotoUsuarioAdm"
                src="/assets/my-image.jpg" // Caminho relativo para a imagem
              />
              <Text fontWeight="bold">Nome do Usuário</Text>
            </Flex>
          </Flex>

          {/* Conteúdo */}
          <Flex>
            {/* Menu Lateral */}
            <ChakraBox className="boxmenulateral">
              {/* Opções do Menu Lateral */}
              <button
                className="botoessuperiores"
                onClick={() => {
                  setShowParque(true);
                  setShowUsuario(false);
                  setShowSolicitacao(false);
                }}
              >
                Parque
              </button>
              <button
                className="botoessuperiores"
                onClick={() => {
                  setShowParque(false);
                  setShowUsuario(true);
                  setShowSolicitacao(false);
                }}
              >
                Usuário
              </button>
              <button
                className="botoessuperiores"
                onClick={() => {
                  setShowParque(false);
                  ShowUsuario(false);
                  setShowSolicitacao(true);
                }}
              >
                Solicitação
              </button>

              {/* Opções Adicionais do Menu Lateral (em baixo) */}
              <button className="botaoChat" onClick={chat}>
                <ChatIcon mr="2" />
                Chat
              </button>
              <button className="botaoDeslogar" onClick={handleLogout}>
                Deslogar
              </button>
            </ChakraBox>
            <ChakraBox>
              {showParque && (
                <Parque
                  data={dataParque}
                  handleEditParque={(parque) => {
                    setDataEdit(parque);
                    onOpen();
                  }}
                  handleDeleteParque={(id) => handleExcluirParque(id)}
                />
              )}
              {showUsuario && (
                <Usuario
                  data={dataUsuario}
                  handleEditUsuario={(usuario) => handleEditarUsuario(usuario)}
                  handleDeleteUsuario={(id) => handleExcluirUsuario(id)}
                />
              )}
              {showSolicitacao && (
                <Solicitacao
                  data={dataSolicitacao}
                  handleEditSolicitacao={(id) => handleEditSolicitacao(id)} // Certifique-se de definir esta função
                  handleDeleteSolicitacao={(adminEmail) =>
                    handleRemove(adminEmail, "solicitacao")
                  }
                />
              )}
            </ChakraBox>
          </Flex>
        </ChakraBox>
        {/* Conteúdo Principal */}
        <ChakraBox flex="1" p="4">
          {/* Conteúdo da Página */}
          <ChakraBox>{/* Coloque seu conteúdo aqui */}</ChakraBox>
        </ChakraBox>
      </ChakraProvider>
    </>
  );
}

export default HomeAdm;

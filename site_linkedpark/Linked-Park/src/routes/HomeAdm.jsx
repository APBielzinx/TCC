import { useState, useEffect } from "react";
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


  var administrador = JSON.parse(localStorage.getItem("administrador"))

  async function handleAddItem(novoItem) {
    if (showParque) {

      console.log(novoItem)
      try {
        // Obtém o token do administrador
        const token = await administrador.token;
  
        if (token) {
          const headers = {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`
          };
  
          // Faça a solicitação POST para adicionar o novo parque
          const response = await fetch('https://tcc-production-e100.up.railway.app/api/lazer', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(novoItem) // O novoItem deve conter os dados do novo parque
          });
  
          if (response.status === 201) {
            const data = await response.json();
            console.log("Parque adicionado com sucesso:", data);
  
            // Adicione o novo parque aos dados existentes
            setDataParque([...dataParque, data]);
  
            // Feche o modal de adição após a conclusão
            onClose();
          } else {
            console.error("Erro na adição do parque:", response.status);
          }
        }
      } catch (error) {
        console.error("Erro ao adicionar o parque:", error);
      }
      }else if (showUsuario) {
      // Lógica para adicionar um novo usuário
      // Substitua o exemplo abaixo com sua própria lógica para adicionar usuário
      const novoUsuario = {
        // Defina os campos necessários para adicionar um usuário
        // Exemplo: nome, email, senha, etc.
        nome: novoItem.nome,
        email: novoItem.email,
        senha: novoItem.senha,
      };
      await handleAdicionarUsuario(novoUsuario);
    } else if (showSolicitacao) {
      // Lógica para adicionar uma nova solicitação
      // Substitua o exemplo abaixo com sua própria lógica para adicionar solicitação
      const novaSolicitacao = {
        // Defina os campos necessários para adicionar uma solicitação
        // Exemplo: adminEmail, senha, parqueId, etc.
        adminEmail: novoItem.adminEmail,
        senha: novoItem.senha,
        parqueId: novoItem.parqueId,
      };
      await handleAdicionarSolicitacao(novaSolicitacao);
    }
  
    // Feche o modal após adicionar o item
    onClose();
  }

  async function fazerSolicitacaoComToken() {
    try {
      // Obtém o token de AsyncStorage
      const token = await administrador.token

      if (token) {
        // Construa o cabeçalho Authorization
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        // Faça a solicitação usando o cabeçalho personalizado
        const response = await fetch('https://tcc-production-e100.up.railway.app/api/lazer', {
          method: 'GET', // ou outro método HTTP
          headers: headers
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("Dados da resposta:", data);
          setDados(data);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  async function buscarUsuarios() {
    try {
      const token = administrador.token;
      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };
  
        const response = await fetch('https://tcc-production-e100.up.railway.app/api/usuario', {
          method: 'GET',
          headers: headers
        });
  
        if (response.status === 200) {
          const data = await response.json();
          console.log("Dados da resposta:", data);
  
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
    fazerSolicitacaoComToken();
  }, []);
  useEffect(() => {
    buscarUsuarios();
  }, []);
    
  async function handleExcluirUsuario(id, email) {
    try {
      const token = await administrador.token;
  
      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };
  
        const response = await fetch(`https://tcc-production-e100.up.railway.app/api/usuario/${id}`, {
          method: 'DELETE',
          headers: headers
        });
  
        if (response.status === 204) {
          // Remova o usuário da lista
          const newDataUsuario = dataUsuario.filter((item) => item.id !== id);
          setDataUsuario(newDataUsuario);
  
          console.log("Usuário removido com sucesso!");
        } else {
          console.error("Erro na exclusão do usuário:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  }

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
    setDataSolicitacao(db_costumer.filter((item) => item.section === "solicitacao"));
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
  };


  async function handleAdicionarParque(novoParque) {
    try {
      // Obtém o token do administrador
      const token = await administrador.token;

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch('URL_DA_API_PARA_ADICIONAR_PARQUE', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(novoParque)
        });

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

  async function handleEditarParque(parqueEditado) {
    try {
      const token = await administrador.token;

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch(`URL_DA_API_PARA_EDITAR_PARQUE/${parqueEditado.id}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(parqueEditado)
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("Parque editado com sucesso:", data);

          // Atualize o estado do parque editado na lista de parques
          const newDataParque = dataParque.map((item) => {
            if (item.id === data.id) {
              return data;
            }
            return item;
          });

          setDataParque(newDataParque);

          onClose(); // Feche o modal de edição após a conclusão
        } else {
          console.error("Erro na edição do parque:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao editar o parque:", error);
    }
  }

  async function handleExcluirParque(id) {
    try {
      const token = await administrador.token;

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch(`https://tcc-production-e100.up.railway.app/api/lazer/${id}`, {
          method: 'DELETE',
          headers: headers
        });

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

  return (
    <Flex h="100vh">
      <Menu />
      <FlexContainer>
        {showParque && (
          <Parque
            data={dados}
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
            handleEditSolicitacao={(id) => handleEditSolicitacao(id)}
            handleDeleteSolicitacao={(adminEmail) =>
              handleRemove(adminEmail, "solicitacao")
            }
          />
        )}
        <button className="botaoNovoCadastro">NOVO CADASTRO</button>
        {isOpen && (
          showParque ? (
            <ModalComp
              isOpen={isOpen}
              onClose={onClose}
              data={dataParque}
              setData={setDataParque}
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
              handleAddItem={handleAddItem}
            />
          ) : (
            showUsuario ? (
              <ModalCompUsuario
                isOpen={isOpen}
                onClose={onClose}
                data={dataUsuario}
                setData={setDataUsuario}
                dataEdit={dataEdit}
                setDataEdit={setDataEdit}
                handleAddItem={handleAddItem}
              />
            ) : (
              <ModalCompSolicitacao
                isOpen={isOpen}
                onClose={onClose}
                data={dataSolicitacao}
                setData={setDataSolicitacao}
                dataEdit={dataEdit}
                setDataEdit={setDataEdit}
                handleAddItem={handleAddItem}
              />
            )
          )
        )}
      </FlexContainer>
    </Flex>
  );
}

export default HomeAdm;

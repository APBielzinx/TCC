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
import { extendTheme } from "@chakra-ui/react";

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
   // fazerSolicitacaoComToken();
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
  
        const response = await fetch(`http://localhost:8080/api/usuario/${id}`, {
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

  const theme = extendTheme({
    breakpoints: {
      base: "0px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
  });

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


  async function handleAddItem(item) {
    console.log(item)
    try {
      // Obtém o token de AsyncStorage
      const token = await AsyncStorage.getItem("token");

      if (token) {
        // Construa o cabeçalho Authorization
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        const body = {
          "nome": item.nome,
          "descricao": "Descrição do Lazer",
          "endereco": "Endereço do Lazer",
          "latitude": "Latitude do Lazer",
          "categoria": "Categoria do Lazer",
          "longetude": "Longitude do Lazer",
          "imagem": "URL da Imagem do Lazer",
          "administrador": {
            "id": 1,
            "nome": "Nome do Administrador"
          }
        }

        const response = await fetch('https://tcc-production-e100.up.railway.app/api/lazer', {
          method: 'POST',
          headers: headers
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("Dados da resposta:", data);
          setDados(data);
        } else {
          console.error("Erro na solicitação:", response.status);
        }
      } else {
        console.log("Token não encontrado em AsyncStorage.");
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  



  // Atualize o localStorage com os novos dados
  localStorage.setItem(
    "cad_cliente",
    JSON.stringify([...dataParque, ...dataUsuario, ...dataSolicitacao, item])
  );
};

return (
  <Flex h="100vh">
    <ChakraBox
      w="200px"
      bgGradient="linear(to-r, #011e11, #7fff00)"
      color="white"
      p="4"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Button
        colorScheme="teal"
        color="#fff"
        variant="outline"
        mb="20px"
        w="100%"
        onClick={() => {
          setShowParque(true);
          setShowUsuario(false);
          setShowSolicitacao(false);
        }}
        _hover={{ bgColor: "#011e11", color: "white" }}
        _focus={{ border: "none" }}
        _active={{
          bgColor: "#7fff00",
        }}
        justifyContent="flex-start"
        borderWidth={1}
      >
        Parque
      </Button>
      <Button
        colorScheme="teal"
        color="#fff"
        variant="outline"
        mb="20px"
        w="100%"
        onClick={() => {
          setShowUsuario(true);
          setShowParque(false);
          setShowSolicitacao(false);
        }}
        _hover={{ bgColor: "#011e11", color: "white" }}
        _focus={{ border: "none" }}
        _active={{
          bgColor: "#7fff00",
        }}
        justifyContent="flex-start"
        borderWidth={1}
      >
        Usuário
      </Button>
      <Button
        colorScheme="teal"
        color="#fff"
        variant="outline"
        w="100%"
        onClick={() => {
          setShowSolicitacao(true);
          setShowParque(false);
          setShowUsuario(false);
        }}
        _hover={{ bgColor: "#011e11", color: "white" }}
        _focus={{ border: "none" }}
        _active={{
          bgColor: "#7fff00",
        }}
        justifyContent="flex-start"
        borderWidth={1}
      >
        Solicitação
      </Button>
      <Button
        colorScheme="teal"
        color="#fff"
        variant="outline"
        w="100%"
        mt="auto"
        onClick={() => {
          // Coloque a lógica para abrir o chat aqui
        }}
        _hover={{ bgColor: "#011e11", color: "white" }}
        _focus={{ border: "none" }}
        _active={{
          bgColor: "#7fff00",
        }}
      >
        <ChatIcon />
        Chat
      </Button>
      <Button
        colorScheme="teal"
        color="#fff"
        variant="outline"
        w="100%"
        mt="4"
        onClick={() => {
          // Coloque a lógica para deslogar aqui
        }}
        _hover={{ bgColor: "#011e11", color: "white" }}
        _focus={{ border: "none" }}
        _active={{
          bgColor: "#7fff00",
        }}
      >
        <ArrowBackIcon />
        Deslogar
      </Button>
    </ChakraBox>

    <Flex
      flex="1"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
      bgColor="#011e11"
      color="white"
      flexDirection="column"
      alignItems="center"
    >
      {showParque && (
        <>
          <Heading as="h1" size="2xl" position="absolute" top="0" marginTop="20px">
            Parque
          </Heading>
          <ChakraBox
            maxW={1700} // Aumentei o tamanho da tabela para 1200px
            w="100%"
            py={10}
            px={2}
          >
            <Table
              position="absolute"
              top="90"
              backgroundColor="#4CAF50"
              variant="striped"
              colorScheme="whiteAlpha"
              maxW="87%" // Faça a tabela preencher a tela inteira
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Descrição</Th>
                  <Th>Endereço</Th>
                  <Th>Latitude</Th>
                  <Th>Longitude</Th>
                  <Th>Adm</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {dados.map((item, index) => (
                  <Tr key={index} cursor="pointer">
                    <Td>{item.idLazer}</Td>
                    <Td>{item.nome}</Td>
                    <Td>{item.descricao}</Td>
                    <Td>{item.endereco}</Td>
                    <Td>{item.latitude}</Td>
                    <Td>{item.longetude}</Td>
                    <Td>{item.administrador}</Td>
                    <Td p={0}>
                      <EditIcon
                        fontSize={20}
                        onClick={() => [
                          setDataEdit(
                            item.idLazer,
                            item.nome,
                            item.descricao,
                            item.endereco,
                            item.latitude,
                            item.longetude,
                            item.administrador,
                            index,

                          ),
                          onOpen(),
                        ]}
                      />
                      <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleRemove(item, "parque")}
                      />
                      <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
                    </Td>
                    <Td p={0}>
                      <img
                        src={item.imagem}
                        alt={`Imagem de ${item.name}`}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Td>
                  </Tr>
                )
                )}
              </Tbody>
            </Table>
          </ChakraBox>
        </>
      )}
      {showUsuario && (
        <>
          <Heading as="h1" size="2xl" position="absolute" top="0" marginTop="20px">
            Usuário
          </Heading>
          <ChakraBox
            maxW={1700} // Aumentei o tamanho da tabela para 1200px
            w="100%"
            py={10}
            px={2}
          >
            <Table
              position="absolute"
              top="90"
              backgroundColor="#4CAF50"
              variant="striped"
              colorScheme="whiteAlpha"
              maxW="87%" // Faça a tabela preencher a tela inteira
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Email</Th>
                  <Th>Status da conta</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
              {dataUsuario.map((usuario, index) => (
  <Tr key={index} cursor="pointer">
    <Td>{usuario.idUsuario}</Td>
    <Td>{usuario.email}</Td>
    {usuario.accountNonExpired ? "Conta Expirada: Não" : "Conta Expirada: Sim"}
    <Td p={0}>
      <EditIcon
        fontSize={20}
        onClick={() => handleEditarUsuario(usuario)}
      />
      <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
    </Td>
    <Td p={0}>
      <DeleteIcon
        fontSize={20}
        onClick={() => handleExcluirUsuario(usuario.idUsuario)}
        data-email={usuario.email}
      />
      <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
    </Td>
    <Td p={0}>
      {/* Qualquer outro conteúdo que você deseje exibir */}
    </Td>
  </Tr>
))}

              </Tbody>
            </Table>
          </ChakraBox>
        </>
      )}
      {showSolicitacao && (
        <>
          <Heading as="h1" size="2xl" position="absolute" top="0" marginTop="20px">
            Solicitação
          </Heading>
          <ChakraBox
            maxW={1700} // Aumentei o tamanho da tabela para 1200px
            w="100%"
            py={10}
            px={2}
          >
            <Table
              position="absolute"
              top="90"
              backgroundColor="#4CAF50"
              variant="striped"
              colorScheme="whiteAlpha"
              maxW="87%" // Faça a tabela preencher a tela inteira
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Email do adm</Th>
                  <Th>Senha</Th>
                  <Th>ID do parque</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataSolicitacao.map(
                  (
                    {
                      id,
                      adminEmail,
                      senha,
                      parqueId,
                      status,
                    },
                    index
                  ) => (
                    <Tr key={index} cursor="pointer">
                      <Td>{id}</Td>
                      <Td>{adminEmail}</Td>
                      <Td>{senha}</Td>
                      <Td>{parqueId}</Td>
                      <Td>{status}</Td>
                      <Td p={0}>
                        <EditIcon
                          fontSize={20}
                          onClick={() => [
                            setDataEdit({
                              id,
                              adminEmail,
                              senha,
                              parqueId,
                              status,
                              section: "solicitacao",
                            }),
                            onOpen(),
                          ]}
                        />
                        <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
                      </Td>
                      <Td p={0}>
                        <DeleteIcon
                          fontSize={20}
                          onClick={() => handleRemove(adminEmail, "solicitacao")}
                          data-adminEmail={adminEmail}
                        />
                        <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
                      </Td>
                      <Td p={0}>
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </ChakraBox>
        </>
      )}
      {isMobile && !showParque && (
        <ChakraBox>
          {/* Conteúdo para a seção "Usuário" (vazio) */}
        </ChakraBox>
      )}
      <Button
        colorScheme="teal"
        onClick={() => [setDataEdit({}), onOpen()]}
        alignSelf="center"
        mt={4}
        bg="#7fff00"
        color="black"
        _hover={{ bgColor: "#7fff00" }}
      >
        NOVO CADASTRO
      </Button>
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
    </Flex>
  </Flex>
);
}

export default HomeAdm;

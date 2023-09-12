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

  const handleAddItem = (item, section) => {
    // Adicione o item à seção correta
    switch (section) {
      case "parque":
        setDataParque((prevData) => [...prevData, item]);
        break;
      case "usuario":
        setDataUsuario((prevData) => [...prevData, item]);
        break;
      case "solicitacao":
        setDataSolicitacao((prevData) => [...prevData, item]);
        break;
      default:
        break;
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
                  {dataParque.map(
                    (
                      {
                        id,
                        name,
                        description,
                        address,
                        latitude,
                        longitude,
                        admin,
                        email,
                        imagem,
                      },
                      index
                    ) => (
                      <Tr key={index} cursor="pointer">
                        <Td>{id}</Td>
                        <Td>{name}</Td>
                        <Td>{description}</Td>
                        <Td>{address}</Td>
                        <Td>{latitude}</Td>
                        <Td>{longitude}</Td>
                        <Td>{admin}</Td>
                        <Td p={0}>
                          <EditIcon
                            fontSize={20}
                            onClick={() => [
                              setDataEdit({
                                id,
                                name,
                                description,
                                address,
                                latitude,
                                longitude,
                                admin,
                                email,
                                index,
                                section: "parque",
                              }),
                              onOpen(),
                            ]}
                          />
                          <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
                        </Td>
                        <Td p={0}>
                          <DeleteIcon
                            fontSize={20}
                            onClick={() => handleRemove(email, "parque")}
                            data-email={email}
                          />
                          <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
                        </Td>
                        <Td p={0}>
                          <img
                            src={imagem}
                            alt={`Imagem de ${name}`}
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
                  {dataUsuario.map(
                    (
                      {
                        id,
                        name,
                        email,
                        status,
                      },
                      index
                    ) => (
                      <Tr key={index} cursor="pointer">
                        <Td>{id}</Td>
                        <Td>{email}</Td>
                        <Td>{status}</Td>
                        <Td p={0}>
                          <EditIcon
                            fontSize={20}
                            onClick={() => [
                              setDataEdit({
                                id,
                                email,
                                status,
                                section: "usuario",
                              }),
                              onOpen(),
                            ]}
                          />
                          <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
                        </Td>
                        <Td p={0}>
                          <DeleteIcon
                            fontSize={20}
                            onClick={() => handleRemove(email, "usuario")}
                            data-email={email}
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

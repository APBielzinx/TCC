import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "../components/ModalComp";
import { extendTheme } from "@chakra-ui/react";

function HomeAdm  ()  {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataParque, setDataParque] = useState([]);
  const [dataUsuario, setDataUsuario] = useState([]);
  const [dataSolicitacao, setDataSolicitacao] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [showSolicitacoes, setShowSolicitacoes] = useState(false);

  const theme = extendTheme({
    breakpoints: {
      base: "0px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    // ...
  });
console.log(localStorage.getItem("administrador"))
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setDataParque(db_costumer);
    setDataUsuario(db_costumer);
    setDataSolicitacao(db_costumer);
  }, [setDataParque, setDataUsuario, setDataSolicitacao]);

  const handleRemove = (email) => {
    const newArray = dataUsuario.filter((item) => item.email !== email);

    setDataUsuario(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex h="100vh">
      {/* Menu Lateral */}
      <Box
        w="200px"
        bgGradient="linear(to-r, #011e11, #7fff00)"
        color="white"
        p="4"
        display={{ base: "block", lg: "block" }}
      >
        {/* Conteúdo do Menu Lateral */}
        <Box mb="20px">
          <Button
            colorScheme="teal"
            variant="outline"
            w="100%"
            onClick={() => setShowSolicitacoes(false)}
            _hover={{ bgColor: "#7fff00" }} // Efeito de hover verde
          >
            Parque
          </Button>
        </Box>
        <Box mb="20px">
          <Button
            colorScheme="teal"
            variant="outline"
            w="100%"
            onClick={() => setShowSolicitacoes(false)}
            _hover={{ bgColor: "#7fff00" }} // Efeito de hover verde
          >
            Usuário
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme="teal"
            variant="outline"
            w="100%"
            onClick={() => setShowSolicitacoes(true)}
            _hover={{ bgColor: "#7fff00" }} // Efeito de hover verde
          >
            Solicitação
          </Button>
        </Box>
      </Box>

      {/* Conteúdo Principal */}
      <Flex
        flex="1"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
        bgColor="#011e11"
        color="white"
        flexDirection="column"
        alignItems="center" // Centralizar horizontalmente
      >
        <Box maxW={800} w="100%" py={10} px={2}>
          <Box height="100%" overflowY="auto">
            {showSolicitacoes ? (
              // Tabela para a seção "Solicitação"
              <Table variant="striped" colorScheme="whiteAlpha" maxW="800px" size="sm">
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
                  {dataSolicitacao.map(
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
                              }),
                              onOpen(),
                            ]}
                          />
                          <Box w="5px" h="1px" display="inline-block" /> {/* Espaço horizontal */}
                        </Td>
                        <Td p={0}>
                          <DeleteIcon
                            fontSize={20}
                            onClick={() => handleRemove(email)}
                            data-email={email}
                          />
                          <Box w="5px" h="1px" display="inline-block" /> {/* Espaço horizontal */}
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
            ) : (
              // Tabela para a seção "Usuário"
              <Table variant="striped" colorScheme="whiteAlpha" maxW="800px" size="sm">
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
                  {dataUsuario.map(
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
                              }),
                              onOpen(),
                            ]}
                          />
                          <Box w="5px" h="1px" display="inline-block" /> {/* Espaço horizontal */}
                        </Td>
                        <Td p={0}>
                          <DeleteIcon
                            fontSize={20}
                            onClick={() => handleRemove(email)}
                            data-email={email}
                          />
                          <Box w="5px" h="1px" display="inline-block" /> {/* Espaço horizontal */}
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
            )}
            <Button
              colorScheme="teal"
              onClick={() => [setDataEdit({}), onOpen()]}
              alignSelf="center"
              mt={4}
            >
              NOVO CADASTRO
            </Button>
          </Box>
        </Box>
        {isOpen && (
          showSolicitacoes ? (
            <ModalComp
              isOpen={isOpen}
              onClose={onClose}
              data={dataSolicitacao}
              setData={setDataSolicitacao}
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
            />
          ) : (
            <ModalCompUsuario
              isOpen={isOpen}
              onClose={onClose}
              data={dataUsuario}
              setData={setDataUsuario}
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
            />
          )
        )}
      </Flex>
    </Flex>
  );
};

export default HomeAdm;

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

function HomeAdm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataParque, setDataParque] = useState([]);
  const [dataUsuario, setDataUsuario] = useState([]);
  const [dataSolicitacao, setDataSolicitacao] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [showParque, setShowParque] = useState(true);

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
  }, []);

  const handleRemove = (email) => {
    const newArray = dataParque.filter((item) => item.email !== email);

    setDataParque(newArray);

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
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        {/* Conteúdo do Menu Lateral */}
        <Button
          colorScheme="teal"
          variant="outline"
          mb="20px"
          w="100%"
          onClick={() => setShowParque(true)}
          _hover={{ bgColor: "#7fff00", color: "white" }}
          _focus={{ border: "none" }}
          _active={{
            bgColor: "#7fff00",
          }}
          justifyContent="flex-start"
          borderWidth={0}
          color="white"
        >
          Parque
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          mb="20px"
          w="100%"
          onClick={() => setShowParque(false)}
          _hover={{ bgColor: "#7fff00", color: "white" }}
          _focus={{ border: "none" }}
          _active={{
            bgColor: "#7fff00",
          }}
          justifyContent="flex-start"
          borderWidth={0}
          color="white"
        >
          Usuário
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          w="100%"
          onClick={() => setShowParque(false)}
          _hover={{ bgColor: "#7fff00", color: "white" }}
          _focus={{ border: "none" }}
          _active={{
            bgColor: "#7fff00",
          }}
          justifyContent="flex-start"
          borderWidth={0}
          color="white"
        >
          Solicitação
        </Button>
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
        alignItems="center"
      >
        <Box maxW={800} w="100%" py={10} px={2}>
          {showParque && (
            // Tabela para a seção "Parque"
            <Table
              variant="striped"
              colorScheme="whiteAlpha"
              maxW="800px"
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
                            }),
                            onOpen(),
                          ]}
                        />
                        <Box w="5px" h="1px" display="inline-block" />{" "}
                      </Td>
                      <Td p={0}>
                        <DeleteIcon
                          fontSize={20}
                          onClick={() => handleRemove(email)}
                          data-email={email}
                        />
                        <Box w="5px" h="1px" display="inline-block" />{" "}
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
          {!showParque && (
            // Tabela para a seção "Usuário"
            <Table
              variant="striped"
              colorScheme="whiteAlpha"
              maxW="800px"
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Email</Th>
                  <Th>Status da Conta</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataUsuario.map(
                  (
                    { id, email, status },
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
                              index,
                            }),
                            onOpen(),
                          ]}
                        />
                        <Box w="5px" h="1px" display="inline-block" />{" "}
                      </Td>
                      <Td p={0}>
                        <DeleteIcon
                          fontSize={20}
                          onClick={() => handleRemove(email)}
                          data-email={email}
                        />
                        <Box w="5px" h="1px" display="inline-block" />{" "}
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          )}
          {!showParque && (
            // Tabela para a seção "Solicitação"
            <Table
              variant="striped"
              colorScheme="whiteAlpha"
              maxW="800px"
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>E-mail do Adm</Th>
                  <Th>Senha</Th>
                  <Th>ID do Parque</Th>
                  <Th>Status</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataSolicitacao.map(
                  (
                    { id, adminEmail, senha, parqueId, status },
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
                              index,
                            }),
                            onOpen(),
                          ]}
                        />
                        <Box w="5px" h="1px" display="inline-block" />{" "}
                      </Td>
                      <Td p={0}>
                        <DeleteIcon
                          fontSize={20}
                          onClick={() => handleRemove(adminEmail)}
                          data-email={adminEmail}
                        />
                        <Box w="5px" h="1px" display="inline-block" />{" "}
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          )}
          {isMobile && !showParque && (
            <Box>
              {/* Conteúdo para a seção "Usuário" (vazio) */}
            </Box>
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
        </Box>
        {isOpen && (
          showParque ? (
            <ModalComp
              isOpen={isOpen}
              onClose={onClose}
              data={dataParque}
              setData={setDataParque}
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
}

export default HomeAdm;

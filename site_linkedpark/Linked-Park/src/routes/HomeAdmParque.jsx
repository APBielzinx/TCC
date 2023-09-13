import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Textarea,
} from "@chakra-ui/react";

const ModalCompInfo = ({ data, setData, dataEdit, isOpen, onClose, onUpdateData }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState(dataEdit.name || "");
  const [description, setDescription] = useState(dataEdit.description || "");

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleSave = () => {
    if (!name || !description) return;

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        id: dataEdit.id,
        name,
        description,
      };
    } else {
      const newItem = {
        id,
        name,
        description,
      };
      data.push(newItem);
    }

    localStorage.setItem("cad_cliente", JSON.stringify(data));
    onUpdateData([...data]);

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(5px)"
          zIndex="999"
          color="white"
          borderRadius="10px"
        >
          <ModalHeader>Cadastrar Novas Informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>ID</FormLabel>
                <Input type="text" value={id} isReadOnly />
              </Box>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box>
                {/* Adicione aqui qualquer campo adicional necessário */}
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const HomeAdmParque = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataInformacao, setDataInformacao] = useState([]); // Dados do Informacao
  const [dataUsuario, setDataUsuario] = useState([]); // Dados do Usuário
  const [dataEdit, setDataEdit] = useState({});
  const [showInformacao, setShowInformacao] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    // Defina os estados de dados separados para cada seção
    setDataInformacao(db_costumer.filter((item) => item.section === "Informacao"));
    setDataUsuario(db_costumer.filter((item) => item.section === "usuario"));
  }, []);

  const handleRemove = (Evento, section) => {
    // Use a seção especificada para filtrar os dados corretos
    let newData = [];
    switch (section) {
      case "Informacao":
        newData = dataInformacao.filter((item) => item.Evento !== Evento);
        setDataInformacao(newData);
        break;
      case "usuario":
        newData = dataUsuario.filter((item) => item.Evento !== Evento);
        setDataUsuario(newData);
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
      case "Informacao":
        setDataInformacao((prevData) => [...prevData, item]);
        break;
      case "usuario":
        setDataUsuario((prevData) => [...prevData, item]);
        break;
      default:
        break;
    }

    // Atualize o localStorage com os novos dados
    localStorage.setItem(
      "cad_cliente",
      JSON.stringify([...dataInformacao, ...dataUsuario, item])
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
            setShowInformacao(true);
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
          Informações
        </Button>
        <Button
          colorScheme="teal"
          color="#fff"
          variant="outline"
          w="100%"
          onClick={() => {
            setShowUsuario(true);
            setShowInformacao(false);
          }}
          _hover={{ bgColor: "#011e11", color: "white" }}
          _focus={{ border: "none" }}
          _active={{
            bgColor: "#7fff00",
          }}
          justifyContent="flex-start"
          borderWidth={1}
        >
          Eventos
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
          Chat
          <ChatIcon />
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
        {showInformacao && (
          <>
            <Heading as="h1" size="2xl" position="absolute" top="0" marginTop="20px">
              Informações
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
                    <Th>Nome Do Evento</Th>
                    <Th>Descrição do Evento</Th>
                    <Th p={0}></Th>
                    <Th p={0}></Th>
                    <Th p={0}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataInformacao.map(
                    (
                      {
                        id,
                        name,
                        description,
                        address,
                        latitude,
                        longitude,
                        admin,
                        Evento,
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
                                Evento,
                                index,
                                section: "Informacao",
                              }),
                              onOpen(),
                            ]}
                          />
                          <ChakraBox w="5px" h="1px" display="inline-block" />{" "}
                        </Td>
                        <Td p={0}>
                          <DeleteIcon
                            fontSize={20}
                            onClick={() => handleRemove(Evento, "Informacao")}
                            data-Evento={Evento}
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
              Eventos
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
                    <Th>Evento</Th>
                    <Th>data</Th>
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
                        Evento,
                        data,
                      },
                      index
                    ) => (
                      <Tr key={index} cursor="pointer">
                        <Td>{id}</Td>
                        <Td>{Evento}</Td>
                        <Td>{data}</Td>
                        <Td p={0}>
                          <EditIcon
                            fontSize={20}
                            onClick={() => [
                              setDataEdit({
                                id,
                                Evento,
                                data,
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
                            onClick={() => handleRemove(Evento, "usuario")}
                            data-Evento={Evento}
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
        {isMobile && !showInformacao && (
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
          showInformacao ? (
            <ModalCompInfo
              isOpen={isOpen}
              onClose={onClose}
              data={dataInformacao}
              setData={setDataInformacao}
              dataEdit={dataEdit}
              onUpdateData={setDataInformacao}
            />
          ) : (
            <ModalCompUsuario
              isOpen={isOpen}
              onClose={onClose}
              data={dataUsuario}
              setData={setDataUsuario}
              dataEdit={dataEdit}
              onUpdateData={setDataUsuario}
            />
          )
        )}
      </Flex>
    </Flex>
  );
};

export default HomeAdmParque;
